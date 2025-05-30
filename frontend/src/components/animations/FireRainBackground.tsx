import { useCallback } from 'react';
import Particles from 'react-particles';
import type { Engine } from 'tsparticles-engine';
import { loadSlim } from 'tsparticles-slim';

const FireRainBackground = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles-fire"
      className="absolute inset-0 -z-10"
      init={particlesInit}
      options={{
        background: {
          color: {
            value: "#0f0f0f",
          },
        },
        fpsLimit: 60,
        particles: {
          color: {
            value: ["#ff4500", "#ff6a00", "#ff7900", "#ff9500"],
          },
          move: {
            direction: "bottom",
            enable: true,
            outModes: {
              default: "out",
            },
            random: true,
            speed: 10,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: { min: 0.3, max: 0.8 },
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 2, max: 6 },
          },
          life: {
            duration: {
              sync: false,
              value: 3
            },
            count: 0
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default FireRainBackground;