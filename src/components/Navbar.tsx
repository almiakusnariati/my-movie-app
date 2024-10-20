import { Link, useNavigate } from 'react-router-dom';
import { FaHeart, FaUser, FaSignOutAlt } from 'react-icons/fa'; // Import additional icons
import { useState } from 'react';

interface NavbarProps {
  onSearch: (term: string) => void;
}

const Navbar = ({ onSearch }: NavbarProps) => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/login');
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value); // Trigger search
  };

  return (
    <nav className="bg-gray-800 text-white px-4 py-2">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Movie App</Link>
        
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={handleSearch}
          className="px-4 py-1 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        
        <div className="space-x-4 flex items-center">
          <Link to="/favorites" className="hover:text-gray-400 flex items-center">
            <FaHeart className="mr-1" /> 
          </Link>

          {username ? (
            <>
              {/* Profile Icon and Username */}
              <Link to="/profile" className="hover:text-gray-400 flex items-center">
                <FaUser className="mr-1" /> 
              </Link>

              {/* Logout Icon */}
              <button onClick={handleLogout} className="hover:text-red-400 flex items-center">
                <FaSignOutAlt className="mr-1" /> 
              </button>
            </>
          ) : (
            <Link to="/login" className="hover:text-gray-400 flex items-center">
              <FaUser className="mr-1" /> 
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
