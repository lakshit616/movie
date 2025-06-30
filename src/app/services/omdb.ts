import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Omdb {
  private apiKey = 'c0eb75d3';  // ✅ Your OMDB API key
  private apiUrl = 'https://www.omdbapi.com/';

//   searchResults = signal<any[]>([]);

  constructor(private http: HttpClient) {}

//   searchMovies(title: string) {
//     const url = `${this.apiUrl}?apikey=${this.apiKey}&s=${encodeURIComponent(title)}`;
//     this.http.get<any>(url).subscribe({
//       next: (res) => {
//         if (res.Response === 'True') {
//           this.searchResults.set(res.Search);
//         } else {
//           this.searchResults.set([]);  // Clear if no results
//           console.error('No results:', res.Error);
//         }
//       },
//       error: (err) => console.error('OMDB API error:', err)
//     });
//   }
searchMovies(title: string): Observable<any> {
    const url = `${this.apiUrl}?apikey=${this.apiKey}&s=${encodeURIComponent(title)}`;
    return this.http.get<any>(url); // ✅ just return Observable, no subscribe here
  }
  searchMovies_list(title: string): Observable<any> { //imdb id se
    const url = `${this.apiUrl}?apikey=${this.apiKey}&i=${encodeURIComponent(title)}`;
    return this.http.get<any>(url); // ✅ just return Observable, no subscribe here
  }
   searchMovies_desc(title: string): Observable<any> { //imdb id se
    const url = `${this.apiUrl}?apikey=${this.apiKey}&t=${encodeURIComponent(title)}`;
    return this.http.get<any>(url); // ✅ just return Observable, no subscribe here
  }
}
