'use server';

import { decentralizedToolSelection } from '@/ai/flows/decentralized-tool-selection';
import { streamRunnable } from 'genkit/next';
import { z } from 'zod';

export async function getAiResponse(prompt: string) {
  try {
    const response = await decentralizedToolSelection({ prompt });
    return { success: true, response: response.response };
  } catch (error) {
    console.error('AI response generation failed:', error);
    return { success: false, response: 'Sorry, I encountered an error. Please try again.' };
  }
}
