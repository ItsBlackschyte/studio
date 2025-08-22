'use server';

/**
 * @fileOverview Generates a quiz for a given topic.
 *
 * - generateQuiz - A function that generates a quiz for a topic.
 * - GenerateQuizInput - The input type for the generateQuiz function.
 * - GenerateQuizOutput - The return type for the generateQuiz function.
 */

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {z} from 'genkit';

const GenerateQuizInputSchema = z.object({
  topic: z.string().describe('The topic to generate a quiz for.'),
  apiKey: z.string().optional().describe('The user-provided API key.'),
});
export type GenerateQuizInput = z.infer<typeof GenerateQuizInputSchema>;

const QuizQuestionSchema = z.object({
    question: z.string(),
    options: z.array(z.string()),
    answer: z.string(),
});
export type QuizQuestion = z.infer<typeof QuizQuestionSchema>;

const GenerateQuizOutputSchema = z.object({
  quiz: z.array(QuizQuestionSchema).describe('The generated quiz questions and answers in JSON format.'),
});
export type GenerateQuizOutput = z.infer<typeof GenerateQuizOutputSchema>;

export async function generateQuiz(input: GenerateQuizInput): Promise<GenerateQuizOutput> {
    if (!input.apiKey) {
        throw new Error('API key is required.');
    }

    const ai = genkit({
        plugins: [googleAI({apiKey: input.apiKey})],
        model: 'googleai/gemini-2.0-flash',
    });

    const prompt = ai.definePrompt({
      name: 'generateQuizPrompt',
      input: {schema: z.object({ topic: z.string() })},
      output: {schema: GenerateQuizOutputSchema},
      prompt: `Generate a multiple choice quiz with 10 questions for the topic: {{{topic}}}. For each question, provide 4 options and clearly indicate the correct answer. Output the result in JSON format only. Do not include any other text or formatting.`,
    });

    const {output} = await prompt({topic: input.topic});
    return output!;
}
