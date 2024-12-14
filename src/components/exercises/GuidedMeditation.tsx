import React, { useState } from 'react';
import { Headphones, Play, Pause, RotateCcw } from 'lucide-react';
import { MEDITATION_EXERCISES } from '../../constants/exercises';
import { useTimer } from '../../hooks/useTimer';
import { formatTime } from '../../utils/formatters';

export default function GuidedMeditation() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const meditation = MEDITATION_EXERCISES[selectedIndex];
  
  const { isActive, timeLeft, start, pause, reset } = useTimer({
    duration: meditation.duration,
    onComplete: () => {
      // Could add sound or notification here
    }
  });

  const handleMeditationChange = (index: number) => {
    setSelectedIndex(index);
    reset();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Headphones className="w-6 h-6 text-indigo-500" />
        <h2 className="text-2xl font-semibold dark:text-white">Guided Meditation</h2>
      </div>

      <select
        className="w-full p-2 mb-4 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        onChange={(e) => handleMeditationChange(parseInt(e.target.value))}
        value={selectedIndex}
      >
        {MEDITATION_EXERCISES.map((med, index) => (
          <option key={med.title} value={index}>
            {med.title} ({formatTime(med.duration)})
          </option>
        ))}
      </select>

      <p className="text-gray-600 dark:text-gray-300 mb-6">
        {meditation.description}
      </p>

      <div className="flex flex-col items-center">
        <div className="text-4xl font-bold text-indigo-500 mb-6">
          {formatTime(timeLeft)}
        </div>

        <div className="flex gap-4">
          <button
            onClick={isActive ? pause : start}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
          >
            {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={reset}
            className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}