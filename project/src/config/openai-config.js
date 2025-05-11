import OpenAI from "openai";


export const configureOpenAI = () => {
  if (!process.env.OPENAI_API_KEY) {
    console.warn("Warning: OPENAI_API_KEY is not set in environment variables!");
  }
  
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
};