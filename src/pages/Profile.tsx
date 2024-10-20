import { useEffect, useState } from 'react';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

const Profile = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const removeFromFavorites = (movieId: number) => {
    const updatedFavorites = favorites.filter(movie => movie.id !== movieId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Favorite Movies</h1>
        {favorites.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {favorites.map((movie) => (
              <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg flex flex-col">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-auto object-cover"
                  style={{ height: '300px' }} // Uniform height for images
                />
                <div className="p-2 flex flex-col items-center">
                  <p className="text-center font-semibold text-sm truncate">{movie.title}</p>
                  <button
                    onClick={() => removeFromFavorites(movie.id)}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 mt-2 rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg">You don't have any favorite movies yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
