import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'https://localhost:7194/api/auth';

  // Private signals to manage state internally
  private _token = signal<string | null>(localStorage.getItem('token'));
  public _isLoggedIn = signal(!!localStorage.getItem('token'));

  constructor(private http: HttpClient, private router: Router) {}

  // Login method using JWT
  login(email: string, password: string): Promise<boolean> {
    
    return firstValueFrom(
      this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password })
    )
      .then(res => {
        if (res && res.token) {
          this._token.set(res.token);
          localStorage.setItem('token', res.token);
          this._isLoggedIn.set(true);
          return true;
        } else {
          console.error('Login failed: token not present in response', res);
          return false;
        }
      })
      .catch(err => {
        console.error('Login failed', err.error || err.message || err);
        return false;
      });
  }

  // Signup method (uses passwordHash field to match .NET model)
  signup(name: string, email: string, password: string): Promise<boolean> {
    return firstValueFrom(
      this.http.post(`${this.apiUrl}/register`, {
        name,
        email,
        passwordHash: password // Backend expects 'passwordHash' field
      })
    )
      .then(() => true)
      .catch(err => {
        console.error('Signup failed', err.error || err.message || err);
        return false;
      });
  }

  // Logout user
  logout() {
    localStorage.removeItem('token');
   
    this._token.set(null);
    this._isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }

  // Computed property for external access to login state
  isLoggedIn = computed(() => this._isLoggedIn());

  // Get current token
  getToken(): string | null {
    return this._token() || localStorage.getItem('token');
  }
  
}
