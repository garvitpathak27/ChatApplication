import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Angular Material Imports
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

import { AuthService } from '../../../core/services/auth.service';

interface NavItem {
  label: string;
  icon: string;
  route: string;
  roles?: string[];
}

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  userRoles$: Observable<string[]>;

  navItems: NavItem[] = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard'
    },
    {
      label: 'Profile',
      icon: 'person',
      route: '/profile'
    },
    {
      label: 'Settings',
      icon: 'settings',
      route: '/settings'
    },
    {
      label: 'Admin Panel',
      icon: 'admin_panel_settings',
      route: '/admin',
      roles: ['ADMIN']
    }
  ];

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.userRoles$ = this.authService.authState$.pipe(
      map(() => this.authService.getUserRoles())
    );
  }

  navigate(route: string): void {
    this.router.navigate([route]);
  }

  canShowItem(item: NavItem, userRoles: string[]): boolean {
    if (!item.roles || item.roles.length === 0) {
      return true;
    }
    return item.roles.some(role => userRoles.includes(role));
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
