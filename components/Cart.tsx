
import React from 'react';
import { Video, Language } from '../types';
import { translations } from '../translations';

interface CartProps {
  videos: Video[];
  language: Language;
  onRemove: (id: string) => void;
}

const Cart: React.FC<CartProps> = ({ videos, language, onRemove }) => {
  const t = translations[language];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-slate-900">{t.cart}</h1>
      {videos.length === 0 ? (
        <div className="text-center py-20 bg-slate-100 rounded-3xl">
          <p className="text-slate-400">Your cart is empty.</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          <div className="p-6 space-y-6">
            {videos.map(video => (
              <div key={video.id} className="flex items-center gap-4 py-4 border-b last:border-0">
                <img 
                  src={`https://img.youtube.com/vi/${video.youtubeId}/default.jpg`} 
                  alt={video.title[language]} 
                  className="w-24 h-16 object-cover rounded-xl"
                />
                <div className="flex-grow">
                  <h3 className="font-bold text-slate-800">{video.title[language]}</h3>
                  <p className="text-xs text-slate-500">{video.category}</p>
                </div>
                <button 
                  onClick={() => onRemove(video.id)}
                  className="text-pink-500 hover:text-pink-700 p-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          <div className="bg-slate-50 p-6 flex justify-between items-center">
            <span className="text-slate-600 font-medium">Total Items: {videos.length}</span>
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
