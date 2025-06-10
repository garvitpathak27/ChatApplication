import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { AuthService } from './core/services/auth.service';
import { HeaderComponent } from './layout/components/header/header.component';
import { NavigationComponent } from './layout/components/navigation/navigation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    HeaderComponent,
    NavigationComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  
  title = 'auth-frontend';
  isAuthenticated$: Observable<boolean>;
  showLayout$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.isAuthenticated$ = this.authService.authState$.pipe(
      map(state => state.isAuthenticated)
    );

    this.showLayout$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => {
        const navigation = event as NavigationEnd;
        return !navigation.url.includes('/auth/');
      })
    );
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (this.sidenav && this.sidenav.opened) {
        this.sidenav.close();
      }
    });
  }

  onMenuToggle(): void {
    if (this.sidenav) {
      this.sidenav.toggle();
    }
  }
}
