import React from 'react';
import { CoachResponse } from '../types';
import { Brain, Star, CheckCircle, Target, PenTool, RefreshCw } from 'lucide-react';

interface CoachingResultProps {
  response: CoachResponse;
  onReset: () => void;
}

const CoachingResult: React.FC<CoachingResultProps> = ({ response, onReset }) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* Header Section */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl shadow-cyan-100/50 border-l-8 border-cyan-400">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2 mb-4">
          <Brain className="text-cyan-500 w-8 h-8" />
          Here's the Vibe Check
        </h2>
        <p className="text-lg text-slate-600 leading-relaxed italic border-l-2 border-cyan-100 pl-4">
          "{response.emotionalAnalysis}"
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Advice Column */}
        <div className="space-y-6">
            {/* Advice */}
            <div className="bg-sky-50 rounded-3xl p-6 shadow-lg border border-sky-100 h-full">
                <h3 className="text-lg font-bold text-sky-700 mb-3 flex items-center gap-2">
                    <Star className="w-5 h-5 text-sky-500" /> Real Talk Advice
                </h3>
                <p className="text-slate-700 leading-relaxed">
                    {response.personalizedAdvice}
                </p>
            </div>

            {/* Habits */}
            <div className="bg-indigo-50 rounded-3xl p-6 shadow-lg border border-indigo-100">
                <h3 className="text-lg font-bold text-indigo-700 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-indigo-500" /> 3 Habits to Try
                </h3>
                <ul className="space-y-3">
                    {response.habits.map((habit, idx) => (
                        <li key={idx} className="flex items-start gap-3 bg-white p-3 rounded-xl shadow-sm border border-indigo-50">
                            <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-sm">
                                {idx + 1}
                            </span>
                            <span className="text-slate-700 text-sm font-medium">{habit}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

        {/* Action Column */}
        <div className="space-y-6">
             {/* Affirmations */}
             <div className="bg-gradient-to-tr from-cyan-500 to-blue-600 text-white rounded-3xl p-6 shadow-xl shadow-cyan-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/20 rounded-full blur-2xl"></div>
                <h3 className="text-lg font-bold text-white mb-4 relative z-10 flex items-center gap-2">
                    ⚡ Power Affirmations
                </h3>
                <ul className="space-y-3 relative z-10">
                    {response.affirmations.map((aff, idx) => (
                        <li key={idx} className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20 text-white font-medium text-center">
                            "{aff}"
                        </li>
                    ))}
                </ul>
            </div>

            {/* Daily Challenge */}
            <div className="bg-yellow-50 rounded-3xl p-6 shadow-lg border border-yellow-100">
                <h3 className="text-lg font-bold text-yellow-700 mb-2 flex items-center gap-2">
                    <Target className="w-5 h-5 text-yellow-500" /> Daily Challenge
                </h3>
                <p className="text-slate-800 font-medium">
                    {response.dailyChallenge}
                </p>
            </div>

             {/* Journal Prompt */}
             <div className="bg-teal-50 rounded-3xl p-6 shadow-lg border border-teal-100">
                <h3 className="text-lg font-bold text-teal-700 mb-2 flex items-center gap-2">
                    <PenTool className="w-5 h-5 text-teal-500" /> Journal This
                </h3>
                <p className="text-slate-800 italic">
                    "{response.journalPrompt}"
                </p>
            </div>
        </div>
      </div>

      {/* Footer / Motivational Closing */}
      <div className="text-center py-8">
        <p className="text-xl font-bold text-slate-400 mb-8 max-w-2xl mx-auto">
            {response.motivationalClosing}
        </p>
        <button 
            onClick={onReset}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-full font-semibold hover:bg-slate-50 hover:text-cyan-600 hover:border-cyan-200 transition-all shadow-sm"
        >
            <RefreshCw className="w-4 h-4" /> Start Over
        </button>
      </div>

    </div>
  );
};

export default CoachingResult;