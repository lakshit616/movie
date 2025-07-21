import { Component, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { favourites } from '../services/favourites';
import { Omdb } from '../services/omdb';
import { Header } from '../header/header';
import { AuthService } from '../services/AuthService';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-favourites-list',
  standalone: true,
  imports: [CommonModule, Header],
  templateUrl: './favourites-list.html',
  styleUrl: './favourites-list.css'
})
export class FavouritesList {
  movies = signal<any[]>([]);
  selectedMovie = signal<any | null>(null);
constructor(private fav: favourites, private omdb: Omdb, public auth: AuthService) {
  effect(() => {
    const titles = this.fav.favourite_list();  // Reactive signal

    this.movies.set([]); // Clear old

    for (const title of titles) {
  firstValueFrom(this.omdb.searchMovies_desc(title)).then(movie => {
    const currentMovies = this.movies(); // Get current state of signal

    const alreadyExists = currentMovies.some(m => m.imdbID === movie.imdbID);

    if (!alreadyExists) {
      this.movies.update(prev => [...prev, movie]);
    }
  }).catch(() => {
    console.error('Movie fetch failed for:', title);
  });
}

  });

  this.fav.fetchFavourites(); // initial API trigger
}

//   constructor(private fav: favourites,private omdb: Omdb,public auth: AuthService
//   ) {
//     this.fav.fetchFavourites();
//     this.loadFavourites();
    
//     // Trigger effect when favourite list updates
//     // effect(() => {
//     //   (async () => {
//     //     await this.fav.fetchFavourites(); // Wait for HTTP to finish
//     //     const titles = this.fav.favourite_list(); // Get local updated state

//     //     this.movies.set([]); // Clear old list

//     //     for (const title of titles) {
//     //       try {
//     //         const movie = await firstValueFrom(this.omdb.searchMovies_desc(title));
//     //         this.movies.update(prev => [...prev, movie]);
//     //       } catch {
//     //         console.error('Failed to fetch movie:', title);
//     //       }
//     //     }
//     //   })();
//     // });
//   }
//  async loadFavourites() {
//     // await this.fav.fetchFavourites(); // wait for API to finish
//     const titles = this.fav.favourite_list();

//     this.movies.set([]); // Clear previous list before refilling

//     for (const title of titles) {
//       try {
//         const movie = await firstValueFrom(this.omdb.searchMovies_desc(title));
//         this.movies.update(prev => [...prev, movie]);

//       } catch (err) {
//         console.error('Failed to fetch movie:', title);
//       }
//     }
//   }
  selectMovie(movie: string) {
    this.omdb.searchMovies_desc(movie).subscribe({
      next: (res) => this.selectedMovie.set(res),
      error: () => console.error('Error fetching movie details')
    });
  }

  clearSelection() {
    this.selectedMovie.set(null);
  }
}
