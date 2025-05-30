import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../../components/PageTransition';

interface FutureRiddleNodeProps {
  id: string;
  updateProgress?: (nodeName: string, status: boolean) => void;
}

const FutureRiddleNode = ({ id, updateProgress }: FutureRiddleNodeProps) => {
  const navigate = useNavigate();
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [answer, setAnswer] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  
  // Mock data
  const names = ["Commander Nexus", "Dr. Infinity", "Quantum Smith", "Agent Parallax", "Director Continuum"];
  const riddles: { [key: string]: string } = {
  "Commander Nexus": `"I dwelled in vapours, not voltages.
My fingers never shaped the clouds,
Only noted their rhythm.
I watched the lightning, but I never beckoned it."
`,

  "Dr. Infinity": `"I walked among cooling chambers, naming embers and folding sparks.
My work was the stillness between surges —
No catalysts, no fault lines.
Others lit the fires; I only traced their fade."
`,

  "Quantum Smith": `"I danced with thresholds, but never crossed them.
The math of collapse, not creation, was my gift.
Others fanned flames —
I wrote their obituaries."
`,

  "Agent Parallax": `"Every model I ran was bound by walls I did not build.
I was a lens, not a lever.
Do not confuse predictive scope with responsible scale."
`,


};

  
  // Culprit is always the fourth name for this example
  const culprit = names[3];
  
  const handleNameClick = (name: string) => {
    setSelectedName(name);
    setShowDialog(true);
  };
  
  const handleFoundCulprit = () => {
    if (selectedName === culprit) {
      if (updateProgress) {
        updateProgress(id, true);
      }
      setShowDialog(false);
      navigate('/journey/future');
    } else {
      setAnswer("You know I am not the culprit");
      setTimeout(() => {
        setShowDialog(false);
        setAnswer('');
      }, 2000);
    }
  };

  return (
    <PageTransition>
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Futuristic database background */}
        <div className="absolute inset-0 bg-gray-900">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/30 to-gray-950/80"></div>
        </div>
        
        {/* Data streams */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-blue-500/30 text-xs font-mono opacity-30"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: '1px',
                height: `${Math.random() * 200 + 100}px`,
              }}
              animate={{
                y: [0, 1000],
                opacity: [0.3, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 5,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {[...Array(20)].map((_, j) => (
                <div key={j}>{Math.round(Math.random())}</div>
              ))}
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="relative z-10 w-full max-w-2xl mx-auto p-8 bg-indigo-950/80 backdrop-blur-md rounded-lg border border-indigo-500/30 shadow-[0_0_30px_rgba(99,102,241,0.2)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="absolute -top-0.5 -left-0.5 -right-0.5 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
            animate={{
              backgroundPosition: ['0% 0%', '100% 0%'],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          
          <motion.h2 
            className="text-3xl font-bold mb-6 text-indigo-300 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{ textShadow: "0 0 10px rgba(99,102,241,0.5)" }}
          >
            Suspect Database
          </motion.h2>
          
          <motion.p 
            className="text-indigo-200 mb-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            One of these individuals is linked to the temporal distortion event.
            Identify the perpetrator to continue your investigation.
          </motion.p>
          
          <motion.ul className="space-y-4 mb-6">
            {names.map((name, index) => (
              <motion.li 
                key={index}
                className="p-4 bg-indigo-900/80 rounded-lg border border-indigo-700 cursor-pointer hover:bg-indigo-800/80 transition-colors duration-200"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02, borderColor: "rgba(129,140,248,0.6)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleNameClick(name)}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-indigo-100 flex items-center justify-center font-bold mr-4">
                    {index + 1}
                  </div>
                  <span className="text-indigo-100 font-medium">{name}</span>
                </div>
              </motion.li>
            ))}
          </motion.ul>
          
          {/* Terminal-style status display */}
          <div className="mt-6 p-3 bg-gray-900 rounded border border-indigo-800 font-mono text-xs text-indigo-400">
            <div className="flex items-center mb-1">
              <div className="w-2 h-2 rounded-full bg-indigo-500 mr-2 animate-pulse"></div>
              <span>SYSTEM READY</span>
            </div>
            <div>{'>'} SELECT SUSPECT TO INTERROGATE</div>
          </div>
        </motion.div>
        
        {/* Dialog box for riddle */}
        {showDialog && (
          <motion.div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-20 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-gray-900 w-full max-w-lg rounded-lg shadow-2xl overflow-hidden border border-indigo-500/50"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className="bg-indigo-900 p-4 text-indigo-100">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500 mr-1"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-3"></div>
                  <h3 className="font-mono text-lg">{selectedName}</h3>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-6 bg-gray-800 p-4 rounded border border-indigo-800/50 text-indigo-200 font-mono">
                  {answer ? (
                    <p className="text-center font-bold">{answer}</p>
                  ) : (
                    <>
                      <p className="mb-2 text-indigo-400">{'>'} INTERROGATION_PROTOCOL.INIT</p>
                      <p className="text-indigo-200 whitespace-pre-line">
  {riddles[selectedName || ""] || "Temporal data missing..."}
</p>

                    </>
                  )}
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    className="px-4 py-2 bg-gray-800 text-indigo-300 rounded hover:bg-gray-700 transition-colors"
                    onClick={() => setShowDialog(false)}
                  >
                    CLOSE
                  </button>
                  <button
                    className="px-4 py-2 bg-indigo-700 text-indigo-100 rounded hover:bg-indigo-600 transition-colors"
                    onClick={handleFoundCulprit}
                  >
                    IDENTIFY SUSPECT
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

export default FutureRiddleNode;