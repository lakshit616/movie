import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
// import { MovieService } from '../services/movie';  
import { TopRatedMovies } from '../services/top_rated';
import { Header } from '../header/header';
import { Omdb } from '../services/omdb';
@Component({
  selector: 'app-top-rated',
  standalone: true,
  imports: [CommonModule,Header],
  templateUrl: './top-rated.html',
  styleUrl: './top-rated.css'
})
export class TopRated {
selectedMovie = signal<any | null>(null);

  constructor(public toprated : TopRatedMovies, private omdb : Omdb) {
    this.toprated.fetchMovies_2(); //  fetch from API on load
  }

  //  Access movies as a getter to avoid initialization error
  get movies() {
    return this.toprated.movies_2();
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
