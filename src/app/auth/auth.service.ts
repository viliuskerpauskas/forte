import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  // Auth state signals
  isAuthenticated = signal<boolean>(false);
  currentUser = signal<AuthUser | null>(null);
  token = signal<string | null>(null);

  async validateToken(token: string): Promise<boolean> {
    try {
      // TODO: Replace with actual API endpoint
      // For now, simulate API call with mock validation
      const response = await this.mockTokenValidation(token);

      if (response.valid && response.user) {
        this.setAuthState(token, response.user);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Token validation failed:', error);
      return false;
    }
  }

  private async mockTokenValidation(
    token: string
  ): Promise<{ valid: boolean; user?: AuthUser }> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock validation logic - replace with real API call
    if (token && token.length > 10) {
      return {
        valid: true,
        user: {
          id: '1',
          email: 'doctor@example.com',
          name: 'Dr. Smith',
          role: 'physician',
        },
      };
    }

    return { valid: false };
  }

  private setAuthState(token: string, user: AuthUser): void {
    this.token.set(token);
    this.currentUser.set(user);
    this.isAuthenticated.set(true);

    localStorage.setItem('auth_token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout(): void {
    this.token.set(null);
    this.currentUser.set(null);
    this.isAuthenticated.set(false);

    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  }

  // Check if user is already authenticated (for app initialization)
  checkExistingAuth(): boolean {
    const storedToken = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      try {
        const user = JSON.parse(storedUser);
        this.setAuthState(storedToken, user);
        return true;
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        this.logout();
      }
    }

    return false;
  }
}
