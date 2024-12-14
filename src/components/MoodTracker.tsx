import React, { useState } from 'react';
import { Smile, Meh, Frown, Sun, Cloud, CloudRain } from 'lucide-react';

const moods = [
  { icon: Smile, label: 'Happy', color: 'text-green-500' },
  { icon: Sun, label: 'Energetic', color: 'text-yellow-500' },
  { icon: Meh, label: 'Neutral', color: 'text-blue-500' },
  { icon: Cloud, label: 'Anxious', color: 'text-purple-500' },
  { icon: CloudRain, label: 'Sad', color: 'text-gray-500' },
  { icon: Frown, label: 'Stressed', color: 'text-red-500' },
];

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">How are you feeling today?</h2>
      <div className="grid grid-cols-3 gap-4">
        {moods.map(({ icon: Icon, label, color }) => (
          <button
            key={label}
            onClick={() => setSelectedMood(label)}
            className={`flex flex-col items-center p-4 rounded-lg transition-all ${
              selectedMood === label
                ? 'bg-indigo-50 ring-2 ring-indigo-500'
                : 'hover:bg-gray-50'
            }`}
          >
            <Icon className={`w-8 h-8 ${color}`} />
            <span className="mt-2 text-sm font-medium text-gray-700">{label}</span>
          </button>
        ))}
      </div>
      {selectedMood && (
        <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
          <p className="text-indigo-800">
            Thank you for sharing. Here's a suggestion based on your mood:
          </p>
          <p className="mt-2 text-gray-700">
            {getMoodSuggestion(selectedMood)}
          </p>
        </div>
      )}
    </div>
  );
}

function getMoodSuggestion(mood: string): string {
  const suggestions = {
    Happy: "That's wonderful! Try to reflect on what's making you happy and consider journaling about it.",
    Energetic: "Great energy! Channel it into something productive or creative you've been wanting to do.",
    Neutral: "A balanced state is a good time for mindfulness practice or light exercise.",
    Anxious: "Let's try some deep breathing exercises. Breathe in for 4 counts, hold for 4, out for 4.",
    Sad: "It's okay to feel this way. Consider talking to someone you trust or try a mood-lifting activity.",
    Stressed: "Take a moment to pause. What's one small thing you can do right now to reduce your stress?"
  };
  return suggestions[mood as keyof typeof suggestions] || "Take a moment to reflect on your feelings.";
}