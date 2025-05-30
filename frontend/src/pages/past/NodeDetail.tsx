import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../../components/PageTransition';

interface NodeDetailProps {
  id: string;
  updateProgress?: (nodeName: string, status: boolean) => void;
}

const NodeDetail = ({ id, updateProgress }: NodeDetailProps) => {
  const navigate = useNavigate();
  
  const nodeContent = {
    node1: {
      title: "Ancient Scroll",
      content: "This ancient parchment contains wisdom from a forgotten era...",
      background: "bg-[url('https://images.pexels.com/photos/2539462/pexels-photo-2539462.jpeg?auto=compress&cs=tinysrgb&w=1600')]"
    },
    node2: {
      title: "Culprit List",
      content: "A dusty ledger reveals a list of names tied to past events...",
      background: "bg-[url('https://images.pexels.com/photos/267614/pexels-photo-267614.jpeg?auto=compress&cs=tinysrgb&w=1600')]"
    },
    node3: {
      title: "Detective Lab",
      content: "The laboratory contains instruments of incredible precision...",
      background: "bg-[url('https://images.pexels.com/photos/3825368/pexels-photo-3825368.jpeg?auto=compress&cs=tinysrgb&w=1600')]"
    },
    node4: {
      title: "Clue Vault",
      content: "This ancient vault holds secrets from across history...",
      background: "bg-[url('https://images.pexels.com/photos/7897470/pexels-photo-7897470.jpeg?auto=compress&cs=tinysrgb&w=1600')]"
    }
  };

  const cleanedId = id.replace(/\s/g, ''); // remove all whitespace
const currentNode = nodeContent[cleanedId as keyof typeof nodeContent];

  const handleExplore = () => {
    if (updateProgress) {
      updateProgress(id, true);
    }
    navigate('/journey/past');
  };

  // Optional safeguard
  if (!currentNode) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center bg-black text-white text-xl">
          Invalid node ID: <span className="ml-2 font-bold">{id}</span>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className={`relative min-h-screen flex items-center justify-center ${currentNode.background} bg-cover bg-center p-6`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        
        <motion.div 
          className="relative z-10 max-w-2xl bg-amber-900/20 backdrop-blur-md p-8 rounded-lg border border-amber-500/30 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-3xl font-serif font-bold mb-6 text-amber-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {currentNode.title}
          </motion.h2>
          
          <motion.p 
            className="text-lg text-amber-100 mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {currentNode.content}
          </motion.p>
          
          <motion.button
            className="px-6 py-3 bg-amber-800 hover:bg-amber-700 text-amber-100 rounded-lg shadow-md transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
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

export default NodeDetail;
