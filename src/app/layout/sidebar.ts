import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../auth/auth.service';

interface NavigationItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, ButtonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  private authService = inject(AuthService);
  private router = inject(Router);

  currentUser = this.authService.currentUser;

  navigationItems: NavigationItem[] = [
    {
      label: 'Darbalaukis',
      icon: 'pi pi-home',
      route: '/dashboard',
    },
    {
      label: 'Pacientai',
      icon: 'pi pi-users',
      route: '/patients',
    },
    {
      label: 'Nustatymai',
      icon: 'pi pi-cog',
      route: '/settings',
    },
  ];

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}
