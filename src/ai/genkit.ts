
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// This is a dummy initialization. The actual initialization will happen inside each flow
// with the user-provided API key.
export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: 'dummy-key',
    }),
  ],
  model: 'googleai/gemini-2.0-flash',
});
