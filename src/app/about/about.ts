import { Component,signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../header/header';
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule,Header],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
mode = signal<'profile' | 'details'>('profile');

  current_mode(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.mode.set(checked ? 'details' : 'profile');}}
