import { useCallback } from 'react';
import Particles from 'react-particles';
import type { Engine } from 'tsparticles-engine';
import { loadSlim } from 'tsparticles-slim';

const FuturisticBackground = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="absolute inset-0 -z-10 bg-gray-900 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.1),rgba(0,0,0,0))]"></div>
      
      {/* Grid lines */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="h-full w-full border border-blue-500 border-opacity-30"></div>
        <div className="absolute inset-0 grid grid-cols-12">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="border-l border-blue-500 border-opacity-20 h-full"></div>
          ))}
        </div>
        <div className="absolute inset-0 grid grid-rows-12">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="border-t border-blue-500 border-opacity-20 w-full"></div>
          ))}
        </div>
      </div>
      
      <Particles
        id="tsparticles-futuristic"
        className="absolute inset-0"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 60,
          particles: {
            color: {
              value: ["#3b82f6", "#60a5fa", "#93c5fd"],
            },
            links: {
              color: "#60a5fa",
              distance: 150,
              enable: true,
              opacity: 0.2,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 60,
            },
            opacity: {
              value: 0.3,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
};

export default FuturisticBackground;