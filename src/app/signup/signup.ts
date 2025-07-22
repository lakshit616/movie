import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/AuthService';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class Signup {
  email = signal('');
  password = signal('');
  username=signal('');
constructor(private router: Router,private auth:AuthService) {}
  isFormValid = computed(() =>
    this.email().includes('@') && 
  this.password().length >= 6 && 
  this.hasLowercase(this.password()) && 
  this.hasUppercase(this.password()) && 
  this.hasSymbol(this.password()) && 
  this.hasNumber(this.password())
  );

  signup(event: Event) {
  event.preventDefault();
  this.auth.signup(this.username(),this.email(), this.password()).then((success) => {
    if (success) {
      alert('Account created successfully!');
      this.router.navigate(['/login']);
    } else {
      alert('Signup failed. Try again.');
    }
  });
}
 hasUppercase(p: string): boolean {
  return /[A-Z]/.test(p);
}

hasLowercase(p: string): boolean {
  return /[a-z]/.test(p);
}

hasNumber(p: string): boolean {
  return /[0-9]/.test(p);
}

hasSymbol(p: string): boolean {
  return /[!@#$%^&*(),.?":{}|<>]/.test(p);
}
// error(){
//   return "having an error";
// }
}
