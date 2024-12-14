import React, { useState, useEffect } from 'react';
import { BookOpen, Save, Clock } from 'lucide-react';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/storage';
import { JournalEntry } from '../types';

const prompts = [
  "What's one thing that made you smile today?",
  "What's a challenge you're facing, and what's one step you can take towards solving it?",
  "Write about three things you're grateful for today.",
  "What's something you're looking forward to?",
  "Describe a moment today that made you feel peaceful.",
  "What's one thing you'd like to improve about yourself, and why?"
];

export default function JournalPrompt() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState('');
  const [currentPrompt] = useState(() => prompts[Math.floor(Math.random() * prompts.length)]);

  useEffect(() => {
    const savedEntries = loadFromLocalStorage('journal_entries') || [];
    setEntries(savedEntries);
  }, []);

  const handleSave = () => {
    if (!currentEntry.trim()) return;

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      prompt: currentPrompt,
      content: currentEntry,
      timestamp: Date.now()
    };

    const updatedEntries = [...entries, newEntry];
    setEntries(updatedEntries);
    saveToLocalStorage('journal_entries', updatedEntries);
    setCurrentEntry('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <BookOpen className="w-6 h-6 text-indigo-500" />
        <h2 className="text-2xl font-semibold dark:text-white">Daily Journal</h2>
      </div>
      
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">{currentPrompt}</p>
      
      <textarea
        value={currentEntry}
        onChange={(e) => setCurrentEntry(e.target.value)}
        className="w-full h-32 p-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        placeholder="Start writing here..."
      />
      
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
        >
          <Save className="w-4 h-4" />
          Save Entry
        </button>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {currentEntry.length} characters
        </span>
      </div>

      {entries.length > 0 && (
        <div className="mt-6 border-t pt-4 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-3 dark:text-white">Previous Entries</h3>
          <div className="space-y-4 max-h-40 overflow-y-auto">
            {entries.slice().reverse().map((entry) => (
              <div key={entry.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <Clock className="w-4 h-4" />
                  {new Date(entry.timestamp).toLocaleDateString()}
                </div>
                <p className="text-gray-700 dark:text-gray-300">{entry.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}