export interface Movie {
  title: string;
  poster: string;
  description: string;
  rating: number;
  genre: string;
}

export const movies: Movie[] = [
  {
    title: 'Inception',
    poster: '/inception.jpg',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology...',
    rating: 8.8,
    genre: 'Sci-Fi'
  },
  {
    title: 'The Dark Knight',
    poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    description: 'Batman faces the Joker, a criminal mastermind...',
    rating: 9.0,
    genre: 'Action'
  },
  {
    title: 'Interstellar',
    poster: 'https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg',
    description: 'A team of explorers travel through a wormhole...',
    rating: 8.6,
    genre: 'Adventure'
  }
];
