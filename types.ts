
export type Language = 'en' | 'te';

export interface User {
  id: string;
  email: string;
  username: string;
  language: Language;
}

export interface Video {
  id: string;
  title: { en: string; te: string };
  description: { en: string; te: string };
  url: string;
  youtubeId: string;
  category: 'Java' | 'Python';
}

export interface AppState {
  user: User | null;
  language: Language;
  favorites: string[]; // video ids
  cart: string[]; // video ids
}

export type TranslationKeys = 
  | 'welcome' | 'signup' | 'login' | 'username' | 'password' | 'email' 
  | 'selectLanguage' | 'java' | 'python' | 'addToFavorite' | 'addToCart' 
  | 'favorites' | 'cart' | 'logout' | 'basicClasses' | 'aiTutor' 
  | 'askSomething' | 'explainVideo' | 'alreadyHaveAccount' | 'noAccount';
