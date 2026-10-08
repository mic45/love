import React, { useState, useEffect, useRef, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { Language } from '../translations';
import { DATE_IDEAS, DateIdea } from '../data/toolsData';

interface DateFortuneWheelProps {
  currentLang: Language;
}

const STORAGE_CUSTOM_DATES = 'lovequiz_custom_dates';
const STORAGE_LOCKED_DATE = 'lovequiz_locked_date';

// Palette of romantic slice colors for the wheel
const SLICE_COLORS = [
  '#FF6B8A', // Coral pink
  '#3A86FF', // Sky blue
  '#FFD166', // Sunny pastel yellow
  '#06D6A0', // Fresh mint
  '#8338EC', // Lilac purple
  '#FB5607', // Warm apricot
  '#118AB2', // Deep teal
  '#E63946', // Rose velvet
  '#FFA8BA', // Powder pink
  '#9B5DE5', // Lavender
];

export const DateFortuneWheel: React.FC<DateFortuneWheelProps> = ({ currentLang }) => {
  const isFr = currentLang === 'fr';

  // Category filter state
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Custom user dates state
  const [customDates, setCustomDates] = useState<DateIdea[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_CUSTOM_DATES);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Locked date for tonight
  const [lockedDate, setLockedDate] = useState<DateIdea | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_LOCKED_DATE);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  // New custom date input modal
  const [showAddCustomModal, setShowAddCustomModal] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [customDesc, setCustomDesc] = useState('');

  // Audio effects mute toggle
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Wheel animation states
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [winningDate, setWinningDate] = useState<DateIdea | null>(null);
  const [pointerTilt, setPointerTilt] = useState(0);
  const [copiedShare, setCopiedShare] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const lastSegmentRef = useRef<number>(-1);

  // Sync custom dates
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CUSTOM_DATES, JSON.stringify(customDates));
    } catch {}
  }, [customDates]);

  // Combined dates pool
  const allPool = useMemo(() => {
    return [...DATE_IDEAS, ...customDates];
  }, [customDates]);

  const activeDates = useMemo(() => {
    if (selectedCategory === 'all') return allPool;
    return allPool.filter((d) => d.category === selectedCategory);
  }, [allPool, selectedCategory]);

  // Web Audio synthesizer for realistic tick sounds
  const playWheelTick = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.025);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.025);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.025);
    } catch {}
  };

  // Draw the wheel onto HTML5 Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = canvas.width;
    const center = size / 2;
    const radius = center - 8;
    const numSlices = activeDates.length;
    if (numSlices === 0) return;

    const sliceAngle = (2 * Math.PI) / numSlices;

    ctx.clearRect(0, 0, size, size);

    // Save and rotate the entire wheel
    ctx.save();
    ctx.translate(center, center);
    ctx.rotate((rotationAngle * Math.PI) / 180);

    // Outer golden/pearl shadow rim
    ctx.beginPath();
    ctx.arc(0, 0, radius + 4, 0, 2 * Math.PI);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#FAD2E1';
    ctx.stroke();

    // Draw Slices
    activeDates.forEach((date, i) => {
      const startA = i * sliceAngle;
      const endA = startA + sliceAngle;
      const color = SLICE_COLORS[i % SLICE_COLORS.length];

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, startA, endA);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = '#FFFFFF';
      ctx.stroke();

      // Draw Icon & Text radially
      ctx.save();
      ctx.rotate(startA + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#FFFFFF';

      // Icon
      ctx.font = '20px sans-serif';
      ctx.fillText(date.icon || '❤️', radius - 16, 6);

      // Short Label
      ctx.font = 'bold 11px Plus Jakarta Sans, sans-serif';
      const label = date[currentLang].title;
      const truncated = label.length > 15 ? label.slice(0, 14) + '…' : label;
      ctx.fillText(truncated, radius - 44, 4);

      ctx.restore();
    });

    // Decorative Center Hub
    ctx.beginPath();
    ctx.arc(0, 0, 36, 0, 2 * Math.PI);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#FF6B8A';
    ctx.stroke();

    // Inner heart circle
    ctx.beginPath();
    ctx.arc(0, 0, 28, 0, 2 * Math.PI);
    ctx.fillStyle = '#FFF5F7';
    ctx.fill();

    ctx.restore();
  }, [rotationAngle, activeDates, currentLang]);

  // Spin Wheel Physics Algorithm
  const spinWheel = () => {
    if (isSpinning || activeDates.length === 0) return;

    setIsSpinning(true);
    setWinningDate(null);

    // Determine random winning index and target angle
    const numSlices = activeDates.length;
    const sliceAngle = 360 / numSlices;
    const targetIndex = Math.floor(Math.random() * numSlices);

    // 5 to 7 full rotations plus offset to land on the chosen sector at pointer (top = 270 deg in canvas coordinate)
    const extraRotations = 360 * (5 + Math.floor(Math.random() * 3));
    // Pointer is at the top (angle 270 deg or -90 deg)
    // Sector i extends from i*sliceAngle to (i+1)*sliceAngle.
    // Center of sector is (targetIndex + 0.5)*sliceAngle
    const sliceCenter = (targetIndex + 0.5) * sliceAngle;
    // To bring sliceCenter to the top (270 degrees):
    const currentNorm = rotationAngle % 360;
    const neededRotation = (270 - sliceCenter - currentNorm + 720) % 360;
    const totalDelta = extraRotations + neededRotation;

    const startAngle = rotationAngle;
    const finalAngle = startAngle + totalDelta;
    const duration = 4800; // ms
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);

      // Decelerating ease-out quintic curve: 1 - (1 - t)^5
      const easeOut = 1 - Math.pow(1 - progress, 5);
      const currentA = startAngle + totalDelta * easeOut;
      setRotationAngle(currentA);

      // Detect tick crossing
      const currentNormalized = (currentA % 360 + 360) % 360;
      const currentSegment = Math.floor(currentNormalized / sliceAngle);

      if (currentSegment !== lastSegmentRef.current) {
        lastSegmentRef.current = currentSegment;
        playWheelTick();
        setPointerTilt(-16);
        setTimeout(() => setPointerTilt(0), 40);
      }

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        const landedDate = activeDates[targetIndex];
        setWinningDate(landedDate);
        triggerVictoryConfetti();
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);
  };

  const triggerVictoryConfetti = () => {
    try {
      confetti({
        particleCount: 85,
        spread: 75,
        origin: { x: 0.5, y: 0.55 },
        colors: ['#FF6B8A', '#FFA8BA', '#FFD166', '#06D6A0', '#8338EC'],
        zIndex: 9999,
      });
    } catch {}
  };

  const handleLockDate = (date: DateIdea) => {
    setLockedDate(date);
    try {
      localStorage.setItem(STORAGE_LOCKED_DATE, JSON.stringify(date));
    } catch {}
  };

  const handleUnlockDate = () => {
    setLockedDate(null);
    try {
      localStorage.removeItem(STORAGE_LOCKED_DATE);
    } catch {}
  };

  const handleShareDate = async (date: DateIdea) => {
    const text = isFr
      ? `✨ Idée de rencard tirée sur la Roue de l'Amour : « ${date.fr.title} » (${date.fr.time}). Ça te dit pour ce soir ? ❤️`
      : `✨ Date night idea from the Love Wheel of Fortune: « ${date.en.title} » (${date.en.time}). Ready for tonight? ❤️`;

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: date[currentLang].title,
          text,
          url: window.location.href,
        });
        return;
      } catch {}
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 3000);
    } catch {}
  };

  const handleAddCustomDate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim()) return;

    const newDate: DateIdea = {
      id: Date.now(),
      category: 'romantic',
      icon: '✨',
      color: '#FF6B8A',
      budget: 'Gratuit',
      fr: {
        title: customTitle.trim(),
        desc: customDesc.trim() || 'Rendez-vous personnalisé imaginé par vos soins pour votre couple.',
        tag: 'Création personnelle',
        time: '2h00',
        tip: 'Le plus beau rendez-vous est celui qu’on invente à deux !',
      },
      en: {
        title: customTitle.trim(),
        desc: customDesc.trim() || 'Custom bespoke date created by you for your duo.',
        tag: 'Custom Creation',
        time: '2 hrs',
        tip: 'The sweetest date is the one made with your own imagination!',
      },
    };

    setCustomDates((prev) => [...prev, newDate]);
    setCustomTitle('');
    setCustomDesc('');
    setShowAddCustomModal(false);
  };

  const handleResetCustomDates = () => {
    setCustomDates([]);
    try {
      localStorage.removeItem(STORAGE_CUSTOM_DATES);
    } catch {}
  };

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* Pinned Locked Date Banner for Tonight */}
      {lockedDate && (
        <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs animate-fade-in-up">
          <div className="flex items-center gap-3">
            <span className="text-2xl sm:text-3xl shrink-0">{lockedDate.icon}</span>
            <div className="text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                {isFr ? '🔒 Verrouillé pour ce soir !' : '🔒 Locked in for tonight!'}
              </span>
              <h4 className="text-sm sm:text-base font-bold text-emerald-950 mt-0.5">
                {lockedDate[currentLang].title}
              </h4>
              <p className="text-xs text-emerald-800/90 leading-tight">
                ⏱️ {lockedDate[currentLang].time} · {lockedDate.budget}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <button
              onClick={() => handleShareDate(lockedDate)}
              className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white text-emerald-900 border border-emerald-300 hover:bg-emerald-100/50 cursor-pointer transition-colors shadow-2xs"
            >
              {copiedShare ? (isFr ? '✓ Copié !' : '✓ Copied!') : (isFr ? 'Partager' : 'Share')}
            </button>
            <button
              onClick={handleUnlockDate}
              className="text-xs text-emerald-700 hover:text-emerald-950 font-medium px-2 py-1 cursor-pointer"
              title={isFr ? 'Déverrouiller' : 'Unlock'}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Category / Mood Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {[
          { id: 'all', label: isFr ? '🌟 Toutes les envies' : '🌟 All Vibe Styles' },
          { id: 'romantic', label: isFr ? '🌹 Romantique & Chic' : '🌹 Romantic & Chic' },
          { id: 'cozy', label: isFr ? '🏠 Cocooning & Maison' : '🏠 Cozy at Home' },
          { id: 'fun', label: isFr ? '🎲 Complice & Fun' : '🎲 Playful & Fun' },
          { id: 'budget', label: isFr ? '💸 Zéro euro / Malin' : '💸 Zero Cost / Smart' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              if (isSpinning) return;
              setSelectedCategory(cat.id);
              setWinningDate(null);
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer min-h-[36px] flex items-center ${
              selectedCategory === cat.id
                ? 'bg-deep-black text-white shadow-xs scale-102'
                : 'bg-white text-text-gray border border-powder hover:border-coral/50 hover:text-deep-black'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Wheel Stage */}
      <div className="flex flex-col items-center justify-center relative py-2">
        {/* Subtle romantic ambient backdrop glow */}
        <div className="absolute w-72 h-72 sm:w-80 sm:h-80 bg-light-pink/80 rounded-full filter blur-2xl -z-10 pointer-events-none"></div>

        {/* Pointer / Ticker Needle */}
        <div
          className="relative z-20 -mb-4 transition-transform duration-75 origin-top"
          style={{ transform: `rotate(${pointerTilt}deg)` }}
        >
          <svg className="w-8 h-10 filter drop-shadow-md" viewBox="0 0 32 40">
            <polygon points="16,38 2,10 30,10" fill="#FF6B8A" stroke="#FFFFFF" strokeWidth="2.5" />
            <circle cx="16" cy="10" r="5" fill="#FFFFFF" />
          </svg>
        </div>

        {/* Canvas Wheel with responsive sizing */}
        <div className="relative group cursor-pointer" onClick={spinWheel}>
          <canvas
            ref={canvasRef}
            width={340}
            height={340}
            className="w-[290px] h-[290px] sm:w-[340px] sm:h-[340px] rounded-full shadow-lg transition-transform duration-300 group-hover:scale-[1.01]"
          />

          {/* Central Spin Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              spinWheel();
            }}
            disabled={isSpinning}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-white border-2 border-coral shadow-md flex flex-col items-center justify-center cursor-pointer transition-all duration-300 z-10 ${
              isSpinning
                ? 'opacity-80 scale-95'
                : 'hover:scale-108 hover:bg-light-pink group-hover:border-coral-dark'
            }`}
          >
            <span className="text-xl leading-none animate-pulse">❤️</span>
            <span className="text-[10px] font-extrabold uppercase text-coral tracking-wider mt-0.5">
              {isSpinning ? '...' : (isFr ? 'Tourner' : 'Spin')}
            </span>
          </button>
        </div>

        {/* Audio click toggle & Wheel options */}
        <div className="flex items-center gap-4 text-xs text-text-gray mt-5">
          <button
            onClick={() => setSoundEnabled((v) => !v)}
            className="flex items-center gap-1 hover:text-deep-black cursor-pointer transition-colors"
            title={isFr ? 'Activer/Désactiver les clics sonores' : 'Toggle sound ticks'}
          >
            <span>{soundEnabled ? '🔊' : '🔇'}</span>
            <span>{soundEnabled ? (isFr ? 'Clics sonores activés' : 'Sound ON') : (isFr ? 'Muet' : 'Muted')}</span>
          </button>
          <span>·</span>
          <button
            onClick={() => setShowAddCustomModal(true)}
            className="text-coral font-semibold hover:underline cursor-pointer flex items-center gap-1"
          >
            <span>➕</span>
            <span>{isFr ? 'Ajouter une idée à la roue' : 'Add custom date'}</span>
          </button>
        </div>
      </div>

      {/* WINNING DATE REVEAL CARD */}
      {winningDate && (
        <div className="bg-white rounded-3xl border-2 border-coral/30 p-6 sm:p-8 max-w-xl mx-auto shadow-md text-left space-y-5 animate-fade-in-up relative overflow-hidden">
          {/* Top category & timing ribbon */}
          <div className="flex items-center justify-between border-b border-powder/70 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{winningDate.icon}</span>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-coral">
                  {winningDate[currentLang].tag}
                </span>
                <p className="text-xs text-text-gray">
                  ⏱️ {winningDate[currentLang].time} · 💰 {winningDate.budget}
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
              {isFr ? '✨ Le destin a choisi !' : '✨ Fate has spoken!'}
            </span>
          </div>

          {/* Title and Scenario */}
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-deep-black">
              {winningDate[currentLang].title}
            </h3>
            <p className="text-xs sm:text-sm text-text-gray leading-relaxed">
              {winningDate[currentLang].desc}
            </p>
          </div>

          {/* Secret Pro-tip */}
          {winningDate[currentLang].tip && (
            <div className="bg-light-pink/50 rounded-xl p-3.5 border border-coral/20 flex items-start gap-2.5 text-xs text-deep-black">
              <span className="text-base shrink-0">💡</span>
              <div>
                <span className="font-bold">{isFr ? 'Astuce complice : ' : 'Couple tip: '}</span>
                <span className="text-text-gray">{winningDate[currentLang].tip}</span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <button
              onClick={() => handleLockDate(winningDate)}
              className="btn-primary text-xs py-2.5 px-5 rounded-full justify-center min-h-[40px] shadow-xs"
            >
              <span>🔒</span>
              <span>{isFr ? 'Verrouiller pour ce soir' : 'Lock in for tonight'}</span>
            </button>

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => handleShareDate(winningDate)}
                className="btn-secondary text-xs py-2.5 px-4 rounded-full justify-center min-h-[40px] flex items-center gap-1.5"
              >
                <span>💬</span>
                <span>{copiedShare ? (isFr ? '✓ Copié !' : '✓ Copied!') : (isFr ? 'Proposer par SMS' : 'Share via SMS')}</span>
              </button>

              <button
                onClick={spinWheel}
                disabled={isSpinning}
                className="text-xs font-semibold text-text-gray hover:text-deep-black px-3 py-2 cursor-pointer transition-colors"
              >
                🔄 {isFr ? 'Relancer' : 'Spin again'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add Custom Date Idea */}
      {showAddCustomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deep-black/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-powder shadow-xl space-y-5 text-left relative">
            <button
              onClick={() => setShowAddCustomModal(false)}
              className="absolute top-4 right-4 text-text-gray hover:text-deep-black p-1 text-sm font-bold cursor-pointer"
            >
              ✕
            </button>

            <div className="space-y-1">
              <span className="text-xs font-bold text-coral uppercase tracking-wider">
                {isFr ? 'Personnalisation' : 'Customization'}
              </span>
              <h4 className="text-lg font-bold text-deep-black">
                {isFr ? 'Ajouter une idée de date sur la roue' : 'Add your custom date to the wheel'}
              </h4>
              <p className="text-xs text-text-gray">
                {isFr
                  ? 'Une envie secrète ou votre resto fétiche ? Ajoutez-le directement pour le tirer au sort !'
                  : 'A secret wish or your favorite bistro? Add it directly to spin for it!'}
              </p>
            </div>

            <form onSubmit={handleAddCustomDate} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-deep-black">
                  {isFr ? 'Titre de l’activité *' : 'Date Title *'}
                </label>
                <input
                  type="text"
                  required
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder={isFr ? 'Ex: Dîner aux chandelles chez Luigi' : 'e.g. Candlelit dinner at Luigi’s'}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-powder focus:outline-none focus:border-coral bg-off-white min-h-[40px]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-deep-black">
                  {isFr ? 'Petite description ou détails' : 'Short description / notes'}
                </label>
                <textarea
                  rows={2}
                  value={customDesc}
                  onChange={(e) => setCustomDesc(e.target.value)}
                  placeholder={isFr ? 'Ex: Réserver la table près de la baie vitrée...' : 'e.g. Book the table by the window...'}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-powder focus:outline-none focus:border-coral bg-off-white resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddCustomModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-text-gray hover:text-deep-black cursor-pointer"
                >
                  {isFr ? 'Annuler' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="btn-primary text-xs py-2 px-5 rounded-full"
                >
                  {isFr ? 'Ajouter à la roue' : 'Add to wheel'}
                </button>
              </div>
            </form>

            {customDates.length > 0 && (
              <div className="pt-3 border-t border-powder flex items-center justify-between text-xs text-text-gray">
                <span>{customDates.length} {isFr ? 'idées personnalisées' : 'custom dates'}</span>
                <button
                  onClick={handleResetCustomDates}
                  className="text-coral hover:underline font-semibold cursor-pointer"
                >
                  {isFr ? 'Réinitialiser mes ajouts' : 'Reset my custom dates'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
