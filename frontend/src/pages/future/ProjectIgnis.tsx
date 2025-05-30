import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const randomWords = [
  "whispers", "echo", "cipher", "maze", "light", "shade", "fog", "pulse", "dream", "code",
  "loop", "spark", "trace", "twist", "arc", "gate", "shift", "blur", "glyph", "riddle"
];

const getRandomWords = (count: number) => {
  const shuffled = [...randomWords].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).join(' ');
};

const ProjectIgnis = () => {
  const [inputValue, setInputValue] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [randomText, setRandomText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setRandomText(getRandomWords(10));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    setIsCorrect(val.trim().toLowerCase() === 'answer');
  };

  return (
    <div className="relative w-full h-screen overflow-hidden text-white font-mono">
      <video className="absolute inset-0 w-full h-full object-cover z-0" autoPlay muted loop playsInline>
        <source src="/FuristicTech.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 bg-black/30">
        <div className="text-sm text-white/30 absolute top-4 left-4 right-4 text-center">{getRandomWords(6)}</div>
        <div className="text-sm text-white/30 absolute bottom-4 left-4 right-4 text-center">{getRandomWords(6)}</div>

        <motion.div
          className="bg-white/10 p-8 rounded-lg backdrop-blur-md max-w-md w-full border border-white/20 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-xl mb-4 text-center text-white font-semibold">Enter the Code</h2>
          <p className="mb-6 text-white/70 text-center italic">{randomText}</p>

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
