import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../../components/PageTransition';

const IntermediateHeartstone = () => {
  const navigate = useNavigate();
  const [answer, setAnswer] = useState('');
  const [showError, setShowError] = useState(false);

  const handleSubmit = () => {
    if (answer.trim().toLowerCase() === 'heartstone') {
      navigate('/journey/future/heartstone');
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 1500);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-black p-6 text-white">
        <motion.div
          className="max-w-2xl text-center p-8 rounded-lg border border-purple-500/30 bg-black/30 backdrop-blur-md shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-semibold text-purple-300 mb-6">
            Who am I?
          </h2>

          <motion.input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter your answer..."
            className={`w-full px-4 py-3 rounded-md bg-gray-800 text-purple-100 border 
              ${showError ? 'border-red-500 animate-shake' : 'border-purple-500/30'} 
              focus:outline-none focus:ring-2 focus:ring-purple-500`}
          />

          <motion.button
            onClick={handleSubmit}
            className="mt-6 px-6 py-3 bg-purple-700 hover:bg-purple-600 text-white rounded-md shadow transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit
          </motion.button>

          <AnimatePresence>
            {showError && (
              <motion.p
                className="mt-4 text-red-400"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
              >
                You know me only if you know what lies between the moments.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default IntermediateHeartstone;
