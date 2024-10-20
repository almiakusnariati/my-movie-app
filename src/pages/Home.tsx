import { useEffect, useState } from 'react';
import { getNowPlayingMovies, getPopularMovies } from '../services/Api.tsx';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

const Home = () => {
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [popular, setPopular] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    fetchNowPlaying();
    fetchPopularMovies(page);
  }, [page]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, []);

  const fetchNowPlaying = async () => {
    const movies = await getNowPlayingMovies(6); // Fetch only 6 movies for now playing
    setNowPlaying(movies);
  };

  const fetchPopularMovies = async (page: number) => {
    const movies = await getPopularMovies(page, 20); // Fetch only 20 movies for popular
    setPopular((prev) => [...prev, ...movies]);
  };

  const addToFavorites = (movie: Movie) => {
    const existingFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (!existingFavorites.some((fav: Movie) => fav.id === movie.id)) {
      const updatedFavorites = [...existingFavorites, movie];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      window.alert(`${movie.title} has been added to your favorites!`); // Show success alert
    } else {
      window.alert('Movie is already in favorites!'); // Show error alert
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Now Playing</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {nowPlaying.map((movie) => (
            <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-auto object-cover"
                style={{ height: '300px' }} // Set a uniform height for images
              />
              <div className="p-2">
                <p className="text-center font-semibold text-sm truncate">{movie.title}</p> {/* Use truncate for long titles */}
              </div>
            </div>
          ))}
        </div>

        <h1 className="text-3xl font-bold my-6">Popular Movies</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {popular.map((movie) => (
            <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-auto object-cover"
                style={{ height: '300px' }} // Set a uniform height for images
              />
              <div className="p-2">
                <p className="text-center font-semibold text-sm truncate">{movie.title}</p> {/* Use truncate for long titles */}
                <button
                  onClick={() => addToFavorites(movie)}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 mt-2 rounded block mx-auto"
                >
                  Add to Favorite
                </button>
              </div>
            </div>
          ))}
        </div>

        {favorites.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mt-6">Your Favorites</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {favorites.map((movie) => (
                <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-auto object-cover"
                    style={{ height: '300px' }} // Set a uniform height for images
                  />
                  <div className="p-2">
                    <p className="text-center font-semibold text-sm truncate">{movie.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-center mt-8">
          <button
            onClick={() => setPage(page + 1)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
