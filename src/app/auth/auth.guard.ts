import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Check if user is authenticated
  if (authService.isAuthenticated()) {
    return true;
  }

  // Check for existing auth in localStorage
  if (authService.checkExistingAuth()) {
    return true;
  }

  // Redirect to auth page if not authenticated
  router.navigate(['/auth']);
  return false;
};