import React from 'react';

export default function Navbar({ lang, setLang, theme, toggleTheme, t }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/90 dark:bg-black/90 border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-black dark:border-white flex items-center justify-center font-bold text-sm tracking-tight transition-transform hover:scale-105">
            QA
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
            <span className="font-semibold text-base tracking-tight">{t.appTitle}</span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400 px-2 py-0.5 rounded-full border border-neutral-300 dark:border-neutral-700 w-fit">
              {t.edition}
            </span>
          </div>
        </div>

        {/* Controls: Language Selector & Theme Toggle */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Language Selector Pill */}
          <div className="relative">
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="appearance-none bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-xs sm:text-sm font-medium py-1.5 pl-3 pr-7 rounded-full cursor-pointer focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-colors"
              aria-label="Select Language"
            >
              <option value="en">English (EN)</option>
              <option value="hi">हिन्दी (HI)</option>
              <option value="pt">Português (PT)</option>
              <option value="es">Español (ES)</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-500">
              <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
              </svg>
            </div>
          </div>

          {/* Theme Switcher Pill Button */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1.5 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-xs sm:text-sm font-medium py-1.5 px-3.5 rounded-full transition-all cursor-pointer"
            aria-label="Toggle Night and Light Mode"
          >
            <span>{theme === 'dark' ? '☀️' : '🌙'}</span>
            <span className="hidden sm:inline">
              {theme === 'dark' ? t.themeLight : t.themeDark}
            </span>
          </button>

        </div>
      </div>
    </header>
  );
}
