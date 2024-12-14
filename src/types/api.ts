export interface ChatCompletionOptions {
  temperature: number;
  maxTokens: number;
  role: 'mental-health-assistant' | 'meditation-guide';
}

export interface APIResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}