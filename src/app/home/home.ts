import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MovieService } from '../services/movieService';  
import { Header } from '../header/header';
import { favourites } from '../services/favourites'; 
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
  currentPage=1;
  movieCount=signal(0);
  pageSize=signal('5');

  constructor(public movieService: MovieService, private omdb:Omdb,private fav:favourites) {
    this.movieService.fetchMovies(this.movieService.currentPage()) //  fetch from API on load
  }

  //  Access movies as a getter to avoid initialization error
  get movies() {
    return this.movieService.movies();
  }
  nextPage(event:Event){
  //  this.currentPage=this.movieService.currentPage();
    this.movieService.nextPage();
  }
prevPage(event:Event){
  this.movieService.prevPage()
  // this.currentPage=this.movieService.currentPage();
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
    return  this.fav.favourite_list().includes(movie.Title);
  }

  favourite(event: Event) {
    event.stopPropagation();
    const movieTitle = this.selectedMovie()?.Title;
    if (!movieTitle) return;

    if (this.isFav) {
      this.fav.favRemove(movieTitle,this.selectedMovie().imdbRating);
    } else {
      this.fav.favAdd(movieTitle,this.selectedMovie().Poster,this.selectedMovie().imdbRating);
    }
  }
   
}
