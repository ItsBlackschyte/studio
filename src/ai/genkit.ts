
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {getApiKey} from '@/ai/get-api-key';

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: getApiKey,
    }),
  ],
  model: 'googleai/gemini-2.0-flash',
});
