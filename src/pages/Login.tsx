// src/pages/Login.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem('username', username);
    navigate('/');
  };

  const continueAsGuest = () => {
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-red-500 mb-6">Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 mb-4 bg-gray-900 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-red-500"
        />
        <button
          onClick={handleLogin}
          className="w-full py-2 mb-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition duration-300"
        >
          Login
        </button>
        <button
          onClick={continueAsGuest}
          className="w-full py-2 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg transition duration-300"
        >
          Continue as Guest
        </button>
      </div>
    </div>
  );
};

export default Login;
