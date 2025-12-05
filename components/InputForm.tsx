import React, { useState } from 'react';
import { UserInput } from '../types';
import { Sparkles, ArrowRight, Frown, Meh, Smile, Heart, Zap } from 'lucide-react';

interface InputFormProps {
  onSubmit: (data: UserInput) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
  const [mood, setMood] = useState('Okay');
  const [confidence, setConfidence] = useState(5);
  const [fears, setFears] = useState('');
  const [goals, setGoals] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ mood, confidence, fears, goals });
  };

  const moods = [
    { label: 'Stressed', icon: <Frown className="w-6 h-6" /> },
    { label: 'Sad', icon: <Heart className="w-6 h-6" /> }, // Heart for sensitivity
    { label: 'Okay', icon: <Meh className="w-6 h-6" /> },
    { label: 'Happy', icon: <Smile className="w-6 h-6" /> },
    { label: 'Excited', icon: <Zap className="w-6 h-6" /> },
  ];

  return (
    <div className="w-full max-w-xl mx-auto bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl shadow-cyan-100/50 p-6 md:p-10 border border-white">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Let's Check In</h2>
        <p className="text-slate-500">No judgment, just vibes. How are things really going?</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Mood Selection */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide">Current Mood</label>
          <div className="grid grid-cols-5 gap-2">
            {moods.map((m) => (
              <button
                key={m.label}
                type="button"
                onClick={() => setMood(m.label)}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-200 ${
                  mood === m.label 
                    ? 'bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-lg shadow-cyan-200 scale-105' 
                    : 'bg-white border-2 border-slate-50 text-slate-400 hover:bg-cyan-50 hover:border-cyan-100 hover:text-cyan-500'
                }`}
              >
                {m.icon}
                <span className="text-xs mt-1 font-medium">{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Confidence Slider */}
        <div className="space-y-3">
          <div className="flex justify-between items-end">
             <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide">Confidence Level</label>
             <span className="text-cyan-600 font-bold text-lg">{confidence}/10</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={confidence}
            onChange={(e) => setConfidence(parseInt(e.target.value))}
            className="w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-cyan-500 hover:accent-cyan-400 transition-all"
          />
          <div className="flex justify-between text-xs text-slate-400 font-medium">
            <span>Not feeling it</span>
            <span>Unstoppable</span>
          </div>
        </div>

        {/* Text Areas */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="fears" className="block text-sm font-semibold text-slate-700 uppercase tracking-wide">
              What's worrying you?
            </label>
            <textarea
              id="fears"
              rows={3}
              value={fears}
              onChange={(e) => setFears(e.target.value)}
              placeholder="Ex: Upcoming exams, drama with friends, feeling lonely..."
              className="w-full p-4 bg-white border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-cyan-100 focus:border-cyan-400 outline-none transition-all placeholder:text-slate-300 resize-none text-slate-700"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="goals" className="block text-sm font-semibold text-slate-700 uppercase tracking-wide">
              What do you want to achieve?
            </label>
            <textarea
              id="goals"
              rows={3}
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              placeholder="Ex: Be more social, get better grades, feel happier..."
              className="w-full p-4 bg-white border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-cyan-100 focus:border-cyan-400 outline-none transition-all placeholder:text-slate-300 resize-none text-slate-700"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold text-lg shadow-xl shadow-cyan-200 hover:shadow-cyan-300 transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group"
        >
          <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
          Get My Hype Plan
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </form>
    </div>
  );
};

export default InputForm;