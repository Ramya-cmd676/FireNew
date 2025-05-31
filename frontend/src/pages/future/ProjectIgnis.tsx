import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ProjectIgnis = () => {
  const [inputValue, setInputValue] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const navigate = useNavigate();

  const handleMainInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    setIsCorrect(val.trim().toLowerCase() === 'consequence');
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.trim().toLowerCase() === 'careful') {
      setHasAccess(true);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden text-white font-mono">
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/FuristicTech.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 bg-black/30">

        {/* Password Prompt */}
        {!hasAccess && (
          <motion.form
            onSubmit={handlePasswordSubmit}
            className="bg-white/10 p-8 rounded-lg backdrop-blur-md w-full max-w-md border border-white/20 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-center text-white text-xl mb-4">Enter Access Key</h2>
            <input
              type="password"
              placeholder="Access Password..."
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full px-4 py-2 mb-4 rounded bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring focus:ring-white/40"
            />
            <button
              type="submit"
              className="w-full px-4 py-2 rounded bg-cyan-700 hover:bg-cyan-800 text-white transition"
            >
              Submit
            </button>
          </motion.form>
        )}

        {/* Main Content (only shown after password) */}
        {hasAccess && (
          <motion.div
            className="bg-white/10 p-8 rounded-lg backdrop-blur-md max-w-2xl w-full border border-white/20 shadow-lg mt-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <p className="mb-4 text-white text-sm text-center leading-relaxed  whitespace-pre-line">
              <b>Wren scans the reactivated records of Project Ignis. The interface flickers, then stabilizes—revealing a renewed status of project:</b>
              {"\n\n"}
              <em>"Project Ignis was suspended after early findings showed a dangerous possibility:
      the system’s connection to atmospheric patterns could resonate with the timeline itself.
      
      {"\n\n"}
      This resonance was never triggered—but if it had been, the result would have been severe.
      No safe fix was found. And when a fault cannot be repaired… something must be built to bear its weight."</em>
      
      {"\n\n"}
      <b>To access that safeguard, enter the word that speaks to what we tried to prevent.</b>
            </p>

            <input
              type="text"
              value={inputValue}
              onChange={handleMainInputChange}
              placeholder="Type here..."
              className="w-full px-4 py-2 mb-4 rounded bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring focus:ring-white/40"
            />

            <button
              className={`w-full px-4 py-2 rounded text-white transition ${
                isCorrect ? 'bg-cyan-800 hover:bg-cyan-800' : 'bg-gray-600 cursor-not-allowed'
              }`}
              disabled={!isCorrect}
              onClick={() => navigate('/FindMe')}
            >
              Next
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProjectIgnis;
