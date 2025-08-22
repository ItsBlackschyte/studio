'use server';

/**
 * @fileOverview Generates a transcript for a video based on its title and topic.
 * 
 * - generateVideoTranscript - A function that generates a video transcript.
 * - GenerateVideoTranscriptInput - The input type for the generateVideoTranscript function.
 * - GenerateVideoTranscriptOutput - The return type for the generateVideoTranscript function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

const GenerateVideoTranscriptInputSchema = z.object({
    videoTitle: z.string().describe('The title of the video.'),
    topic: z.string().describe('The main topic the video is about.'),
});
export type GenerateVideoTranscriptInput = z.infer<typeof GenerateVideoTranscriptInputSchema>;

const GenerateVideoTranscriptOutputSchema = z.object({
  transcript: z.string().describe('The generated transcript of the video.'),
});
export type GenerateVideoTranscriptOutput = z.infer<typeof GenerateVideoTranscriptOutputSchema>;

export async function generateVideoTranscript(input: GenerateVideoTranscriptInput): Promise<GenerateVideoTranscriptOutput> {
  return generateVideoTranscriptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateVideoTranscriptPrompt',
  input: {schema: GenerateVideoTranscriptInputSchema},
  output: {schema: GenerateVideoTranscriptOutputSchema},
  prompt: `You are an expert at creating educational content. Generate a detailed transcript for a video titled "{{videoTitle}}" on the topic of "{{topic}}". 
  
  The transcript should be structured like a real video transcript, with clear paragraphs and explanations. It should accurately cover the key concepts expected in such a video.
  
  Make the content informative and easy to follow.`,
});

const generateVideoTranscriptFlow = ai.defineFlow(
  {
    name: 'generateVideoTranscriptFlow',
    inputSchema: GenerateVideoTranscriptInputSchema,
    outputSchema: GenerateVideoTranscriptOutputSchema,
  },
  async (input, streamingCallback) => {
    const {output} = await prompt(input, {
      streamingCallback,
    });
    return output!;
  }
);
