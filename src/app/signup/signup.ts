import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class Signup {
  email = signal('');
  password = signal('');

  isFormValid = computed(() =>
    this.email().includes('@') && this.password().length >= 6
  );

  signup() {
    const user = {
      email: this.email(),
      password: this.password()
    };
    localStorage.setItem('user', JSON.stringify(user));
    alert('Account created successfully!');
  }
}
