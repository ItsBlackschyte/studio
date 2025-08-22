// This file is machine-generated - edit at your own risk.

'use server';

/**
 * @fileOverview A flow that simplifies complex concepts.
 *
 * - simplifyExplanation - A function that simplifies a given concept.
 * - SimplifyExplanationInput - The input type for the simplifyExplanation function.
 * - SimplifyExplanationOutput - The return type for the simplifyExplanation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SimplifyExplanationInputSchema = z.object({
  concept: z.string().describe('The complex concept to simplify.'),
});

export type SimplifyExplanationInput = z.infer<typeof SimplifyExplanationInputSchema>;

const SimplifyExplanationOutputSchema = z.object({
  simplifiedExplanation: z.string().describe('A simplified explanation of the concept.'),
});

export type SimplifyExplanationOutput = z.infer<typeof SimplifyExplanationOutputSchema>;

export async function simplifyExplanation(input: SimplifyExplanationInput): Promise<SimplifyExplanationOutput> {
  return simplifyExplanationFlow(input);
}

const simplifyExplanationPrompt = ai.definePrompt({
  name: 'simplifyExplanationPrompt',
  input: {schema: SimplifyExplanationInputSchema},
  output: {schema: SimplifyExplanationOutputSchema},
  prompt: `You are an expert in simplifying complex concepts. Please provide a clear and concise explanation of the following concept:

  {{concept}}
  `,
});

const simplifyExplanationFlow = ai.defineFlow(
  {
    name: 'simplifyExplanationFlow',
    inputSchema: SimplifyExplanationInputSchema,
    outputSchema: SimplifyExplanationOutputSchema,
  },
  async input => {
    const {output} = await simplifyExplanationPrompt(input);
    return output!;
  }
);
