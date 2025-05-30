import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '../contexts/UserContext';
import StarryBackground from '../components/animations/StarryBackground';

const Login = () => {
  const [username, setUsername] = useState('');
const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const { login } = useUser();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!username.trim()) {
    setError('Please enter a username');
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }), // if you're adding password too
    });

    if (response.ok) {
      // Store in localStorage
      localStorage.setItem('username', username);

      login(username); // context login if still used
      navigate('/home');
    } else if (response.status === 401) {
      setError('Invalid credentials');
    } else {
      setError('Something went wrong. Try again.');
    }
  } catch (err) {
    console.error(err);
    setError('Server error. Please try later.');
  }
};



  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden font-[Cinzel]">
      <StarryBackground />
      
      {/* Floating glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-purple-500 opacity-20 blur-3xl"></div>
      <div className="absolute bottom-1/3 right-1/3 w-40 h-40 rounded-full bg-blue-500 opacity-20 blur-3xl"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-black/30 backdrop-blur-md rounded-2xl p-10 shadow-[0_0_30px_rgba(139,92,246,0.3)] border border-purple-500/30">
          <div className="text-center mb-8">
            <motion.h1 
              className="text-4xl font-bold text-white mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                Time Voyager
              </span>
            </motion.h1>
            <motion.p 
              className="text-purple-200 italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Journey through the cosmos of time
            </motion.p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="username" className="block mb-2 text-sm font-medium text-purple-200">
                Enter Your Identity
              </label>
              <motion.input
                whileFocus={{ boxShadow: '0 0 15px rgba(139,92,246,0.5)' }}
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-purple-500/50 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500 transition-all duration-300"
                placeholder="e.g. Traveler01, Explorer02"
              />
              {error && <p className="mt-1 text-red-400 text-sm">{error}</p>}
              <p className="mt-1 text-xs text-purple-300 opacity-70">
                Hint: Use "01" or "02" suffix for different time paths
              </p>
            </div>
            <div className="mb-6">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-purple-200">
      Password
    </label>
    <motion.input
      whileFocus={{ boxShadow: '0 0 15px rgba(139,92,246,0.5)' }}
      type="password"
      id="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full px-4 py-3 rounded-lg bg-black/50 border border-purple-500/50 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500 transition-all duration-300"
      placeholder="••••••••"
    />
  </div>
            
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_20px_rgba(139,92,246,0.6)] transition-all duration-300"
            >
              Begin Journey
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-purple-200 text-sm">
              A cosmic adventure awaits beyond this portal
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;