import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TopRatedMovies {
  // private apiUrl = 'https://moviesapi.runasp.net/api/Movies/GetAllAsync';
  private apiUrl='https://localhost:7194/api/top_rated';
  // private apiUrl_2 = 'https://api.themoviedb.org/3/movie/top_rated?api_key=fccf03755b868c15ab076ba04025bc3e&language=en-US&page=1';
  private apiUrl_2='https://localhost:7194/api/top_rated';
  movies = signal<any[]>([]);
  movies_2 = signal<any[]>([]);

  constructor(private http: HttpClient) {}

  fetchMovies() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (res) => this.movies.set(res),
      error: (err) => console.error('API error:', err)
    });
  }

  fetchMovies_2() {
    this.http.get<any>(this.apiUrl_2).subscribe({
      next: (res) => this.movies_2.set(res),
      error: (err) => console.error('TMDB API error:', err)
    });
  }
}
