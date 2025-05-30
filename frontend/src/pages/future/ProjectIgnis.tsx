import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ProjectIgnis = () => {
  const [inputValue, setInputValue] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // For effect if needed later
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    setIsCorrect(val.trim().toLowerCase() === 'consequence');
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
        {/* Top text block */}
        <div className="text-xs text-white/50 absolute top-4 left-4 right-4 text-center leading-relaxed whitespace-pre-line">
          {"The resonance persists within the simulation substrate.\nAttempts to excise it destabilize causal continuity.\nDirect repair remains infeasible — so we devised a method to absorb the weight of what might follow."}
        </div>

        {/* Bottom text block */}
        <div className="text-xs text-white/50 absolute bottom-4 left-4 right-4 text-center leading-relaxed whitespace-pre-line">
          {"The resonance persists within the simulation substrate.\nAttempts to excise it destabilize causal continuity.\nDirect repair remains infeasible — so we devised a method to absorb the weight of what might follow."}
        </div>

        <motion.div
          className="bg-white/10 p-8 rounded-lg backdrop-blur-md max-w-2xl w-full border border-white/20 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <p className="mb-4 text-white text-sm text-center leading-relaxed italic whitespace-pre-line">
            Wren scans the reactivated records of Project Ignis. The interface flickers, then stabilizes—revealing a renewed framework. Ignis appears functional... yet unchanged.
            {"\n\n"}
            The flaw still exists. The breach remains quietly woven into the system—unrepaired, but dormant.
            {"\n\n"}
            An archived memorandum pulses onto the screen, marked with restricted-level clearance. Beneath it, a single line appears:
          </p>

          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Type here..."
            className="w-full px-4 py-2 mb-4 rounded bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring focus:ring-white/40"
          />

          <button
            className={`w-full px-4 py-2 rounded text-white transition ${
              isCorrect ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 cursor-not-allowed'
            }`}
            disabled={!isCorrect}
            onClick={() => navigate('/FindMe')}
          >
            Next
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectIgnis;
