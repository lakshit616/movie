import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'https://localhost:7194/api/Movie';
  private apiUrl_2 = 'https://api.themoviedb.org/3/movie/top_rated?api_key=fccf03755b868c15ab076ba04025bc3e&language=en-US&page=1';

  movies = signal<any[]>([]);
  movies_2 = signal<any[]>([]);
  movieCount=signal(0);
  currentPage=signal(1);
  totalPages=signal(0);
  constructor(private http: HttpClient) {}
 

  fetchMovies(page: number) {
    this.http.get<any>(`${this.apiUrl}?pageNumber=${page}`)
      .subscribe(res => {
        this.movies.set(res.movies);
        this.totalPages.set(res.totalPage);
        this.currentPage.set(page);
        console.log(this.totalPages());
      });
  }
  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.fetchMovies(this.currentPage() + 1);
    }
  }

  prevPage() {
    if (this.currentPage()> 1) {
      this.fetchMovies(this.currentPage() - 1);
    }
  }

 
  fetchMovies_2() {
    this.http.get<any>(this.apiUrl_2).subscribe({
      next: (res) => this.movies_2.set(res.results),
      error: (err) => console.error('TMDB API error:', err)
    });
  }
}
