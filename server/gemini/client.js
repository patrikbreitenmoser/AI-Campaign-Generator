import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GOOGLE_API_KEY;

if (!apiKey) {
  // Keep this guard here as well; index.js logs too. This ensures explicit failure if imported directly.
  console.warn('[gemini] GOOGLE_API_KEY is not set. SDK calls will fail.');
}

// The @google/genai SDK reads GOOGLE_API_KEY from the environment by default.
export const genAI = new GoogleGenAI({});

// Convenience helper for symmetry; returns the model id string.
export function getModel(model) {
  return model;
}
