import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import PageTransition from '../../components/PageTransition';
import { useUser } from '../../contexts/UserContext';
import FutureNodeDetail from './FutureNodeDetail';
import FutureRiddleNode from './FutureRiddleNode';
import FutureFinalNode from './FutureFinalNode';
import LocationNode from './LocationNode';
import ProjectIgnis from './ProjectIgnis';
import HeartStone from './HeartStone';

const FutureJourney = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { username } = useUser();

  // Track progress of nodes + final portal
  const [progress, setProgress] = useState({
    node1: false,
    node2: false,
    node3: false,
    node4: false,
    final: false,  // <-- new final node progress
  });

  const [showLocationNode, setShowLocationNode] = useState(false);

  // Detect if the "final" node should be accessible based on location state from navigation
  useEffect(() => {
    if (location.state?.enableFinalPortal) {
      setProgress(prev => ({ ...prev, final: true }));
      // Clear state after reading
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, location.pathname, navigate]);

  const showMainInterface = location.pathname === '/journey/future';

  const updateProgress = (nodeName: keyof typeof progress, status: boolean) => {
    setProgress(prev => {
      const newProgress = {
        ...prev,
        [nodeName]: status,
      };

      if (newProgress.node2 && newProgress.node3 && !showLocationNode) {
        setShowLocationNode(true);
      }

      return newProgress;
    });
  };

  const nodes = [
    { id: 'node1', label: 'Hologram Archive', x: 25, y: 25, color: 'cyan' },
    { id: 'node2', label: 'Former Staff of Project Ignis', x: 70, y: 15, color: 'indigo' },
    { id: 'node3', label: 'Project Ignis', x: 75, y: 70, color: 'emerald' },
    { id: 'node4', label: 'Quantum Vault', x: 20, y: 65, color: 'violet' },
    { id: 'final', label: 'Chronos Portal', x: 50, y: 40, color: 'blue', isLarge: true },
  ];

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PageTransition transition="fade">
              <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Top Left Icon (HeartStone) */}
                <div className="absolute top-4 left-4 z-20">
                  <img
                    src="/HeartStone.png"
                    alt="HeartStone"
                    className="w-10 h-10 cursor-pointer hover:scale-110 transition-transform duration-300"
                    onClick={() => navigate('/journey/future/heartstone')}
                  />
                </div>

                {/* Top Right Icon */}
                <div className="absolute top-4 right-4 z-20">
                  <img src="/gps.png" alt="gps" className="w-10 h-10" />
                </div>

                {/* Futuristic city background */}
                <div className="absolute inset-0 bg-indigo-950">
                  <div
                    className="absolute inset-0 bg-[url('https://images.pexels.com/photos/7503460/pexels-photo-7503460.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center opacity-30 mix-blend-overlay"
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/40 to-indigo-950/90"></div>
                </div>

                {/* Neon grid overlay */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <div
                    className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.2)_1px,transparent_1px)] bg-[size:50px_50px]"
                  ></div>
                </div>

                {/* Moving particles */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-blue-400 rounded-full"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [0, -1000],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: Math.random() * 15 + 20,
                        repeat: Infinity,
                        delay: Math.random() * 10,
                      }}
                    />
                  ))}
                </div>

                <div className="relative z-10 w-full h-full p-6">
                  <motion.h1
                    className="text-center text-4xl md:text-5xl font-bold mb-6 text-blue-300"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ textShadow: '0 0 15px rgba(59,130,246,0.5)' }}
                  >
                    Neo-Chronos City
                  </motion.h1>

                  <motion.p
                    className="text-center text-blue-100 mb-12 max-w-2xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    Navigate the future&apos;s network to reset the temporal anomaly
                  </motion.p>

                  <div className="relative h-[60vh] w-full max-w-4xl mx-auto">
                    {nodes.map((node) => (
                      <motion.div
                        key={node.id}
                        className="absolute cursor-pointer"
                        style={{
                          left: `${node.x}%`,
                          top: `${node.y}%`,
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: node.id === 'final' && !progress.final ? 0.5 : 1,
                          scale: 1,
                        }}
                        transition={{ duration: 0.5, delay: Math.random() * 0.5 }}
                        whileHover={{ scale: 1.1 }}
                        onClick={() => {
                          if (node.id === 'final' && !progress.final) {
                            return;
                          }
                          navigate(`/journey/future/${node.id}`);
                        }}
                      >
                        <div
                          className={`
                            ${node.isLarge ? 'w-20 h-20' : 'w-14 h-14'} 
                            rounded-full flex items-center justify-center
                            ${node.id === 'final' && !progress.final ? 'bg-gray-500/50' : `bg-${node.color}-900`} 
                            ${progress[node.id as keyof typeof progress] ? `ring-2 ring-${node.color}-400 ring-offset-2 ring-offset-${node.color}-900` : ''}
                            shadow-lg
                          `}
                        >
                          <div
                            className={`w-10 h-10 rounded-full ${node.id === 'final' && !progress.final ? 'bg-gray-400/50' : `bg-${node.color}-700`} flex items-center justify-center`}
                          >
                            <div
                              className={`w-6 h-6 rounded-full ${node.id === 'final' && !progress.final ? 'bg-gray-300/50' : `bg-${node.color}-500`} animate-pulse`}
                            ></div>
                          </div>
                        </div>
                        <p
                          className={`text-center mt-2 text-${node.color}-200 font-medium ${
                            node.id === 'final' && !progress.final ? 'opacity-50' : ''
                          }`}
                        >
                          {node.label}
                        </p>
                      </motion.div>
                    ))}

                    {/* Location button that appears after specific progress */}
                    {showLocationNode && (
                      <motion.div
                        className="absolute bottom-5 left-1/2 -translate-x-1/2 cursor-pointer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        onClick={() => navigate('/journey/future/location')}
                      >
                        <div className="w-16 h-16 rounded-full bg-yellow-500 shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                          <img src="/gps.png" alt="GPS" className="w-10 h-10" />
                        </div>
                        <p className="text-center mt-2 text-yellow-300 font-semibold">Location Node</p>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </PageTransition>
          }
        />
        <Route
          path="/node1"
          element={<FutureRiddleNode nodeId="node1" updateProgress={updateProgress} />}
        />
        <Route
          path="/node2"
          element={<FutureNodeDetail nodeId="node2" updateProgress={updateProgress} />}
        />
        <Route
          path="/node3"
          element={<ProjectIgnis updateProgress={updateProgress} />}
        />
        <Route
          path="/node4"
          element={<FutureNodeDetail nodeId="node4" updateProgress={updateProgress} />}
        />
        <Route
          path="/final"
          element={<FutureFinalNode />}
        />
        <Route
          path="/location"
          element={<LocationNode />}
        />
        <Route
          path="/heartstone"
          element={<HeartStone />}
        />
      </Routes>
    </>
  );
};

export default FutureJourney;
