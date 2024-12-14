import React from 'react';
import Header from './components/layout/Header';
import MoodTracker from './components/MoodTracker';
import JournalPrompt from './components/JournalPrompt';
import MindfulnessExercise from './components/MindfulnessExercise';
import GuidedMeditation from './components/exercises/GuidedMeditation';
import ProgressiveRelaxation from './components/exercises/ProgressiveRelaxation';
import ChatInterface from './components/chat/ChatInterface';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        <Header />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <MoodTracker />
          <JournalPrompt />
          <MindfulnessExercise />
          <GuidedMeditation />
          <ProgressiveRelaxation />
        </div>

        <div className="mt-8">
          <ChatInterface />
        </div>

        <footer className="mt-12 text-center text-gray-500 dark:text-gray-400">
          <p>Remember, it's okay to take care of yourself. You matter. 💜</p>
        </footer>
      </div>
    </div>
  );
}

export default App;