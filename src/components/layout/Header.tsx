import React from 'react';
import { Brain } from 'lucide-react';
import ThemeToggle from '../common/ThemeToggle';

export default function Header() {
  return (
    <header className="text-center mb-12 relative">
      <ThemeToggle />
      <div className="flex items-center justify-center gap-3 mb-4">
        <Brain className="w-12 h-12 text-indigo-500" />
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">MindMate</h1>
      </div>
      <p className="text-xl text-gray-600 dark:text-gray-300">
        Your Personal Mental Wellness Assistant
      </p>
    </header>
  );
}