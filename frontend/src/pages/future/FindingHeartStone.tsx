import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FindingHeartStone = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [input, setInput] = useState('');
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

  const handleNext = () => {
    if (input.trim().toLowerCase() === 'heartstone') {
      setStep(2);
    }
  };

  const handleExplore = () => {
    navigate('/journey/future');
  };

  return (
    <div className="relative w-full h-screen text-white font-mono">
      <video className="absolute inset-0 w-full h-full object-cover z-0" autoPlay muted loop playsInline>
        <source src="/HeartStone.mp4" type="video/mp4" />
      </video>

      <div
        className="relative z-10 w-full h-full bg-black/40 flex items-center justify-center"
        onClick={() => setShowPopup(true)}
      >
        {showPopup && (
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20 shadow-xl max-w-md w-full text-center">
            {step === 1 ? (
              <>
                <p className="mb-4 text-lg"><em> One half beats,  

                  {"\n"}the other is carved—combine them,
                  {"\n"}and you’ll find me 
                  </em></p>
                <input
                  type="text"
                  value={input}
                  onChange={handleInput}
                  placeholder="Type here..."
                  className="w-full px-4 py-2 mb-4 rounded bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring focus:ring-white/40"
                />
                <button
                  onClick={handleNext}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded text-white"
                >
                  Next
                </button>
              </>
            ) : (
              <>
                <p className="mb-6 text-sm text-white/80 leading-relaxed whitespace-pre-line">
  You’ve named what I am...
  {"\n"}But where do I rest?
  {"\n"}Not in the earth, nor in the deep—
  {"\n"}but where the air forgets to sleep.
  {"\n"}Above the hush where circuits fade,
  {"\n"}I glow where no shadow is made.
  {"\n"}A silent crown, encased in glass,
  {"\n"}I wait where sky and signal pass.
</p>

                <button
                  onClick={handleExplore}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
                >
                  Ready to Explore
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FindingHeartStone;
