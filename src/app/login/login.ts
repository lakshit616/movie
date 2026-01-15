import { Component, signal } from '@angular/core';
import { Router,RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/AuthService';

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
  // loginToHome=false;
  constructor(private router: Router,private auth:AuthService) {}

  // loginUser(event: Event) {
  //   event.preventDefault();

  //   const storedUser = localStorage.getItem('user');

  //   if (storedUser) {
  //     const user = JSON.parse(storedUser);
  //     if (user.email === this.email() && user.password === this.password()) {
  //       this.loginError.set('');
  //       console.log(' Login successful!');
  //       localStorage.setItem('loginToHome','true');
  //        this.router.navigate(['./home']);

  //     } else if(user.email === this.email() && user.password !== this.password()) {
  //       this.loginError.set(' Invalid password');
  //     }
  //    else {
  //     this.loginError.set(' No user found. Please sign up first.');
  //   }
  //   } 
    
  // }
   async loginUser(event: Event) {
  event.preventDefault();
  
  this.auth.login(this.email(), this.password()).then((success) => {
    if (success) {
      this.loginError.set('');
      this.router.navigate(['/home']);
    } 
    
    else {
      this.loginError.set('Invalid credentials or user not found.');
    }
  });
  
}

}
