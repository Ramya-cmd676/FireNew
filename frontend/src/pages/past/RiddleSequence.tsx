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
  const [narrativeStage, setNarrativeStage] = useState(0); // 0 = riddles, 1/2 = story steps

  
    const riddleSets = {
  name1: {
    riddles: [
      'When storms of time begin to roar,\nI shield the gate, I guard the core.\nI mend what’s cracked, I stand alone—\nWho am I in flesh and bone?',
      'I moved through time to fix the pain,\nNot for power, nor for gain.\nI bent the laws, I cracked the flow—\nWhat did I cause, that all now know?',
      'I reached through time, ignored the cost,\nHoping to regain what I had lost.\nBut even hope, when left unchecked,\nCan turn to ruin. What was my wreck?'
    ],
    answers: ['Guardian', 'Distortion', 'Desperation'],
  },
  name2: {
    riddles: [
      'Tick by tick, I hold the beat,\nOf past and future where they meet.\nI never stop, I never stray—\nWhat marks the flow I guard each day?',
      'When time is twisted, out of line,\nI restore the grand design.\nBalance is my steady guide—\nWhat do I bring when tides divide?',
      'Neither lost nor yet to be,\nI live where all can truly see.\nBetween the ends, I hold the key—\nWhat part of time do I decree?'
    ],
    answers: ['Clock', 'Order', 'Present'],
  },
  name3: {
    riddles: [
      'Behind my care, a secret face,\nI broke the rules to find some grace.\nWho hid behind the healer’s mask,\nTo shatter time for a doomed task?',
      'I come and go but leave a mark,\nA trail behind in places dark.\nYou cannot touch or hold me tight,\nYet I am seen in fading light.\nWhat am I?',
      'I shine so bright but hold no flame,\nIn every room, you know my name.\nFlip a switch, and there I glow,\nWithout me, darkness starts to grow.\nWhat am I?'
    ],
    answers: ['Traitor', 'Shadow', 'bulb'],
  },
  name4: {
    riddles: [
      'I vanish fast, yet shape the day,\nA trace that thought cannot delay.\nOnce recalled, I lose my name—\nBut still, you play my fleeting game.\nWhat am I?',
      'I clear the slate, dissolve the line,\nA moment stretched, outside of time.\nNot end, not start — just space to mend,\nWhere timelines break and sometimes bend.\nWhat am I?',
      'I start again when I should end,\nA trail that curves and won’t descend.\nYou walk my path and find no rest,\nEach turn returns you to the test.\nWhat am I?'
    ],
    answers: ['Memory', 'Reset', 'Loop'],
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
    if (input.trim().toLowerCase() === answers[riddleIndex].toLowerCase())
 {
      if (riddleIndex < riddles.length - 1) {
        setRiddleIndex(riddleIndex + 1);
        setInput('');
      } else {
        updateProgress(label, true);
        if (label === culpritName) {
          if (label === 'name2') {
            setNarrativeStage(1);
          } else {
            navigate('/journey/past');
          }
        } else {
          setShowResult(true);
        }
      }
    } else {
      alert('Incorrect answer. Try again.');
    }
  };

  const handleNextNarrative = () => {
    if (narrativeStage === 1) {
      setNarrativeStage(2);
    } else {
      navigate('/journey/past');
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
            {/* Narratives */}
            {narrativeStage === 1 && (
              <>
                <p className="italic text-cyan-300 mb-6">
                  “The model was never static. I thought I was bending moisture — not chronology. I initiated a rainfall
                  projection calibrated for 2040... but something reverberated beyond it. The simulation echoed, not forward or
                  backward, but outward — And time, as if stretched too thin, retaliated. One decade fell into drought, another
                  drowned in storm. I thought I was adjusting variables. I was touching resonance. I didn’t set out to tear the
                  fabric… but the fault followed me.”
                </p>
                <button
                  className="bg-purple-700 hover:bg-purple-800 px-4 py-2 rounded text-white"
                  onClick={handleNextNarrative}
                >
                  Next
                </button>
              </>
            )}

            {narrativeStage === 2 && (
              <>
                <p className="text-cyan-200 mb-6">
                  Temporal resonance had never been a confirmed phenomenon. It was a theory buried beneath warning labels and
                  shelved equations. But here was proof. Not only had the Ignis system bent the weather — it had fractured the
                  architecture of time itself. The present was not broken by chance. It was broken by consequence.
                </p>
                <button
                  className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded text-white"
                  onClick={handleNextNarrative}
                >
                  Next
                </button>
              </>
            )}

            {/* Riddle logic */}
            {!accessGranted && !showResult && narrativeStage === 0 && (
              <>
                <p className="mb-4">Enter the keyword to begin your investigation.</p>
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

            {accessGranted && !showResult && narrativeStage === 0 && (
              <>
                <p className="mb-4">
                  <strong>Riddle {riddleIndex + 1}:</strong> {riddles[riddleIndex]}
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
                <p className="mb-4 text-red-400">Sorry, I am not the culprit. You wasted your time.</p>
                <p className="mb-6">Try visiting the Culprit List again and find the real one.</p>
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
