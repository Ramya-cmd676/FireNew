import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../../components/PageTransition';

const FutureFinalNode = () => {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const correctAnswer = 'infinity'; // Example answer
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (answer.toLowerCase().trim() === correctAnswer) {
      // Flash transition
      const flash = document.createElement('div');
      flash.style.position = 'fixed';
      flash.style.inset = '0';
      flash.style.backgroundColor = 'white';
      flash.style.zIndex = '9999';
      flash.style.opacity = '0';
      flash.style.transition = 'opacity 2s';
      document.body.appendChild(flash);
      
      // Trigger flash animation
      setTimeout(() => {
        flash.style.opacity = '1';
        setTimeout(() => {
          navigate('/present');
          setTimeout(() => {
            document.body.removeChild(flash);
          }, 500);
        }, 1000);
      }, 100);
    } else {
      setError('Access denied. Invalid sequence.');
      setTimeout(() => setError(''), 2000);
    }
  };
  
  return (
    <PageTransition transition="fade">
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Futuristic cosmic background */}
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center">
          <div className="absolute inset-0 bg-blue-950/70 backdrop-blur-sm"></div>
        </div>
        
        {/* Particle effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.3,
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: Math.random() * 5 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        <motion.div 
          className="relative z-10 w-full max-w-lg p-8 bg-blue-950/50 backdrop-blur-md rounded-lg border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.3)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="absolute -top-1 -bottom-1 -left-1 -right-1 border border-blue-400/40 rounded-lg pointer-events-none"
            animate={{
              boxShadow: [
                "0 0 5px rgba(59,130,246,0.3)",
                "0 0 15px rgba(59,130,246,0.5)",
                "0 0 5px rgba(59,130,246,0.3)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          
          <motion.h2 
            className="text-3xl font-bold mb-6 text-blue-300 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{ textShadow: "0 0 10px rgba(59,130,246,0.5)" }}
          >
            Chronos Portal
          </motion.h2>
          
          <motion.p 
            className="text-blue-100 mb-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            You stand before the quantum gateway that will reset the timestream.
            To activate it, enter the universal constant that binds all timelines.
          </motion.p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="answer" className="block text-blue-300 text-sm font-medium mb-2">
                Enter the constant:
              </label>
              <input
                type="text"
                id="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full p-3 bg-blue-900/50 border border-blue-700/70 rounded-lg text-blue-100 placeholder-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                placeholder="Enter the constant..."
              />
              {error && (
                <motion.p 
                  className="mt-2 text-red-400 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {error}
                </motion.p>
              )}
            </div>
            
            <div className="flex justify-center">
              <motion.button
                type="submit"
                className="px-6 py-3 bg-blue-700/80 hover:bg-blue-600/80 text-blue-100 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-colors duration-300 font-medium"
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(59,130,246,0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                Activate Portal
              </motion.button>
            </div>
          </form>
          
          <motion.div 
            className="mt-6 text-center text-blue-400/80 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            Hint: What mathematical symbol represents endless time?
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default FutureFinalNode;