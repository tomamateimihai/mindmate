export interface Theme {
  isDark: boolean;
}

export interface User {
  id: string;
  language: string;
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
  };
}

export interface MoodEntry {
  mood: string;
  timestamp: number;
  note?: string;
}

export interface JournalEntry {
  id: string;
  prompt: string;
  content: string;
  timestamp: number;
}

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: number;
}