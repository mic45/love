import React, { useState } from 'react';
import * as Sentry from '@sentry/react';
import { Language, translations } from '../translations';

interface FooterProps {
  currentLang: Language;
  onNavigate: (tab: 'home' | 'quiz' | 'themed' | 'tools' | 'blog' | 'about' | 'mentions' | 'confidentialite' | '404') => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, onNavigate }) => {
  const t = translations[currentLang];
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleTriggerSentryTest = () => {
    try {
      Sentry.logger.info('User triggered test error', {
        action: 'test_error_button_click',
      });
    } catch {}
    try {
      Sentry.metrics.count('test_counter', 1);
    } catch {}
    throw new Error('This is your first error!');
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  const handleLink = (tab: 'home' | 'quiz' | 'themed' | 'tools' | 'blog' | 'about' | 'mentions' | 'confidentialite' | '404') => {
    onNavigate(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-deep-black text-white pt-12 sm:pt-16 pb-8 sm:pb-12 border-t border-[#333333]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 pb-10 sm:pb-12 border-b border-[#2A2A2A]">
          {/* Col 1: Brand & Mission (2 cols wide on desktop) */}
          <div className="sm:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-coral flex items-center justify-center shadow-md">
                <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <span className="font-bold text-2xl tracking-tight text-white">
                Love<span className="text-coral">Quiz</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#AAAAAA] max-w-sm leading-relaxed">
              {t.footer.desc}
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h3 className="text-xs sm:text-sm font-bold tracking-wider uppercase text-white">
              {t.footer.col1Title}
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-[#AAAAAA]">
              <li>
                <button onClick={() => handleLink('home')} className="hover:text-coral transition-colors cursor-pointer py-1 block">
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('quiz')} className="hover:text-coral transition-colors cursor-pointer py-1 block">
                  {t.footer.links.quiz}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('themed')} className="hover:text-coral transition-colors cursor-pointer py-1 block">
                  {t.footer.links.themedQuiz}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('tools')} className="hover:text-coral transition-colors cursor-pointer py-1 block">
                  {t.nav.tools}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('blog')} className="hover:text-coral transition-colors cursor-pointer py-1 block">
                  {t.footer.links.blog}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('about')} className="hover:text-coral transition-colors cursor-pointer py-1 block">
                  {t.nav.about}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Tools & Legal */}
          <div className="space-y-3">
            <h3 className="text-xs sm:text-sm font-bold tracking-wider uppercase text-white">
              {t.footer.col2Title}
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-[#AAAAAA]">
              <li>
                <button onClick={() => handleLink('tools')} className="hover:text-coral transition-colors cursor-pointer py-1 block">
                  {t.footer.links.loveLang}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('tools')} className="hover:text-coral transition-colors cursor-pointer py-1 block">
                  {t.footer.links.dateGen}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('mentions')} className="hover:text-coral transition-colors cursor-pointer py-1 block">
                  {t.footer.links.mentions}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('confidentialite')} className="hover:text-coral transition-colors cursor-pointer py-1 block">
                  {t.footer.links.privacy}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter Box */}
          <div className="space-y-3 sm:col-span-2 lg:col-span-1">
            <h3 className="text-xs sm:text-sm font-bold tracking-wider uppercase text-white">
              {t.footer.col4Title}
            </h3>
            <p className="text-xs text-[#AAAAAA] leading-relaxed">
              {t.footer.newsletterDesc}
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.footer.newsletterPlaceholder}
                className="w-full px-4 py-2.5 rounded-full bg-[#2A2A2A] text-white text-xs border border-[#444444] focus:outline-none focus:border-coral min-h-[44px]"
              />
              <button
                type="submit"
                className="w-full btn-primary text-xs py-2.5 rounded-full justify-center min-h-[44px]"
              >
                {t.footer.newsletterBtn}
              </button>
            </form>
            {isSubscribed && (
              <p className="text-xs font-semibold text-emerald-400 animate-fadeIn">
                ✓ {t.footer.newsletterSuccess}
              </p>
            )}
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#777777] text-center sm:text-left">
          <p>© 2026 LoveQuiz. {t.footer.rights}</p>
          <div className="flex items-center gap-3">
            <button onClick={() => handleLink('mentions')} className="hover:text-white transition-colors cursor-pointer py-1">
              {t.footer.links.mentions}
            </button>
            <span>·</span>
            <button onClick={() => handleLink('confidentialite')} className="hover:text-white transition-colors cursor-pointer py-1">
              {t.footer.links.privacy}
            </button>
            <span>·</span>
            <button
              onClick={handleTriggerSentryTest}
              className="text-[#666666] hover:text-amber-400 transition-colors cursor-pointer py-1 text-[11px] inline-flex items-center gap-1.5"
              title="Tester la capture d'erreur Sentry (génère une exception de test)"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Test Sentry</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
