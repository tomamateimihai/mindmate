import { ChatCompletionOptions } from '../types';

const API_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta';
const API_KEY = "AIzaSyBKrOeklx1XWN6U4vthg2xc4xfTdsyjQhU"

const DEFAULT_OPTIONS: ChatCompletionOptions = {
  temperature: 0.7,
  maxTokens: 1000,
  role: 'mental-health-assistant'
};

export async function generateAIResponse(
  prompt: string,
  options: Partial<ChatCompletionOptions> = {}
): Promise<string> {
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
  
  try {
    const response = await fetch(`${API_BASE_URL}/models/gemini-pro:generateContent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: generatePrompt(prompt, mergedOptions.role)
          }]
        }],
        generationConfig: {
          temperature: mergedOptions.temperature,
          maxOutputTokens: mergedOptions.maxTokens,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid response format from API');
    }

    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error generating AI response:', error);
    throw new Error('Failed to generate AI response. Please try again later.');
  }
}

function generatePrompt(userInput: string, role: string): string {
  const rolePrompts = {
    'mental-health-assistant': `You are a compassionate and supportive mental health assistant. 
      Your responses should be empathetic, understanding, and focused on the user's well-being. 
      Provide practical suggestions when appropriate, but always maintain a gentle and supportive tone.
      
      User message: ${userInput}`,
    
    'meditation-guide': `You are an experienced meditation guide.
      Provide clear, calming guidance that helps the user focus on their breath and present moment.
      Use gentle, soothing language and avoid technical terms.
      
      User message: ${userInput}`
  };

  return rolePrompts[role as keyof typeof rolePrompts] || rolePrompts['mental-health-assistant'];
}