import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Language, translations } from '../translations';
import { QUIZ_QUESTIONS, ARCHETYPES } from '../data/quizData';
import { downloadSouvenirImage } from '../utils/souvenirGenerator';
import heroCoupleImg from '../assets/images/hero_couple_love_1790262271844.jpg';
import bgQuizAmbient from '../assets/images/bg_quiz_ambient_1790377528348.jpg';
import { SocialShareButtons } from './SocialShareButtons';

interface QuizEngineProps {
  currentLang: Language;
  onNavigateToTools: () => void;
  onNavigateToThemed?: () => void;
}

const STORAGE_KEY = 'lovequiz_draft';

interface SavedQuizDraft {
  selectedAnswers: { [questionId: number]: number };
  currentQuestionIdx: number;
  isCompleted: boolean;
  finalScore: number;
  pillarScores: { comm: number; romance: number; conflict: number; future: number };
  matchedArchetypeId?: number | string;
  creatorName?: string;
  savedAt: string;
}

const loadSavedDraft = (): SavedQuizDraft | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.selectedAnswers === 'object') {
      return parsed;
    }
  } catch {
    // ignore
  }
  return null;
};

export const QuizEngine: React.FC<QuizEngineProps> = ({ currentLang, onNavigateToTools, onNavigateToThemed }) => {
  const t = translations[currentLang];

  // Quiz State with automatic local draft recovery
  const initialDraft = loadSavedDraft();

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(() => {
    if (initialDraft && !initialDraft.isCompleted && typeof initialDraft.currentQuestionIdx === 'number') {
      return Math.min(Math.max(0, initialDraft.currentQuestionIdx), QUIZ_QUESTIONS.length - 1);
    }
    return 0;
  });

  const [selectedAnswers, setSelectedAnswers] = useState<{ [questionId: number]: number }>(() => {
    if (initialDraft && initialDraft.selectedAnswers) {
      return initialDraft.selectedAnswers;
    }
    return {};
  });

  const [isCalculating, setIsCalculating] = useState(false);
  const [calcStepIndex, setCalcStepIndex] = useState(0);

  const [isCompleted, setIsCompleted] = useState<boolean>(() => {
    return !!(initialDraft && initialDraft.isCompleted);
  });

  const [finalScore, setFinalScore] = useState<number>(() => {
    return initialDraft && typeof initialDraft.finalScore === 'number' ? initialDraft.finalScore : 88;
  });

  const [pillarScores, setPillarScores] = useState<{
    comm: number;
    romance: number;
    conflict: number;
    future: number;
  }>(() => {
    if (initialDraft && initialDraft.pillarScores) {
      return initialDraft.pillarScores;
    }
    return {
      comm: 85,
      romance: 90,
      conflict: 80,
      future: 88,
    };
  });

  const [matchedArchetype, setMatchedArchetype] = useState(() => {
    if (initialDraft && initialDraft.matchedArchetypeId) {
      const found = ARCHETYPES.find((a) => a.id === initialDraft.matchedArchetypeId);
      if (found) return found;
    }
    return ARCHETYPES[0];
  });

  const [copiedLink, setCopiedLink] = useState(false);
  const [showRestoredNotice, setShowRestoredNotice] = useState<boolean>(() => {
    return !!(initialDraft && Object.keys(initialDraft.selectedAnswers || {}).length > 0 && !initialDraft.isCompleted);
  });
  const [lastSavedTime, setLastSavedTime] = useState<string>(() => {
    return initialDraft?.savedAt ? new Date(initialDraft.savedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
  });

  // Incoming Couple Challenge Data from URL query params
  const [challengeInfo] = useState<{
    isChallenge: boolean;
    partner1Name: string;
    partner1Score: number;
    partner1Pillars: { comm: number; romance: number; conflict: number; future: number };
    partner1ArchetypeId?: string | number;
  } | null>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const isChallenge = params.get('mode') === 'challenge' || params.get('ref') === 'challenge';
      const p1 = params.get('p1') || '';
      const score = parseInt(params.get('score') || params.get('ref_score') || '0', 10);
      const comm = parseInt(params.get('comm') || '85', 10);
      const romance = parseInt(params.get('romance') || '90', 10);
      const conflict = parseInt(params.get('conflict') || '80', 10);
      const future = parseInt(params.get('future') || '88', 10);
      const arch = params.get('arch') || '0';

      if (isChallenge && score > 0) {
        return {
          isChallenge: true,
          partner1Name: p1 ? decodeURIComponent(p1) : (currentLang === 'fr' ? 'Votre Partenaire' : 'Your Partner'),
          partner1Score: score,
          partner1Pillars: { comm, romance, conflict, future },
          partner1ArchetypeId: arch,
        };
      }
    } catch {
      // ignore
    }
    return null;
  });

  // User names and Duel mode toggle
  const [creatorName, setCreatorName] = useState(() => initialDraft?.creatorName || '');
  const [isDuelViewActive, setIsDuelViewActive] = useState<boolean>(() => !!challengeInfo);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      setCanNativeShare(true);
    }
  }, []);

  const getChallengeUrl = () => {
    const name = encodeURIComponent(creatorName.trim() || (currentLang === 'fr' ? 'Mon Amour' : 'My Love'));
    return `${window.location.origin}/?tab=quiz&mode=challenge&p1=${name}&score=${finalScore}&comm=${pillarScores.comm}&romance=${pillarScores.romance}&conflict=${pillarScores.conflict}&future=${pillarScores.future}&arch=${matchedArchetype.id}`;
  };

  const handleNativeShare = async () => {
    const shareUrl = getChallengeUrl();
    const name = creatorName.trim() || (currentLang === 'fr' ? 'Moi' : 'Me');
    const shareTitle = currentLang === 'fr' ? 'LoveQuiz – Défi de Couple' : 'LoveQuiz – Couple Challenge';
    const shareText = currentLang === 'fr'
      ? `❤️ ${name} a obtenu un score de compatibilité de ${finalScore}% sur LoveQuiz ! Fais le test pour qu’on compare nos réponses :`
      : `❤️ ${name} scored ${finalScore}% compatibility on LoveQuiz! Take the test so we can compare our scores:`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          handleCopyLink();
        }
        return;
      }
    }
    handleCopyLink();
  };

  const getWhatsAppShareUrl = () => {
    const shareUrl = getChallengeUrl();
    const name = creatorName.trim() || (currentLang === 'fr' ? 'Moi' : 'Me');
    const text = currentLang === 'fr'
      ? `❤️ J’ai fait le test de couple LoveQuiz (${finalScore}% de compatibilité) ! Réponds aux questions pour qu’on compare notre synchronisation : ${shareUrl}`
      : `❤️ I took the LoveQuiz couple test (${finalScore}% compatibility)! Answer the questions to compare our sync: ${shareUrl}`;
    return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  };

  const getSmsShareUrl = () => {
    const shareUrl = getChallengeUrl();
    const name = creatorName.trim() || (currentLang === 'fr' ? 'Moi' : 'Me');
    const text = currentLang === 'fr'
      ? `❤️ J’ai obtenu ${finalScore}% sur LoveQuiz ! Fais le test pour révéler notre harmonie de couple : ${shareUrl}`
      : `❤️ I scored ${finalScore}% on LoveQuiz! Take the test to reveal our couple harmony: ${shareUrl}`;
    return `sms:?&body=${encodeURIComponent(text)}`;
  };

  const handleCopyLink = () => {
    const shareUrl = getChallengeUrl();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
    }
    setCopiedLink(true);
    setTimeout(() => {
      setCopiedLink(false);
    }, 3500);
  };

  const [isGeneratingSouvenir, setIsGeneratingSouvenir] = useState(false);

  const handleDownloadSouvenir = async () => {
    setIsGeneratingSouvenir(true);
    try {
      const isFr = currentLang === 'fr';
      const coupleTitle = creatorName.trim()
        ? (challengeInfo ? `${challengeInfo.partner1Name} & ${creatorName}` : `${creatorName} & Son/Sa Partenaire`)
        : (isFr ? 'Camille & Thomas' : 'Camille & Thomas');

      const dateStr = new Date().toLocaleDateString(isFr ? 'fr-FR' : 'en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });

      await downloadSouvenirImage({
        coupleName: coupleTitle,
        score: finalScore,
        archetypeTitle: currentLang === 'fr' ? matchedArchetype.titleFr : matchedArchetype.titleEn,
        archetypeDesc: currentLang === 'fr' ? matchedArchetype.descFr : matchedArchetype.descEn,
        pillars: pillarScores,
        pillarLabels: {
          comm: t.quiz.pillars.comm,
          romance: t.quiz.pillars.romance,
          conflict: t.quiz.pillars.conflict,
          future: t.quiz.pillars.future,
        },
        dateStr,
        isFrench: isFr,
      });
    } catch {
      // ignore
    } finally {
      setIsGeneratingSouvenir(false);
    }
  };

  const handlePrintPdf = () => {
    window.print();
  };

  const currentQ = QUIZ_QUESTIONS[currentQuestionIdx];
  const qData = currentQ[currentLang];
  const progressPercent = Math.round(((currentQuestionIdx + 1) / QUIZ_QUESTIONS.length) * 100);

  const handleSelectOption = (optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionIndex,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    } else {
      // Calculate results
      triggerResultsCalculation();
    }
  };

  const triggerCompletionConfetti = () => {
    try {
      // Primary dual fireworks cannon from bottom corners
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { x: 0.15, y: 0.8 },
        colors: ['#FF6B8A', '#FFA8BA', '#FFD166', '#7BDFF2', '#FFFFFF'],
        zIndex: 9999,
      });

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { x: 0.85, y: 0.8 },
        colors: ['#FF6B8A', '#FFA8BA', '#FFD166', '#7BDFF2', '#FFFFFF'],
        zIndex: 9999,
      });

      // Center celebratory burst
      setTimeout(() => {
        confetti({
          particleCount: 120,
          spread: 100,
          startVelocity: 45,
          decay: 0.9,
          scalar: 1.2,
          origin: { x: 0.5, y: 0.5 },
          colors: ['#FF6B8A', '#FFD166', '#E63946', '#FFCCD5', '#7BDFF2'],
          zIndex: 9999,
        });
      }, 250);

      // Trailing shower
      setTimeout(() => {
        confetti({
          particleCount: 60,
          spread: 80,
          startVelocity: 30,
          origin: { x: 0.5, y: 0.3 },
          colors: ['#FF6B8A', '#FFD166', '#FFFFFF'],
          zIndex: 9999,
        });
      }, 550);
    } catch {
      // Fallback gracefully if canvas is unavailable
    }
  };

  // Trigger celebration confetti explosion whenever user finishes the quiz
  useEffect(() => {
    if (isCompleted) {
      triggerCompletionConfetti();
    }
  }, [isCompleted]);

  const handlePrev = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx((prev) => prev - 1);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }
  };

  const triggerResultsCalculation = () => {
    setIsCalculating(true);
    setCalcStepIndex(0);
    window.scrollTo({ top: 120, behavior: 'smooth' });

    // Aggregate score
    let totalScore = 0;
    const maxPossible = QUIZ_QUESTIONS.length * 4;

    const pSums = { comm: 0, romance: 0, conflict: 0, future: 0 };
    const pCounts = { comm: 0, romance: 0, conflict: 0, future: 0 };

    QUIZ_QUESTIONS.forEach((q) => {
      const chosenIdx = selectedAnswers[q.id] ?? 0;
      const opt = q[currentLang].options[chosenIdx] || q[currentLang].options[0];
      totalScore += opt.score;

      if (opt.pillarScore) {
        (Object.keys(opt.pillarScore) as ('comm' | 'romance' | 'conflict' | 'future')[]).forEach((k) => {
          const val = opt.pillarScore[k];
          if (val) {
            pSums[k] += val;
            pCounts[k] += 1;
          }
        });
      }
    });

    const percent = Math.min(99, Math.max(65, Math.round((totalScore / maxPossible) * 100)));
    setFinalScore(percent);

    // Pillar percentages
    setPillarScores({
      comm: Math.round(((pSums.comm || 12) / ((pCounts.comm || 4) * 4)) * 100),
      romance: Math.round(((pSums.romance || 12) / ((pCounts.romance || 4) * 4)) * 100),
      conflict: Math.round(((pSums.conflict || 12) / ((pCounts.conflict || 4) * 4)) * 100),
      future: Math.round(((pSums.future || 12) / ((pCounts.future || 4) * 4)) * 100),
    });

    // Archetype selection
    if (percent >= 90) {
      setMatchedArchetype(ARCHETYPES[0]); // Soulmates
    } else if (pSums.romance > pSums.future && percent >= 80) {
      setMatchedArchetype(ARCHETYPES[1]); // Explorers
    } else if (pSums.conflict >= pSums.romance) {
      setMatchedArchetype(ARCHETYPES[2]); // Balanced
    } else {
      setMatchedArchetype(ARCHETYPES[3]); // Builders
    }

    // Calculation animation timer
    const interval = setInterval(() => {
      setCalcStepIndex((prev) => {
        if (prev >= 2) {
          clearInterval(interval);
          setTimeout(() => {
            setIsCalculating(false);
            setIsCompleted(true);
            window.scrollTo({ top: 120, behavior: 'smooth' });
          }, 600);
          return 2;
        }
        return prev + 1;
      });
    }, 800);
  };

  // Auto-save quiz progress to localStorage whenever answers, question, or completion change
  useEffect(() => {
    try {
      if (Object.keys(selectedAnswers).length > 0 || isCompleted) {
        const draft: SavedQuizDraft = {
          selectedAnswers,
          currentQuestionIdx,
          isCompleted,
          finalScore,
          pillarScores,
          matchedArchetypeId: matchedArchetype.id,
          creatorName: creatorName.trim(),
          savedAt: new Date().toISOString(),
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
        const now = new Date();
        setLastSavedTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      }
    } catch {
      // ignore quota or private mode errors
    }
  }, [selectedAnswers, currentQuestionIdx, isCompleted, finalScore, pillarScores, matchedArchetype, creatorName]);

  const handleRestart = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setSelectedAnswers({});
    setCurrentQuestionIdx(0);
    setIsCompleted(false);
    setIsCalculating(false);
    setShowRestoredNotice(false);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-[85vh] py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Ambient Romantic Image */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <img
          src={bgQuizAmbient}
          alt=""
          aria-hidden="true"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter blur-xs scale-105 opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-off-white/80 via-off-white/55 to-off-white"></div>
        {/* Soft pastel light glows */}
        <div className="absolute top-12 left-1/4 w-80 h-80 bg-powder/60 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-pastel-yellow/50 rounded-full filter blur-3xl"></div>
      </div>

      {/* Quiz Category Mode Switcher */}
      {onNavigateToThemed && !isCompleted && !isCalculating && (
        <div className="max-w-xs sm:max-w-sm mx-auto mb-6 sm:mb-8 flex items-center justify-center p-1 bg-white/90 backdrop-blur-xs rounded-full border border-powder shadow-xs relative z-20">
          <button
            className="flex-1 py-1.5 px-3 rounded-full text-xs font-bold bg-light-pink text-coral shadow-xs cursor-default text-center"
          >
            {currentLang === 'fr' ? 'Grand Test (15Q)' : 'Grand Test (15Q)'}
          </button>
          <button
            onClick={onNavigateToThemed}
            className="flex-1 py-1.5 px-3 rounded-full text-xs font-semibold text-text-gray hover:text-deep-black transition-colors cursor-pointer flex items-center justify-center gap-1.5 text-center"
          >
            <span>{currentLang === 'fr' ? 'Quiz Thématiques' : 'Themed Quizzes'}</span>
            <span className="text-[10px] text-coral font-bold bg-powder px-1.5 py-0.5 rounded-full">4</span>
          </button>
        </div>
      )}

      <section id="quiz-section" className="max-w-3xl mx-auto relative z-10">
      {/* 1. CALCULATING VIEW */}
      {isCalculating && (
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-14 shadow-lg border border-powder text-center max-w-xl mx-auto my-8 sm:my-12">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-light-pink border-2 border-coral flex items-center justify-center mx-auto mb-5 sm:mb-6 animate-bounce shadow-md">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 fill-coral" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-deep-black mb-3">
            {t.quiz.calculating}
          </h2>
          <p className="text-sm sm:text-base text-coral font-medium min-h-[28px] animate-pulse">
            {t.quiz.analyzingPoints[calcStepIndex]}
          </p>

          <div className="w-full bg-powder rounded-full h-3 mt-6 sm:mt-8 overflow-hidden">
            <div
              className="bg-coral h-3 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${(calcStepIndex + 1) * 33}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* 2. COMPLETED RESULT VIEW */}
      {isCompleted && !isCalculating && (
        <div className="space-y-6 sm:space-y-8 animate-fadeIn">
          {/* Top Result Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 shadow-xl border border-powder relative overflow-hidden text-center">
            {/* Background Pastel Aura */}
            <div className="absolute -top-16 -left-16 w-52 h-52 bg-pastel-yellow rounded-full filter blur-3xl opacity-60"></div>
            <div className="absolute -bottom-16 -right-16 w-60 h-60 bg-powder rounded-full filter blur-3xl opacity-70"></div>

            <div className="relative z-10">
              {/* Confetti Celebration Banner */}
              <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-light-pink border border-coral/30 text-coral text-xs sm:text-sm font-bold mb-3 shadow-xs">
                <span className="animate-wiggle">🎉</span>
                <span>{currentLang === 'fr' ? 'Félicitations, vos 15 réponses sont analysées !' : 'Congratulations, your 15 answers are analyzed!'}</span>
                <button
                  type="button"
                  id="celebration-confetti-replay"
                  onClick={triggerCompletionConfetti}
                  className="ml-1 px-2.5 py-0.5 rounded-full bg-white text-coral text-xs font-semibold hover:bg-coral hover:text-white transition-all cursor-pointer border border-coral/20 hover-wiggle shadow-xs active:scale-95"
                  title={currentLang === 'fr' ? 'Rejouer les confettis' : 'Replay confetti'}
                >
                  <span className="inline-block hover:animate-wiggle">🎊</span> {currentLang === 'fr' ? 'Confettis' : 'Confetti'}
                </button>
              </div>

              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-coral uppercase tracking-wider mb-2">
                  <svg className="w-3.5 h-3.5 fill-coral animate-heartbeat" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                  {t.quiz.resultTitle}
                </span>
              </div>

              {/* Big Circular Score Gauge */}
              <div className="my-5 sm:my-6 inline-flex flex-col items-center justify-center">
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center rounded-full bg-off-white border-4 border-powder shadow-inner">
                  {/* Circular SVG ring */}
                  <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      stroke="#FFE4EC"
                      strokeWidth="6"
                      fill="none"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      stroke="#FF6B8A"
                      strokeWidth="6"
                      strokeDasharray={264}
                      strokeDashoffset={264 - (264 * finalScore) / 100}
                      strokeLinecap="round"
                      fill="none"
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="flex flex-col items-center">
                    <span className="text-4xl sm:text-5xl font-extrabold text-deep-black tracking-tight">
                      {finalScore}<span className="text-xl sm:text-2xl text-coral">%</span>
                    </span>
                    <span className="text-[10px] sm:text-xs uppercase font-semibold text-text-gray tracking-wider mt-0.5">
                      {t.quiz.scoreLabel}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick 1-Click Social Share Bar */}
              <div className="max-w-xl mx-auto -mt-1 mb-4 no-print">
                <SocialShareButtons
                  score={finalScore}
                  archetypeTitle={currentLang === 'fr' ? matchedArchetype.badgeFr : matchedArchetype.badgeEn}
                  shareUrl={getChallengeUrl()}
                  currentLang={currentLang}
                  creatorName={creatorName}
                  variant="compact"
                />
              </div>

              {/* Couple Archetype Banner */}
              <div className="max-w-xl mx-auto my-5 sm:my-6 p-5 sm:p-6 rounded-2xl bg-light-pink border border-coral/25 text-left sm:text-center overflow-hidden">
                <div className="w-full h-36 sm:h-44 rounded-xl overflow-hidden mb-4 border border-coral/20">
                  <img
                    src={heroCoupleImg}
                    alt="Couple complice"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="text-xs font-bold text-coral uppercase tracking-wider mb-1">
                  {t.quiz.badgeText}
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-deep-black mb-1 sm:mb-2">
                  {currentLang === 'fr' ? matchedArchetype.badgeFr : matchedArchetype.badgeEn}
                </h3>
                <p className="text-sm sm:text-base font-semibold text-coral mb-2 sm:mb-3">
                  {currentLang === 'fr' ? matchedArchetype.taglineFr : matchedArchetype.taglineEn}
                </p>
                <p className="text-xs sm:text-sm md:text-base text-text-gray leading-relaxed">
                  {currentLang === 'fr' ? matchedArchetype.descFr : matchedArchetype.descEn}
                </p>
              </div>

              {/* 4 Pillars Breakdown Grid */}
              <div className="max-w-2xl mx-auto my-6 sm:my-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-left">
                {/* Pillar 1: Communication */}
                <div className="bg-off-white p-3.5 sm:p-4 rounded-xl border border-powder">
                  <div className="flex justify-between items-center mb-1.5 text-xs font-semibold">
                    <span className="text-deep-black">{t.quiz.pillars.comm}</span>
                    <span className="text-coral font-bold">{pillarScores.comm}%</span>
                  </div>
                  <div className="w-full bg-powder h-2 rounded-full overflow-hidden">
                    <div className="bg-coral h-2 rounded-full" style={{ width: `${pillarScores.comm}%` }}></div>
                  </div>
                </div>

                {/* Pillar 2: Romance */}
                <div className="bg-off-white p-3.5 sm:p-4 rounded-xl border border-powder">
                  <div className="flex justify-between items-center mb-1.5 text-xs font-semibold">
                    <span className="text-deep-black">{t.quiz.pillars.romance}</span>
                    <span className="text-coral font-bold">{pillarScores.romance}%</span>
                  </div>
                  <div className="w-full bg-powder h-2 rounded-full overflow-hidden">
                    <div className="bg-coral h-2 rounded-full" style={{ width: `${pillarScores.romance}%` }}></div>
                  </div>
                </div>

                {/* Pillar 3: Conflict Resolution */}
                <div className="bg-off-white p-3.5 sm:p-4 rounded-xl border border-powder">
                  <div className="flex justify-between items-center mb-1.5 text-xs font-semibold">
                    <span className="text-deep-black">{t.quiz.pillars.conflict}</span>
                    <span className="text-coral font-bold">{pillarScores.conflict}%</span>
                  </div>
                  <div className="w-full bg-powder h-2 rounded-full overflow-hidden">
                    <div className="bg-coral h-2 rounded-full" style={{ width: `${pillarScores.conflict}%` }}></div>
                  </div>
                </div>

                {/* Pillar 4: Shared Vision */}
                <div className="bg-off-white p-3.5 sm:p-4 rounded-xl border border-powder">
                  <div className="flex justify-between items-center mb-1.5 text-xs font-semibold">
                    <span className="text-deep-black">{t.quiz.pillars.future}</span>
                    <span className="text-coral font-bold">{pillarScores.future}%</span>
                  </div>
                  <div className="w-full bg-powder h-2 rounded-full overflow-hidden">
                    <div className="bg-coral h-2 rounded-full" style={{ width: `${pillarScores.future}%` }}></div>
                  </div>
                </div>
              </div>

              {/* Challenge / Duel Mode Toggle */}
              <div className="flex justify-center items-center gap-2 pt-2 pb-4">
                <button
                  type="button"
                  onClick={() => setIsDuelViewActive(false)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer min-h-[40px] touch-manipulation active:scale-95 ${
                    !isDuelViewActive
                      ? 'bg-coral text-white shadow-xs'
                      : 'bg-light-pink text-text-gray hover:text-deep-black hover:bg-powder'
                  }`}
                >
                  👤 {currentLang === 'fr' ? 'Mon Diagnostic Solo' : 'Solo Diagnosis'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsDuelViewActive(true)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer min-h-[40px] touch-manipulation active:scale-95 flex items-center gap-1.5 ${
                    isDuelViewActive
                      ? 'bg-coral text-white shadow-xs'
                      : 'bg-light-pink text-coral hover:bg-powder'
                  }`}
                >
                  <span>⚔️</span>
                  <span>{currentLang === 'fr' ? 'Mode Défi & Synchronisation' : 'Challenge & Sync Mode'}</span>
                  {challengeInfo && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  )}
                </button>
              </div>

              {/* DUEL COMPARISON MATRIX (When isDuelViewActive is TRUE) */}
              {isDuelViewActive && (() => {
                const p1 = challengeInfo || {
                  isChallenge: false,
                  partner1Name: currentLang === 'fr' ? 'Camille (Partenaire 1)' : 'Camille (Partner 1)',
                  partner1Score: 88,
                  partner1Pillars: { comm: 85, romance: 90, conflict: 80, future: 88 },
                  partner1ArchetypeId: '0',
                };
                const p2Name = creatorName.trim() || (currentLang === 'fr' ? 'Vous' : 'You');
                const p1Name = p1.partner1Name;

                const scoreDiff = Math.abs(p1.partner1Score - finalScore);
                const commDiff = Math.abs(p1.partner1Pillars.comm - pillarScores.comm);
                const romDiff = Math.abs(p1.partner1Pillars.romance - pillarScores.romance);
                const confDiff = Math.abs(p1.partner1Pillars.conflict - pillarScores.conflict);
                const futDiff = Math.abs(p1.partner1Pillars.future - pillarScores.future);
                const avgPillarDiff = (commDiff + romDiff + confDiff + futDiff) / 4;
                const syncScore = Math.max(72, Math.min(99, Math.round(100 - avgPillarDiff * 0.7 - scoreDiff * 0.3)));

                return (
                  <div className="my-6 p-5 sm:p-8 rounded-3xl bg-gradient-to-b from-white via-light-pink/40 to-white border-2 border-coral/30 shadow-lg text-left space-y-6 animate-fade-in-up">
                    {/* Duel Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-coral/15 pb-5">
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-coral/10 text-coral text-xs font-bold mb-2">
                          <span>⚔️</span>
                          <span>{currentLang === 'fr' ? 'Bilan Comparatif de Couple' : 'Couple Duel Comparison'}</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-deep-black">
                          {p1Name} & {p2Name}
                        </h3>
                        <p className="text-xs text-text-gray">
                          {challengeInfo
                            ? (currentLang === 'fr' ? 'Défi réel généré via votre lien d’invitation' : 'Real duel generated via challenge invite')
                            : (currentLang === 'fr' ? 'Simulation interactive côte à côte' : 'Interactive side-by-side simulation')}
                        </p>
                      </div>

                      {/* Sync Gauge Pill */}
                      <div className="text-center p-3 rounded-2xl bg-white border border-coral/20 shadow-xs shrink-0 sm:self-center">
                        <span className="text-2xl sm:text-3xl font-black text-coral">{syncScore}%</span>
                        <p className="text-[11px] font-bold text-deep-black uppercase tracking-wider">
                          {currentLang === 'fr' ? 'Synchronisation' : 'Sync Rate'}
                        </p>
                      </div>
                    </div>

                    {/* Side-by-Side Overall Score Comparison */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center">
                      <div className="p-4 rounded-2xl bg-white border border-powder shadow-2xs">
                        <p className="text-xs font-semibold text-text-gray truncate">{p1Name}</p>
                        <p className="text-2xl sm:text-3xl font-extrabold text-deep-black mt-1">{p1.partner1Score}%</p>
                        <span className="text-[10px] text-coral font-bold">{currentLang === 'fr' ? 'Score Solo' : 'Solo Score'}</span>
                      </div>
                      <div className="p-4 rounded-2xl bg-white border border-coral/30 shadow-2xs">
                        <p className="text-xs font-semibold text-text-gray truncate">{p2Name}</p>
                        <p className="text-2xl sm:text-3xl font-extrabold text-coral mt-1">{finalScore}%</p>
                        <span className="text-[10px] text-coral font-bold">{currentLang === 'fr' ? 'Score Solo' : 'Solo Score'}</span>
                      </div>
                    </div>

                    {/* 4 Pillars Comparative Bars */}
                    <div className="space-y-4">
                      <h4 className="text-xs sm:text-sm font-bold text-deep-black uppercase tracking-wider">
                        {currentLang === 'fr' ? 'Comparatif par Pilier Relationnel' : 'Pillar by Pillar Breakdown'}
                      </h4>

                      {/* Communication */}
                      <div className="p-3.5 rounded-xl bg-white border border-powder space-y-2">
                        <div className="flex justify-between items-center text-xs font-semibold">
                          <span className="text-deep-black flex items-center gap-1.5">
                            <span>💬</span>
                            <span>{t.quiz.pillars.comm}</span>
                          </span>
                          <span className="text-coral font-bold">
                            {p1Name}: {p1.partner1Pillars.comm}% · {p2Name}: {pillarScores.comm}%
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="w-full bg-powder/60 h-2.5 rounded-full overflow-hidden">
                            <div className="bg-coral/70 h-2.5 rounded-full" style={{ width: `${p1.partner1Pillars.comm}%` }}></div>
                          </div>
                          <div className="w-full bg-powder/60 h-2.5 rounded-full overflow-hidden">
                            <div className="bg-coral h-2.5 rounded-full" style={{ width: `${pillarScores.comm}%` }}></div>
                          </div>
                        </div>
                        <div className="flex justify-between text-[10px] text-text-gray">
                          <span>{p1Name} ({p1.partner1Pillars.comm}%)</span>
                          <span>Écart : {commDiff}%</span>
                          <span>{p2Name} ({pillarScores.comm}%)</span>
                        </div>
                      </div>

                      {/* Romance */}
                      <div className="p-3.5 rounded-xl bg-white border border-powder space-y-2">
                        <div className="flex justify-between items-center text-xs font-semibold">
                          <span className="text-deep-black flex items-center gap-1.5">
                            <span>💖</span>
                            <span>{t.quiz.pillars.romance}</span>
                          </span>
                          <span className="text-coral font-bold">
                            {p1Name}: {p1.partner1Pillars.romance}% · {p2Name}: {pillarScores.romance}%
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="w-full bg-powder/60 h-2.5 rounded-full overflow-hidden">
                            <div className="bg-coral/70 h-2.5 rounded-full" style={{ width: `${p1.partner1Pillars.romance}%` }}></div>
                          </div>
                          <div className="w-full bg-powder/60 h-2.5 rounded-full overflow-hidden">
                            <div className="bg-coral h-2.5 rounded-full" style={{ width: `${pillarScores.romance}%` }}></div>
                          </div>
                        </div>
                        <div className="flex justify-between text-[10px] text-text-gray">
                          <span>{p1Name} ({p1.partner1Pillars.romance}%)</span>
                          <span>Écart : {romDiff}%</span>
                          <span>{p2Name} ({pillarScores.romance}%)</span>
                        </div>
                      </div>

                      {/* Conflict */}
                      <div className="p-3.5 rounded-xl bg-white border border-powder space-y-2">
                        <div className="flex justify-between items-center text-xs font-semibold">
                          <span className="text-deep-black flex items-center gap-1.5">
                            <span>🌿</span>
                            <span>{t.quiz.pillars.conflict}</span>
                          </span>
                          <span className="text-coral font-bold">
                            {p1Name}: {p1.partner1Pillars.conflict}% · {p2Name}: {pillarScores.conflict}%
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="w-full bg-powder/60 h-2.5 rounded-full overflow-hidden">
                            <div className="bg-coral/70 h-2.5 rounded-full" style={{ width: `${p1.partner1Pillars.conflict}%` }}></div>
                          </div>
                          <div className="w-full bg-powder/60 h-2.5 rounded-full overflow-hidden">
                            <div className="bg-coral h-2.5 rounded-full" style={{ width: `${pillarScores.conflict}%` }}></div>
                          </div>
                        </div>
                        <div className="flex justify-between text-[10px] text-text-gray">
                          <span>{p1Name} ({p1.partner1Pillars.conflict}%)</span>
                          <span>Écart : {confDiff}%</span>
                          <span>{p2Name} ({pillarScores.conflict}%)</span>
                        </div>
                      </div>

                      {/* Future */}
                      <div className="p-3.5 rounded-xl bg-white border border-powder space-y-2">
                        <div className="flex justify-between items-center text-xs font-semibold">
                          <span className="text-deep-black flex items-center gap-1.5">
                            <span>🌟</span>
                            <span>{t.quiz.pillars.future}</span>
                          </span>
                          <span className="text-coral font-bold">
                            {p1Name}: {p1.partner1Pillars.future}% · {p2Name}: {pillarScores.future}%
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="w-full bg-powder/60 h-2.5 rounded-full overflow-hidden">
                            <div className="bg-coral/70 h-2.5 rounded-full" style={{ width: `${p1.partner1Pillars.future}%` }}></div>
                          </div>
                          <div className="w-full bg-powder/60 h-2.5 rounded-full overflow-hidden">
                            <div className="bg-coral h-2.5 rounded-full" style={{ width: `${pillarScores.future}%` }}></div>
                          </div>
                        </div>
                        <div className="flex justify-between text-[10px] text-text-gray">
                          <span>{p1Name} ({p1.partner1Pillars.future}%)</span>
                          <span>Écart : {futDiff}%</span>
                          <span>{p2Name} ({pillarScores.future}%)</span>
                        </div>
                      </div>
                    </div>

                    {/* Duo Psychologist Verdict */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-white border border-powder space-y-2">
                      <p className="text-xs font-bold text-coral flex items-center gap-1.5">
                        <span>💡</span>
                        <span>{currentLang === 'fr' ? 'L’analyse du thérapeute sur votre duo' : 'Therapist Dynamic Analysis'}</span>
                      </p>
                      <p className="text-xs sm:text-sm text-text-gray leading-relaxed">
                        {syncScore >= 90
                          ? (currentLang === 'fr'
                              ? `Votre duo partage une syntonie émotionnelle exceptionnelle (${syncScore}% de synchronisation). Vos visions de couple s’emboîtent naturellement, offrant un équilibre rare entre tendresse spontanée et sécurité affective.`
                              : `Your couple demonstrates extraordinary emotional attunement (${syncScore}% sync). Your relationship visions intertwine harmoniously, creating a resilient blend of affection and safety.`)
                          : (currentLang === 'fr'
                              ? `Votre tandem repose sur une riche complémentarité (${syncScore}% de synchronisation). Là où l’un apporte l’ancre et la vision pratique, l’autre insuffle l’élan romantique. Continuez à verbaliser vos attentes lors de vos moments à deux.`
                              : `Your duo thrives on rich complementarity (${syncScore}% sync). Where one brings steady grounding, the other sparks spontaneous romantic warmth.`)}
                      </p>
                    </div>
                  </div>
                );
              })()}

              {/* VIRAL SHARE & SOCIAL CHALLENGE CARD */}
              <div className="max-w-xl mx-auto my-6 sm:my-8 space-y-4 no-print">
                {/* Name personalization card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-powder shadow-2xs text-left sm:text-center space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <label className="text-xs font-bold text-deep-black flex items-center gap-1.5">
                      <span>✏️</span>
                      <span>
                        {currentLang === 'fr'
                          ? 'Personnalisez votre prénom pour le message :'
                          : 'Personalize your name for the message:'}
                      </span>
                    </label>
                    <span className="text-[11px] text-text-gray font-medium">
                      {currentLang === 'fr' ? 'S’insère dans le lien de défi' : 'Embedded into the challenge link'}
                    </span>
                  </div>
                  <input
                    type="text"
                    value={creatorName}
                    onChange={(e) => setCreatorName(e.target.value)}
                    placeholder={currentLang === 'fr' ? 'Ex: Camille, Thomas, Alex...' : 'Ex: Alex, Sam, Taylor...'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-powder bg-white text-xs sm:text-sm text-deep-black focus:outline-none focus:border-coral transition-colors min-h-[42px]"
                  />
                </div>

                {/* Social Share Buttons with WhatsApp, Messenger, Twitter/X, SMS & Copy */}
                <SocialShareButtons
                  score={finalScore}
                  archetypeTitle={currentLang === 'fr' ? matchedArchetype.badgeFr : matchedArchetype.badgeEn}
                  shareUrl={getChallengeUrl()}
                  currentLang={currentLang}
                  creatorName={creatorName}
                  variant="card"
                  showPreview={true}
                />
              </div>

              {/* DOWNLOAD & SOUVENIR EXPORT SECTION */}
              <div className="max-w-xl mx-auto my-4 p-4 sm:p-5 rounded-2xl bg-white border border-coral/20 shadow-xs text-center space-y-3 no-print">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-deep-black flex items-center justify-center gap-1.5">
                    <span>✨</span>
                    <span>{currentLang === 'fr' ? 'Gardez un Souvenir Précieux de votre Bilan' : 'Save a Keepsake of your Diagnosis'}</span>
                  </h4>
                  <p className="text-[11px] sm:text-xs text-text-gray mt-0.5">
                    {currentLang === 'fr'
                      ? 'Téléchargez votre certificat romantique en Image HD ou au format PDF propre à imprimer.'
                      : 'Download your romantic certificate as an HD keepsake image or clean printable PDF.'}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
                  {/* Download Image Souvenir */}
                  <button
                    type="button"
                    onClick={handleDownloadSouvenir}
                    disabled={isGeneratingSouvenir}
                    className="btn-secondary w-full sm:w-auto text-xs py-2.5 px-4 rounded-full justify-center min-h-[42px] cursor-pointer hover:border-coral active:scale-95"
                  >
                    <span>{isGeneratingSouvenir ? '⏳' : '🖼️'}</span>
                    <span>
                      {isGeneratingSouvenir
                        ? (currentLang === 'fr' ? 'Création de l’image...' : 'Creating image...')
                        : (currentLang === 'fr' ? 'Image Souvenir (PNG HD)' : 'Souvenir Image (HD PNG)')}
                    </span>
                  </button>

                  {/* Download PDF / Print */}
                  <button
                    type="button"
                    onClick={handlePrintPdf}
                    className="btn-secondary w-full sm:w-auto text-xs py-2.5 px-4 rounded-full justify-center min-h-[42px] cursor-pointer hover:border-coral active:scale-95"
                  >
                    <span>📄</span>
                    <span>{currentLang === 'fr' ? 'Télécharger en PDF / Imprimer' : 'Download as PDF / Print'}</span>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mt-6 no-print">
                <button
                  id="quiz-restart-btn"
                  onClick={handleRestart}
                  className="btn-secondary w-full sm:w-auto justify-center min-h-[44px]"
                >
                  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
                  </svg>
                  <span>{t.quiz.restart}</span>
                </button>
                <button
                  id="explore-tools-btn"
                  onClick={onNavigateToTools}
                  className="btn-secondary w-full sm:w-auto justify-center min-h-[44px]"
                >
                  <span>{currentLang === 'fr' ? 'Boîte à Outils' : 'Couple Tools'}</span>
                </button>
                {onNavigateToThemed && (
                  <button
                    id="explore-themed-btn"
                    onClick={onNavigateToThemed}
                    className="btn-primary w-full sm:w-auto justify-center min-h-[44px]"
                  >
                    <span>{currentLang === 'fr' ? 'Quiz Thématiques Ciblés' : 'Themed Quizzes'}</span>
                    <span>✨</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Auto-Restored Draft Notification Banner */}
      {showRestoredNotice && !isCompleted && !isCalculating && (
        <div className="mb-4 sm:mb-6 p-3.5 sm:p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm animate-fade-in-up">
          <div className="flex items-center gap-2.5 text-emerald-900">
            <span className="text-lg">💾</span>
            <div>
              <p className="font-bold">
                {currentLang === 'fr'
                  ? 'Progression restaurée automatiquement'
                  : 'Draft progress automatically restored'}
              </p>
              <p className="text-emerald-700 text-xs">
                {currentLang === 'fr'
                  ? `Question ${currentQuestionIdx + 1}/15 (${Object.keys(selectedAnswers).length} réponses sauvegardées dans votre navigateur)`
                  : `Question ${currentQuestionIdx + 1}/15 (${Object.keys(selectedAnswers).length} answers saved in your browser)`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={handleRestart}
              className="px-3 py-1.5 rounded-full bg-white text-coral border border-coral/30 hover:bg-light-pink text-xs font-semibold cursor-pointer transition-colors shadow-xs"
            >
              {currentLang === 'fr' ? 'Recommencer à zéro' : 'Restart fresh'}
            </button>
            <button
              onClick={() => setShowRestoredNotice(false)}
              className="text-emerald-700 hover:text-emerald-950 font-bold px-2 py-1 text-sm cursor-pointer"
              title={currentLang === 'fr' ? 'Masquer' : 'Dismiss'}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Active Incoming Challenge Banner */}
      {challengeInfo && !isCompleted && !isCalculating && (
        <div className="mb-4 sm:mb-6 p-4 rounded-2xl bg-gradient-to-r from-coral/15 via-light-pink to-powder border border-coral/30 shadow-xs flex items-center justify-between gap-3 animate-fade-in-up">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-coral text-white text-lg flex items-center justify-center shrink-0 shadow-xs">
              ⚔️
            </div>
            <div>
              <p className="text-xs sm:text-sm font-extrabold text-deep-black">
                {currentLang === 'fr'
                  ? `Défi de couple lancé par ${challengeInfo.partner1Name} !`
                  : `Couple Challenge started by ${challengeInfo.partner1Name}!`}
              </p>
              <p className="text-xs text-text-gray">
                {currentLang === 'fr'
                  ? `Score à synchroniser : ${challengeInfo.partner1Score}% • Répondez aux 15 questions pour comparer vos résultats côte à côte.`
                  : `Score to match: ${challengeInfo.partner1Score}% • Answer the 15 questions to compare your results side-by-side.`}
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-white text-coral font-bold text-xs shadow-2xs border border-coral/20 shrink-0">
            {challengeInfo.partner1Score}%
          </span>
        </div>
      )}

      {/* 3. ACTIVE QUESTIONS STEPPER */}
      {!isCompleted && !isCalculating && (
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-lg border border-powder">
          {/* Enhanced Visual Progress Bar Header */}
          <div className="mb-6 sm:mb-8 space-y-3.5">
            {/* Top Info Row: Category & Question Count */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold">
              {/* Category Pillar Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-light-pink text-coral border border-coral/20 shadow-xs">
                <span>
                  {currentQ.category === 'comm' && '💬'}
                  {currentQ.category === 'romance' && '💖'}
                  {currentQ.category === 'conflict' && '🌿'}
                  {currentQ.category === 'future' && '🌟'}
                </span>
                <span className="font-medium">
                  {currentQ.category === 'comm' && (currentLang === 'fr' ? 'Communication & Écoute' : 'Communication & Listening')}
                  {currentQ.category === 'romance' && (currentLang === 'fr' ? 'Romance & Complicité' : 'Romance & Chemistry')}
                  {currentQ.category === 'conflict' && (currentLang === 'fr' ? 'Résolution des Conflits' : 'Conflict Resolution')}
                  {currentQ.category === 'future' && (currentLang === 'fr' ? 'Vision & Projets Communs' : 'Future & Shared Vision')}
                </span>
              </div>

              {/* Progress Count & Percentage */}
              <div className="flex items-center gap-2">
                {/* Auto-save pulse pill */}
                <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>{currentLang === 'fr' ? 'Sauvegarde auto' : 'Auto-saved'}</span>
                </span>

                {currentQuestionIdx === 4 && (
                  <span className="hidden sm:inline-block text-[11px] font-semibold text-coral animate-pulse">
                    {currentLang === 'fr' ? '1er tiers franchi ✨' : 'First milestone ✨'}
                  </span>
                )}
                {currentQuestionIdx === 9 && (
                  <span className="hidden sm:inline-block text-[11px] font-semibold text-coral animate-pulse">
                    {currentLang === 'fr' ? 'Plus que 5 questions ! 💪' : 'Only 5 left! 💪'}
                  </span>
                )}
                {currentQuestionIdx === QUIZ_QUESTIONS.length - 1 && (
                  <span className="hidden sm:inline-block text-[11px] font-semibold text-coral animate-pulse">
                    {currentLang === 'fr' ? 'Dernière ligne droite ! 🎉' : 'Final question! 🎉'}
                  </span>
                )}
                <span className="text-text-gray font-medium">
                  {t.quiz.stepLabel} <span className="text-deep-black font-bold">{currentQuestionIdx + 1}</span> / {QUIZ_QUESTIONS.length}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-powder text-coral font-bold text-xs">
                  {progressPercent}%
                </span>
              </div>
            </div>

            {/* Continuous Smooth Gradient Progress Bar with Shimmer */}
            <div className="relative w-full h-3 sm:h-3.5 bg-powder/60 rounded-full overflow-hidden p-0.5 border border-coral/15 shadow-inner">
              <div
                className="h-full rounded-full bg-gradient-to-r from-coral via-[#FF7E9D] to-coral-dark shadow-sm transition-all duration-500 ease-out relative"
                style={{ width: `${progressPercent}%` }}
              >
                {/* Shimmer Light Sweep */}
                <div className="absolute inset-0 animate-shimmer rounded-full pointer-events-none"></div>

                {/* Leading edge glow pin */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-xs mr-0.5"></div>
              </div>
            </div>

            {/* 15 Question Discrete Stepper Dots */}
            <div className="pt-1">
              <div className="flex items-center justify-between gap-1 sm:gap-1.5 w-full">
                {QUIZ_QUESTIONS.map((q, idx) => {
                  const isCompleted = idx < currentQuestionIdx;
                  const isCurrent = idx === currentQuestionIdx;
                  const isAnswered = selectedAnswers[q.id] !== undefined;

                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => {
                        // Allow navigating to any already visited/answered question
                        if (idx <= currentQuestionIdx || isAnswered) {
                          setCurrentQuestionIdx(idx);
                          window.scrollTo({ top: 100, behavior: 'smooth' });
                        }
                      }}
                      disabled={idx > currentQuestionIdx && !isAnswered}
                      title={`Question ${idx + 1}`}
                      className={`flex-1 flex flex-col items-center justify-center transition-all duration-300 ${
                        idx <= currentQuestionIdx || isAnswered ? 'cursor-pointer' : 'cursor-default'
                      }`}
                    >
                      {/* Segment Indicator Bar / Dot */}
                      <div
                        className={`w-full h-1.5 sm:h-2 rounded-full transition-all duration-400 ${
                          isCurrent
                            ? 'bg-coral ring-2 ring-coral/30 shadow-xs scale-y-125'
                            : isCompleted
                            ? 'bg-coral/80 hover:bg-coral'
                            : 'bg-powder/70'
                        }`}
                      ></div>

                      {/* Dot Number (visible on sm screens and up, or current on mobile) */}
                      <span
                        className={`text-[9px] sm:text-[10px] mt-1 transition-colors ${
                          isCurrent
                            ? 'font-bold text-coral scale-110'
                            : isCompleted
                            ? 'font-medium text-coral/70 hidden sm:inline'
                            : 'text-text-gray/40 hidden sm:inline'
                        }`}
                      >
                        {idx + 1}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Animated Question Body Container with Transition Effect */}
          <div key={currentQuestionIdx} className="animate-question-slide">
            {/* Question Title & Description */}
            <div className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-deep-black mb-2 sm:mb-3 leading-snug">
                {qData.question}
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-text-gray">
                {qData.description}
              </p>
            </div>

            {/* Answer Options List */}
            <div className="space-y-2.5 sm:space-y-3.5 mb-6 sm:mb-10">
              {qData.options.map((option, idx) => {
                const isSelected = selectedAnswers[currentQ.id] === idx;
                const optionLetter = ['A', 'B', 'C', 'D'][idx];
                return (
                  <button
                    key={idx}
                    id={`quiz-opt-${currentQ.id}-${idx}`}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-3.5 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-3 sm:gap-4 min-h-[56px] touch-manipulation active:scale-[0.99] ${
                      isSelected
                        ? 'border-coral bg-light-pink shadow-xs ring-1 ring-coral/30'
                        : 'border-black/5 bg-white hover:border-coral/40 hover:bg-off-white'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center shrink-0 font-bold text-xs sm:text-sm transition-all ${
                        isSelected
                          ? 'border-coral bg-coral text-white shadow-xs'
                          : 'border-[#CCCCCC] bg-white text-[#777777]'
                      }`}
                    >
                      {isSelected ? (
                        <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                      ) : (
                        <span>{optionLetter}</span>
                      )}
                    </div>
                    <span
                      className={`text-sm sm:text-base leading-snug sm:leading-relaxed ${
                        isSelected ? 'font-bold text-deep-black' : 'text-deep-black/85 font-normal'
                      }`}
                    >
                      {option.text}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-powder gap-3">
            <button
              id="quiz-prev-btn"
              onClick={handlePrev}
              disabled={currentQuestionIdx === 0}
              className={`px-4 sm:px-6 py-3 rounded-full text-xs sm:text-sm font-semibold border border-[#CCCCCC] transition-all min-h-[48px] touch-manipulation active:scale-95 flex items-center gap-1.5 ${
                currentQuestionIdx === 0
                  ? 'opacity-40 cursor-not-allowed text-[#888888]'
                  : 'text-deep-black hover:bg-light-pink cursor-pointer'
              }`}
            >
              <span>←</span>
              <span>{t.quiz.prev}</span>
            </button>

            <button
              id="quiz-next-btn"
              onClick={handleNext}
              disabled={selectedAnswers[currentQ.id] === undefined}
              className={`btn-primary text-xs sm:text-sm py-3 px-6 sm:px-8 min-h-[48px] touch-manipulation active:scale-95 flex items-center gap-2 shadow-sm ${
                selectedAnswers[currentQ.id] === undefined ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <span>
                {currentQuestionIdx === QUIZ_QUESTIONS.length - 1
                  ? t.quiz.seeResults
                  : t.quiz.next}
              </span>
              <span>→</span>
            </button>
          </div>
        </div>
      )}
    </section>
  </div>
);
};
