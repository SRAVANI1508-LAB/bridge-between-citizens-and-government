
import React, { useState } from 'react';
import { Language, User } from '../types';
import { translations } from '../translations';

interface AuthFormProps {
  onAuth: (user: User) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onAuth, language, setLanguage }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const t = translations[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth logic
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: formData.email || 'user@example.com',
      username: formData.username || 'Student',
      language: language
    };
    onAuth(mockUser);
  };

  return (
    <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 transform transition-all">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">{t.welcome}</h1>
        <p className="text-slate-500">{isLogin ? t.login : t.signup}</p>
      </div>

      <div className="flex justify-center gap-4 mb-8">
        <button 
          onClick={() => setLanguage('en')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${language === 'en' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        >
          English
        </button>
        <button 
          onClick={() => setLanguage('te')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${language === 'te' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        >
          తెలుగు
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{t.username}</label>
            <input 
              type="text" 
              required 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              placeholder="e.g. JohnDoe"
            />
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">{t.email}</label>
          <input 
            type="email" 
            required 
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">{t.password}</label>
          <input 
            type="password" 
            required 
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            placeholder="••••••••"
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] mt-4"
        >
          {isLogin ? t.login : t.signup}
        </button>
      </form>

      <div className="mt-8 text-center">
        <button 
          onClick={() => setIsLogin(!isLogin)}
          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
        >
          {isLogin ? t.noAccount : t.alreadyHaveAccount}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
