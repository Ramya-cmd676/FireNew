import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../../components/PageTransition';
import FuturisticBackground from '../../components/animations/FuturisticBackground';

const RiddleSequence = ({ label, updateProgress, culpritName }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [accessGranted, setAccessGranted] = useState(false);
  const [riddleIndex, setRiddleIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const riddleSets = {
    name1: {
      riddles: [
        'I’m tall when I’m young, and I’m short when I’m old. What am I?',
        'The more you take, the more you leave behind. What am I?',
        'What has a head, a tail, but no body?',
      ],
      answers: ['candle', 'footsteps', 'coin'],
    },
    name2: {
      riddles: [
        'I speak without a mouth and hear without ears. What am I?',
        'I come from a mine and get surrounded by wood. What am I?',
        'I have keys but no locks. What am I?',
      ],
      answers: ['echo', 'pencil', 'keyboard'],
    },
    name3: {
      riddles: [
        'What can travel around the world while staying in the same corner?',
        'What has hands but can’t clap?',
        'What gets wetter as it dries?',
      ],
      answers: ['stamp', 'clock', 'towel'],
    },
    name4: {
      riddles: [
        'I shave every day, but my beard stays the same. What am I?',
        'What has many teeth, but can’t bite?',
        'What has one eye, but can’t see?',
      ],
      answers: ['barber', 'comb', 'needle'],
    },
  };

  const selectedSet = riddleSets[label] || riddleSets['name1'];
  const { riddles, answers } = selectedSet;

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const handleAccess = () => {
    if (input.trim().toLowerCase() === 'culprit') {
      setAccessGranted(true);
      setInput('');
    } else {
      alert('Incorrect keyword. Access denied.');
    }
  };

  const handleRiddleAnswer = () => {
    if (input.trim().toLowerCase() === answers[riddleIndex]) {
      if (riddleIndex < riddles.length - 1) {
        setRiddleIndex(riddleIndex + 1);
        setInput('');
      } else {
        updateProgress(label, true);
        if (label === culpritName) {
          navigate('/journey/past');
        } else {
          setShowResult(true);
        }
      }
    } else {
      alert('Incorrect answer. Try again.');
    }
  };

  const handleResultAcknowledgment = () => {
    navigate('/journey/past');
  };

  return (
    <PageTransition>
      <div className="relative min-h-screen flex flex-col items-center justify-center text-white p-6 overflow-hidden">
        <FuturisticBackground />

        {/* Animated circuits */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-1/3">
            <motion.div
              className="absolute top-20 left-10 h-[2px] bg-pink-400"
              initial={{ width: 0 }}
              animate={{ width: '30%' }}
              transition={{ duration: 2, delay: 1 }}
            />
            <motion.div
              className="absolute top-40 right-10 h-[2px] bg-violet-400"
              initial={{ width: 0 }}
              animate={{ width: '20%' }}
              transition={{ duration: 2, delay: 1.5 }}
            />
          </div>
        </div>

        {/* Hologram effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 0.2 : 0 }}
          className="absolute inset-0 bg-[url('https://images.pexels.com/photos/7422160/pexels-photo-7422160.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center mix-blend-overlay"
        />

        <motion.div
          className="relative z-10 w-full max-w-2xl text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 40 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6 text-cyan-300"
            animate={{
              textShadow: [
                '0 0 10px #22d3ee',
                '0 0 20px #22d3ee',
                '0 0 10px #22d3ee',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {accessGranted ? 'Solve the Riddles' : 'Restricted Node Access'}
          </motion.h1>

          <motion.div
            className="text-lg md:text-xl p-6 mb-6 backdrop-blur-md bg-black/40 rounded-lg border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {!accessGranted && !showResult && (
              <>
                <p className="mb-4">
                  Enter the keyword to begin your investigation.
                </p>
                <input
                  className="w-full p-2 text-black rounded mb-4"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Keyword..."
                />
                <button
                  className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded text-white"
                  onClick={handleAccess}
                >
                  Submit
                </button>
              </>
            )}

            {accessGranted && !showResult && (
              <>
                <p className="mb-4">
                  <strong>Riddle {riddleIndex + 1}:</strong>{' '}
                  {riddles[riddleIndex]}
                </p>
                <input
                  className="w-full p-2 text-black rounded mb-4"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Your Answer..."
                />
                <button
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
                  onClick={handleRiddleAnswer}
                >
                  Submit Answer
                </button>
              </>
            )}

            {showResult && (
              <>
                <p className="mb-4 text-red-400">
                  Sorry, I am not the culprit. You wasted your time.
                </p>
                <p className="mb-6">
                  Try visiting the Culprit List again and find the real one.
                </p>
                <button
                  className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded text-white"
                  onClick={handleResultAcknowledgment}
                >
                  Return
                </button>
              </>
            )}
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default RiddleSequence;
