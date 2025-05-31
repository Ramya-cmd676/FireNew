import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface NextButtonProps {
  to: string;
  text?: string;
  className?: string;
}

const NextButton = ({ to, text = "Next", className = "" }: NextButtonProps) => {
  const navigate = useNavigate();

  return (
    <motion.button
      className={`px-8 py-3 rounded-full bg-white text-black font-bold text-lg 
    shadow-[0_0_15px_rgba(255,255,255,0.7)] hover:shadow-[0_0_25px_rgba(255,255,255,0.9)] 
    transition-all duration-300 ${className}`}

      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate(to)}
    >
      {text}
    </motion.button>
  );
};

export default NextButton;