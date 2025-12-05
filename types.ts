export interface UserInput {
  mood: string;
  confidence: number;
  fears: string;
  goals: string;
}

export interface CoachResponse {
  emotionalAnalysis: string;
  personalizedAdvice: string;
  affirmations: string[];
  habits: string[];
  dailyChallenge: string;
  journalPrompt: string;
  motivationalClosing: string;
}

export enum AppState {
  INPUT,
  LOADING,
  RESULT,
  ERROR
}