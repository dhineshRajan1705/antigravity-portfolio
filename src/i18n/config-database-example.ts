// ============================================================================
// DATABASE-DRIVEN i18n CONFIGURATION EXAMPLE
// ============================================================================
// This file shows how to modify the i18n setup to load translations from a database
// instead of static JSON files. Uncomment and adapt based on your backend setup.
// ============================================================================

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// ============================================================================
// OPTION 1: Load translations from API on initialization
// ============================================================================

// API service to fetch translations from your database
const translationsAPI = {
  // Fetch all translations for a specific language
  async fetchTranslations(language: string) {
    try {
      const response = await fetch(`/api/translations/${language}`);
      if (!response.ok) throw new Error('Failed to fetch translations');
      return await response.json();
    } catch (error) {
      console.error(`Error fetching translations for ${language}:`, error);
      return null;
    }
  },

  // Fetch all available languages
  async fetchAvailableLanguages() {
    try {
      const response = await fetch('/api/translations/languages');
      if (!response.ok) throw new Error('Failed to fetch languages');
      return await response.json(); // Returns: ['en', 'es', 'fr', etc.]
    } catch (error) {
      console.error('Error fetching available languages:', error);
      return ['en']; // Fallback to English only
    }
  }
};

// ============================================================================
// Initialize i18n with database translations
// ============================================================================

export async function initializeI18nFromDatabase() {
  // Fetch available languages from database
  const availableLanguages = await translationsAPI.fetchAvailableLanguages();
  
  // Fetch translations for all languages
  const resources: Record<string, any> = {};
  for (const lang of availableLanguages) {
    const translations = await translationsAPI.fetchTranslations(lang);
    if (translations) {
      resources[lang] = { translation: translations };
    }
  }

  // Initialize i18n with fetched resources
  await i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage'],
      },
    });

  return i18n;
}

// ============================================================================
// OPTION 2: Lazy load translations from API when language changes
// ============================================================================

export function initializeI18nWithLazyLoading() {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      // Start with empty resources
      resources: {},
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage'],
      },
    });

  // Load translations for current language
  loadLanguageTranslations(i18n.language);

  // Listen for language changes and load translations
  i18n.on('languageChanged', (lng) => {
    loadLanguageTranslations(lng);
  });

  return i18n;
}

async function loadLanguageTranslations(language: string) {
  // Check if translations are already loaded
  if (i18n.hasResourceBundle(language, 'translation')) {
    return;
  }

  // Fetch translations from database
  const translations = await translationsAPI.fetchTranslations(language);
  
  if (translations) {
    // Add translations to i18n
    i18n.addResourceBundle(language, 'translation', translations, true, true);
  }
}

// ============================================================================
// OPTION 3: Use i18next-http-backend plugin (recommended for production)
// ============================================================================
// Install: npm install i18next-http-backend

/*
import Backend from 'i18next-http-backend';

i18n
  .use(Backend) // Add backend plugin
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    
    // Backend configuration
    backend: {
      // URL pattern to load translations
      loadPath: '/api/translations/{{lng}}',
      
      // Custom request headers (e.g., authentication)
      customHeaders: {
        'Authorization': 'Bearer YOUR_TOKEN',
      },
      
      // Parse response
      parse: (data: string) => JSON.parse(data),
      
      // Request options
      requestOptions: {
        mode: 'cors',
        credentials: 'same-origin',
        cache: 'default',
      },
    },
    
    interpolation: {
      escapeValue: false,
    },
  });
*/

// ============================================================================
// DATABASE SCHEMA EXAMPLE
// ============================================================================
/*
-- SQL Table Structure for Translations

CREATE TABLE languages (
  code VARCHAR(10) PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  flag_emoji VARCHAR(10),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE translation_keys (
  id SERIAL PRIMARY KEY,
  key_path VARCHAR(255) UNIQUE NOT NULL, -- e.g., 'hero.greeting'
  section VARCHAR(50), -- e.g., 'hero', 'projects', 'contact'
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE translations (
  id SERIAL PRIMARY KEY,
  language_code VARCHAR(10) REFERENCES languages(code),
  key_id INTEGER REFERENCES translation_keys(id),
  translation_text TEXT NOT NULL,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_by VARCHAR(100),
  UNIQUE(language_code, key_id)
);

-- Sample Data
INSERT INTO languages (code, name, flag_emoji) VALUES 
  ('en', 'English', '🇬🇧'),
  ('es', 'Español', '🇪🇸'),
  ('fr', 'Français', '🇫🇷');

INSERT INTO translation_keys (key_path, section, description) VALUES 
  ('hero.greeting', 'hero', 'Hero section greeting text'),
  ('hero.name', 'hero', 'User name in hero section'),
  ('hero.badge', 'hero', 'Availability badge text');

INSERT INTO translations (language_code, key_id, translation_text) VALUES 
  ('en', 1, 'Hi, I''m'),
  ('es', 1, 'Hola, soy'),
  ('fr', 1, 'Bonjour, je suis');
*/

