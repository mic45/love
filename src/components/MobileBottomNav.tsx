import React from 'react';
import { Language, translations } from '../translations';

interface MobileBottomNavProps {
  currentLang: Language;
  activeTab: string;
  onNavigate: (tab: 'home' | 'quiz' | 'tools' | 'blog' | 'about') => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentLang,
  activeTab,
  onNavigate,
}) => {
  const t = translations[currentLang];

  const navItems = [
    {
      id: 'home' as const,
      label: t.nav.home,
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
      ),
    },
    {
      id: 'quiz' as const,
      label: t.nav.quiz,
      isSpecial: true,
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ),
    },
    {
      id: 'tools' as const,
      label: t.nav.tools,
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
        </svg>
      ),
    },
    {
      id: 'blog' as const,
      label: t.nav.blog,
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
        </svg>
      ),
    },
    {
      id: 'about' as const,
      label: t.nav.about,
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
        </svg>
      ),
    },
  ];

  return (
    <nav
      aria-label="Navigation mobile"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-powder shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-1.5"
      style={{ paddingBottom: 'max(0.375rem, env(safe-area-inset-bottom))' }}
    >
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive =
            activeTab === item.id || (item.id === 'blog' && activeTab === 'article');

          if (item.isSpecial) {
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="flex flex-col items-center justify-center -mt-5 group cursor-pointer focus:outline-none touch-manipulation active:scale-95 transition-transform"
                title={item.label}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-all ${
                    isActive
                      ? 'bg-coral text-white ring-4 ring-light-pink scale-105'
                      : 'bg-coral text-white hover:bg-coral-dark'
                  }`}
                >
                  <span className={isActive ? 'animate-heartbeat' : 'group-hover:animate-heartbeat'}>
                    {item.icon}
                  </span>
                </div>
                <span
                  className={`text-[10px] font-bold mt-1 tracking-tight ${
                    isActive ? 'text-coral' : 'text-deep-black'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex-1 py-1 px-1 flex flex-col items-center justify-center rounded-xl transition-all cursor-pointer focus:outline-none touch-manipulation active:scale-95 ${
                isActive ? 'text-coral font-bold' : 'text-text-gray hover:text-deep-black'
              }`}
            >
              <div className="relative">
                {item.icon}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-coral"></span>
                )}
              </div>
              <span className="text-[10px] tracking-tight mt-1 truncate max-w-[64px]">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
