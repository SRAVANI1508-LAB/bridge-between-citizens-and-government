
import { GoogleGenAI, Type } from "@google/genai";
import { Language } from "../types";

export const getAITutorResponse = async (query: string, language: Language, context?: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const systemInstruction = `You are a professional coding tutor. 
  Your goal is to explain concepts related to Java and Python. 
  Always respond in ${language === 'te' ? 'Telugu' : 'English'}. 
  Be encouraging and concise.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Context: ${context || 'General coding query'}\nQuestion: ${query}`,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I am having trouble connecting to my knowledge base. Please try again later.";
  }
};
