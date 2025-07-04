// favourites-list.ts
import { Component, computed, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { favourites } from '../services/favourites';
import { Omdb } from '../services/omdb';
import { Header } from '../header/header';
@Component({
  selector: 'app-favourites-list',
  standalone: true,
  imports: [CommonModule,Header],
  templateUrl: './favourites-list.html',
  styleUrl: './favourites-list.css'
})
export class FavouritesList {
  movies = signal<any[]>([]); // yeh store karega fetched movie objects
  selectedMovie=signal<any|null>(null);
  constructor(private fav: favourites, private omdb: Omdb) {
    // 🧠 Effect jab bhi fav list change ho
    effect(() => {
      const titles = this.fav.favourite_list();

      // Clear previous movie list
      this.movies.set([]);

      // Har title ke liye OMDB API se data lo
      titles.forEach((title) => {
        this.omdb.searchMovies_desc(title).subscribe({
          next: (res) => {
            // Add this movie object to `movies` signal
            this.movies.update((prev) => [...prev, res]);
          },
          error: () => {
            console.error('Failed to fetch:', title);
          }
        });
      });
    });
  }
  selectMovie(movie:string){
    
      this.omdb.searchMovies_desc(movie).subscribe({
     next:(res)=>this.selectedMovie.set(res),
     error:(err)=>console.log("error")
    })
    }
    clearSelection(){
      this.selectedMovie.set(null);
    }
  }

