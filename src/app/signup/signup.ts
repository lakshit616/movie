import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  Router, RouterLink } from '@angular/router';
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
constructor(private router: Router) {}
  isFormValid = computed(() =>
    this.email().includes('@') && 
  this.password().length >= 6 && 
  this.hasLowercase(this.password()) && 
  this.hasUppercase(this.password()) && 
  this.hasSymbol(this.password()) && 
  this.hasNumber(this.password())
  );

  signup(event:Event) {
    
    // event.preventDefault();
    const user = {
      email: this.email(),
      password: this.password()
    };
    localStorage.setItem('user', JSON.stringify(user));
    alert('Account created successfully!');
    this.router.navigate(['/login']);
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

}
