import { motion } from 'framer-motion';
import { useUser } from '../contexts/UserContext';
import NextButton from '../components/NextButton';
import PageTransition from '../components/PageTransition';
import FireRainBackground from '../components/animations/FireRainBackground';

const Home = () => {
  const { username } = useUser();

  return (
    <PageTransition>
      <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-white p-6">
         <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute top-0 left-0 w-full h-full object-cover z-0"
  >
    <source src="/FireRain.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
        
        <motion.div 
          className="relative z-10 max-w-xl text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4 border border-transparent p-4"
            animate={{ 
              textShadow: [
                "0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #ff4500", 
                "0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #ff7900",
                "0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #ff4500"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            The Morning it Burned!
          </motion.h1>
          
 <motion.div 
  className="text-lg md:text-xl mb-8 p-6 bg-black/30 backdrop-blur-sm rounded-lg border border-orange-500/30 shadow-[0_0_20px_rgba(255,69,0,0.2)] text-left space-y-4"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1, delay: 1 }}
>
  <p><strong>Blake stood</strong> at the edge of the balcony, eyes fixed on the horizon.</p>

  <p><em>“Wren,”</em> Blake called softly, <em>“you need to see this.”</em></p>

  <p>Wren joined Blake moments later, groggy and half-asleep. But the sleep <strong>vanished</strong> as Wren’s eyes caught the sky.</p>

  <p>The clouds were not clouds at all—<strong>but burning ribbons of red</strong>, licking downward like fire descending from heaven.</p>

  <p>As one droplet touched the ground, the grass <strong>burst into flame</strong>.</p>

  <p>Another touched a car down the street. <strong>It melted.</strong></p>

  <p className="mt-6"><strong>No sirens.</strong> <br /><strong>No birds.</strong> <br />Only silence—<em>and falling fire.</em></p>

  <p><em>“What the hell…?”</em> Wren whispered.</p>

  <p>They ran into the street. The fire didn’t touch them. <br />It <em>danced</em> around their footsteps, avoided their skin.</p>

  <p>The entire world burned—<strong>but not Blake and Wren.</strong></p>

  <p><em>“What’s happening?!”</em> Blake shouted to no one.</p>

  <p className="mt-4"><strong>They weren’t just survivors.</strong></p>

  <p><strong><em>They were separate.</em></strong></p>

  <p className="mt-4"><strong><em>And then—</em> the glitch began.</strong></p>

  <p>Around them, people <strong>flickered</strong> in and out of view.</p>

  <p>Buildings <em>shifted</em> slightly—like static on a TV.</p>

  <p>The sky <strong>jumped backward</strong> for a second, then resumed its hellish storm.</p>

  <p className="mt-4"><strong>Memories—jumbled.</strong></p>

  <p>Wrem suddenly couldn’t remember a younger sibling’s face. <br />Blake forgot the last year of university life.</p>

  <p className="mt-4"><strong><em>Something had skipped.</em></strong></p>
</motion.div>


          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="mt-8"
          >
            <NextButton to="/dark-den" />
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Home;
