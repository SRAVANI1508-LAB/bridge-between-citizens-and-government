
import React, { useState } from 'react';
import { Video, Language } from '../types';
import { translations } from '../translations';

interface VideoCardProps {
  video: Video;
  language: Language;
  isFavorite: boolean;
  isInCart: boolean;
  onToggleFavorite: () => void;
  onToggleCart: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ 
  video, 
  language, 
  isFavorite, 
  isInCart, 
  onToggleFavorite, 
  onToggleCart 
}) => {
  const t = translations[language];
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden group transition-all hover:shadow-2xl">
      <div className="relative aspect-video bg-slate-200">
        {!isPlaying ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <img 
              src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`} 
              alt={video.title[language]} 
              className="w-full h-full object-cover opacity-80"
            />
            <button 
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 flex items-center justify-center group-hover:bg-black/10 transition-all"
            >
              <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          </div>
        ) : (
          <iframe 
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
            title={video.title[language]}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${video.category === 'Java' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
            {video.category}
          </span>
          <button 
            onClick={onToggleFavorite}
            className={`p-2 rounded-full transition-all ${isFavorite ? 'bg-pink-50 text-pink-600' : 'text-slate-400 hover:bg-slate-100'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={isFavorite ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">
          {video.title[language]}
        </h3>
        <p className="text-slate-500 text-sm mb-6 line-clamp-2">
          {video.description[language]}
        </p>

        <div className="flex items-center gap-4">
          <button 
            onClick={onToggleCart}
            className={`flex-grow py-3 px-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${isInCart ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            {isInCart ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Added
              </>
            ) : t.addToCart}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
