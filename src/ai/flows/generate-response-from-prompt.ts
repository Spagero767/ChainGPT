'use server';

/**
 * @fileOverview This file defines the Genkit flow for generating a response from a user-submitted prompt.
 *
 * - generateResponseFromPrompt - A function that accepts a user prompt and generates a response using a generative AI model.
 * - GenerateResponseFromPromptInput - The input type for the generateResponseFromPrompt function.
 * - GenerateResponseFromPromptOutput - The return type for the generateResponseFromPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateResponseFromPromptInputSchema = z.object({
  prompt: z.string().describe('The prompt submitted by the user.'),
});
export type GenerateResponseFromPromptInput = z.infer<typeof GenerateResponseFromPromptInputSchema>;

const GenerateResponseFromPromptOutputSchema = z.object({
  response: z.string().describe('The AI-generated response to the prompt.'),
});
export type GenerateResponseFromPromptOutput = z.infer<typeof GenerateResponseFromPromptOutputSchema>;

export async function generateResponseFromPrompt(input: GenerateResponseFromPromptInput): Promise<GenerateResponseFromPromptOutput> {
  return generateResponseFromPromptFlow(input);
}

const generateResponseFromPromptPrompt = ai.definePrompt({
  name: 'generateResponseFromPromptPrompt',
  input: {schema: GenerateResponseFromPromptInputSchema},
  output: {schema: GenerateResponseFromPromptOutputSchema},
  prompt: `You are an AI assistant designed to provide helpful and creative responses to user prompts. Please respond to the following prompt: {{{prompt}}}`,
});

const generateResponseFromPromptFlow = ai.defineFlow(
  {
    name: 'generateResponseFromPromptFlow',
    inputSchema: GenerateResponseFromPromptInputSchema,
    outputSchema: GenerateResponseFromPromptOutputSchema,
  },
  async input => {
    const {output} = await generateResponseFromPromptPrompt(input);
    return output!;
  }
);
