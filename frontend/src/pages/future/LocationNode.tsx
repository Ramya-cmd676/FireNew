import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../../components/PageTransition';

const LocationNode = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState(1);
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const correctAnswer = 'eternity'; // Example answer
  
  const handleContinue = () => {
    setStage(2);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (answer.toLowerCase().trim() === correctAnswer) {
      setStage(3);
    } else {
      setError('Access denied. Invalid passphrase.');
      setTimeout(() => setError(''), 2000);
    }
  };
  
  return (
    <PageTransition>
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Dark background with red accents */}
        <div className="absolute inset-0 bg-gray-950">
          <div className="absolute inset-0 bg-gradient-to-b from-red-950/20 to-gray-950"></div>
        </div>
        
        {/* Rotating ruby */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            className="w-80 h-80 rounded-full bg-gradient-to-br from-red-700 to-red-900 opacity-20 blur-xl"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          ></motion.div>
          <motion.div
            className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-red-600 to-red-800 opacity-20 blur-lg"
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          ></motion.div>
          <motion.div
            className="absolute w-40 h-40 rounded-full bg-gradient-to-br from-red-500 to-red-700 opacity-30 blur-md"
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          ></motion.div>
        </div>
        
        {stage === 1 && (
          <motion.div 
            className="relative z-10 max-w-md text-center p-8 bg-black/50 backdrop-blur-md rounded-lg border border-red-500/30 shadow-[0_0_30px_rgba(220,38,38,0.2)]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-3xl font-bold mb-6 text-red-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              style={{ textShadow: "0 0 10px rgba(220,38,38,0.5)" }}
            >
              Secure Location
            </motion.h2>
            
            <motion.p 
              className="text-lg text-red-100 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              You've discovered a hidden temporal node. This secure facility contains critical information needed to repair the timeline.
            </motion.p>
            
            <motion.button
              className="px-6 py-3 bg-red-900/80 hover:bg-red-800/80 text-red-100 rounded-lg shadow-[0_0_15px_rgba(220,38,38,0.3)] transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(220,38,38,0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleContinue}
            >
              Access Secure Node
            </motion.button>
          </motion.div>
        )}
        
        {stage === 2 && (
          <motion.div 
            className="relative z-10 max-w-md text-center p-8 bg-black/50 backdrop-blur-md rounded-lg border border-red-500/30 shadow-[0_0_30px_rgba(220,38,38,0.2)]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-3xl font-bold mb-6 text-red-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              style={{ textShadow: "0 0 10px rgba(220,38,38,0.5)" }}
            >
              Security Verification
            </motion.h2>
            
            <motion.p 
              className="text-lg text-red-100 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              Enter the temporal encryption key to proceed.
            </motion.p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="answer" className="block text-red-300 text-sm font-medium mb-2">
                  Passphrase:
                </label>
                <input
                  type="text"
                  id="answer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full p-3 bg-gray-800/90 border border-red-800/50 rounded-lg text-red-100 placeholder-red-400/50 focus:outline-none focus:border-red-500"
                  placeholder="Enter passphrase..."
                />
                {error && (
                  <motion.p 
                    className="mt-2 text-red-500 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {error}
                  </motion.p>
                )}
                <p className="mt-2 text-xs text-red-400/70">
                  Hint: What remains when time itself has ended?
                </p>
              </div>
              
              <div className="flex justify-center">
                <motion.button
                  type="submit"
                  className="px-6 py-3 bg-red-900/80 hover:bg-red-800 text-red-100 rounded-lg shadow-lg transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Verify Access
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
        
        {stage === 3 && (
          <motion.div 
            className="relative z-10 max-w-md text-center p-8 bg-black/50 backdrop-blur-md rounded-lg border border-red-500/30 shadow-[0_0_30px_rgba(220,38,38,0.2)]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-3xl font-bold mb-6 text-green-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              style={{ textShadow: "0 0 10px rgba(74,222,128,0.5)" }}
            >
              Access Granted
            </motion.h2>
            
            <motion.div
              className="mb-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="inline-block w-2 h-2 bg-green-500 rounded-full mx-1"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </motion.div>
            
            <motion.p 
              className="text-lg text-green-100 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              Temporal data downloaded. Return to the main interface to continue your mission.
            </motion.p>
            
            <motion.button
              className="px-6 py-3 bg-green-800 hover:bg-green-700 text-green-100 rounded-lg shadow-[0_0_15px_rgba(74,222,128,0.3)] transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(74,222,128,0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/journey/future')}
            >
              Return to Interface
            </motion.button>
          </motion.div>
        )}
      </div>
    </PageTransition>
  );
};

export default LocationNode;