
import React from 'react';
import { Video, Language } from '../types';
import { translations } from '../translations';
import VideoCard from './VideoCard';

interface FavoritesProps {
  videos: Video[];
  language: Language;
  onToggleFavorite: (id: string) => void;
  onToggleCart: (id: string) => void;
  cart: string[];
}

const Favorites: React.FC<FavoritesProps> = ({ videos, language, onToggleFavorite, onToggleCart, cart }) => {
  const t = translations[language];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-900">{t.favorites}</h1>
      {videos.length === 0 ? (
        <div className="text-center py-20 bg-slate-100 rounded-3xl">
          <p className="text-slate-400">No favorite videos yet. Start exploring!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map(video => (
            <VideoCard 
              key={video.id}
              video={video}
              language={language}
              isFavorite={true}
              isInCart={cart.includes(video.id)}
              onToggleFavorite={() => onToggleFavorite(video.id)}
              onToggleCart={() => onToggleCart(video.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
