
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

export class GeminiService {
  private ai: any;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async generateResponse(history: { role: string; parts: { text: string }[] }[], prompt: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          ...history.map(h => ({ role: h.role === 'model' ? 'model' : 'user', parts: [{ text: h.parts[0].text }] })),
          { role: "user", parts: [{ text: prompt }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.2, // Lower temperature for more factual engineering data
          topP: 0.8,
          topK: 40,
        },
      });

      return response.text || "I'm sorry, I couldn't process that technical request at the moment.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      if (error instanceof Error && error.message.includes("Requested entity was not found")) {
          return "API Key Error: Please ensure a valid paid API key is selected.";
      }
      return "An error occurred while communicating with the technical database. Please try again.";
    }
  }
}

export const geminiService = new GeminiService();
