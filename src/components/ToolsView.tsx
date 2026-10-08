import React, { useState, useEffect } from 'react';
import { Language, translations } from '../translations';
import { LOVE_LANG_QUESTIONS } from '../data/toolsData';
import { LoveLetterGenerator } from './LoveLetterGenerator';
import { DateFortuneWheel } from './DateFortuneWheel';
import astrologyLoveImg from '../assets/images/astrology_love_harmony_1790262297024.jpg';
import coupleChatImg from '../assets/images/couple_communication_chat_1790262319749.jpg';
import bgToolsCelestial from '../assets/images/bg_tools_celestial_1790377540561.jpg';

interface ToolsViewProps {
  currentLang: Language;
  onNavigateToQuiz: () => void;
  initialTool?: 'letters' | 'loveLang' | 'zodiac' | 'dates';
}

export const ToolsView: React.FC<ToolsViewProps> = ({ currentLang, onNavigateToQuiz, initialTool }) => {
  const t = translations[currentLang];
  const [activeTool, setActiveTool] = useState<'letters' | 'loveLang' | 'zodiac' | 'dates'>(() => {
    if (initialTool) return initialTool;
    try {
      const params = new URLSearchParams(window.location.search);
      const toolParam = params.get('tool');
      if (toolParam === 'letters' || toolParam === 'letter' || toolParam === 'voeux') {
        return 'letters';
      }
    } catch {}
    return 'letters';
  });

  // Tool 1: Love Language State with localStorage draft support
  const [loveLangStep, setLoveLangStep] = useState<number>(() => {
    try {
      const raw = localStorage.getItem('lovequiz_lovelang');
      if (raw) {
        const parsed = JSON.parse(raw);
        return typeof parsed.step === 'number' ? parsed.step : 0;
      }
    } catch {}
    return 0;
  });

  const [loveLangAnswers, setLoveLangAnswers] = useState<{ [id: number]: 'words' | 'time' | 'gifts' | 'acts' | 'touch' }>(() => {
    try {
      const raw = localStorage.getItem('lovequiz_lovelang');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.answers) return parsed.answers;
      }
    } catch {}
    return {};
  });

  const [loveLangResult, setLoveLangResult] = useState<{
    topLang: 'words' | 'time' | 'gifts' | 'acts' | 'touch';
    counts: Record<'words' | 'time' | 'gifts' | 'acts' | 'touch', number>;
  } | null>(() => {
    try {
      const raw = localStorage.getItem('lovequiz_lovelang');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.result) return parsed.result;
      }
    } catch {}
    return null;
  });

  // Sync Love Languages to localStorage
  useEffect(() => {
    try {
      if (Object.keys(loveLangAnswers).length > 0 || loveLangResult) {
        localStorage.setItem(
          'lovequiz_lovelang',
          JSON.stringify({
            step: loveLangStep,
            answers: loveLangAnswers,
            result: loveLangResult,
          })
        );
      }
    } catch {}
  }, [loveLangStep, loveLangAnswers, loveLangResult]);

  const handleLoveLangPick = (choice: 'words' | 'time' | 'gifts' | 'acts' | 'touch') => {
    const q = LOVE_LANG_QUESTIONS[loveLangStep];
    const newAnswers = { ...loveLangAnswers, [q.id]: choice };
    setLoveLangAnswers(newAnswers);

    if (loveLangStep < LOVE_LANG_QUESTIONS.length - 1) {
      setLoveLangStep((prev) => prev + 1);
    } else {
      // Calculate scores
      const counts: Record<'words' | 'time' | 'gifts' | 'acts' | 'touch', number> = {
        words: 0,
        time: 0,
        gifts: 0,
        acts: 0,
        touch: 0,
      };
      (Object.values(newAnswers) as ('words' | 'time' | 'gifts' | 'acts' | 'touch')[]).forEach((val) => {
        counts[val] = (counts[val] || 0) + 1;
      });
      const topLang = (Object.keys(counts) as ('words' | 'time' | 'gifts' | 'acts' | 'touch')[]).reduce(
        (a, b) => (counts[a] > counts[b] ? a : b)
      );
      setLoveLangResult({ topLang, counts });
    }
  };

  const handleResetLoveLang = () => {
    try {
      localStorage.removeItem('lovequiz_lovelang');
    } catch {}
    setLoveLangStep(0);
    setLoveLangAnswers({});
    setLoveLangResult(null);
  };

  // Tool 2: Zodiac Calculator State with localStorage persistence
  const [name1, setName1] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('lovequiz_zodiac');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name1) return parsed.name1;
      }
    } catch {}
    return 'Camille';
  });

  const [name2, setName2] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('lovequiz_zodiac');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name2) return parsed.name2;
      }
    } catch {}
    return 'Julien';
  });

  const [sign1, setSign1] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('lovequiz_zodiac');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.sign1) return parsed.sign1;
      }
    } catch {}
    return 'Bélier / Aries ♈';
  });

  const [sign2, setSign2] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('lovequiz_zodiac');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.sign2) return parsed.sign2;
      }
    } catch {}
    return 'Lion / Leo ♌';
  });

  const [zodiacResult, setZodiacResult] = useState<{ score: number; text: string } | null>(() => {
    try {
      const saved = localStorage.getItem('lovequiz_zodiac');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.result) return parsed.result;
      }
    } catch {}
    return null;
  });

  // Sync Zodiac state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        'lovequiz_zodiac',
        JSON.stringify({
          name1,
          name2,
          sign1,
          sign2,
          result: zodiacResult,
        })
      );
    } catch {}
  }, [name1, name2, sign1, sign2, zodiacResult]);

  const signsList = [
    'Bélier / Aries ♈',
    'Taureau / Taurus ♉',
    'Gémeaux / Gemini ♊',
    'Cancer ♋',
    'Lion / Leo ♌',
    'Vierge / Virgo ♍',
    'Balance / Libra ♎',
    'Scorpion / Scorpio ♏',
    'Sagittaire / Sagittarius ♐',
    'Capricorne / Capricorn ♑',
    'Verseau / Aquarius ♒',
    'Poissons / Pisces ♓',
  ];

  const calculateZodiac = (e: React.FormEvent) => {
    e.preventDefault();
    const seed = (name1.length * 7 + name2.length * 11 + sign1.length + sign2.length) % 15;
    const score = 85 + seed;
    const descFr = `L’association entre ${name1} et ${name2} dévoile une connexion magnétique et chaleureuse. L’alliance de leurs éléments astrologiques favorise les projets créatifs et une fidélité réconfortante.`;
    const descEn = `The bond between ${name1} and ${name2} radiates magnetic warmth. The combination of their astrological elements nurtures creative projects and deeply comforting fidelity.`;
    setZodiacResult({ score, text: currentLang === 'fr' ? descFr : descEn });
  };

  return (
    <div className="relative min-h-[85vh] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Celestial Astrological Atmosphere */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <img
          src={bgToolsCelestial}
          alt=""
          aria-hidden="true"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter blur-xs scale-105 opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-off-white/85 via-off-white/60 to-off-white"></div>
        {/* Soft pastel light glows */}
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-pastel-yellow/40 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 left-10 w-80 h-80 bg-powder/50 rounded-full filter blur-3xl"></div>
      </div>

      <section id="tools-section" className="max-w-4xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <div className="text-xs font-bold tracking-wider uppercase text-coral mb-2">
          {t.tools.tag}
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-deep-black mb-3">
          {t.tools.title}
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-text-gray">
          {t.tools.subtitle}
        </p>
      </div>

      {/* Tool Tabs Selector */}
      <div className="flex flex-nowrap sm:flex-wrap items-center justify-start sm:justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 overflow-x-auto no-scrollbar py-1 px-1 -mx-2 sm:mx-0">
        <button
          id="tab-tool-letters"
          onClick={() => setActiveTool('letters')}
          className={`shrink-0 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer min-h-[44px] flex items-center gap-1.5 touch-manipulation active:scale-95 ${
            activeTool === 'letters'
              ? 'bg-coral text-white shadow-sm ring-2 ring-coral/20'
              : 'bg-white text-text-gray border border-powder hover:bg-light-pink hover:text-deep-black'
          }`}
        >
          <span>🪄</span>
          <span>{currentLang === 'fr' ? "Lettres d'Amour IA" : 'AI Love Letters'}</span>
          <span className="text-[10px] bg-powder text-coral font-bold px-1.5 py-0.5 rounded-full">✨</span>
        </button>
        <button
          id="tab-tool-lovelang"
          onClick={() => setActiveTool('loveLang')}
          className={`shrink-0 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer min-h-[44px] flex items-center gap-1.5 touch-manipulation active:scale-95 ${
            activeTool === 'loveLang'
              ? 'bg-coral text-white shadow-sm ring-2 ring-coral/20'
              : 'bg-white text-text-gray border border-powder hover:bg-light-pink hover:text-deep-black'
          }`}
        >
          <span>💌</span>
          <span>{t.tools.tool1Title}</span>
        </button>
        <button
          id="tab-tool-zodiac"
          onClick={() => setActiveTool('zodiac')}
          className={`shrink-0 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer min-h-[44px] flex items-center gap-1.5 touch-manipulation active:scale-95 ${
            activeTool === 'zodiac'
              ? 'bg-coral text-white shadow-sm ring-2 ring-coral/20'
              : 'bg-white text-text-gray border border-powder hover:bg-light-pink hover:text-deep-black'
          }`}
        >
          <span>✨</span>
          <span>{t.tools.tool2Title}</span>
        </button>
        <button
          id="tab-tool-dates"
          onClick={() => setActiveTool('dates')}
          className={`shrink-0 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer min-h-[44px] flex items-center gap-1.5 touch-manipulation active:scale-95 ${
            activeTool === 'dates'
              ? 'bg-coral text-white shadow-sm ring-2 ring-coral/20'
              : 'bg-white text-text-gray border border-powder hover:bg-light-pink hover:text-deep-black'
          }`}
        >
          <span>🎡</span>
          <span>{currentLang === 'fr' ? 'Roue de la Fortune des Rendez-Vous' : 'Date Fortune Wheel'}</span>
          <span className="text-[10px] bg-powder text-coral font-bold px-1.5 py-0.5 rounded-full">✨</span>
        </button>
      </div>

      {/* TOOL 0: AI LOVE LETTER & VOWS GENERATOR */}
      {activeTool === 'letters' && (
        <LoveLetterGenerator
          currentLang={currentLang}
          onNavigateToQuiz={onNavigateToQuiz}
        />
      )}

      {/* TOOL 1: LOVE LANGUAGES */}
      {activeTool === 'loveLang' && (
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-lg border border-powder max-w-3xl mx-auto">
          {!loveLangResult ? (
            <div>
              <div className="flex justify-between items-center text-xs font-semibold mb-3 text-text-gray">
                <span>Question {loveLangStep + 1} / {LOVE_LANG_QUESTIONS.length}</span>
                <span className="text-coral">Test des 5 Langages</span>
              </div>
              <div className="w-full bg-powder rounded-full h-2.5 mb-6 overflow-hidden">
                <div
                  className="bg-coral h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${((loveLangStep + 1) / LOVE_LANG_QUESTIONS.length) * 100}%` }}
                ></div>
              </div>

              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-deep-black mb-6 leading-snug">
                {LOVE_LANG_QUESTIONS[loveLangStep][currentLang].question}
              </h3>

              <div className="space-y-3 sm:space-y-4">
                <button
                  id="love-opt-a"
                  onClick={() => handleLoveLangPick(LOVE_LANG_QUESTIONS[loveLangStep][currentLang].optionA.lang)}
                  className="w-full text-left p-4 sm:p-5 rounded-2xl border-2 border-black/5 bg-white hover:border-coral hover:bg-light-pink transition-all cursor-pointer shadow-xs group min-h-[52px]"
                >
                  <span className="text-xs sm:text-base text-deep-black group-hover:text-coral font-medium leading-relaxed">
                    A. {LOVE_LANG_QUESTIONS[loveLangStep][currentLang].optionA.text}
                  </span>
                </button>
                <button
                  id="love-opt-b"
                  onClick={() => handleLoveLangPick(LOVE_LANG_QUESTIONS[loveLangStep][currentLang].optionB.lang)}
                  className="w-full text-left p-4 sm:p-5 rounded-2xl border-2 border-black/5 bg-white hover:border-coral hover:bg-light-pink transition-all cursor-pointer shadow-xs group min-h-[52px]"
                >
                  <span className="text-xs sm:text-base text-deep-black group-hover:text-coral font-medium leading-relaxed">
                    B. {LOVE_LANG_QUESTIONS[loveLangStep][currentLang].optionB.text}
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              {/* Couple Communication Image */}
              <div className="max-w-md mx-auto mb-6 rounded-2xl overflow-hidden border border-powder shadow-sm">
                <img
                  src={coupleChatImg}
                  alt="Couple communiquant avec complicité"
                  referrerPolicy="no-referrer"
                  className="w-full h-48 object-cover"
                />
              </div>

              <span className="text-xs uppercase font-bold tracking-widest text-coral">
                {currentLang === 'fr' ? 'Votre langage dominant' : 'Your primary love language'}
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-deep-black mt-1 mb-4">
                {loveLangResult.topLang === 'words' && (currentLang === 'fr' ? 'Les Paroles Valorisantes 🗣️' : 'Words of Affirmation 🗣️')}
                {loveLangResult.topLang === 'time' && (currentLang === 'fr' ? 'Les Moments de Qualité ⏳' : 'Quality Time ⏳')}
                {loveLangResult.topLang === 'gifts' && (currentLang === 'fr' ? 'Les Cadeaux Attentionnés 🎁' : 'Receiving Gifts 🎁')}
                {loveLangResult.topLang === 'acts' && (currentLang === 'fr' ? 'Les Services Rendus 🤝' : 'Acts of Service 🤝')}
                {loveLangResult.topLang === 'touch' && (currentLang === 'fr' ? 'Le Toucher Physique 🫂' : 'Physical Touch 🫂')}
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-text-gray max-w-xl mx-auto mb-8 leading-relaxed">
                {currentLang === 'fr'
                  ? 'Pour vous sentir profondément aimé(e), vous avez besoin que votre partenaire nourrisse ce canal en priorité. Partagez ce résultat avec votre moitié pour accorder vos violons !'
                  : 'To feel deeply cherished, this is the primary channel you need your partner to nurture. Share this outcome with your significant other to align your daily affection!'}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <button
                  id="reset-lovelang-btn"
                  onClick={handleResetLoveLang}
                  className="btn-secondary w-full sm:w-auto justify-center min-h-[44px]"
                >
                  {currentLang === 'fr' ? 'Recommencer le test' : 'Retake test'}
                </button>
                <button
                  id="lovelang-to-quiz-btn"
                  onClick={onNavigateToQuiz}
                  className="btn-primary w-full sm:w-auto justify-center min-h-[44px]"
                >
                  {currentLang === 'fr' ? 'Faire le Grand Quiz de Couple' : 'Take full Couple Quiz'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TOOL 2: ZODIAC CALCULATOR */}
      {activeTool === 'zodiac' && (
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-lg border border-powder max-w-3xl mx-auto">
          {/* Celestial Header Banner */}
          <div className="relative rounded-2xl overflow-hidden mb-6 h-40 sm:h-52 border border-powder shadow-sm">
            <img
              src={astrologyLoveImg}
              alt="Astrologie et compatibilité amoureuse"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-black/80 via-deep-black/30 to-transparent flex flex-col justify-end p-4 sm:p-6 text-white text-left">
              <span className="text-xs uppercase font-bold tracking-widest text-coral drop-shadow-sm">
                {currentLang === 'fr' ? 'Harmonie Astrale & Éléments' : 'Astral Harmony & Elements'}
              </span>
              <p className="text-base sm:text-xl font-bold drop-shadow-sm">
                {currentLang === 'fr' ? 'Ce que les constellations révèlent sur votre synergie' : 'What the stars reveal about your romantic synergy'}
              </p>
            </div>
          </div>

          <form onSubmit={calculateZodiac} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Partner 1 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-off-white border border-powder">
                <label className="block text-xs font-bold uppercase tracking-wider text-coral mb-2">
                  {currentLang === 'fr' ? 'Partenaire 1' : 'Partner 1'}
                </label>
                <input
                  type="text"
                  value={name1}
                  onChange={(e) => setName1(e.target.value)}
                  placeholder="Prénom"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-[#CCCCCC] text-deep-black text-base font-medium mb-3 focus:outline-none focus:border-coral min-h-[44px] bg-white"
                />
                <select
                  value={sign1}
                  onChange={(e) => setSign1(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#CCCCCC] text-deep-black text-base font-medium bg-white focus:outline-none focus:border-coral min-h-[44px]"
                >
                  {signsList.map((s, idx) => (
                    <option key={idx} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Partner 2 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-off-white border border-powder">
                <label className="block text-xs font-bold uppercase tracking-wider text-coral mb-2">
                  {currentLang === 'fr' ? 'Partenaire 2' : 'Partner 2'}
                </label>
                <input
                  type="text"
                  value={name2}
                  onChange={(e) => setName2(e.target.value)}
                  placeholder="Prénom"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-[#CCCCCC] text-deep-black text-base font-medium mb-3 focus:outline-none focus:border-coral min-h-[44px] bg-white"
                />
                <select
                  value={sign2}
                  onChange={(e) => setSign2(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#CCCCCC] text-deep-black text-base font-medium bg-white focus:outline-none focus:border-coral min-h-[44px]"
                >
                  {signsList.map((s, idx) => (
                    <option key={idx} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="text-center pt-2">
              <button
                id="calc-zodiac-btn"
                type="submit"
                className="btn-primary w-full sm:w-auto px-8 justify-center min-h-[48px] group hover:shadow-lg active:scale-95 transition-all"
              >
                <span className="inline-block group-hover:scale-125 group-hover:rotate-12 transition-transform">🔮</span>
                <span className="group-hover:tracking-wide transition-all">{currentLang === 'fr' ? 'Calculer l’Alchimie Astrale' : 'Calculate Astral Harmony'}</span>
              </button>
            </div>
          </form>

          {zodiacResult && (
            <div className="mt-8 pt-8 border-t border-powder text-center animate-fadeIn">
              <div className="text-xs font-bold uppercase tracking-wider text-coral mb-2">
                Alchimie Céleste : {zodiacResult.score}%
              </div>
              <p className="text-sm sm:text-base text-deep-black max-w-lg mx-auto leading-relaxed">
                {zodiacResult.text}
              </p>
            </div>
          )}
        </div>
      )}

      {/* TOOL 3: ROUE DE LA FORTUNE DES RENDEZ-VOUS */}
      {activeTool === 'dates' && (
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-lg border border-powder max-w-3xl mx-auto text-center space-y-6">
          <div className="max-w-xl mx-auto text-center space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-coral">
              <span>🎡</span>
              <span>{currentLang === 'fr' ? 'ROUE DE LA FORTUNE AMOUREUSE' : 'ROMANTIC WHEEL OF FORTUNE'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-deep-black">
              {currentLang === 'fr'
                ? 'Laissez le destin choisir votre prochain rencard !'
                : 'Let serendipity pick your next romantic date!'}
            </h3>
            <p className="text-xs sm:text-sm text-text-gray">
              {currentLang === 'fr'
                ? 'En panne d’idées pour ce soir ? Choisissez une catégorie d’ambiance, lancez la roue de l’amour et laissez-vous surprendre.'
                : 'Running low on date night ideas? Select an ambiance, spin the love wheel, and let destiny guide your evening.'}
            </p>
          </div>

          <DateFortuneWheel currentLang={currentLang} />
        </div>
      )}
    </section>
  </div>
);
};
