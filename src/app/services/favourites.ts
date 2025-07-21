import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './AuthService';

@Injectable({ providedIn: 'root' })
export class favourites {
  private apiUrl = 'https://localhost:7194/api/favouriteList';
  favourite_list = signal<string[]>([]); // local state

  constructor(private http: HttpClient, private auth: AuthService) {}

  favAdd(title: string, poster: string,movieId:string) {
    // const userId = this.auth.getUserId(); 
    // console.log(userId)// extract from JWT
    const movie = {
     
    movieId:movieId,                    
    movieTitle: title,             
    posterUrl: poster //  if you store OMDB ID or DB movie ID
    };
console.log('Sending to backend:', movie);
    this.http.post(`${this.apiUrl}/add`, movie).subscribe({
      next: () => this.favourite_list.update(fav =>
        fav.includes(title) ? fav : [...fav, title]
      ),
      error: (err) => console.error('Add failed:', err)
    });
  }

  favRemove(title: string,MovieId:string) {
    
    this.http.delete(`https://localhost:7194/api/FavouriteList/movieId?dto=${MovieId}`, {
    // body: id  //  DELETE with body
  }).subscribe({
  next:() => this.favourite_list.update(fav =>
      fav.filter(item => item !== title)
    )
    })
    
    
  }

   fetchFavourites() {
     this.http.get<any[]>(`${this.apiUrl}`).subscribe({
      next: (res) => {
        
        const titles = res.map(movie => movie.movieTitle);
        
        this.favourite_list.set(titles);
      },
      error: (err) => console.error('Fetch failed:', err)
    });
  }
}
