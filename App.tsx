import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { UserInput, CoachResponse, AppState } from './types';
import { generateCoachingAdvice } from './services/geminiService';
import InputForm from './components/InputForm';
import CoachingResult from './components/CoachingResult';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.INPUT);
  const [response, setResponse] = useState<CoachResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFormSubmit = async (data: UserInput) => {
    setAppState(AppState.LOADING);
    setErrorMsg(null);
    try {
      const result = await generateCoachingAdvice(data);
      setResponse(result);
      setAppState(AppState.RESULT);
    } catch (err) {
      console.error(err);
      setErrorMsg("Whoops! Something went wrong connecting to your AI coach. Please try again.");
      setAppState(AppState.INPUT); // Or ERROR state, but letting them retry input is usually better UX
    }
  };

  const handleReset = () => {
    setResponse(null);
    setAppState(AppState.INPUT);
    setErrorMsg(null);
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden font-sans selection:bg-cyan-200">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-cyan-200 rounded-full blur-[120px] opacity-40 animate-pulse"></div>
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-fuchsia-200 rounded-full blur-[100px] opacity-40"></div>
        <div className="absolute -bottom-[10%] left-[20%] w-[60%] h-[40%] bg-yellow-100 rounded-full blur-[120px] opacity-60"></div>
      </div>

      {/* Header */}
      <header className="pt-8 pb-4 px-6 text-center">
        <div className="inline-flex items-center justify-center gap-2 bg-white/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/60 mb-4 shadow-sm">
          <Sparkles className="w-4 h-4 text-cyan-600" />
          <span className="text-sm font-semibold text-cyan-800 tracking-wide">AI LIFE COACH FOR TEENS</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-2">
          Zen<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">Teen</span>
        </h1>
        <p className="text-slate-500 max-w-md mx-auto">
          Your personal space to vent, plan, and level up.
        </p>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex flex-col items-center">
        {errorMsg && (
            <div className="mb-6 bg-red-50 text-red-600 px-4 py-3 rounded-lg border border-red-100 text-sm font-medium">
                {errorMsg}
            </div>
        )}

        {appState === AppState.INPUT && (
          <InputForm onSubmit={handleFormSubmit} />
        )}

        {appState === AppState.LOADING && (
          <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-500">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-400 blur-xl opacity-20 rounded-full"></div>
              <Loader2 className="w-16 h-16 text-cyan-500 animate-spin relative z-10" />
            </div>
            <h3 className="mt-8 text-xl font-semibold text-slate-800">Thinking...</h3>
            <p className="text-slate-500 mt-2">Crafting your perfect hype plan</p>
          </div>
        )}

        {appState === AppState.RESULT && response && (
          <CoachingResult response={response} onReset={handleReset} />
        )}
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-slate-400 text-sm">
        <p>© {new Date().getFullYear()} ZenTeen. Built with Gemini AI.</p>
      </footer>
    </div>
  );
};

export default App;