// ============================================================================
// BACKEND API ENDPOINTS EXAMPLE (Node.js/Express)
// ============================================================================
/*
// app.js or routes/translations.js

import express from 'express';
import db from './database'; // Your database connection

const router = express.Router();

// GET /api/translations/:language
// Returns all translations for a specific language
router.get('/translations/:language', async (req, res) => {
  try {
    const { language } = req.params;
    
    // Query database to get translations
    const query = `
      SELECT 
        tk.key_path,
        t.translation_text
      FROM translations t
      JOIN translation_keys tk ON t.key_id = tk.id
      WHERE t.language_code = $1
      ORDER BY tk.key_path
    `;
    
    const result = await db.query(query, [language]);
    
    // Convert flat structure to nested object
    const translations = {};
    result.rows.forEach(row => {
      const keys = row.key_path.split('.');
      let current = translations;
      
      keys.forEach((key, index) => {
        if (index === keys.length - 1) {
          current[key] = row.translation_text;
        } else {
          current[key] = current[key] || {};
          current = current[key];
        }
      });
    });
    
    res.json(translations);
  } catch (error) {
    console.error('Error fetching translations:', error);
    res.status(500).json({ error: 'Failed to fetch translations' });
  }
});

// GET /api/translations/languages
// Returns list of available languages
router.get('/translations/languages', async (req, res) => {
  try {
    const query = `
      SELECT code, name, flag_emoji
      FROM languages
      WHERE is_active = true
      ORDER BY code
    `;
    
    const result = await db.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching languages:', error);
    res.status(500).json({ error: 'Failed to fetch languages' });
  }
});

// POST /api/translations
// Create or update a translation (for admin panel)
router.post('/translations', async (req, res) => {
  try {
    const { language_code, key_path, translation_text } = req.body;
    
    // Get or create translation key
    let keyResult = await db.query(
      'SELECT id FROM translation_keys WHERE key_path = $1',
      [key_path]
    );
    
    let keyId;
    if (keyResult.rows.length === 0) {
      // Create new key
      const newKey = await db.query(
        'INSERT INTO translation_keys (key_path) VALUES ($1) RETURNING id',
        [key_path]
      );
      keyId = newKey.rows[0].id;
    } else {
      keyId = keyResult.rows[0].id;
    }
    
    // Upsert translation
    await db.query(`
      INSERT INTO translations (language_code, key_id, translation_text)
      VALUES ($1, $2, $3)
      ON CONFLICT (language_code, key_id)
      DO UPDATE SET 
        translation_text = $3,
        last_updated = CURRENT_TIMESTAMP
    `, [language_code, keyId, translation_text]);
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error saving translation:', error);
    res.status(500).json({ error: 'Failed to save translation' });
  }
});

export default router;
*/

// ============================================================================
// USAGE IN APP.tsx
// ============================================================================
/*
import { Suspense, useEffect, useState } from 'react';
import { initializeI18nFromDatabase } from '@/i18n/config-database';

function App() {
  const [i18nReady, setI18nReady] = useState(false);

  useEffect(() => {
    // Initialize i18n with database translations
    initializeI18nFromDatabase().then(() => {
      setI18nReady(true);
    });
  }, []);

  if (!i18nReady) {
    return <div>Loading translations...</div>;
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background font-sans transition-colors duration-300">
        <Toaster position="top-center" richColors />
        <Background3D />
        <Header />
        <main>
          <Hero />
          <Experience />
          <Skills />
          <Projects />
          <Contact />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
*/

// ============================================================================
// CACHING STRATEGIES
// ============================================================================

// 1. Cache translations in localStorage
export function cacheTranslations(language: string, translations: any) {
  const cacheKey = `i18n_cache_${language}`;
  const cacheData = {
    timestamp: Date.now(),
    translations,
  };
  localStorage.setItem(cacheKey, JSON.stringify(cacheData));
}

export function getCachedTranslations(language: string, maxAge = 3600000) { // 1 hour
  const cacheKey = `i18n_cache_${language}`;
  const cached = localStorage.getItem(cacheKey);
  
  if (!cached) return null;
  
  const cacheData = JSON.parse(cached);
  const age = Date.now() - cacheData.timestamp;
  
  if (age > maxAge) {
    localStorage.removeItem(cacheKey);
    return null;
  }
  
  return cacheData.translations;
}

// 2. Service Worker caching for offline support
/*
// In your service-worker.js
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/api/translations/')) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request).then((response) => {
          return caches.open('translations-v1').then((cache) => {
            cache.put(event.request, response.clone());
            return response;
          });
        });
      })
    );
  }
});
*/

// ============================================================================
// ADMIN PANEL COMPONENT EXAMPLE
// ============================================================================
/*
import { useState, useEffect } from 'react';

export function TranslationAdmin() {
  const [languages, setLanguages] = useState([]);
  const [selectedLang, setSelectedLang] = useState('en');
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    // Load languages
    fetch('/api/translations/languages')
      .then(res => res.json())
      .then(setLanguages);
  }, []);

  useEffect(() => {
    // Load translations for selected language
    fetch(`/api/translations/${selectedLang}`)
      .then(res => res.json())
      .then(setTranslations);
  }, [selectedLang]);

  const updateTranslation = async (keyPath: string, value: string) => {
    await fetch('/api/translations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language_code: selectedLang,
        key_path: keyPath,
        translation_text: value,
      }),
    });
  };

  return (
    <div>
      <select value={selectedLang} onChange={(e) => setSelectedLang(e.target.value)}>
        {languages.map(lang => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>

      {Object.entries(translations).map(([section, content]) => (
        <div key={section}>
          <h2>{section}</h2>
          {renderTranslationInputs(content, section, updateTranslation)}
        </div>
      ))}
    </div>
  );
}

function renderTranslationInputs(obj: any, prefix: string, onUpdate: Function) {
  return Object.entries(obj).map(([key, value]) => {
    const keyPath = `${prefix}.${key}`;
    
    if (typeof value === 'object') {
      return renderTranslationInputs(value, keyPath, onUpdate);
    }
    
    return (
      <div key={keyPath}>
        <label>{keyPath}</label>
        <input
          type="text"
          value={value}
          onChange={(e) => onUpdate(keyPath, e.target.value)}
        />
      </div>
    );
  });
}
*/

export default i18n;
