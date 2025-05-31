import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import PageTransition from '../../components/PageTransition';
import { useUser } from '../../contexts/UserContext';
import NodeDetail from './NodeDetail';
import RiddleNode from './RiddleNode';
import FinalNode from './FinalNode';
import RiddleSequence from './RiddleSequence';

const PastJourney = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { username } = useUser();
  const [progress, setProgress] = useState({
    node1: false,
    node2: false,
    node3: false,
    node4: false,
    name1: false,
    name2: false,
    name3: false,
    name4: false,
  });

  const showMainInterface = location.pathname === '/journey/past';

  useEffect(() => {
    const allCompleted = Object.values(progress).every((value) => value === true);
    if (allCompleted) {
      console.log('All nodes completed, final node enabled');
    }
  }, [progress]);

  const updateProgress = (nodeName, status) => {
    setProgress((prev) => ({
      ...prev,
      [nodeName]: status,
    }));
  };

  const nodes = [
    
    { id: 'node2', label: 'Log Book', x: 75, y: 20, color: 'red' },
    
    
    { id: 'name1', label: 'Professor Chronos', x: 10, y: 50, color: 'blue' },
    { id: 'name2', label: 'Dr Kiara', x: 85, y: 50, color: 'amber' },
    { id: 'name3', label: 'Dr. Paradox', x: 40, y: 15, color: 'emerald' },
    { id: 'name4', label: 'The Clockmaker',  x: 30, y: 85, color: 'purple' },
    { id: 'final', label: 'Timeline Gate', x: 50, y: 50, color: 'blue', isLarge: true },
  ];

  return (

    <>
      <Routes>
        <Route
          path="/"
          element={
            <PageTransition transition="fade">
              <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-amber-900/20">
                  <div className="absolute inset-0 bg-[url('/pastbg.png')] "></div>
                  <div className="absolute inset-0 bg-gradient-to-b from-amber-900/40 to-amber-950/70"></div>
                </div>
                
                <div className="relative z-10 w-full h-full p-6">
                  <motion.h1
                    className="text-center text-4xl md:text-5xl font-serif font-bold mb-6 text-amber-200"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    The Past
                  </motion.h1>
                  <motion.p
                    className="text-center text-amber-100 mb-12 max-w-2xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    Explore the past, meet the future, and unravel the mysteries of time.
                  </motion.p>
                  <div className="relative h-[60vh] w-full max-w-4xl mx-auto">
                    {nodes.map((node) => (
                      <motion.div
                        key={node.id}
                        className={`absolute cursor-pointer`}
                        style={{ left: `${node.x}%`, top: `${node.y}%` }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}

                        transition={{ duration: 0.5, delay: Math.random() * 0.5 }}
                        whileHover={{ scale: 1.1 }}
                        onClick={() => navigate(`/journey/past/${node.id}`)}

                      >
                        <div
                          className={`
                            ${node.isLarge ? 'w-20 h-20' : 'w-14 h-14'}
                            rounded-full flex items-center justify-center
                            ${node.id === 'final' && !Object.values(progress).every(Boolean) ? 'bg-gray-500/50' : `bg-${node.color}-800`} 
                            ${progress[node.id] ? `ring-2 ring-${node.color}-400 ring-offset-2 ring-offset-${node.color}-900` : ''}
                            shadow-lg
                          `}
                        >
                          <div className={`w-10 h-10 rounded-full ${node.id === 'final' && !Object.values(progress).every(Boolean) ? 'bg-gray-400/50' : `bg-${node.color}-600`} flex items-center justify-center`}>
                            <div className={`w-6 h-6 rounded-full ${node.id === 'final' && !Object.values(progress).every(Boolean) ? 'bg-gray-300/50' : `bg-${node.color}-400`} animate-pulse`}></div>
                          </div>
                        </div>
                        <p className={`text-center mt-2 text-${node.color}-200 font-medium ${node.id === 'final' && !Object.values(progress).every(Boolean) ? 'opacity-50' : ''}`}>
                          {node.label}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </PageTransition>
          }
        />
        <Route path="/node1" element={<NodeDetail id="node1" updateProgress={updateProgress} />} />
        <Route path="/node2" element={<RiddleNode id="node2" updateProgress={updateProgress} />} />
        <Route path="/node3" element={<NodeDetail id="node3" updateProgress={updateProgress} />} />
        <Route path="/node4" element={<NodeDetail id="node4" updateProgress={updateProgress} />} />
        <Route path="/final" element={<FinalNode />} />
        {['name1', 'name2', 'name3', 'name4'].map((name) => (
  <Route
    key={name}
    path={`/${name}`}
    element={
      <RiddleSequence
        label={name}
        updateProgress={updateProgress}
        culpritName="name2"
      />
    }
  />
))}

      </Routes>
    </>
  );
};

export default PastJourney;
