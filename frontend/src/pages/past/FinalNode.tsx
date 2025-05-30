import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../../components/PageTransition';

const FinalNode = () => {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const correctAnswer = 'vision'; // Example answer
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
      setError('That is not the correct answer. Try again.');
      setTimeout(() => setError(''), 2000);
    }
  };
  
  return (
    <PageTransition transition="fade">
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Ancient temple background */}
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/6636906/pexels-photo-6636906.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center">
          <div className="absolute inset-0 bg-amber-950/70"></div>
        </div>
        
        <motion.div 
          className="relative z-10 w-full max-w-lg p-8 bg-amber-900/80 backdrop-blur-md rounded-lg border border-amber-600 shadow-[0_0_30px_rgba(245,158,11,0.3)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-3xl font-serif font-bold mb-6 text-amber-200 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            The Final Gate
          </motion.h2>
          
          <motion.p 
            className="text-amber-100 mb-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            What was the final solution?
          </motion.p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              
              <input
                type="text"
                id="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full p-3 bg-amber-800/70 border border-amber-600 rounded-lg text-amber-100 placeholder-amber-400/70 focus:outline-none focus:border-amber-400"
                placeholder="Speak the name..."
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
                className="px-6 py-3 bg-amber-700 hover:bg-amber-600 text-amber-100 rounded-lg shadow-md transition-colors duration-300 font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Open the Gateway
              </motion.button>
            </div>
          </form>
          
          <motion.div 
            className="mt-6 text-center text-amber-400/80 text-sm italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            Hint: The last answer you solved before chronicle portal opened in future
          </motion.div>
        </motion.div>
        
        {/* Animated ancient symbols */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-amber-500/30 text-4xl font-serif"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              initial={{ opacity: 0, rotate: Math.random() * 360 }}
              animate={{ 
                opacity: [0, 0.7, 0],
                y: [0, -50],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear"
              }}
            >
              {['Ω', '∞', '⌛', '⏳', '♅', '☽', '☼', '♆'][Math.floor(Math.random() * 8)]}
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default FinalNode;