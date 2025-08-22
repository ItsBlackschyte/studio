
'use server';

import 'server-only';
import {config} from 'dotenv';

config({path: '.env.local'});

export async function getApiKey(): Promise<string | undefined> {
  return process.env.GEMINI_API_KEY;
}
