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
      "I stood when time began to break,\nI held the line for others’ sake.\nThrough fractured storms, I stayed in place—\nThey called me this, their final brace.",
      "I tampered with the woven thread,\nThinking I could fix what bled.\nBut every step unspooled control—\nAnd birthed this wound upon the whole.",
      "I reached across what should not bend,\nIn search of love I could defend.\nBut that pure hope, without restraint,\nLed only to this cruel complaint."
    ],
    answers: ["Guardian", "Distortion", "Desperation"],
  },
  name2: {
    riddles: [
      "I watched the hands go ‘round each day,\nTheir ticking never lost their way.\nI kept the rhythm without pride—\nThis name became the role I bide.",
      "When time unspooled and chaos grew,\nI worked to guide it back to true.\nI restored the shape without reward—\nMy oath was bound to this one word.",
      "I chose to live between the streams,\nNot in the past or future dreams.\nThe only moment that I defend—\nThis is the place I never end."
    ],
    answers: ["Clock", "Order", "Present"],
  },
  name3: {
    riddles: [
      "They saw a healer, calm and kind,\nBut didn’t see the cracks behind.\nI broke the code, I crossed the line—\nTo chase what couldn’t still be mine.",
      "I came and went but left a trace,\nA whisper trailing into space.\nThey never saw me clearly then—\nYet followed me again, again.",
      "You’d never know just what I am,\nBut I appear with every lamp.\nThey flip a switch and call me near—\nWithout me, only dark is clear."
    ],
    answers: ["Traitor", "Shadow", "Bulb"],
  },
  name4: {
    riddles: [
      "I clung to moments fading fast,\nBut couldn’t hold the ones that passed.\nThey echoed faintly in my mind—\nYet every time, I failed to find.",
      "I made a space where time could heal,\nSuspended just beyond what’s real.\nNo forward step, no backward fall—\nI offered pause amidst it all.",
      "They tried to end what spun too far,\nBut still it turned beneath the stars.\nI watched them circle back again—\nTrapped inside what could not end."
    ],
    answers: ["Memory", "Reset", "Loop"],
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
    if (input.trim().toLowerCase() === answers[riddleIndex].toLowerCase()) {
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

  // Determine heading dynamically
  const getHeadingText = () => {
    if (narrativeStage === 1 ) {
      return 'She confessed:';
    }
    if(narrativeStage===2){
      return 'Since I am at fault, and you are here to solve, let me tell you the password for Project Ignis which might help you'
    }
    if (accessGranted && riddleIndex < 3) {
      return 'Solve these to understand the actual mistake';
    }

    return 'Restricted Node Access';
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
          <h1 className="text-2xl md:text-3xl font-semibold mb-6 text-cyan-300">
            {getHeadingText()}
          </h1>

          <motion.div
            className="text-lg md:text-xl p-6 mb-6 backdrop-blur-md bg-black/40 rounded-lg border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
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
                  Temporal resonance had never been a confirmed phenomenon... The present was not broken by chance. It was broken by consequence.
                </p>
                <button
                  className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded text-white"
                  onClick={handleNextNarrative}
                >
                  Next
                </button>
              </>
            )}

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
