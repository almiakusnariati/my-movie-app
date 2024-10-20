import { useEffect, useState } from 'react';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

const Favorites = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, []);

  const removeFavorite = (movieId: number) => {
    const updatedFavorites = favorites.filter((movie) => movie.id !== movieId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4 text-center">Favorite Movies</h1>
        {favorites.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {favorites.map((movie) => (
              <div
                key={movie.id}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg flex flex-col items-center"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-48 h-72 object-cover"
                />
                <div className="p-4 text-center">
                  <p className="text-lg font-semibold mb-2">{movie.title}</p>
                  <button
                    onClick={() => removeFavorite(movie.id)}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-4 rounded mt-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No favorite movies yet!</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
