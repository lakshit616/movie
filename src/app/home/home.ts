import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MovieService } from '../services/movie';  // ✅ Correct import
import { Header } from '../header/header';
import { favourites } from '../services/favourites'; // ✅ Correct import
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
 
  constructor(public movieService: MovieService, private omdb:Omdb,private fav:favourites) {
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
get isFav() {
    const movie = this.selectedMovie();
    return movie && this.fav.favourite_list().includes(movie.Title);
  }

  favourite(event: Event) {
    event.stopPropagation();
    const movieTitle = this.selectedMovie()?.Title;
    if (!movieTitle) return;

    if (this.isFav) {
      this.fav.favRemove(movieTitle);
    } else {
      this.fav.favAdd(movieTitle);
    }
  }
}
