import React from 'react';

// Modern MatchMaker Couple Visual for Hero Section
export const HeroCoupleIllustration: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative select-none w-full max-w-lg mx-auto ${className}`}>
    {/* Soft Pastel Background Ambient Glows */}
    <div className="absolute -top-4 -left-4 w-40 h-40 bg-[#FFE4EC]/80 rounded-full filter blur-2xl -z-10 pointer-events-none"></div>
    <div className="absolute -bottom-4 -right-4 w-48 h-48 bg-[#FFF4D6]/80 rounded-full filter blur-2xl -z-10 pointer-events-none"></div>

    {/* Floating Badges */}
    <div className="absolute -top-3.5 left-4 z-20 animate-float bg-white/95 backdrop-blur-sm border border-[#FF6B8A]/30 px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-2 text-xs font-bold text-[#1A1A1A]">
      <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] inline-block animate-pulse"></span>
      <span>98.4% Alchimie Détectée</span>
    </div>

    <div className="absolute -bottom-3 right-4 z-20 animate-float-reverse bg-white/95 backdrop-blur-sm border border-[#FF6B8A]/30 px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5 text-xs font-bold text-[#FF6B8A]">
      <svg className="w-4 h-4 fill-[#FF6B8A]" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
      <span>Couple Idéal ✨</span>
    </div>

    {/* Elegant Card Container with Official Couple Artwork */}
    <div className="relative bg-white p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl shadow-xl border border-[#FFE4EC] overflow-hidden group">
      <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
        <picture>
          <source srcSet="/assets/img/og-image.webp" type="image/webp" />
          <img
            src="/assets/img/og-image.jpg"
            alt="Couple MatchMaker épanoui et complice"
            className="w-full h-auto aspect-[16/10] object-cover rounded-xl sm:rounded-2xl transition-transform duration-700 group-hover:scale-105"
            width="600"
            height="375"
            loading="eager"
          />
        </picture>

        {/* Ambient Gradient Overlay with Glassmorphic Quick-Fact Pills */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none flex flex-col justify-end p-4">
          <div className="flex items-center justify-between gap-2 text-white text-xs font-medium">
            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30 text-[11px] font-semibold">
              ⚡ Test Clinique 2026
            </span>
            <span className="bg-[#FF6B8A]/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold">
              15 Questions • 3 min
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Feature 1: Heart in bubble 48x48 icon
export const FeatureIconHeart: React.FC = () => (
  <div className="w-12 h-12 rounded-full bg-[#FFF0F3] border border-[#FF6B8A]/30 flex items-center justify-center shrink-0 shadow-sm">
    <svg className="w-6 h-6 fill-[#FF6B8A]" viewBox="0 0 24 24">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  </div>
);

// Feature 2: Shield security 48x48 icon
export const FeatureIconShield: React.FC = () => (
  <div className="w-12 h-12 rounded-full bg-[#D6F0FF] border border-[#3B82F6]/30 flex items-center justify-center shrink-0 shadow-sm">
    <svg className="w-6 h-6 stroke-[#1A1A1A] fill-[#D6F0FF]" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <path d="M9 12l2 2 4-4" stroke="#10B981" strokeWidth="2.5"/>
    </svg>
  </div>
);

// Feature 3: Balance 48x48 icon
export const FeatureIconScale: React.FC = () => (
  <div className="w-12 h-12 rounded-full bg-[#FFF4D6] border border-[#F59E0B]/30 flex items-center justify-center shrink-0 shadow-sm">
    <svg className="w-6 h-6 stroke-[#1A1A1A] fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v18"/>
      <path d="M5 7h14"/>
      <path d="M5 7l-3 7h6l-3-7z"/>
      <path d="M19 7l-3 7h6l-3-7z"/>
      <circle cx="12" cy="20" r="2" fill="#1A1A1A"/>
    </svg>
  </div>
);

// Quiz Process / Diagnostic Preview Card
export const QuizSofaIllustration: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative w-full max-w-sm mx-auto select-none ${className}`}>
    {/* Soft Glow */}
    <div className="absolute -inset-3 bg-[#FFE4EC]/60 rounded-3xl filter blur-xl -z-10"></div>

    <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xl border border-[#FFE4EC] space-y-4">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-[#FFE4EC] pb-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B8A] animate-ping"></span>
          <span className="font-bold text-[#FF6B8A] uppercase tracking-wider">Aperçu Diagnostic</span>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-[#FFF0F3] text-[#FF6B8A] font-semibold text-[11px]">
          Étape 1/15
        </span>
      </div>

      {/* Question preview */}
      <div>
        <p className="text-xs uppercase font-semibold text-[#888888] tracking-wider mb-1">
          Pilier Communication
        </p>
        <p className="text-sm font-bold text-[#1A1A1A] leading-snug">
          « Face à un désaccord dans votre couple, quelle est votre première réaction ? »
        </p>
      </div>

      {/* Selected Option */}
      <div className="p-3 rounded-xl border-2 border-[#FF6B8A] bg-[#FFF0F3] flex items-center justify-between text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 rounded-full bg-[#FF6B8A] flex items-center justify-center shrink-0">
            <svg className="w-3 h-3 fill-white" viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
          </div>
          <span className="font-semibold text-[#1A1A1A]">Prendre le temps d'écouter avec calme</span>
        </div>
        <span className="font-bold text-[#FF6B8A] shrink-0">+20 pts</span>
      </div>

      {/* Alternative Option */}
      <div className="p-3 rounded-xl border border-[#EEEEEE] bg-[#FAFAFA] flex items-center gap-2.5 text-xs text-[#666666]">
        <div className="w-5 h-5 rounded-full border border-[#CCCCCC] bg-white shrink-0"></div>
        <span>Exprimer immédiatement son ressenti à chaud</span>
      </div>

      {/* Compatibility live gauge mini */}
      <div className="pt-2 border-t border-[#FFE4EC] flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-[#555555]">
          <span>⚡ Score projeté :</span>
          <span className="font-extrabold text-[#FF6B8A]">94%</span>
        </div>
        <span className="text-[11px] font-semibold text-[#10B981] flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
          Profil Idéal
        </span>
      </div>
    </div>
  </div>
);
