import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

// Angular Material Imports - ALL REQUIRED
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AuthService } from '../../../../core/services/auth.service';
import { User } from '../../../../core/models/user.model';
import { API_ENDPOINTS } from '../../../../core/constants/api.constants';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: User | null = null;
  testResults: any = {};

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.authService.authState$.subscribe(authState => {
      this.user = authState.user;
    });
  }

  testPublicEndpoint(): void {
    console.log('Testing public endpoint...');
    this.http.get(API_ENDPOINTS.TEST.PUBLIC, { responseType: 'text' })
      .subscribe({
        next: (response) => {
          console.log('Public endpoint response:', response);
          this.testResults.public = response;
          this.showSuccess('Public endpoint test successful');
        },
        error: (error) => {
          console.error('Public endpoint error:', error);
          this.testResults.public = `Error: ${error.message}`;
          this.showError('Public endpoint test failed');
        }
      });
  }

  testProtectedEndpoint(): void {
    console.log('Testing protected endpoint...');
    this.http.get(API_ENDPOINTS.TEST.PROTECTED, { responseType: 'text' })
      .subscribe({
        next: (response) => {
          console.log('Protected endpoint response:', response);
          this.testResults.protected = response;
          this.showSuccess('Protected endpoint test successful');
        },
        error: (error) => {
          console.error('Protected endpoint error:', error);
          this.testResults.protected = `Error: ${error.message}`;
          this.showError('Protected endpoint test failed');
        }
      });
  }

  testUserEndpoint(): void {
    console.log('Testing user endpoint...');
    this.http.get(API_ENDPOINTS.TEST.USER, { responseType: 'text' })
      .subscribe({
        next: (response) => {
          console.log('User endpoint response:', response);
          this.testResults.user = response;
          this.showSuccess('User endpoint test successful');
        },
        error: (error) => {
          console.error('User endpoint error:', error);
          this.testResults.user = `Error: ${error.message}`;
          this.showError('User endpoint test failed');
        }
      });
  }

  testAdminEndpoint(): void {
    console.log('Testing admin endpoint...');
    this.http.get(API_ENDPOINTS.TEST.ADMIN, { responseType: 'text' })
      .subscribe({
        next: (response) => {
          console.log('Admin endpoint response:', response);
          this.testResults.admin = response;
          this.showSuccess('Admin endpoint test successful');
        },
        error: (error) => {
          console.error('Admin endpoint error:', error);
          this.testResults.admin = `Error: ${error.message}`;
          this.showError('Admin endpoint test failed');
        }
      });
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }
}
