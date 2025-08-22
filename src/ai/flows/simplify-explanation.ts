'use server';

/**
 * @fileOverview A flow that simplifies complex concepts.
 *
 * - simplifyExplanation - A function that simplifies a given concept.
 * - SimplifyExplanationInput - The input type for the simplifyExplanation function.
 * - SimplifyExplanationOutput - The return type for the simplifyExplanation function.
 */

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {z} from 'genkit';

const SimplifyExplanationInputSchema = z.object({
  concept: z.string().describe('The complex concept to simplify.'),
  apiKey: z.string().optional().describe('The user-provided API key.'),
});

export type SimplifyExplanationInput = z.infer<typeof SimplifyExplanationInputSchema>;

const SimplifyExplanationOutputSchema = z.object({
  simplifiedExplanation: z.string().describe('A simplified explanation of the concept.'),
});

export type SimplifyExplanationOutput = z.infer<typeof SimplifyExplanationOutputSchema>;

export async function simplifyExplanation(input: SimplifyExplanationInput): Promise<SimplifyExplanationOutput> {
  if (!input.apiKey) {
    throw new Error('API key is required.');
  }

  const ai = genkit({
    plugins: [googleAI({apiKey: input.apiKey})],
    model: 'googleai/gemini-2.0-flash',
  });

  const simplifyExplanationPrompt = ai.definePrompt({
    name: 'simplifyExplanationPrompt',
    input: {schema: z.object({ concept: z.string() })},
    output: {schema: SimplifyExplanationOutputSchema},
    prompt: `You are an expert in simplifying complex concepts. Please provide a clear and concise explanation of the following concept:

    {{{concept}}}
    `,
  });

  const {output} = await simplifyExplanationPrompt({ concept: input.concept });
  return output!;
}
