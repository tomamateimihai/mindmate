import React from 'react';
import { Clock } from 'lucide-react';
import { formatTime12Hour } from '../../utils/formatters';
import type { ChatMessage as ChatMessageType } from '../../types';

interface ChatMessageProps {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      className={`p-3 rounded-lg ${
        message.isUser
          ? 'bg-indigo-100 dark:bg-indigo-900 ml-auto'
          : 'bg-gray-100 dark:bg-gray-700 mr-auto'
      } max-w-[80%]`}
    >
      <p className="text-gray-800 dark:text-gray-200 mb-1">{message.text}</p>
      <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
        <Clock className="w-3 h-3" />
        {formatTime12Hour(message.timestamp)}
      </div>
    </div>
  );
}