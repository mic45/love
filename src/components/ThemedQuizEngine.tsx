import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Language } from '../translations';
import { THEMED_QUIZZES, ThemedQuiz, ThemedQuizResultBracket } from '../data/themedQuizzesData';
import { SocialShareButtons } from './SocialShareButtons';

interface ThemedQuizEngineProps {
  currentLang: Language;
  onNavigateToGeneralQuiz: () => void;
  initialThemeId?: string | null;
}

export const ThemedQuizEngine: React.FC<ThemedQuizEngineProps> = ({
  currentLang,
  onNavigateToGeneralQuiz,
  initialThemeId,
}) => {
  const isFr = currentLang === 'fr';
  const quizzes = THEMED_QUIZZES[currentLang] || THEMED_QUIZZES.fr;

  // Selected Theme State
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(() => {
    if (initialThemeId && quizzes.some((q) => q.id === initialThemeId)) {
      return initialThemeId;
    }
    // Check URL param if any
    try {
      const params = new URLSearchParams(window.location.search);
      const urlTheme = params.get('theme');
      if (urlTheme && quizzes.some((q) => q.id === urlTheme)) {
        return urlTheme;
      }
    } catch {}
    return null;
  });

  const activeQuiz: ThemedQuiz | undefined = quizzes.find((q) => q.id === selectedThemeId);

  // Storage key for the selected theme
  const getStorageKey = (themeId: string) => `lovequiz_themed_draft_${themeId}`;

  // State within active quiz
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: number]: number }>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [finalScorePercent, setFinalScorePercent] = useState<number>(0);
  const [resultBracket, setResultBracket] = useState<ThemedQuizResultBracket | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [partnerName, setPartnerName] = useState('');

  // Load draft when theme changes
  useEffect(() => {
    if (!selectedThemeId) {
      setCurrentQuestionIdx(0);
      setSelectedAnswers({});
      setIsCompleted(false);
      setResultBracket(null);
      return;
    }

    try {
      const raw = localStorage.getItem(getStorageKey(selectedThemeId));
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.selectedAnswers) setSelectedAnswers(parsed.selectedAnswers);
        if (typeof parsed.currentQuestionIdx === 'number') setCurrentQuestionIdx(parsed.currentQuestionIdx);
        if (parsed.isCompleted) {
          setIsCompleted(true);
          setFinalScorePercent(parsed.finalScorePercent || 85);
          if (parsed.resultBracket) setResultBracket(parsed.resultBracket);
        }
      } else {
        setCurrentQuestionIdx(0);
        setSelectedAnswers({});
        setIsCompleted(false);
        setResultBracket(null);
      }
    } catch {
      // ignore
    }
  }, [selectedThemeId]);

  // Auto-save draft
  useEffect(() => {
    if (!selectedThemeId) return;
    try {
      if (Object.keys(selectedAnswers).length > 0 || isCompleted) {
        const draft = {
          selectedAnswers,
          currentQuestionIdx,
          isCompleted,
          finalScorePercent,
          resultBracket,
          savedAt: new Date().toISOString(),
        };
        localStorage.setItem(getStorageKey(selectedThemeId), JSON.stringify(draft));
      }
    } catch {}
  }, [selectedThemeId, selectedAnswers, currentQuestionIdx, isCompleted, finalScorePercent, resultBracket]);

  const handleSelectTheme = (themeId: string) => {
    setSelectedThemeId(themeId);
    window.scrollTo({ top: 120, behavior: 'smooth' });
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('theme', themeId);
      window.history.pushState({}, '', url.toString());
    } catch {}
  };

  const handleBackToThemes = () => {
    setSelectedThemeId(null);
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete('theme');
      window.history.pushState({}, '', url.toString());
    } catch {}
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx,
    }));
  };

  const triggerCompletionConfetti = () => {
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { x: 0.5, y: 0.6 },
        colors: ['#FF6B8A', '#FFA8BA', '#FFD166', '#3A86FF', '#2EC4B6'],
        zIndex: 9999,
      });
    } catch {}
  };

  const handleFinishQuiz = () => {
    if (!activeQuiz) return;
    setIsCalculating(true);
    window.scrollTo({ top: 150, behavior: 'smooth' });

    let totalScore = 0;
    const maxScore = activeQuiz.questions.length * 4;

    activeQuiz.questions.forEach((q) => {
      const chosenIdx = selectedAnswers[q.id] ?? 0;
      const opt = q.options[chosenIdx] || q.options[0];
      totalScore += opt.score;
    });

    const percent = Math.min(100, Math.max(25, Math.round((totalScore / maxScore) * 100)));
    setFinalScorePercent(percent);

    // Find bracket
    const bracket =
      activeQuiz.results.find((r) => percent >= r.minScorePercent) ||
      activeQuiz.results[activeQuiz.results.length - 1];
    setResultBracket(bracket);

    setTimeout(() => {
      setIsCalculating(false);
      setIsCompleted(true);
      triggerCompletionConfetti();
      window.scrollTo({ top: 150, behavior: 'smooth' });
    }, 900);
  };

  const handleRestartCurrentTheme = () => {
    if (!selectedThemeId) return;
    try {
      localStorage.removeItem(getStorageKey(selectedThemeId));
    } catch {}
    setSelectedAnswers({});
    setCurrentQuestionIdx(0);
    setIsCompleted(false);
    setResultBracket(null);
    window.scrollTo({ top: 150, behavior: 'smooth' });
  };

  const handleShareChallenge = async () => {
    if (!activeQuiz) return;
    const shareUrl = `${window.location.origin}/?tab=quiz&view=themed&theme=${activeQuiz.id}`;
    const name = partnerName.trim() || (isFr ? 'Mon Amour' : 'My Love');
    const title = isFr
      ? `LoveQuiz : Défi sur le thème « ${activeQuiz.title} »`
      : `LoveQuiz: Challenge on « ${activeQuiz.title} »`;
    const text = isFr
      ? `❤️ J'ai passé le test « ${activeQuiz.title} » sur LoveQuiz (Score : ${finalScorePercent}%). Viens répondre de ton côté pour qu'on compare nos réponses :`
      : `❤️ I took the « ${activeQuiz.title} » test on LoveQuiz (Score: ${finalScorePercent}%). Take it so we can compare our answers:`;

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, text, url: shareUrl });
        return;
      } catch {}
    }

    try {
      await navigator.clipboard.writeText(`${text}\n${shareUrl}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3500);
    } catch {}
  };

  // -------------------------------------------------------------
  // VIEW 1: THEME SELECTION GALLERY
  // -------------------------------------------------------------
  if (!selectedThemeId || !activeQuiz) {
    return (
      <div className="space-y-10 sm:space-y-14 py-4 sm:py-8">
        {/* Header Kicker & Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3 px-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-coral">
            <span>✨</span>
            <span>{isFr ? 'Diagnostics Ciblés de Couple' : 'Targeted Couple Assessments'}</span>
            <span>·</span>
            <span>{isFr ? '4 Thématiques Clés' : '4 Core Themes'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-deep-black tracking-tight">
            {isFr ? 'Quiz par Thème Spécifique' : 'Specialized Themed Quizzes'}
          </h2>
          <p className="text-sm sm:text-base text-text-gray leading-relaxed">
            {isFr
              ? 'Besoin d’éclairer un sujet précis de votre relation ? Choisissez un quiz rapide (2 minutes, 6 questions) pour obtenir un diagnostic sur-mesure et des conseils immédiats.'
              : 'Need clarity on a specific relationship milestone? Pick a quick 2-minute assessment to unlock customized psychological insights and next steps.'}
          </p>
        </div>

        {/* Themed Quizzes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto px-4 sm:px-6">
          {quizzes.map((quiz) => {
            const hasDraft = (() => {
              try {
                const raw = localStorage.getItem(getStorageKey(quiz.id));
                return !!raw;
              } catch {
                return false;
              }
            })();

            return (
              <div
                key={quiz.id}
                className="bg-white rounded-2xl border border-powder p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 relative overflow-hidden"
              >
                {/* Subtle colored accent edge */}
                <div
                  className="absolute top-0 left-0 right-0 h-1.5 transition-all group-hover:h-2"
                  style={{ backgroundColor: quiz.accentColor }}
                />

                <div className="space-y-4">
                  {/* Category and Estimated Time */}
                  <div className="flex items-center justify-between text-xs text-text-gray pt-1">
                    <span className="font-semibold text-deep-black flex items-center gap-1.5">
                      <span className="text-lg">{quiz.icon}</span>
                      <span>{quiz.category}</span>
                    </span>
                    <span className="flex items-center gap-1 text-text-gray/80">
                      <span>⏱️ {quiz.estimatedTime}</span>
                      <span aria-hidden="true">·</span>
                      <span>{quiz.questionCount} {isFr ? 'questions' : 'questions'}</span>
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-deep-black group-hover:text-coral transition-colors leading-snug">
                      {quiz.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-text-gray mt-2 leading-relaxed">
                      {quiz.pitch}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-6 mt-4 border-t border-powder/60 flex items-center justify-between gap-3">
                  {hasDraft ? (
                    <span className="text-xs text-coral font-medium flex items-center gap-1">
                      <span>●</span>
                      <span>{isFr ? 'Test en mémoire' : 'Saved draft ready'}</span>
                    </span>
                  ) : (
                    <span className="text-xs text-text-gray/70">
                      {isFr ? '100% Anonyme & Gratuit' : '100% Anonymous & Free'}
                    </span>
                  )}

                  <button
                    onClick={() => handleSelectTheme(quiz.id)}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white px-4 py-2.5 rounded-full transition-all duration-200 cursor-pointer shadow-xs hover:shadow-sm group-hover:scale-102"
                    style={{ backgroundColor: quiz.accentColor }}
                  >
                    <span>{hasDraft ? (isFr ? 'Reprendre' : 'Resume') : (isFr ? 'Lancer ce test' : 'Start Quiz')}</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Compatibility Alternative Banner */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-light-pink/60 border border-powder rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-coral">
                {isFr ? 'Vous préférez une vue d’ensemble ?' : 'Prefer a complete evaluation?'}
              </span>
              <h4 className="text-base sm:text-lg font-bold text-deep-black">
                {isFr
                  ? 'Faites le Grand Quiz de Compatibilité Amoureuse (15 questions)'
                  : 'Take the Full Relationship Compatibility Test (15 questions)'}
              </h4>
              <p className="text-xs sm:text-sm text-text-gray max-w-xl">
                {isFr
                  ? 'Évaluez vos 4 piliers simultanément (Communication, Passion, Conflits, Avenir) et découvrez l’archétype de votre tandem.'
                  : 'Assess your 4 pillars at once (Communication, Romance, Conflicts, Future) and discover your relationship archetype.'}
              </p>
            </div>
            <button
              onClick={onNavigateToGeneralQuiz}
              className="btn-primary text-xs sm:text-sm py-2.5 px-6 shrink-0 rounded-full"
            >
              {isFr ? 'Lancer le Grand Quiz (15Q)' : 'Take Grand Quiz (15Q)'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 2: CALCULATING VIEW
  // -------------------------------------------------------------
  if (isCalculating) {
    return (
      <div className="bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-12 shadow-sm border border-powder text-center max-w-lg mx-auto my-12">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 animate-bounce shadow-xs"
          style={{ backgroundColor: `${activeQuiz.accentColor}20` }}
        >
          <span className="text-3xl">{activeQuiz.icon}</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-deep-black mb-2">
          {isFr ? 'Analyse de vos réponses thématiques...' : 'Analyzing your themed responses...'}
        </h3>
        <p className="text-xs sm:text-sm text-coral font-medium animate-pulse">
          {isFr
            ? `Croisement des indicateurs de : ${activeQuiz.title}`
            : `Evaluating insights for: ${activeQuiz.title}`}
        </p>
        <div className="w-full bg-powder rounded-full h-2.5 mt-6 overflow-hidden">
          <div
            className="h-2.5 rounded-full animate-pulse transition-all duration-500"
            style={{ backgroundColor: activeQuiz.accentColor, width: '90%' }}
          />
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 3: COMPLETED RESULT FOR THE SPECIFIC THEME
  // -------------------------------------------------------------
  if (isCompleted && resultBracket) {
    return (
      <div className="max-w-3xl mx-auto space-y-8 py-6 px-4">
        {/* Top Back bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleBackToThemes}
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-text-gray hover:text-deep-black font-semibold cursor-pointer transition-colors"
          >
            <span>←</span>
            <span>{isFr ? 'Tous les quiz thématiques' : 'All Themed Quizzes'}</span>
          </button>
          <div className="text-xs text-text-gray">
            <span>{activeQuiz.category}</span>
          </div>
        </div>

        {/* Main Result Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-powder p-6 sm:p-10 shadow-sm relative overflow-hidden space-y-8">
          {/* Accent top banner */}
          <div
            className="absolute top-0 left-0 right-0 h-2"
            style={{ backgroundColor: activeQuiz.accentColor }}
          />

          {/* Verdict Header */}
          <div className="text-center space-y-4 pt-2">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{ backgroundColor: `${activeQuiz.accentColor}18`, color: activeQuiz.accentColor }}
            >
              <span>{activeQuiz.icon}</span>
              <span>{activeQuiz.badge}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-deep-black tracking-tight">
              {resultBracket.verdict}
            </h3>

            {/* Score Ring / Gauge */}
            <div className="flex justify-center items-baseline gap-2 py-2">
              <span
                className="text-5xl sm:text-6xl font-black tracking-tight"
                style={{ color: activeQuiz.accentColor }}
              >
                {finalScorePercent}%
              </span>
              <span className="text-xs sm:text-sm text-text-gray font-semibold">
                {isFr ? 'd’harmonie sur ce thème' : 'harmony index'}
              </span>
            </div>

            <p className="text-sm sm:text-base font-semibold text-deep-black max-w-lg mx-auto leading-snug">
              {resultBracket.headline}
            </p>

            <p className="text-xs sm:text-sm text-text-gray max-w-2xl mx-auto leading-relaxed text-justify sm:text-center">
              {resultBracket.analysis}
            </p>
          </div>

          {/* Strengths and Growth Areas Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-powder/70">
            {/* Strengths */}
            <div className="bg-emerald-50/60 border border-emerald-200/60 rounded-xl p-4 sm:p-5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-emerald-800 tracking-wider">
                <span>✓</span>
                <span>{isFr ? 'Vos plus grandes forces' : 'Core Strengths'}</span>
              </div>
              <ul className="space-y-1.5 text-xs sm:text-sm text-emerald-950">
                {resultBracket.strengths.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold shrink-0">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Growth Areas */}
            <div className="bg-amber-50/60 border border-amber-200/60 rounded-xl p-4 sm:p-5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-amber-800 tracking-wider">
                <span>✦</span>
                <span>{isFr ? 'Points d’attention bienveillants' : 'Growth Opportunities'}</span>
              </div>
              <ul className="space-y-1.5 text-xs sm:text-sm text-amber-950">
                {resultBracket.growthAreas.map((g, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold shrink-0">•</span>
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Concrete Tips Section */}
          <div className="space-y-3 pt-4 border-t border-powder/70">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-gray">
              {isFr ? 'Conseils Pratiques Immédiats' : 'Actionable Psychological Tips'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {resultBracket.concreteTips.map((tip, idx) => (
                <div key={idx} className="bg-off-white border border-powder rounded-xl p-4 space-y-1">
                  <p className="text-xs sm:text-sm font-bold text-deep-black">
                    {tip.title}
                  </p>
                  <p className="text-xs text-text-gray leading-relaxed">
                    {tip.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Couple Challenge Box */}
          <div
            className="rounded-xl p-5 border space-y-2"
            style={{
              backgroundColor: `${activeQuiz.accentColor}0D`,
              borderColor: `${activeQuiz.accentColor}30`,
            }}
          >
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider" style={{ color: activeQuiz.accentColor }}>
              <span>🎯</span>
              <span>{isFr ? 'Le Défi Amoureux de la Semaine' : 'Couple Challenge of the Week'}</span>
            </div>
            <p className="text-xs sm:text-sm text-deep-black font-medium leading-relaxed">
              « {resultBracket.coupleChallenge} »
            </p>
          </div>

          {/* Partner Share Challenge & Social Buttons */}
          <div className="space-y-4">
            <div className="bg-white border border-powder rounded-2xl p-4 sm:p-5 space-y-2 text-left">
              <label className="text-xs font-bold text-deep-black flex items-center gap-1.5">
                <span>✏️</span>
                <span>{isFr ? 'Votre prénom (pour personnaliser le défi) :' : 'Your name (to personalize challenge):'}</span>
              </label>
              <input
                type="text"
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
                placeholder={isFr ? 'Prénom de votre moitié (optionnel)' : 'Partner’s name (optional)'}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-powder bg-white focus:outline-none focus:border-coral min-h-[40px]"
              />
            </div>

            <SocialShareButtons
              score={finalScorePercent}
              archetypeTitle={activeQuiz.title}
              shareUrl={`${window.location.origin}/?tab=quiz&view=themed&theme=${activeQuiz.id}`}
              currentLang={currentLang}
              creatorName={partnerName}
              variant="card"
              showPreview={true}
            />
          </div>

          {/* Action Navigation Buttons */}
          <div className="pt-4 border-t border-powder flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={handleRestartCurrentTheme}
              className="text-xs font-semibold text-text-gray hover:text-deep-black py-2 cursor-pointer transition-colors"
            >
              🔄 {isFr ? 'Recommencer ce test' : 'Retake this test'}
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleBackToThemes}
                className="btn-secondary text-xs py-2 px-4 rounded-full"
              >
                {isFr ? 'Explorer d’autres thèmes' : 'Other themes'}
              </button>
              <button
                onClick={onNavigateToGeneralQuiz}
                className="btn-primary text-xs py-2 px-4 rounded-full"
              >
                {isFr ? 'Faire le Grand Quiz (15Q)' : 'Take Grand Quiz'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 4: ACTIVE QUESTIONS IN PROGRESS
  // -------------------------------------------------------------
  const currentQ = activeQuiz.questions[currentQuestionIdx];
  const progressPercent = Math.round(((currentQuestionIdx + 1) / activeQuiz.questions.length) * 100);
  const isSelected = selectedAnswers[currentQ.id] !== undefined;

  return (
    <div className="max-w-2xl mx-auto py-4 sm:py-8 px-4 space-y-6">
      {/* Top Breadcrumb & Exit */}
      <div className="flex items-center justify-between text-xs text-text-gray">
        <button
          onClick={handleBackToThemes}
          className="inline-flex items-center gap-1.5 font-semibold text-text-gray hover:text-deep-black transition-colors cursor-pointer"
        >
          <span>←</span>
          <span>{isFr ? 'Retour aux thèmes' : 'Back to themes'}</span>
        </button>
        <span className="font-semibold text-deep-black flex items-center gap-1">
          <span>{activeQuiz.icon}</span>
          <span>{activeQuiz.badge}</span>
        </span>
      </div>

      {/* Quiz Progress Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-text-gray">
          <span>
            {isFr ? 'Question' : 'Question'} {currentQuestionIdx + 1} {isFr ? 'sur' : 'of'} {activeQuiz.questions.length}
          </span>
          <span style={{ color: activeQuiz.accentColor }}>{progressPercent}%</span>
        </div>
        <div className="w-full bg-powder rounded-full h-2 overflow-hidden">
          <div
            className="h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%`, backgroundColor: activeQuiz.accentColor }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-powder p-6 sm:p-9 shadow-xs space-y-6">
        <div className="space-y-2">
          {currentQ.context && (
            <p className="text-xs text-coral font-semibold uppercase tracking-wider">
              {currentQ.context}
            </p>
          )}
          <h3 className="text-lg sm:text-xl font-bold text-deep-black leading-snug">
            {currentQ.question}
          </h3>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options.map((option, optIdx) => {
            const chosen = selectedAnswers[currentQ.id] === optIdx;
            return (
              <button
                key={optIdx}
                onClick={() => handleSelectOption(currentQ.id, optIdx)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-start gap-3.5 ${
                  chosen
                    ? 'border-coral bg-light-pink/50 shadow-xs'
                    : 'border-powder hover:border-coral/50 hover:bg-powder/20 bg-white'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    chosen ? 'border-coral bg-coral text-white' : 'border-powder bg-white'
                  }`}
                >
                  {chosen && <span className="text-[10px] font-bold">✓</span>}
                </div>
                <span className="text-xs sm:text-sm text-deep-black font-medium leading-relaxed">
                  {option.text}
                </span>
              </button>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="pt-4 border-t border-powder flex items-center justify-between gap-3">
          <button
            onClick={() => setCurrentQuestionIdx((p) => Math.max(0, p - 1))}
            disabled={currentQuestionIdx === 0}
            className={`text-xs font-semibold px-4 py-2.5 rounded-full cursor-pointer transition-colors ${
              currentQuestionIdx === 0
                ? 'opacity-30 cursor-not-allowed text-text-gray'
                : 'text-text-gray hover:text-deep-black hover:bg-powder/40'
            }`}
          >
            ← {isFr ? 'Précédente' : 'Previous'}
          </button>

          {currentQuestionIdx < activeQuiz.questions.length - 1 ? (
            <button
              onClick={() => setCurrentQuestionIdx((p) => p + 1)}
              disabled={!isSelected}
              className={`text-xs sm:text-sm font-bold px-6 py-2.5 rounded-full transition-all cursor-pointer ${
                isSelected
                  ? 'btn-primary shadow-xs'
                  : 'bg-powder text-text-gray/50 cursor-not-allowed'
              }`}
            >
              {isFr ? 'Suivante →' : 'Next →'}
            </button>
          ) : (
            <button
              onClick={handleFinishQuiz}
              disabled={!isSelected}
              className={`text-xs sm:text-sm font-bold px-7 py-2.5 rounded-full transition-all cursor-pointer ${
                isSelected
                  ? 'btn-primary shadow-md hover:shadow-lg'
                  : 'bg-powder text-text-gray/50 cursor-not-allowed'
              }`}
            >
              {isFr ? 'Voir mes résultats ✨' : 'See Results ✨'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
