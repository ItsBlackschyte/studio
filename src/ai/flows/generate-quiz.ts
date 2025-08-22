'use server';

/**
 * @fileOverview Generates a quiz for a given topic.
 *
 * - generateQuiz - A function that generates a quiz for a topic.
 * - GenerateQuizInput - The input type for the generateQuiz function.
 * - GenerateQuizOutput - The return type for the generateQuiz function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateQuizInputSchema = z.object({
  topic: z.string().describe('The topic to generate a quiz for.'),
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
  return generateQuizFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuizPrompt',
  input: {schema: GenerateQuizInputSchema},
  output: {schema: GenerateQuizOutputSchema},
  prompt: `Generate a multiple choice quiz with 10 questions for the topic: {{{topic}}}. For each question, provide 4 options and clearly indicate the correct answer. Output the result in JSON format.`,
});

const generateQuizFlow = ai.defineFlow(
  {
    name: 'generateQuizFlow',
    inputSchema: GenerateQuizInputSchema,
    outputSchema: GenerateQuizOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
