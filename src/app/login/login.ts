import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LogIn {
  email = signal('');
  password = signal('');
  loginError = signal('');

  constructor(private router: Router) {}

  loginUser(event: Event) {
    event.preventDefault();

    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.email === this.email() && user.password === this.password()) {
        this.loginError.set('');
        console.log(' Login successful!');
        // this.router.navigate(['/dashboard']);
      } else {
        this.loginError.set(' Invalid email or password');
      }
    } else {
      this.loginError.set(' No user found. Please sign up first.');
    }
  }
}
