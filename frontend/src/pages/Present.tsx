import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import PageTransition from '../components/PageTransition';

const Present = () => {
  const { username } = useUser();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <PageTransition transition="flash">
      <div className="relative min-h-screen flex flex-col items-center justify-center text-white p-6 overflow-hidden">
        {/* PRESENT flash */}
        <motion.div
          className="fixed inset-0 bg-white z-30 flex items-center justify-center text-black font-bold text-6xl"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          PRESENT
        </motion.div>
        
        {/* Nature background */}
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center">
          <div className="absolute inset-0 bg-blue-900/20"></div>
        </div>
        
        {/* Calm particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.1,
              }}
              animate={{
                y: [-20, 20],
                x: [-10, 10],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
        
        <motion.div 
          className="relative z-10 max-w-2xl text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 1 : 0 }}
          transition={{ duration: 1.5, delay: 1.5 }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
            animate={{ textShadow: ["0 0 5px rgba(255,255,255,0.5)", "0 0 15px rgba(255,255,255,0.8)", "0 0 5px rgba(255,255,255,0.5)"] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            Balance Restored
          </motion.h1>
          
          <motion.div 
            className="text-lg md:text-xl mb-8 p-8 backdrop-blur-md bg-black/20 rounded-lg border border-white/20 shadow-lg"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            <p className="mb-4">
              Congratulations, {username}. You've successfully navigated through the disrupted timelines 
              and restored the natural flow of time.
            </p>
            <p>
              The chaos has subsided, and both past and future exist in harmony once more. 
              Your journey through time has left you with wisdom few will ever possess.
            </p>
          </motion.div>
          
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 0.8 }}
          >
            <p className="text-lg text-blue-100">Thank you for experiencing the Time Voyager Event</p>
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Present;