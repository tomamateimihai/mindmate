import { useState, useCallback } from 'react';
import { generateAIResponse } from '../utils/api';
import { handleError } from '../utils/errorHandling';
import { useLocalStorage } from './useLocalStorage';
import type { ChatMessage, ChatCompletionOptions } from '../types';

export function useChat(options?: Partial<ChatCompletionOptions>) {
  const [messages, setMessages] = useLocalStorage<ChatMessage[]>('chat_history', []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (text: string) => {
    setIsLoading(true);
    setError(null);

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: Date.now()
    };

    try {
      setMessages(prev => [...prev, userMessage]);
      
      const response = await generateAIResponse(text, options);
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      const errorMessage = handleError(err);
      setError(errorMessage);
      
      // Remove the user message if AI response failed
      setMessages(prev => prev.filter(msg => msg.id !== userMessage.id));
    } finally {
      setIsLoading(false);
    }
  }, [options, setMessages]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, [setMessages]);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages
  };
}