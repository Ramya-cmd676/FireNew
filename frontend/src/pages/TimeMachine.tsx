import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import PageTransition from '../components/PageTransition';

const TimeMachine = () => {
  const [showFlash, setShowFlash] = useState(false);
  const [jumpText, setJumpText] = useState('');
  const { user, getTimelinePath } = useUser(); // Ensure 'user' provides the username
  const navigate = useNavigate();

  const handleJumpClick = () => {
    const username = localStorage.getItem('username') || '';


    if (username.endsWith('01')) {
      setJumpText('PAST');
    } else if (username.endsWith('02')) {
      setJumpText('FUTURE');
    } else {
      setJumpText('');
    }

    setShowFlash(true);

    // Navigate after the flash animation
    setTimeout(() => {
      navigate(getTimelinePath());
    }, 2000);
  };

  return (
    <PageTransition transition="fade">
      <div className="relative min-h-screen flex flex-col items-center justify-center text-white p-6 overflow-hidden">
        {/* Time Machine Background */}
        <div className="absolute inset-0 bg-gray-900 overflow-hidden">
          {/* Rotating gears */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div 
                key={i}
                className="absolute rounded-full border-4 border-yellow-500/30"
                style={{
                  top: `${Math.random() * 80 + 10}%`,
                  left: `${Math.random() * 80 + 10}%`,
                  width: `${Math.random() * 120 + 30}px`,
                  height: `${Math.random() * 120 + 30}px`,
                }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: Math.random() * 15 + 15,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}
          </div>

          {/* Glowing controls */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-blue-500"
              style={{
                top: `${Math.random() * 90 + 5}%`,
                left: `${Math.random() * 90 + 5}%`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
              }}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{
                duration: Math.random() * 2 + 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Grid overlay */}
          <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-30">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="border border-cyan-800/20 flex items-center justify-center">
                {i % 3 === 0 && (
                  <div className="w-3 h-3 rounded-full bg-cyan-500/30"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Circular control console */}
        <motion.div
          className="absolute bottom-12 left-0 right-0 mx-auto w-[300px] h-[150px] bg-gradient-to-t from-gray-800 to-gray-700 rounded-t-full border-t border-l border-r border-yellow-500/30 flex flex-col items-center justify-end pb-4 px-6 overflow-hidden"
          initial={{ y: 150 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <div className="w-full flex justify-between mb-3">
            {[...Array(5)].map((_, i) => (
              <motion.div 
                key={i}
                className="w-8 h-8 rounded-full bg-gray-900 border border-gray-600 flex items-center justify-center"
                animate={{
                  boxShadow: i % 2 === 0 
                    ? ['0 0 5px rgba(239, 68, 68, 0.5)', '0 0 10px rgba(239, 68, 68, 0.8)', '0 0 5px rgba(239, 68, 68, 0.5)']
                    : ['0 0 5px rgba(59, 130, 246, 0.5)', '0 0 10px rgba(59, 130, 246, 0.8)', '0 0 5px rgba(59, 130, 246, 0.5)']
                }}
                transition={{ duration: i * 0.5 + 1, repeat: Infinity }}
              >
                <div className={`w-4 h-4 rounded-full ${i % 2 === 0 ? 'bg-red-500' : 'bg-blue-500'}`}></div>
              </motion.div>
            ))}
          </div>

          <div className="w-3/4 h-1 bg-gray-600 mb-3 relative overflow-hidden">
            <motion.div 
              className="absolute inset-0 bg-green-500"
              animate={{ left: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <div className="flex space-x-3">
            <motion.div 
              className="px-4 py-1 bg-gray-900 rounded text-xs font-mono text-green-500"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              READY
            </motion.div>
            <motion.div 
              className="px-4 py-1 bg-gray-900 rounded text-xs font-mono text-yellow-500"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
            >
              SET
            </motion.div>
          </div>
        </motion.div>

        {/* Main content */}
        <motion.div 
          className="relative z-10 max-w-2xl text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6 text-cyan-300"
            animate={{ textShadow: ["0 0 10px #22d3ee", "0 0 20px #22d3ee", "0 0 10px #22d3ee"] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Ready to travel?
          </motion.h1>

          <motion.div
  className="text-base md:text-lg mb-8 px-6 py-4 bg-black/40 rounded-lg border border-yellow-500/20 text-yellow-100 max-w-xl mx-auto leading-relaxed font-light"
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 1.5, duration: 1 }}
>
  <p className="mb-3">
    Inside the vault was a device—two seats, two pods, humming with dormant energy. Notes were written in a long-dead language of science.
  </p>
  <p className="mb-3">
    “There’s only enough charge for two jumps,” Blake said, reading the console. “One to the past. One to the future. No more.”
  </p>
  <p className="mb-3">
    Wrem nodded. “I’ll go forward. If the future’s healed, it must have the answer. You go backward. Find out what caused all this.”
  </p>
  <p className="mb-3">
    They both hesitated. Blake touched Wrem’s hand. “We stay connected,” Blake said.
  </p>
  <p className="mb-3">
    Wrem smirked. “You’ll probably need my help anyway.”
  </p>
  <p className="mb-3">
    They activated the pods. A final moment. The fire rain roared outside, yet time stood still between them.
  </p>
  <p className="mb-3 italic text-cyan-300">
    “See you in the now,” Wrem whispered.
  </p>
  <p className="mb-3">
    The pods began to glow. The air crackled. Somewhere, the broken hourglass turned.
  </p>
  <p className="font-semibold text-cyan-400">
    And just like that—<br />
    Shall we jump?
  </p>
</motion.div>


          {/* JUMP Button */}
          <div className="flex justify-center mt-8 relative">
            <motion.button
              onClick={handleJumpClick}
              className="w-20 h-20 rounded-full bg-cyan-500 text-white font-bold flex items-center justify-center"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(34,211,238,0.7)",
                  "0 0 40px rgba(34,211,238,0.9)",
                  "0 0 20px rgba(34,211,238,0.7)"
                ],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              JUMP
            </motion.button>
          </div>
        </motion.div>

        {/* Flash Transition */}
        {showFlash && (
          <motion.div 
            className="fixed inset-0 bg-white z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 2, times: [0, 0.3, 0.7, 1] }}
          >
            <motion.div 
              className="text-black text-6xl font-bold"
              animate={{ scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 2 }}
            >
              {jumpText}
            </motion.div>
          </motion.div>
        )}
      </div>
    </PageTransition>
  );
};

export default TimeMachine;
