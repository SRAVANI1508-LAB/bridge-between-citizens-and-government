
import React, { useState, useRef, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { getAITutorResponse } from '../services/geminiService';

interface AITutorProps {
  language: Language;
  onClose: () => void;
}

const AITutor: React.FC<AITutorProps> = ({ language, onClose }) => {
  const t = translations[language];
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: language === 'en' ? 'Hi! I am your AI Coding Tutor. How can I help you with Java or Python today?' : 'నమస్కారం! నేను మీ AI కోడింగ్ ట్యూటర్ని. జావా లేదా పైథాన్‌తో ఈరోజు మీకు నేను ఎలా సహాయపడగలను?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    const aiResponse = await getAITutorResponse(userText, language);
    setMessages(prev => [...prev, { role: 'ai', text: aiResponse || '...' }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-24 right-6 w-[350px] md:w-[400px] h-[500px] bg-white rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden border border-indigo-100 animate-in slide-in-from-bottom-5">
      <div className="bg-indigo-600 p-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-sm">🤖</span>
          </div>
          <span className="font-semibold">{t.aiTutor}</span>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm ${m.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none'}`}>
              {m.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 px-4 py-2 rounded-2xl text-xs text-slate-400 flex gap-1">
              <span className="animate-bounce">.</span>
              <span className="animate-bounce delay-100">.</span>
              <span className="animate-bounce delay-200">.</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t bg-white">
        <div className="relative">
          <input 
            type="text"
            className="w-full pl-4 pr-12 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder={t.askSomething}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            disabled={isLoading}
            className="absolute right-2 top-2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AITutor;
