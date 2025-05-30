import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../../components/PageTransition';

interface RiddleNodeProps {
  id: string;
  updateProgress?: (nodeName: string, status: boolean) => void;
}

const RiddleNode = ({ id, updateProgress }: RiddleNodeProps) => {
  const navigate = useNavigate();
  const [stage, setStage] = useState<'intro' | 'content'>('intro');
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const names = ["Professor Chronos", "Lady Tempest", "Dr. Paradox", "The Clockmaker", "Timekeeper"];
  const culprit = names[2]; // Dr. Paradox

  const riddles: Record<string, string> = {
    "Professor Chronos": `"When glass forgets its form, it reflects not truth but hunger.
I stood beneath a sun I summoned, curious if light obeyed.
There were no flames — only thresholds crossed.
Yet heat remembers what pride wishes to forget."
`,
    "Lady Tempest": `"Winds hold secrets between pulses — I charted their language.
Access was sought for patterns, not persuasion.
If thunder followed, it followed me, not because of me."
`,
    "Dr. Paradox": `"What defines a spark if not its decision to fade?
I petitioned entry to study retreat — the breath after ignition.
My place was the pause, not the flare."
`,
    "The Clockmaker": `"I moved variables through voids — no outcomes, only oscillations.
Inquiry demanded I simulate edge conditions.
If causality rippled, it did so in theory, not in deed."
`,
    
  };

  const handleNameClick = (name: string) => {
    setSelectedName(name);
    setShowDialog(true);
  };

  const handleFoundCulprit = () => {
      updateProgress?.(id, true);
      navigate('/journey/past');
  };

  const handleNextFromIntro = () => {
    setStage('content');
  };

  return (
    <PageTransition>
      <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden p-4 bg-amber-50">

        {/* Background */}
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/4644812/pexels-photo-4644812.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover opacity-40"></div>

        <AnimatePresence>
          {stage === 'intro' && (
            <motion.div
              className="relative z-10 text-center max-w-xl bg-amber-100/90 p-8 rounded-lg border border-amber-300 shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <h1 className="text-4xl font-serif font-bold text-amber-900 mb-4">The Time Tangle</h1>
              <p className="text-lg text-amber-800 mb-6">
                A mysterious disturbance has warped the fabric of time. Hidden in the folds of history lies the one who caused it.
              </p>
              <button
                onClick={handleNextFromIntro}
                className="px-6 py-3 bg-amber-700 text-white rounded hover:bg-amber-800 transition"
              >
                Next
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {stage === 'content' && (
          <motion.div
            className="relative z-10 w-full max-w-2xl p-8 bg-amber-50/80 shadow-lg rounded-lg border border-amber-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-serif font-bold mb-6 text-center text-amber-900">List of Suspects</h2>
            <p className="text-center italic text-amber-800 mb-8">
              One of these individuals is responsible for the temporal disturbance.
              Identify the culprit to continue your journey.
            </p>

            <ul className="space-y-4 mb-6">
              {names.map((name, index) => (
                <motion.li
                  key={index}
                  className="p-4 bg-amber-100 rounded-lg border border-amber-300 cursor-pointer hover:bg-amber-200 transition"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleNameClick(name)}
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-amber-700 text-amber-100 flex items-center justify-center font-bold mr-4">
                      {index + 1}
                    </div>
                    <span className="text-amber-900 font-medium">{name}</span>
                  </div>
                </motion.li>
              ))}
            </ul>

            <div className="text-center">
              <button
                className="px-6 py-3 bg-amber-700 text-white rounded hover:bg-amber-800 transition"
                onClick={handleFoundCulprit}
              >
                Found the Culprit
              </button>
            </div>
          </motion.div>
        )}

        {/* Riddle Dialog */}
        {showDialog && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-20 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-amber-100 w-full max-w-lg rounded-lg shadow-2xl overflow-hidden"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className="bg-amber-700 p-4 text-white">
                <h3 className="font-bold text-xl">{selectedName}</h3>
              </div>
              <div className="p-6">
                <div className="mb-4 bg-amber-50 p-4 rounded border border-amber-200 text-amber-800">
                  
                  <p className="italic">
                    {riddles[selectedName as string] || "The mystery deepens... No riddle found."}
                  </p>
                </div>
                <div className="flex justify-end">
                  <button
                    className="px-4 py-2 bg-amber-200 text-amber-800 rounded hover:bg-amber-300 transition-colors"
                    onClick={() => setShowDialog(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </PageTransition>
  );
};

export default RiddleNode;
