
import { TranslationKeys, Language } from './types';

export const translations: Record<Language, Record<TranslationKeys, string>> = {
  en: {
    welcome: 'Welcome to EduStream',
    signup: 'Sign Up',
    login: 'Login',
    username: 'Username',
    password: 'Password',
    email: 'Email Address',
    selectLanguage: 'Choose Language',
    java: 'Java Programming',
    python: 'Python Programming',
    addToFavorite: 'Add to Favorite',
    addToCart: 'Add to Cart',
    favorites: 'My Favorites',
    cart: 'My Cart',
    logout: 'Logout',
    basicClasses: 'Basic Classes',
    aiTutor: 'AI Tutor Assistant',
    askSomething: 'Ask a question...',
    explainVideo: 'Explain this topic',
    alreadyHaveAccount: 'Already have an account? Login',
    noAccount: "Don't have an account? Sign Up"
  },
  te: {
    welcome: 'EduStream కి స్వాగతం',
    signup: 'సైన్ అప్',
    login: 'లాగిన్',
    username: 'వినియోగదారు పేరు',
    password: 'పాస్‌వర్డ్',
    email: 'ఈమెయిల్ చిరునామా',
    selectLanguage: 'భాషను ఎంచుకోండి',
    java: 'జావా ప్రోగ్రామింగ్',
    python: 'పైథాన్ ప్రోగ్రామింగ్',
    addToFavorite: 'ఇష్టమైన వాటికి జోడించు',
    addToCart: 'కార్ట్‌కు జోడించు',
    favorites: 'నా ఇష్టమైనవి',
    cart: 'నా కార్ట్',
    logout: 'లాగ్ అవుట్',
    basicClasses: 'ప్రాథమిక తరగతులు',
    aiTutor: 'AI ట్యూటర్ అసిస్టెంట్',
    askSomething: 'ఒక ప్రశ్న అడగండి...',
    explainVideo: 'ఈ అంశాన్ని వివరించండి',
    alreadyHaveAccount: 'ఇప్పటికే ఖాతా ఉందా? లాగిన్ అవ్వండి',
    noAccount: 'ఖాతా లేదా? సైన్ అప్ చేయండి'
  }
};
