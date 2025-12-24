
import React from 'react';
import { Language, TranslationKeys } from '../types';
import { translations } from '../translations';

interface NavbarProps {
  activeTab: 'home' | 'favorites' | 'cart';
  setActiveTab: (tab: 'home' | 'favorites' | 'cart') => void;
  onLogout: () => void;
  language: Language;
  cartCount: number;
  favCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ 
  activeTab, 
  setActiveTab, 
  onLogout, 
  language,
  cartCount,
  favCount
}) => {
  const t = translations[language];

  return (
    <nav className="bg-white border-b sticky top-0 z-40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="text-2xl font-bold text-indigo-600 cursor-pointer flex items-center gap-2"
          onClick={() => setActiveTab('home')}
        >
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
             <span className="text-white text-xs">ES</span>
          </div>
          EduStream
        </div>

        <div className="hidden md:flex items-center gap-6">
          <button 
            onClick={() => setActiveTab('home')}
            className={`font-medium transition-colors ${activeTab === 'home' ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-500'}`}
          >
            {t.welcome}
          </button>
          
          <button 
            onClick={() => setActiveTab('favorites')}
            className={`font-medium transition-colors flex items-center gap-1 ${activeTab === 'favorites' ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-500'}`}
          >
            {t.favorites}
            {favCount > 0 && <span className="bg-indigo-100 text-indigo-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full">{favCount}</span>}
          </button>

          <button 
            onClick={() => setActiveTab('cart')}
            className={`font-medium transition-colors flex items-center gap-1 ${activeTab === 'cart' ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-500'}`}
          >
            {t.cart}
            {cartCount > 0 && <span className="bg-emerald-100 text-emerald-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full">{cartCount}</span>}
          </button>
        </div>

        <button 
          onClick={onLogout}
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          {t.logout}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
