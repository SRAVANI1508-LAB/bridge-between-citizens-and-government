
import React, { useState, useEffect, useCallback } from 'react';
import { User, Language, AppState, Video } from './types';
import { translations } from './translations';
import { VIDEOS } from './constants';
import AuthForm from './components/AuthForm';
import VideoGallery from './components/VideoGallery';
import Navbar from './components/Navbar';
import Favorites from './components/Favorites';
import Cart from './components/Cart';
import AITutor from './components/AITutor';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    user: null,
    language: 'en',
    favorites: [],
    cart: [],
  });
  const [activeTab, setActiveTab] = useState<'home' | 'favorites' | 'cart'>('home');
  const [showTutor, setShowTutor] = useState(false);

  const t = translations[state.language];

  // Load state from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('edustream_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      setState(prev => ({ ...prev, ...parsed }));
    }
  }, []);

  // Save state to local storage when it changes
  useEffect(() => {
    localStorage.setItem('edustream_state', JSON.stringify(state));
  }, [state]);

  const handleAuth = (user: User) => {
    setState(prev => ({ ...prev, user, language: user.language }));
  };

  const handleLogout = () => {
    setState(prev => ({ ...prev, user: null }));
    setActiveTab('home');
  };

  const toggleFavorite = (id: string) => {
    setState(prev => ({
      ...prev,
      favorites: prev.favorites.includes(id) 
        ? prev.favorites.filter(fid => fid !== id) 
        : [...prev.favorites, id]
    }));
  };

  const toggleCart = (id: string) => {
    setState(prev => ({
      ...prev,
      cart: prev.cart.includes(id) 
        ? prev.cart.filter(cid => cid !== id) 
        : [...prev.cart, id]
    }));
  };

  const handleLanguageChange = (lang: Language) => {
    setState(prev => ({ ...prev, language: lang }));
  };

  if (!state.user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center p-4">
        <AuthForm 
          onAuth={handleAuth} 
          language={state.language} 
          setLanguage={handleLanguageChange} 
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={handleLogout} 
        language={state.language}
        cartCount={state.cart.length}
        favCount={state.favorites.length}
      />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
        {activeTab === 'home' && (
          <VideoGallery 
            videos={VIDEOS} 
            language={state.language}
            favorites={state.favorites}
            cart={state.cart}
            onToggleFavorite={toggleFavorite}
            onToggleCart={toggleCart}
          />
        )}
        {activeTab === 'favorites' && (
          <Favorites 
            videos={VIDEOS.filter(v => state.favorites.includes(v.id))} 
            language={state.language}
            onToggleFavorite={toggleFavorite}
            onToggleCart={toggleCart}
            cart={state.cart}
          />
        )}
        {activeTab === 'cart' && (
          <Cart 
            videos={VIDEOS.filter(v => state.cart.includes(v.id))} 
            language={state.language}
            onRemove={toggleCart}
          />
        )}
      </main>

      {/* Floating AI Tutor Toggle */}
      <button 
        onClick={() => setShowTutor(!showTutor)}
        className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-xl transition-all hover:scale-110 z-50 flex items-center gap-2"
      >
        <span className="font-medium">{t.aiTutor}</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>

      {showTutor && (
        <AITutor 
          language={state.language} 
          onClose={() => setShowTutor(false)} 
        />
      )}

      <footer className="bg-white border-t py-6 text-center text-slate-500">
        <p>&copy; 2024 EduStream Learning Platform</p>
      </footer>
    </div>
  );
};

export default App;
