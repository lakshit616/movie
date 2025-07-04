import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class favourites {
  favourite_list = signal<string[]>([]);

  favAdd(movie: string) {
    this.favourite_list.update(fav =>
      fav.includes(movie) ? fav : [...fav, movie]
    );
  }

  favRemove(movie: string) {
    this.favourite_list.update(fav =>
      fav.filter(item => item !== movie)
    );
  }
}
