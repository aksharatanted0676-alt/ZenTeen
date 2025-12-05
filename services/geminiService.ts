import { GoogleGenAI, Type } from "@google/genai";
import { UserInput, CoachResponse } from "../types";

const apiKey = process.env.API_KEY;

// Initialize the client
// We create the instance inside the function or globally if the key is static. 
// Since the prompt instructs to use process.env.API_KEY directly:
const ai = new GoogleGenAI({ apiKey: apiKey });

export const generateCoachingAdvice = async (input: UserInput): Promise<CoachResponse> => {
  if (!apiKey) {
    throw new Error("API Key is missing.");
  }

  const prompt = `
    User Profile:
    - Current Mood: ${input.mood}
    - Confidence Level: ${input.confidence}/10
    - Current Fears/Worries: ${input.fears}
    - Main Goals: ${input.goals}

    You are an AI Life Coach for Teenagers. Speak in a supportive, friendly, and non-judgmental tone. 
    Your goal is to help teens understand their emotions and build confidence.
    Do not sound like a therapist — sound like a friendly coach or mentor.
    Keep the total response concise (under 300 words roughly).
    
    Provide the following structured output:
    1. A short emotional analysis based on the user's current mood.
    2. Personalized advice that is realistic and actionable.
    3. 3 Confidence-boosting affirmations written in first person ("I am...").
    4. 3 specific habits the user can follow to improve their well-being.
    5. One daily challenge that helps them step out of their comfort zone safely.
    6. A journal prompt for self-reflection.
    7. One motivational closing line starting with "Remember:".
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are a helpful, empathetic, and cool AI life coach for teenagers.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            emotionalAnalysis: { type: Type.STRING },
            personalizedAdvice: { type: Type.STRING },
            affirmations: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            habits: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            dailyChallenge: { type: Type.STRING },
            journalPrompt: { type: Type.STRING },
            motivationalClosing: { type: Type.STRING },
          },
          required: [
            "emotionalAnalysis", 
            "personalizedAdvice", 
            "affirmations", 
            "habits", 
            "dailyChallenge", 
            "journalPrompt", 
            "motivationalClosing"
          ]
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) {
      throw new Error("No response received from AI.");
    }

    const data = JSON.parse(jsonText) as CoachResponse;
    return data;

  } catch (error) {
    console.error("Error generating coaching advice:", error);
    throw error;
  }
};