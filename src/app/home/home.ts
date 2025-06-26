import { Component,signal} from '@angular/core';
import { Header } from '../header/header';
import { Contact } from '../contact/contact';
import { movies, Movie } from './movie-data';
@Component({
  selector: 'app-home',
  imports: [Header,Contact],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home  {
movies = signal<Movie[]>(movies);
selectedMovie = signal<Movie | null>(null);

selectMovie(movie: Movie) {
    this.selectedMovie.set(movie);
  }

  clearSelection() {
    this.selectedMovie.set(null);
  }
}
