import React, { useState } from 'react';
import { Activity } from 'lucide-react';

const bodyParts = [
  { name: 'Feet', instructions: 'Curl your toes tightly, then release' },
  { name: 'Calves', instructions: 'Point your toes up, tense calves, then relax' },
  { name: 'Thighs', instructions: 'Squeeze thigh muscles, then release' },
  { name: 'Abdomen', instructions: 'Tighten stomach muscles, then let go' },
  { name: 'Hands', instructions: 'Make fists, then release' },
  { name: 'Arms', instructions: 'Flex biceps, then relax' },
  { name: 'Shoulders', instructions: 'Raise shoulders to ears, then drop' },
  { name: 'Face', instructions: 'Scrunch facial muscles, then release' }
];

export default function ProgressiveRelaxation() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Activity className="w-6 h-6 text-indigo-500" />
        <h2 className="text-2xl font-semibold dark:text-white">Progressive Relaxation</h2>
      </div>

      <div className="mb-6">
        <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
          <div
            className="absolute h-full bg-indigo-500 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / (bodyParts.length - 1)) * 100}%` }}
          />
        </div>
      </div>

      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold mb-2 dark:text-white">
          {bodyParts[currentStep].name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          {bodyParts[currentStep].instructions}
        </p>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentStep(Math.min(bodyParts.length - 1, currentStep + 1))}
          className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
        >
          {currentStep === bodyParts.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
}