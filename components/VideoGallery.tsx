
import React from 'react';
import { Video, Language } from '../types';
import { translations } from '../translations';
import VideoCard from './VideoCard';

interface VideoGalleryProps {
  videos: Video[];
  language: Language;
  favorites: string[];
  cart: string[];
  onToggleFavorite: (id: string) => void;
  onToggleCart: (id: string) => void;
}

const VideoGallery: React.FC<VideoGalleryProps> = ({ 
  videos, 
  language, 
  favorites, 
  cart, 
  onToggleFavorite, 
  onToggleCart 
}) => {
  const t = translations[language];

  return (
    <div className="space-y-12">
      <header className="max-w-3xl">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">{t.basicClasses}</h1>
        <p className="text-lg text-slate-600">Start your coding journey today with our curated fundamental courses in Java and Python.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {videos.map(video => (
          <VideoCard 
            key={video.id}
            video={video}
            language={language}
            isFavorite={favorites.includes(video.id)}
            isInCart={cart.includes(video.id)}
            onToggleFavorite={() => onToggleFavorite(video.id)}
            onToggleCart={() => onToggleCart(video.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoGallery;
