// src/app/services/AuthService.ts
import { Injectable, signal } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User
} from '@angular/fire/auth';
import { inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth: Auth = inject(Auth);
  private currentUser = signal<User | null>(null);
  isLoggedIn = signal(false);

  constructor() {
    this.auth.onAuthStateChanged((user) => {
      this.currentUser.set(user);
      this.isLoggedIn.set(!!user);
    });
  }

  async login(email: string, password: string): Promise<boolean> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      return true;
    } catch (err) {
      console.error('Login failed:', err);
      return false;
    }
  }

  async signup(email: string, password: string): Promise<boolean> {
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
      return true;
    } catch (err) {
      console.error('Signup failed:', err);
      return false;
    }
  }

  logout() {
    return signOut(this.auth);
  }

  get loginStatus() {
    return this.isLoggedIn;
  }

  get user() {
    return this.currentUser();
  }
}
