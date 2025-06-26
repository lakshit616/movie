import { Component, signal } from '@angular/core';
import { Router,RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterLink,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LogIn {
  email = signal('');
  password = signal('');
  loginError = signal('');
  loginToHome=false;
  constructor(private router: Router) {}

  loginUser(event: Event) {
    event.preventDefault();

    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.email === this.email() && user.password === this.password()) {
        this.loginError.set('');
        console.log(' Login successful!');
        localStorage.setItem('loginToHome','true');
         this.router.navigate(['./home']);

      } else if(user.email === this.email() && user.password !== this.password()) {
        this.loginError.set(' Invalid password');
        localStorage.removeItem('loginToHome');
      }
     else {
      this.loginError.set(' No user found. Please sign up first.');
      localStorage.removeItem('loginToHome');
    }
    } 
    
  }
  
}
