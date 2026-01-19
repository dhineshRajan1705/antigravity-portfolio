import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// ============================================================================
// CURRENT SETUP: Static JSON files (recommended for small apps)
// ============================================================================
import enTranslations from './locales/en.json';
import esTranslations from './locales/es.json';
import frTranslations from './locales/fr.json';
import taTranslations from './locales/ta.json';
import hiTranslations from './locales/hi.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      es: { translation: esTranslations },
      fr: { translation: frTranslations },
      ta: { translation: taTranslations },
      hi: { translation: hiTranslations },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

// ============================================================================
// DATABASE-DRIVEN APPROACH (see config-database-example.ts for full implementation)
// ============================================================================
// If you want to load translations from a database instead of JSON files:
// 
// 1. Install i18next-http-backend:
//    npm install i18next-http-backend
//
// 2. Replace the above code with:
/*
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    backend: {
      // Your API endpoint that returns translations
      loadPath: '/api/translations/{{lng}}',
      
      // Optional: Add custom headers (e.g., authentication)
      customHeaders: {
        'Authorization': 'Bearer YOUR_TOKEN',
      },
      
      // Optional: Parse the response
      parse: (data) => JSON.parse(data),
    },
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });
*/

// 3. Your backend API should return translations in this format:
/*
// GET /api/translations/en
{
  "hero": {
    "greeting": "Hi, I'm",
    "badge": "Available for new opportunities",
    ...
  },
  "experience": {
    "title": "Work Experience",
    ...
  },
  ...
}
*/

// 4. See config-database-example.ts for:
//    - Complete database schema (SQL)
//    - Backend API endpoints (Node.js/Express)
//    - Caching strategies
//    - Admin panel component
//    - Multiple loading approaches

export default i18n;
