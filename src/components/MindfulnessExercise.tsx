import React, { useState, useEffect } from 'react';
import { Wind, Pause, Play } from 'lucide-react';

export default function MindfulnessExercise() {
  const [isBreathing, setIsBreathing] = useState(false);
  const [phase, setPhase] = useState('inhale');
  const [counter, setCounter] = useState(4);

  useEffect(() => {
    if (!isBreathing) return;

    const timer = setInterval(() => {
      setCounter((prev) => {
        if (prev === 1) {
          setPhase((currentPhase) => {
            switch (currentPhase) {
              case 'inhale':
                return 'hold';
              case 'hold':
                return 'exhale';
              case 'exhale':
                return 'inhale';
              default:
                return 'inhale';
            }
          });
          return 4;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isBreathing]);

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Wind className="w-6 h-6 text-indigo-500" />
        <h2 className="text-2xl font-semibold">Breathing Exercise</h2>
      </div>

      <div className="flex flex-col items-center">
        <div className={`w-32 h-32 rounded-full flex items-center justify-center border-4 transition-all duration-1000 ${
          isBreathing
            ? 'border-indigo-500 scale-110'
            : 'border-gray-300'
        }`}>
          <span className="text-2xl font-bold text-indigo-500">{counter}</span>
        </div>

        <p className="mt-4 text-lg font-medium text-gray-700 capitalize">
          {phase}
        </p>

        <button
          onClick={() => setIsBreathing(!isBreathing)}
          className="mt-6 flex items-center gap-2 px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
        >
          {isBreathing ? (
            <>
              <Pause className="w-5 h-5" />
              Pause
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              Start Breathing
            </>
          )}
        </button>
      </div>
    </div>
  );
}