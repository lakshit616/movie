import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MovieService } from '../services/movie';  // ✅ Correct import
import { Header } from '../header/header';

import { Omdb } from '../services/omdb';
import { subscribeOn } from 'rxjs';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Header],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  selectedMovie = signal<any | null>(null);

  constructor(public movieService: MovieService, private omdb:Omdb) {
    this.movieService.fetchMovies(); // ✅ fetch from API on load
  }

  // ✅ Access movies as a getter to avoid initialization error
  get movies() {
    return this.movieService.movies();
  }

  selectMovie(movie: string) {
    // this.selectedMovie.set(movie);
    console.log(movie);
    this.omdb.searchMovies_desc(movie).subscribe({
     next:(res)=>this.selectedMovie.set(res),
     error:(err)=>console.log("error")
    })
  }

  clearSelection() {
    this.selectedMovie.set(null);
  }
}
