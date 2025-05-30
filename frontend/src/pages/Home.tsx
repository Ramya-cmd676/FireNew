import { motion } from 'framer-motion';
import { useUser } from '../contexts/UserContext';
import NextButton from '../components/NextButton';
import PageTransition from '../components/PageTransition';
import FireRainBackground from '../components/animations/FireRainBackground';

const Home = () => {
  const { username } = useUser();

  return (
    <PageTransition>
      <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-white p-6">
        <FireRainBackground />
        
        <motion.div 
          className="relative z-10 max-w-xl text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            animate={{ 
              textShadow: [
                "0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #ff4500", 
                "0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #ff7900",
                "0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #ff4500"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Welcome, {username}
          </motion.h1>
          
          <motion.div 
            className="text-lg md:text-xl mb-8 p-6 bg-black/30 backdrop-blur-sm rounded-lg border border-orange-500/30 shadow-[0_0_20px_rgba(255,69,0,0.2)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <p className="mb-4">
              "The world as you know it is ending. The flames of time consume everything in their path."
            </p>
            <p>
              "Your journey begins now, as we seek a way through the burning reality to restore what was lost."
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="mt-8"
          >
            <NextButton to="/dark-den" />
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Home;