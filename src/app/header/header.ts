import { Component, signal,HostListener } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Omdb } from '../services/omdb'; // Make sure the service is in this path
import { AuthService } from '../services/AuthService';
// import { favourites } from '../services/favourites';
@Component({
selector: 'app-header',
standalone: true,
imports: [RouterLink, CommonModule],
templateUrl: './header.html',
styleUrl: './header.css',
})
export class Header {
isLoggedIn = signal(false);
searchQuery = signal('');
searchResults = signal<any[]>([]);
selectedMovie = signal<any | null>(null);

constructor(private router: Router, private omdb: Omdb,public auth:AuthService/*,private fav : favourites*/) {
const flag = localStorage.getItem('this.auth.getToken');
console.log('yeh',flag);
this.isLoggedIn.set(flag === 'true');
}

checkHome(event: Event) {
if (this.router.url === '/home') {
this.scrollToSection('main-section');
} else {
this.router.navigate(['/']);
}
}

scrollToSection(sectionId: string) {
const element = document.getElementById(sectionId);
if (element) {
element.scrollIntoView({ behavior: 'smooth' });
}
}

// logout() {
// this.isLoggedIn.set(false);
// localStorage.removeItem('loginToHome');
// }

  logout() {
    this.auth.logout();
    // this.fav.favourite_list.set([]);
    this.router.navigate(['/']);
  }

onSearchInput(event: Event) {
const query = (event.target as HTMLInputElement).value;
this.searchQuery.set(query);

if (query.length >= 3) {
      this.omdb.searchMovies(query).subscribe({
        next: (res) => {
          if (res.Response === 'True') {
            this.searchResults.set(res.Search || []);
          } else {
            console.warn('No results found:', res.Error);
            this.searchResults.set([]);
          }
        },
        error: (err) => {
          console.error('Search error:', err);
          this.searchResults.set([]);
        },
      });
    } else {
      this.searchResults.set([]);
    }
  }
  selectMovie(id: string) {
    this.omdb.searchMovies_list(id).subscribe({
      next: (movie) => {
        this.selectedMovie.set(movie);
        this.searchResults.set([]); // clear dropdown
      },
      error: (err) => console.error('Movie details fetch error:', err)
    });
  }



  clearSelection() {
    this.selectedMovie.set(null);
  }



@HostListener('document:click', ['$event'])
  handleOutsideClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const isClickInsideSearch = target.closest('.search');

    if (!isClickInsideSearch) {
      this.searchResults.set([]);     //  dropdown clear
      this.selectedMovie.set(null);   
    }
  }
  reload_page(){
    window.location.reload();
  }
}