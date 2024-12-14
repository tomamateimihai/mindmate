import React from 'react';
import { Bot, Loader, AlertCircle, Trash2 } from 'lucide-react';
import { useChat } from '../../hooks/useChat';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

export default function ChatInterface() {
  const {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages
  } = useChat({
    temperature: 0.7,
    role: 'mental-health-assistant'
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg h-[500px] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Bot className="w-6 h-6 text-indigo-500" />
          <h2 className="text-2xl font-semibold dark:text-white">Your Supportive Assistant</h2>
        </div>
        
        {messages.length > 0 && (
          <button
            onClick={clearMessages}
            className="p-2 text-gray-500 hover:text-red-500 transition-colors"
            title="Clear chat history"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        
        {isLoading && (
          <div className="flex justify-center py-4">
            <Loader className="w-6 h-6 text-indigo-500 animate-spin" />
          </div>
        )}
        
        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
            <AlertCircle className="w-5 h-5" />
            <p>{error}</p>
          </div>
        )}
      </div>

      <ChatInput onSend={sendMessage} disabled={isLoading} />
    </div>
  );
}