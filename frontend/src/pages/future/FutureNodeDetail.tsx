import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../../components/PageTransition';

interface FutureNodeDetailProps {
  id: string;
  updateProgress?: (nodeName: string, status: boolean) => void;
}

const FutureNodeDetail = ({ id, updateProgress }: FutureNodeDetailProps) => {
  const navigate = useNavigate();
  
  const nodeContent = {
    node1: {
      title: "Hologram Archive",
      content: "This advanced repository contains three-dimensional recordings of historical events. The holographic projections reveal patterns of temporal distortion that have been increasing in frequency and magnitude.",
      background: "bg-gradient-to-br from-blue-900 to-indigo-950"
    },
    node3: {
      title: "Neural Lab",
      content: "The quantum neural network has analyzed billions of temporal data points and identified a pattern. The distortions are not random—they're being deliberately caused by an entity moving between timelines.",
      background: "bg-gradient-to-br from-emerald-900 to-teal-950"
    },
    node4: {
      title: "Quantum Vault",
      content: "This secure facility houses artifacts of temporal significance. Among them is a device capable of sealing breaches in the fabric of time. It requires a specific activation sequence derived from both past and future data points.",
      background: "bg-gradient-to-br from-purple-900 to-violet-950"
    }
  };
  
  const currentNode = nodeContent[id as keyof typeof nodeContent];

  const handleExplore = () => {
    if (updateProgress) {
      updateProgress(id, true);
    }
    navigate('/journey/future');
  };

  return (
    <PageTransition>
      <div className={`relative min-h-screen flex items-center justify-center ${currentNode.background} p-6`}>
        {/* Futuristic UI elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Glowing lines */}
          <motion.div 
            className="absolute top-10 left-0 h-[1px] bg-blue-400"
            initial={{ width: 0 }}
            animate={{ width: "40%" }}
            transition={{ duration: 2, delay: 0.5 }}
          />
          <motion.div 
            className="absolute top-10 right-0 h-[1px] bg-blue-400"
            initial={{ width: 0 }}
            animate={{ width: "30%" }}
            transition={{ duration: 2, delay: 0.8 }}
          />
          <motion.div 
            className="absolute bottom-10 left-0 h-[1px] bg-blue-400"
            initial={{ width: 0 }}
            animate={{ width: "35%" }}
            transition={{ duration: 2, delay: 1.1 }}
          />
          <motion.div 
            className="absolute bottom-10 right-0 h-[1px] bg-blue-400"
            initial={{ width: 0 }}
            animate={{ width: "45%" }}
            transition={{ duration: 2, delay: 1.4 }}
          />
          
          {/* Floating tech elements */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute opacity-20"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 50 + 20}px`,
                height: `${Math.random() * 50 + 20}px`,
                border: `1px solid rgba(99,102,241,${Math.random() * 0.5 + 0.2})`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                rotate: ['0deg', '360deg'],
                boxShadow: [
                  '0 0 5px rgba(99,102,241,0.3)',
                  '0 0 10px rgba(99,102,241,0.5)',
                  '0 0 5px rgba(99,102,241,0.3)'
                ]
              }}
              transition={{
                duration: Math.random() * 10 + 15,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>
        
        <motion.div 
          className="relative z-10 max-w-2xl backdrop-blur-md p-8 rounded-lg border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.2)] bg-black/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="absolute -top-1 -bottom-1 -left-1 -right-1 border border-blue-400/50 rounded-lg pointer-events-none"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          
          <motion.h2 
            className="text-3xl font-bold mb-6 text-blue-300 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{ textShadow: "0 0 10px rgba(59,130,246,0.5)" }}
          >
            {currentNode.title}
          </motion.h2>
          
          <motion.p 
            className="text-lg text-blue-100 mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {currentNode.content}
          </motion.p>
          
          <motion.button
            className="px-6 py-3 bg-blue-900/80 hover:bg-blue-800 text-blue-100 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-colors duration-300"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59,130,246,0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExplore}
          >
            Explore
          </motion.button>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default FutureNodeDetail;