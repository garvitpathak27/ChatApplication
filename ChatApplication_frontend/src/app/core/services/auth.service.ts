import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { LoginRequest, RegisterRequest, JwtResponse, MessageResponse, AuthState } from '../models/auth.model';
import { User } from '../models/user.model';
import { API_ENDPOINTS, STORAGE_KEYS } from '../constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = STORAGE_KEYS.ACCESS_TOKEN;
  private readonly USER_KEY = STORAGE_KEYS.USER_DATA;

  private authStateSubject = new BehaviorSubject<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null
  });

  public authState$ = this.authStateSubject.asObservable();

  constructor(private http: HttpClient) {
    this.initializeAuthState();
  }

  private initializeAuthState(): void {
    const token = this.getStoredToken();
    const userData = this.getStoredUserData();

    if (token && userData && !this.isTokenExpired(token)) {
      this.updateAuthState({
        isAuthenticated: true,
        user: userData,
        token: token
      });
    } else {
      this.clearAuthData();
    }
  }

  login(credentials: LoginRequest): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials)
      .pipe(
        tap(response => {
          this.handleAuthSuccess(response);
        }),
        catchError(this.handleError)
      );
  }

  register(userData: RegisterRequest): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(API_ENDPOINTS.AUTH.REGISTER, userData)
      .pipe(
        catchError(this.handleError)
      );
  }

  logout(): void {
    this.clearAuthData();
    this.updateAuthState({
      isAuthenticated: false,
      user: null,
      token: null
    });
  }

  isAuthenticated(): boolean {
    const currentState = this.authStateSubject.value;
    return currentState.isAuthenticated && !!currentState.token && !this.isTokenExpired(currentState.token);
  }

  getCurrentUser(): User | null {
    return this.authStateSubject.value.user;
  }

  getToken(): string | null {
    return this.authStateSubject.value.token;
  }

  getUserRoles(): string[] {
    const token = this.getToken();
    if (!token) return [];

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.roles || ['USER'];
    } catch (error) {
      return [];
    }
  }

  hasRole(role: string): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.roles?.includes(role) || false;
    } catch (error) {
      return false;
    }
  }

  private handleAuthSuccess(response: JwtResponse): void {
    const user: User = {
      id: response.id,
      username: response.username,
      email: response.email,
      displayName: response.displayName,
      enabled: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    localStorage.setItem(this.TOKEN_KEY, response.token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));

    this.updateAuthState({
      isAuthenticated: true,
      user: user,
      token: response.token
    });
  }

  private updateAuthState(state: AuthState): void {
    this.authStateSubject.next(state);
  }

  private clearAuthData(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  private getStoredToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private getStoredUserData(): User | null {
    const userData = localStorage.getItem(this.USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  private isTokenExpired(token: string): boolean {
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp < currentTime;
    } catch (error) {
      return true;
    }
  }

  private handleError = (error: HttpErrorResponse): Observable<never> => {
    let errorMessage = 'An unexpected error occurred';

    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      if (error.status === 401) {
        errorMessage = 'Invalid username or password';
        this.logout();
      } else if (error.status === 403) {
        errorMessage = 'Access forbidden';
      } else if (error.status === 0) {
        errorMessage = 'Unable to connect to server';
      } else if (error.error?.message) {
        errorMessage = error.error.message;
      }
    }

    return throwError(() => new Error(errorMessage));
  }
}
