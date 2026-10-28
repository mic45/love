import React from 'react';
import { Language, translations } from '../translations';
import heroCoupleImg from '../assets/images/hero_couple_love_1790262271844.jpg';
import heroCoupleWebp from '../assets/images/hero_couple_love_1790262271844.webp';
import heroCoupleMobileWebp from '../assets/images/hero_couple_love_mobile.webp';
import coupleQuizImg from '../assets/images/couple_quiz_journey_1790262285021.jpg';
import coupleQuizWebp from '../assets/images/couple_quiz_journey_1790262285021.webp';
import {
  FeatureIconHeart,
  FeatureIconShield,
  FeatureIconScale,
} from './Illustrations';

interface HomeViewProps {
  currentLang: Language;
  onStartQuiz: () => void;
  onExploreTools: (tool?: 'letters' | 'loveLang' | 'zodiac' | 'dates' | 'travel') => void;
  onNavigateToBlog: () => void;
  onNavigateToThemed?: (themeId?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  currentLang,
  onStartQuiz,
  onExploreTools,
  onNavigateToBlog,
  onNavigateToThemed,
}) => {
  const t = translations[currentLang];

  return (
    <div className="space-y-16 sm:space-y-20 md:space-y-28 pb-16 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 sm:pt-10 lg:pt-16 pb-6 sm:pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Background Subtle Pastel Glows */}
        <div className="absolute top-6 left-1/4 w-60 sm:w-80 h-60 sm:h-80 bg-powder/50 rounded-full filter blur-3xl -z-10 pointer-events-none"></div>
        <div className="absolute top-32 right-6 w-60 sm:w-80 h-60 sm:h-80 bg-pastel-yellow/50 rounded-full filter blur-3xl -z-10 pointer-events-none"></div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 lg:gap-12 items-center">
          {/* Left Column: Headlines & CTAs */}
          <div className="md:col-span-7 lg:col-span-7 space-y-6 text-left">
            {/* Tagline / Kicker */}
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-coral tracking-wide">
              <span className="w-2 h-2 rounded-full bg-coral animate-ping"></span>
              <span>{t.hero.badge}</span>
            </div>

            {/* H1 Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-deep-black leading-[1.12] tracking-tight">
              {currentLang === 'fr' ? (
                <>
                  Quelle est la <span className="text-coral">vraie force</span> de votre amour ?
                </>
              ) : (
                <>
                  What is the <span className="text-coral">true strength</span> of your love?
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-text-gray max-w-xl leading-relaxed">
              {t.hero.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
              <button
                id="hero-cta-primary"
                onClick={onStartQuiz}
                className="btn-primary text-base py-3.5 px-7 sm:px-8 shadow-md group w-full sm:w-auto justify-center min-h-[48px] hover:shadow-lg"
              >
                <span className="group-hover:scale-105 transition-transform">{t.hero.ctaPrimary}</span>
                <span className="group-hover:translate-x-1.5 transition-transform">→</span>
              </button>

              <button
                id="hero-cta-secondary"
                onClick={onExploreTools}
                className="btn-secondary text-base py-3.5 px-6 sm:px-7 w-full sm:w-auto justify-center min-h-[48px] hover:bg-light-pink group"
              >
                <span className="group-hover:scale-105 transition-transform">{t.hero.ctaSecondary}</span>
              </button>
            </div>

            {/* Micro Guarantees & Stats */}
            <div className="pt-6 border-t border-powder grid grid-cols-3 gap-2 sm:gap-6 max-w-lg text-left">
              <div className="hover:scale-105 transition-transform cursor-default">
                <p className="text-xl sm:text-2xl font-bold text-deep-black">{t.hero.stat1}</p>
                <p className="text-xs text-text-gray font-medium mt-0.5">{t.hero.stat1Label}</p>
              </div>
              <div className="hover:scale-105 transition-transform cursor-default">
                <p className="text-xl sm:text-2xl font-bold text-coral">{t.hero.stat2}</p>
                <p className="text-xs text-text-gray font-medium mt-0.5">{t.hero.stat2Label}</p>
              </div>
              <div className="hover:scale-105 transition-transform cursor-default">
                <p className="text-xl sm:text-2xl font-bold text-deep-black">{t.hero.stat3}</p>
                <p className="text-xs text-text-gray font-medium mt-0.5">{t.hero.stat3Label}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Couple Visual Showcase */}
          <div className="md:col-span-5 lg:col-span-5 flex justify-center items-center">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none">
              {/* Decorative soft glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-coral/20 to-powder rounded-3xl blur-xl opacity-75"></div>

              {/* Card Container */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-powder bg-white shadow-xl img-hover">
                <picture>
                  <source media="(max-width: 640px)" srcSet={heroCoupleMobileWebp} type="image/webp" />
                  <source srcSet={heroCoupleWebp} type="image/webp" />
                  <img
                    src={heroCoupleImg}
                    alt={currentLang === 'fr' ? 'Couple complice et amoureux' : 'Happy affectionate couple'}
                    fetchPriority="high"
                    decoding="async"
                    width={600}
                    height={400}
                    className="w-full h-[320px] sm:h-[400px] object-cover object-center"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-deep-black/60 via-transparent to-transparent pointer-events-none"></div>

                {/* Floating Top Badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-powder shadow-md flex items-center gap-2 animate-float-slow">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs font-bold text-deep-black">
                    {currentLang === 'fr' ? '98% Alchimie trouvée' : '98% Chemistry found'}
                  </span>
                </div>

                {/* Floating Bottom Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-powder shadow-lg flex items-center justify-between gap-3 animate-float-reverse">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-light-pink border border-coral/30 flex items-center justify-center text-base shrink-0 animate-heartbeat">
                      💖
                    </div>
                    <div>
                      <p className="text-xs font-bold text-deep-black">
                        {currentLang === 'fr' ? 'Test d’Alchimie 2026' : 'Couple Chemistry 2026'}
                      </p>
                      <p className="text-[11px] text-text-gray font-medium">
                        {currentLang === 'fr' ? '15 questions · 3 minutes' : '15 questions · 3 min'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onStartQuiz}
                    className="btn-primary text-xs py-2 px-3.5 rounded-full cursor-pointer whitespace-nowrap shrink-0 hover:scale-105 active:scale-95 transition-transform"
                  >
                    {t.nav.cta}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST BANNER */}
      <section className="bg-powder/40 py-5 sm:py-6 border-y border-powder">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 lg:gap-12 text-center text-xs sm:text-sm font-semibold text-text-gray">
          <div className="flex items-center gap-1.5 text-amber-500">
            <span>★★★★★</span>
            <span className="text-deep-black font-bold ml-1">{t.trust.stars}</span>
          </div>
          <span className="hidden sm:inline text-powder">|</span>
          <span className="flex items-center gap-1.5">🛡️ Données 100% chiffrées & RGPD</span>
          <span className="hidden sm:inline text-powder">|</span>
          <span className="flex items-center gap-1.5">🩺 Validé par des conseillers relationnels</span>
          <span className="hidden sm:inline text-powder">|</span>
          <span className="flex items-center gap-1.5">⚡ Diagnostic en 3 minutes</span>
        </div>
      </section>

      {/* 3. FEATURES (POURQUOI LOVEQUIZ) */}
      <section id="features-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="text-xs font-bold tracking-wider uppercase text-coral mb-2">
            {t.features.tag}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-deep-black mb-3">
            {t.features.title}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-text-gray">
            {t.features.subtitle}
          </p>
        </div>

        {/* 3 Pastel Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Card 1: Rose poudré */}
          <div className="bg-light-pink p-6 sm:p-8 rounded-2xl match-card flex flex-col justify-between group transition-all duration-300 hover:shadow-xl">
            <div>
              <div className="mb-5 sm:mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:animate-soft-bounce">
                <FeatureIconHeart />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-deep-black mb-2 sm:mb-3 group-hover:text-coral transition-colors">
                {t.features.card1Title}
              </h3>
              <p className="text-sm sm:text-base text-text-gray leading-relaxed">
                {t.features.card1Desc}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-coral/15 text-xs font-semibold text-coral flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-coral animate-ping"></span>
              <span>5 piliers majeurs évalués</span>
            </div>
          </div>

          {/* Card 2: Bleu ciel */}
          <div className="bg-pastel-blue p-6 sm:p-8 rounded-2xl match-card flex flex-col justify-between group transition-all duration-300 hover:shadow-xl">
            <div>
              <div className="mb-5 sm:mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:animate-soft-bounce">
                <FeatureIconShield />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-deep-black mb-2 sm:mb-3 group-hover:text-blue-900 transition-colors">
                {t.features.card2Title}
              </h3>
              <p className="text-sm sm:text-base text-text-gray leading-relaxed">
                {t.features.card2Desc}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-blue-400/20 text-xs font-semibold text-blue-800 flex items-center gap-1.5">
              <span>🛡️</span>
              <span>Anonymat garanti sans email</span>
            </div>
          </div>

          {/* Card 3: Jaune pastel */}
          <div className="bg-pastel-yellow p-6 sm:p-8 rounded-2xl match-card flex flex-col justify-between group transition-all duration-300 hover:shadow-xl">
            <div>
              <div className="mb-5 sm:mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:animate-soft-bounce">
                <FeatureIconScale />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-deep-black mb-2 sm:mb-3 group-hover:text-amber-900 transition-colors">
                {t.features.card3Title}
              </h3>
              <p className="text-sm sm:text-base text-text-gray leading-relaxed">
                {t.features.card3Desc}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-amber-400/20 text-xs font-semibold text-amber-900 flex items-center gap-1.5">
              <span>✨</span>
              <span>Recommandations personnalisées</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="bg-white py-12 sm:py-16 border-y border-powder content-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <div className="text-xs font-bold tracking-wider uppercase text-coral mb-2">
              {t.how.tag}
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-deep-black mb-3">
              {t.how.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 lg:gap-12 items-center">
            {/* Steps Left */}
            <div className="md:col-span-7 lg:col-span-7 space-y-4 sm:space-y-6">
              {/* Step 1 */}
              <div className="p-5 sm:p-6 rounded-2xl bg-off-white border border-powder flex items-start gap-4 match-card">
                <span className="w-10 h-10 rounded-full bg-coral text-white font-bold flex items-center justify-center shrink-0">
                  {t.how.step1Num}
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-deep-black mb-1">
                    {t.how.step1Title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-gray leading-relaxed">
                    {t.how.step1Desc}
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-5 sm:p-6 rounded-2xl bg-off-white border border-powder flex items-start gap-4 match-card">
                <span className="w-10 h-10 rounded-full bg-coral text-white font-bold flex items-center justify-center shrink-0">
                  {t.how.step2Num}
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-deep-black mb-1">
                    {t.how.step2Title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-gray leading-relaxed">
                    {t.how.step2Desc}
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-5 sm:p-6 rounded-2xl bg-off-white border border-powder flex items-start gap-4 match-card">
                <span className="w-10 h-10 rounded-full bg-coral text-white font-bold flex items-center justify-center shrink-0">
                  {t.how.step3Num}
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-deep-black mb-1">
                    {t.how.step3Title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-gray leading-relaxed">
                    {t.how.step3Desc}
                  </p>
                </div>
              </div>
            </div>

            {/* Illustration Right */}
            <div className="md:col-span-5 lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md rounded-3xl overflow-hidden border border-powder shadow-lg img-hover bg-white p-3">
                <picture>
                  <source srcSet={coupleQuizWebp} type="image/webp" />
                  <img
                    src={coupleQuizImg}
                    alt={currentLang === 'fr' ? 'Parcours du quiz de couple' : 'Couple taking the quiz together'}
                    loading="lazy"
                    decoding="async"
                    width={480}
                    height={320}
                    className="w-full h-[260px] sm:h-[320px] object-cover rounded-2xl"
                  />
                </picture>
                <div className="pt-3 pb-1 text-center">
                  <span className="text-xs font-bold text-coral uppercase tracking-wider block">
                    {currentLang === 'fr' ? '100% Anonyme & Sans inscription' : '100% Anonymous & No Sign-up'}
                  </span>
                  <p className="text-xs text-text-gray mt-1">
                    {currentLang === 'fr' ? 'Faites le test seul(e) ou côte à côte sur vos écrans' : 'Take it solo or side by side on your devices'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MODES (POUR TOUS LES PARCOURS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 content-auto">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="text-xs font-bold tracking-wider uppercase text-coral mb-2">
            {t.modes.tag}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-deep-black mb-3">
            {t.modes.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-powder match-card flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-coral uppercase tracking-wider block mb-2">
                {t.modes.mode1Badge}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-deep-black mb-2">
                {t.modes.mode1Title}
              </h3>
              <p className="text-sm text-text-gray leading-relaxed mb-6">
                {t.modes.mode1Desc}
              </p>
            </div>
            <button
              onClick={onStartQuiz}
              className="btn-primary w-full text-sm py-3 justify-center min-h-[44px]"
            >
              Lancer le test de couple
            </button>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-powder match-card flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider block mb-2">
                {t.modes.mode2Badge}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-deep-black mb-2">
                {t.modes.mode2Title}
              </h3>
              <p className="text-sm text-text-gray leading-relaxed mb-6">
                {t.modes.mode2Desc}
              </p>
            </div>
            <button
              onClick={onStartQuiz}
              className="btn-secondary w-full text-sm py-3 justify-center min-h-[44px]"
            >
              Mesurer le coup de cœur
            </button>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-powder match-card flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider block mb-2">
                {t.modes.mode3Badge}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-deep-black mb-2">
                {t.modes.mode3Title}
              </h3>
              <p className="text-sm text-text-gray leading-relaxed mb-6">
                {t.modes.mode3Desc}
              </p>
            </div>
            <button
              onClick={onExploreTools}
              className="btn-secondary w-full text-sm py-3 justify-center min-h-[44px]"
            >
              Explorer les profils
            </button>
          </div>
        </div>
      </section>

      {/* 5b. SPECIALIZED THEMED QUIZZES SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 content-auto">
        <div className="bg-white rounded-3xl border border-powder p-6 sm:p-10 lg:p-12 shadow-sm space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-powder/70 pb-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-coral">
                <span>✨</span>
                <span>{currentLang === 'fr' ? 'NOUVEAU · TESTS CIBLÉS' : 'NEW · TARGETED ASSESSMENTS'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-deep-black tracking-tight">
                {currentLang === 'fr'
                  ? 'Explorez nos 4 Quiz par Thème Spécifique'
                  : 'Explore our 4 Targeted Themed Quizzes'}
              </h2>
              <p className="text-xs sm:text-sm text-text-gray">
                {currentLang === 'fr'
                  ? 'Besoin d’approfondir un cap précis ? Nos quiz de 2 minutes vous livrent une analyse psychologique sur-mesure.'
                  : 'Need insights on a specific milestone? Our 2-minute focused assessments provide tailored psychological clarity.'}
              </p>
            </div>
            <button
              onClick={() => onNavigateToThemed ? onNavigateToThemed() : onStartQuiz()}
              className="btn-primary text-xs sm:text-sm py-2.5 px-6 shrink-0 self-start md:self-auto rounded-full cursor-pointer"
            >
              {currentLang === 'fr' ? 'Voir les 4 thèmes →' : 'Browse all 4 themes →'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Theme 1: Cohabitation */}
            <div
              onClick={() => onNavigateToThemed ? onNavigateToThemed('cohabitation') : onStartQuiz()}
              className="p-5 rounded-2xl bg-off-white border border-powder hover:border-coral/40 hover:shadow-md transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-light-pink border border-coral/30 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  🏠
                </div>
                <h3 className="text-sm font-bold text-deep-black group-hover:text-coral transition-colors leading-snug">
                  {currentLang === 'fr' ? 'Vivre ensemble & Emménagement' : 'Moving in & Cohabitation'}
                </h3>
                <p className="text-xs text-text-gray leading-relaxed">
                  {currentLang === 'fr'
                    ? 'Chorégraphie du ménage, espace vital et partage des frais avant de signer le bail.'
                    : 'Daily chores, private space, and sharing costs before signing the lease.'}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-powder/60 flex items-center justify-between text-xs text-coral font-semibold">
                <span>6 questions · 2 min</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>

            {/* Theme 2: Communication */}
            <div
              onClick={() => onNavigateToThemed ? onNavigateToThemed('communication') : onStartQuiz()}
              className="p-5 rounded-2xl bg-off-white border border-powder hover:border-[#3A86FF]/40 hover:shadow-md transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  💬
                </div>
                <h3 className="text-sm font-bold text-deep-black group-hover:text-[#3A86FF] transition-colors leading-snug">
                  {currentLang === 'fr' ? 'Communication & Conflits' : 'Conflict & Communication'}
                </h3>
                <p className="text-xs text-text-gray leading-relaxed">
                  {currentLang === 'fr'
                    ? 'Désamorcer les disputes, vaincre le silence boudeur et pardonner vite.'
                    : 'De-escalate arguments, break stonewalling, and forgive without resentment.'}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-powder/60 flex items-center justify-between text-xs text-[#3A86FF] font-semibold">
                <span>6 questions · 2 min</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>

            {/* Theme 3: Intimacy */}
            <div
              onClick={() => onNavigateToThemed ? onNavigateToThemed('intimacy') : onStartQuiz()}
              className="p-5 rounded-2xl bg-off-white border border-powder hover:border-[#E63946]/40 hover:shadow-md transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  🔥
                </div>
                <h3 className="text-sm font-bold text-deep-black group-hover:text-[#E63946] transition-colors leading-snug">
                  {currentLang === 'fr' ? 'Intimité & Flamme Secrète' : 'Intimacy & Romantic Spark'}
                </h3>
                <p className="text-xs text-text-gray leading-relaxed">
                  {currentLang === 'fr'
                    ? 'Rompre la routine des colocataires, rituels complices et magnétisme sensuel.'
                    : 'Escape roommate syndrome, secret rituals, and sensual chemistry.'}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-powder/60 flex items-center justify-between text-xs text-[#E63946] font-semibold">
                <span>6 questions · 2 min</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>

            {/* Theme 4: Finances */}
            <div
              onClick={() => onNavigateToThemed ? onNavigateToThemed('finances') : onStartQuiz()}
              className="p-5 rounded-2xl bg-off-white border border-powder hover:border-[#2EC4B6]/40 hover:shadow-md transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  💎
                </div>
                <h3 className="text-sm font-bold text-deep-black group-hover:text-[#2EC4B6] transition-colors leading-snug">
                  {currentLang === 'fr' ? 'Argent & Finances à Deux' : 'Couple Money & Finances'}
                </h3>
                <p className="text-xs text-text-gray leading-relaxed">
                  {currentLang === 'fr'
                    ? 'Comptes communs, transparence des salaires et projets sans rancœur.'
                    : 'Joint accounts, salary transparency, and shared wealth without guilt.'}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-powder/60 flex items-center justify-between text-xs text-[#2EC4B6] font-semibold">
                <span>6 questions · 2 min</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="bg-light-pink/60 py-12 sm:py-16 border-y border-powder">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <div className="text-xs font-bold tracking-wider uppercase text-coral mb-2">
              {t.testimonials.tag}
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-deep-black mb-3">
              {t.testimonials.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xs border border-powder flex flex-col justify-between match-card">
              <p className="text-sm sm:text-base text-deep-black leading-relaxed italic mb-6">
                {t.testimonials.t1Text}
              </p>
              <div>
                <div className="flex text-amber-500 text-xs mb-2">★★★★★</div>
                <p className="font-bold text-deep-black text-sm">{t.testimonials.t1Author}</p>
                <p className="text-xs text-text-gray">{t.testimonials.t1Meta}</p>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xs border border-powder flex flex-col justify-between match-card">
              <p className="text-sm sm:text-base text-deep-black leading-relaxed italic mb-6">
                {t.testimonials.t2Text}
              </p>
              <div>
                <div className="flex text-amber-500 text-xs mb-2">★★★★★</div>
                <p className="font-bold text-deep-black text-sm">{t.testimonials.t2Author}</p>
                <p className="text-xs text-text-gray">{t.testimonials.t2Meta}</p>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xs border border-powder flex flex-col justify-between match-card">
              <p className="text-sm sm:text-base text-deep-black leading-relaxed italic mb-6">
                {t.testimonials.t3Text}
              </p>
              <div>
                <div className="flex text-amber-500 text-xs mb-2">★★★★★</div>
                <p className="font-bold text-deep-black text-sm">{t.testimonials.t3Author}</p>
                <p className="text-xs text-text-gray">{t.testimonials.t3Meta}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6b. AI LOVE LETTER SPOTLIGHT BANNER */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 content-auto">
        <div className="bg-[#FFFDF9] rounded-3xl border-2 border-powder p-6 sm:p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-3 text-left max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-coral">
              <span>🪄</span>
              <span>{currentLang === 'fr' ? 'NOUVEAU · IA ÉMOTIONNELLE' : 'NEW · EMOTIONAL AI'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-deep-black tracking-tight">
              {currentLang === 'fr'
                ? 'Générateur de Lettres d’Amour & Vœux'
                : 'AI Love Letter & Vows Generator'}
            </h3>
            <p className="text-xs sm:text-sm text-text-gray leading-relaxed">
              {currentLang === 'fr'
                ? 'Racontez 2 ou 3 souvenirs intimes et laissez notre plume romantique rédiger une déclaration d’amour inoubliable, un poème ou des vœux de mariage sur-mesure.'
                : 'Share 2 or 3 personal memories and generate an unforgettable love declaration, poem, or heartfelt wedding vows in seconds.'}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-start md:self-auto">
            <button
              onClick={() => onExploreTools('dates')}
              className="btn-secondary text-xs sm:text-sm py-2.5 sm:py-3 px-4 sm:px-5 rounded-full shadow-2xs cursor-pointer flex items-center gap-2 group hover:bg-light-pink"
            >
              <span>🎡</span>
              <span>{currentLang === 'fr' ? 'Roue des Rendez-Vous' : 'Date Wheel'}</span>
            </button>
            <button
              onClick={() => onExploreTools('letters')}
              className="btn-primary text-xs sm:text-sm py-2.5 sm:py-3 px-5 sm:px-6 rounded-full shadow-xs hover:shadow-md cursor-pointer flex items-center gap-2 group"
            >
              <span>{currentLang === 'fr' ? 'Rédiger une lettre IA' : 'Write with AI'}</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* 6c. SPECIAL COUPLE TRAVEL DEALS & PROMOTIONS SHOWCASE */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 content-auto">
        <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-blue-500/25 relative overflow-hidden">
          {/* Subtle atmospheric glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-10 w-60 h-60 bg-coral/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 space-y-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
              <div className="space-y-2 max-w-2xl text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
                  <span>✈️</span>
                  <span>{t.homeTravelBanner.badge}</span>
                  <span className="bg-coral text-white text-[10px] px-2 py-0.5 rounded-full font-bold">{t.homeTravelBanner.discountTag}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  {t.homeTravelBanner.title}
                </h3>
                <p className="text-xs sm:text-sm text-blue-100/80 leading-relaxed">
                  {t.homeTravelBanner.desc}
                </p>
              </div>

              <button
                onClick={() => onExploreTools('travel')}
                className="shrink-0 px-6 sm:px-8 py-3.5 rounded-full bg-gradient-to-r from-coral to-coral-dark hover:from-[#ff5277] hover:to-[#e63946] text-white font-bold text-xs sm:text-sm shadow-lg hover:shadow-coral/50 transition-all flex items-center gap-2 cursor-pointer group hover:scale-105 active:scale-95"
              >
                <span>{t.homeTravelBanner.btn}</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>

            {/* Visual Partner Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 pt-2">
              <div className="bg-white/10 hover:bg-white/15 border border-white/10 rounded-2xl p-3 text-center transition-all cursor-pointer" onClick={() => onExploreTools('travel')}>
                <div className="text-lg mb-1">🚗</div>
                <div className="font-bold text-xs text-white">intui.travel</div>
                <div className="text-[10px] text-blue-300 font-semibold mt-0.5">{currentLang === 'fr' ? '-5% Transferts' : '-5% Transfers'}</div>
              </div>
              <div className="bg-white/10 hover:bg-white/15 border border-white/10 rounded-2xl p-3 text-center transition-all cursor-pointer" onClick={() => onExploreTools('travel')}>
                <div className="text-lg mb-1">✈️</div>
                <div className="font-bold text-xs text-white">AirHelp</div>
                <div className="text-[10px] text-coral font-semibold mt-0.5">{currentLang === 'fr' ? '-11% Protection' : '-11% Claims'}</div>
              </div>
              <div className="bg-white/10 hover:bg-white/15 border border-white/10 rounded-2xl p-3 text-center transition-all cursor-pointer" onClick={() => onExploreTools('travel')}>
                <div className="text-lg mb-1">📱</div>
                <div className="font-bold text-xs text-white">Airalo & Yesim</div>
                <div className="text-[10px] text-emerald-400 font-semibold mt-0.5">{currentLang === 'fr' ? 'eSIM Mondiale' : 'Global eSIM'}</div>
              </div>
              <div className="bg-white/10 hover:bg-white/15 border border-white/10 rounded-2xl p-3 text-center transition-all cursor-pointer" onClick={() => onExploreTools('travel')}>
                <div className="text-lg mb-1">🎟️</div>
                <div className="font-bold text-xs text-white">Tiqets & Klook</div>
                <div className="text-[10px] text-amber-300 font-semibold mt-0.5">{currentLang === 'fr' ? 'Coupe-File Date' : 'Fast-Track Dates'}</div>
              </div>
              <div className="bg-white/10 hover:bg-white/15 border border-white/10 rounded-2xl p-3 text-center transition-all cursor-pointer" onClick={() => onExploreTools('travel')}>
                <div className="text-lg mb-1">🚘</div>
                <div className="font-bold text-xs text-white">Auto Europe</div>
                <div className="text-[10px] text-sky-300 font-semibold mt-0.5">{currentLang === 'fr' ? '-25% Road-Trip' : '-25% Road Trips'}</div>
              </div>
              <div className="bg-white/10 hover:bg-white/15 border border-white/10 rounded-2xl p-3 text-center transition-all cursor-pointer" onClick={() => onExploreTools('travel')}>
                <div className="text-lg mb-1">🏙️</div>
                <div className="font-bold text-xs text-white">Go City</div>
                <div className="text-[10px] text-purple-300 font-semibold mt-0.5">{currentLang === 'fr' ? '-50% Pass Ville' : '-50% City Passes'}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA BANNER */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 content-auto">
        <div className="bg-gradient-to-br from-coral to-coral-dark text-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-14 text-center shadow-xl relative overflow-hidden">
          {/* Subtle Floating Shapes */}
          <div className="absolute top-4 left-6 opacity-20 text-3xl sm:text-4xl animate-float">❤️</div>
          <div className="absolute bottom-6 right-8 opacity-20 text-4xl sm:text-5xl animate-float-reverse">✨</div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-5 sm:space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white leading-tight">
              {t.ctaBanner.title}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed">
              {t.ctaBanner.subtitle}
            </p>
            <div className="pt-2">
              <button
                id="final-banner-cta"
                onClick={onStartQuiz}
                className="bg-white text-coral hover:bg-light-pink px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-bold text-base shadow-lg transition-all transform hover:-translate-y-1 cursor-pointer w-full sm:w-auto justify-center min-h-[48px]"
              >
                {t.ctaBanner.btn} →
              </button>
            </div>
            <p className="text-xs text-white/80 font-medium">
              ✓ {t.ctaBanner.guarantee}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
