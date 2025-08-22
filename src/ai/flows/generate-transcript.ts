'use server';

/**
 * @fileOverview Generates a transcript for a video based on its title and topic.
 * 
 * - generateVideoTranscript - A function that generates a video transcript.
 * - GenerateVideoTranscriptInput - The input type for the generateVideoTranscript function.
 * - GenerateVideoTranscriptOutput - The return type for the generateVideoTranscript function.
 */

import {genkit} from 'genkit';
import {z} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

const GenerateVideoTranscriptInputSchema = z.object({
    videoTitle: z.string().describe('The title of the video.'),
    topic: z.string().describe('The main topic the video is about.'),
    apiKey: z.string().optional().describe('The user-provided API key.'),
});
export type GenerateVideoTranscriptInput = z.infer<typeof GenerateVideoTranscriptInputSchema>;

const GenerateVideoTranscriptOutputSchema = z.object({
  transcript: z.string().describe('The generated transcript of the video.'),
});
export type GenerateVideoTranscriptOutput = z.infer<typeof GenerateVideoTranscriptOutputSchema>;

export async function generateVideoTranscript(input: GenerateVideoTranscriptInput): Promise<GenerateVideoTranscriptOutput> {
    if (!input.apiKey) {
        throw new Error('API key is required.');
    }

    const ai = genkit({
        plugins: [googleAI({apiKey: input.apiKey})],
        model: 'googleai/gemini-2.0-flash',
    });

    const prompt = ai.definePrompt({
    name: 'generateVideoTranscriptPrompt',
    input: {schema: z.object({ videoTitle: z.string(), topic: z.string() })},
    output: {schema: GenerateVideoTranscriptOutputSchema},
    prompt: `You are an expert at creating educational content. Generate a detailed transcript for a video titled "{{videoTitle}}" on the topic of "{{topic}}". 
    
    The transcript should be structured like a real video transcript, with clear paragraphs and explanations. It should accurately cover the key concepts expected in such a video.
    
    Make the content informative and easy to follow.`,
    });

    const {output} = await prompt({videoTitle: input.videoTitle, topic: input.topic});
    return output!;
}
