import React, { useState } from 'react';
import { Language, translations } from '../translations';

interface NavbarProps {
  currentLang: Language;
  onToggleLang: () => void;
  activeTab: 'home' | 'quiz' | 'themed' | 'tools' | 'blog' | 'article' | 'about' | 'mentions' | 'confidentialite' | '404';
  onNavigate: (tab: 'home' | 'quiz' | 'themed' | 'tools' | 'blog' | 'about' | 'mentions' | 'confidentialite' | '404') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onToggleLang,
  activeTab,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[currentLang];

  const handleNavClick = (tab: 'home' | 'quiz' | 'themed' | 'tools' | 'blog' | 'about' | 'mentions' | 'confidentialite' | '404') => {
    onNavigate(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-off-white/95 backdrop-blur-md border-b border-powder transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18 lg:h-20 gap-2 md:gap-2.5 lg:gap-4">
          {/* Brand Logo */}
          <button
            id="nav-logo"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 md:gap-2.5 group cursor-pointer focus:outline-none shrink-0"
            aria-label="LoveQuiz Home"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full bg-powder border border-coral/30 flex items-center justify-center transition-transform group-hover:scale-105 shadow-xs">
              <svg className="w-4 h-4 md:w-4 md:h-4 lg:w-5 lg:h-5 fill-coral group-hover:fill-coral-dark transition-colors group-hover:animate-heartbeat" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-bold text-lg sm:text-xl md:text-xl lg:text-2xl tracking-tight text-deep-black group-hover:text-coral transition-colors">
                Love<span className="text-coral">Quiz</span>
              </span>
            </div>
          </button>

          {/* Desktop & Tablet Navigation Links */}
          <nav className="hidden md:flex items-center gap-0.5 md:gap-1 lg:gap-1.5 xl:gap-2 shrink min-w-0">
            <button
              id="nav-home-btn"
              onClick={() => handleNavClick('home')}
              className={`text-xs lg:text-sm font-semibold px-2 lg:px-3 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'home'
                  ? 'bg-light-pink text-coral font-bold'
                  : 'text-text-gray hover:text-deep-black hover:bg-powder/40'
              }`}
            >
              {t.nav.home}
            </button>
            <button
              id="nav-quiz-btn"
              onClick={() => handleNavClick('quiz')}
              className={`text-xs lg:text-sm font-semibold px-2 lg:px-3 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'quiz'
                  ? 'bg-light-pink text-coral font-bold'
                  : 'text-text-gray hover:text-deep-black hover:bg-powder/40'
              }`}
            >
              <span className="hidden lg:inline">{t.nav.quiz}</span>
              <span className="lg:hidden">{currentLang === 'fr' ? 'Grand Quiz' : 'Full Quiz'}</span>
            </button>
            <button
              id="nav-themed-btn"
              onClick={() => handleNavClick('themed')}
              className={`text-xs lg:text-sm font-semibold px-2 lg:px-3 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                activeTab === 'themed'
                  ? 'bg-light-pink text-coral font-bold'
                  : 'text-text-gray hover:text-deep-black hover:bg-powder/40'
              }`}
            >
              <span className="hidden lg:inline">{t.nav.themedQuiz}</span>
              <span className="lg:hidden">{currentLang === 'fr' ? 'Thèmes' : 'Themes'}</span>
              <span className="hidden xl:inline-block text-[10px] text-coral font-bold bg-powder px-1 rounded-full">✨</span>
            </button>
            <button
              id="nav-tools-btn"
              onClick={() => handleNavClick('tools')}
              className={`text-xs lg:text-sm font-semibold px-2 lg:px-3 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'tools'
                  ? 'bg-light-pink text-coral font-bold'
                  : 'text-text-gray hover:text-deep-black hover:bg-powder/40'
              }`}
            >
              <span className="hidden lg:inline">{t.nav.tools}</span>
              <span className="lg:hidden">{currentLang === 'fr' ? 'Outils' : 'Tools'}</span>
            </button>
            <button
              id="nav-blog-btn"
              onClick={() => handleNavClick('blog')}
              className={`text-xs lg:text-sm font-semibold px-2 lg:px-3 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'blog' || activeTab === 'article'
                  ? 'bg-light-pink text-coral font-bold'
                  : 'text-text-gray hover:text-deep-black hover:bg-powder/40'
              }`}
            >
              <span className="hidden lg:inline">{t.nav.blog}</span>
              <span className="lg:hidden">Blog</span>
            </button>
            <button
              id="nav-about-btn"
              onClick={() => handleNavClick('about')}
              className={`text-xs lg:text-sm font-semibold px-2 lg:px-3 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'about'
                  ? 'bg-light-pink text-coral font-bold'
                  : 'text-text-gray hover:text-deep-black hover:bg-powder/40'
              }`}
            >
              <span className="hidden lg:inline">{t.nav.about}</span>
              <span className="lg:hidden">{currentLang === 'fr' ? 'Infos' : 'About'}</span>
            </button>
          </nav>

          {/* Header Actions (Language Switcher & CTA) */}
          <div className="hidden md:flex items-center gap-1.5 md:gap-2 lg:gap-3 shrink-0">
            {/* Language Switcher */}
            <button
              id="lang-switch-desktop"
              onClick={onToggleLang}
              className="flex items-center gap-1 px-2.5 lg:px-3 py-1.5 rounded-full border border-coral/25 bg-white hover:bg-light-pink text-xs font-bold text-deep-black transition-all cursor-pointer shadow-xs min-h-[36px]"
              title={currentLang === 'fr' ? 'Switch to English' : 'Passer en Français'}
            >
              <span className="text-sm">{t.nav.flag}</span>
              <span>{currentLang === 'fr' ? 'FR' : 'EN'}</span>
            </button>

            {/* CTA Button */}
            <button
              id="header-cta-btn"
              onClick={() => handleNavClick('quiz')}
              className="btn-primary text-xs lg:text-sm py-1.5 md:py-2 px-3 md:px-3.5 lg:px-5 shadow-xs whitespace-nowrap min-h-[36px] md:min-h-[38px] lg:min-h-[40px] group flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5 fill-current shrink-0 group-hover:scale-110 group-hover:animate-heartbeat transition-transform" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <span className="hidden lg:inline">{t.nav.cta}</span>
              <span className="lg:hidden">{currentLang === 'fr' ? 'Tester' : 'Test'}</span>
            </button>
          </div>

          {/* Mobile Actions: Language Icon & Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="lang-switch-mobile-icon"
              onClick={onToggleLang}
              className="min-w-[40px] min-h-[40px] rounded-full bg-white border border-powder flex items-center justify-center text-sm cursor-pointer shadow-xs active:scale-95 transition-transform"
              aria-label="Toggle language"
            >
              <span>{t.nav.flag}</span>
            </button>

            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-w-[44px] min-h-[44px] rounded-full bg-white border border-powder flex items-center justify-center text-deep-black focus:outline-none cursor-pointer shadow-xs active:scale-95 transition-transform"
              aria-label="Open navigation menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-5 h-5 stroke-deep-black" fill="none" viewBox="0 0 24 24" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5 stroke-deep-black" fill="none" viewBox="0 0 24 24" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown & Backdrop */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-deep-black/35 backdrop-blur-xs z-30 md:hidden animate-fadeIn"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="relative z-40 md:hidden bg-white border-b border-powder px-4 pt-3 pb-6 space-y-2 shadow-xl animate-fadeIn">
            <button
              id="mobile-nav-home"
              onClick={() => handleNavClick('home')}
              className={`w-full text-left py-3 px-4 rounded-xl text-base font-medium cursor-pointer transition-colors min-h-[48px] flex items-center justify-between touch-manipulation active:scale-[0.99] ${
                activeTab === 'home' ? 'bg-light-pink text-coral font-bold' : 'text-deep-black hover:bg-off-white'
              }`}
            >
              <span>{t.nav.home}</span>
              <span className="text-xs text-text-gray">🏠</span>
            </button>
            <button
              id="mobile-nav-quiz"
              onClick={() => handleNavClick('quiz')}
              className={`w-full text-left py-3 px-4 rounded-xl text-base font-medium cursor-pointer transition-colors min-h-[48px] flex items-center justify-between touch-manipulation active:scale-[0.99] ${
                activeTab === 'quiz' ? 'bg-light-pink text-coral font-bold' : 'text-deep-black hover:bg-off-white'
              }`}
            >
              <span>{t.nav.quiz}</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-coral/10 text-coral">
                100% Gratuit
              </span>
            </button>
            <button
              id="mobile-nav-themed"
              onClick={() => handleNavClick('themed')}
              className={`w-full text-left py-3 px-4 rounded-xl text-base font-medium cursor-pointer transition-colors min-h-[48px] flex items-center justify-between touch-manipulation active:scale-[0.99] ${
                activeTab === 'themed' ? 'bg-light-pink text-coral font-bold' : 'text-deep-black hover:bg-off-white'
              }`}
            >
              <span>{t.nav.themedQuiz}</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-powder text-coral">
                ✨ Nouveau
              </span>
            </button>
            <button
              id="mobile-nav-tools"
              onClick={() => handleNavClick('tools')}
              className={`w-full text-left py-3 px-4 rounded-xl text-base font-medium cursor-pointer transition-colors min-h-[48px] flex items-center justify-between touch-manipulation active:scale-[0.99] ${
                activeTab === 'tools' ? 'bg-light-pink text-coral font-bold' : 'text-deep-black hover:bg-off-white'
              }`}
            >
              <span>{t.nav.tools}</span>
              <span className="text-xs text-text-gray">🛠️</span>
            </button>
            <button
              id="mobile-nav-blog"
              onClick={() => handleNavClick('blog')}
              className={`w-full text-left py-3 px-4 rounded-xl text-base font-medium cursor-pointer transition-colors min-h-[48px] flex items-center justify-between touch-manipulation active:scale-[0.99] ${
                activeTab === 'blog' || activeTab === 'article' ? 'bg-light-pink text-coral font-bold' : 'text-deep-black hover:bg-off-white'
              }`}
            >
              <span>{t.nav.blog}</span>
              <span className="text-xs text-text-gray">📰</span>
            </button>
            <button
              id="mobile-nav-about"
              onClick={() => handleNavClick('about')}
              className={`w-full text-left py-3 px-4 rounded-xl text-base font-medium cursor-pointer transition-colors min-h-[48px] flex items-center justify-between touch-manipulation active:scale-[0.99] ${
                activeTab === 'about' ? 'bg-light-pink text-coral font-bold' : 'text-deep-black hover:bg-off-white'
              }`}
            >
              <span>{t.nav.about}</span>
              <span className="text-xs text-text-gray">ℹ️</span>
            </button>

            <div className="pt-3 border-t border-powder flex flex-col gap-3">
              <button
                id="mobile-lang-switch"
                onClick={onToggleLang}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-coral/25 bg-white text-sm font-semibold text-deep-black cursor-pointer min-h-[48px] touch-manipulation active:scale-[0.99]"
              >
                <span className="text-base">{t.nav.flag}</span>
                <span>Langue : {currentLang === 'fr' ? 'Français (FR)' : 'English (EN)'}</span>
              </button>

              <button
                id="mobile-cta-btn"
                onClick={() => handleNavClick('quiz')}
                className="btn-primary w-full py-3.5 text-center justify-center min-h-[48px] text-base touch-manipulation active:scale-[0.99]"
              >
                <span>{t.nav.cta}</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
