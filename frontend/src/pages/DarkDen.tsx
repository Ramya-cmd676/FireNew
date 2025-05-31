// DarkDen.tsx
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import NextButton from '../components/NextButton';
import PageTransition from '../components/PageTransition';
import FuturisticBackground from '../components/animations/FuturisticBackground';

const DarkDen = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <PageTransition>
      <div className="relative min-h-screen flex flex-col items-center justify-center text-white p-6 overflow-hidden">
        <FuturisticBackground />
        
        {/* Animated wires/circuits overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-1/3">
            <motion.div 
              className="absolute top-20 left-10 h-[2px] bg-blue-400"
              initial={{ width: 0 }}
              animate={{ width: "30%" }}
              transition={{ duration: 2, delay: 1 }}
            />
            <motion.div 
              className="absolute top-40 right-10 h-[2px] bg-cyan-400"
              initial={{ width: 0 }}
              animate={{ width: "20%" }}
              transition={{ duration: 2, delay: 1.5 }}
            />
          </div>
          <div className="absolute bottom-0 right-0 w-full h-1/3">
            <motion.div 
              className="absolute bottom-20 right-10 h-[2px] bg-blue-400"
              initial={{ width: 0 }}
              animate={{ width: "35%" }}
              transition={{ duration: 2, delay: 1 }}
            />
            <motion.div 
              className="absolute bottom-40 left-10 h-[2px] bg-cyan-400"
              initial={{ width: 0 }}
              animate={{ width: "25%" }}
              transition={{ duration: 2, delay: 1.5 }}
            />
          </div>
        </div>
        
        {/* Hologram effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 0.2 : 0 }}
          className="absolute inset-0 bg-[url('https://images.pexels.com/photos/7422160/pexels-photo-7422160.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-center opacity-20 mix-blend-overlay"
        ></motion.div>
        
        <motion.div 
          className="relative z-10 max-w-2xl text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 30 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6 text-blue-300"
            animate={{ textShadow: ["0 0 10px #60a5fa", "0 0 20px #60a5fa", "0 0 10px #60a5fa"] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            The Vault of Clocks
          </motion.h1>
          
          <motion.div 
            className="text-lg md:text-xl mb-8 p-8 backdrop-blur-md bg-black/40 rounded-lg border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.2)] text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
          
            

            <p className="mb-4">
              <strong>They fled</strong> to the only place untouched by fire—<em>an old, shut-down observatory on the hill</em>.
            </p>
            <p className="mb-4">
              In its basement, hidden behind rotted wooden panels, they discovered a steel door with an emblem: <strong>an hourglass, shattered down the middle</strong>.
            </p>
            <p className="mb-4">
              Inside: <strong>blueprints</strong>.
            </p>
            <p className="mb-4">
              <em>“Project Ignis,”</em> Wren read aloud. <em>“Time-integrated atmospheric control?”</em>
            </p>
            <p className="mb-4">
              Blake traced a note in the margin.
              <br />
              <strong><em>“Two-phase correction system. ‘Trace the Flame. Harvest the Answer.’”</em></strong>
            </p>
            <p className="mb-4">
              They looked at each other.
              <br />
              <em>“We’ve glitched,”</em> Wren said. <em>“Something fractured the timeline. This isn’t just a natural disaster—it’s a response.”</em>
            </p>
            <p>
              Blake clenched a fist.
              <br />
              <strong><em>“If time broke… then we need to fix it from both ends.”</em></strong>
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-8"
          >
            <NextButton to="/time-machine" />
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default DarkDen;
