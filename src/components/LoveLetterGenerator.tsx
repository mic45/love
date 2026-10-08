import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Language } from '../translations';

interface LoveLetterGeneratorProps {
  currentLang: Language;
  onNavigateToQuiz?: () => void;
}

export interface GeneratedLetter {
  id: string;
  recipientName: string;
  senderName: string;
  formatType: string;
  tone: string;
  content: string;
  createdAt: string;
}

const STORAGE_SAVED_LETTERS = 'lovequiz_saved_letters';

export const LoveLetterGenerator: React.FC<LoveLetterGeneratorProps> = ({
  currentLang,
  onNavigateToQuiz,
}) => {
  const isFr = currentLang === 'fr';

  // Form states
  const [recipientName, setRecipientName] = useState('');
  const [senderName, setSenderName] = useState('');
  const [formatType, setFormatType] = useState<string>(
    isFr ? "Lettre d'amour émouvante" : 'Deep Love Letter'
  );
  const [tone, setTone] = useState<string>(
    isFr ? 'Romantique & Tendre' : 'Romantic & Tender'
  );
  const [relationshipDuration, setRelationshipDuration] = useState<string>(
    isFr ? '1 à 3 ans' : '1 to 3 years'
  );
  const [specialMemories, setSpecialMemories] = useState('');
  const [keyQualities, setKeyQualities] = useState('');

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [savedLetters, setSavedLetters] = useState<GeneratedLetter[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_SAVED_LETTERS);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Sync saved letters to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_SAVED_LETTERS, JSON.stringify(savedLetters));
    } catch {}
  }, [savedLetters]);

  // Format options
  const formatOptions = isFr
    ? [
        { id: "Lettre d'amour émouvante", label: "Lettre d'amour", icon: '📜', desc: 'Déclaration profonde et émouvante (~250 mots)' },
        { id: "Vœux d'engagement & Mariage", label: 'Vœux de mariage', icon: '💍', desc: 'Promesses solennelles et vision d’avenir' },
        { id: "Poème d'amour lyrique", label: "Poème lyrique", icon: '🌹', desc: 'Vers libres sensibles et métaphores douces' },
        { id: "Mot doux express & Carte", label: 'Mot doux express', icon: '💌', desc: 'Message court et percutant (~80 mots)' },
        { id: "Lettre de réconciliation", label: 'Pardon & Réconciliation', icon: '🕊️', desc: 'Apaisement sincère après une tension' },
      ]
    : [
        { id: 'Deep Love Letter', label: 'Love Letter', icon: '📜', desc: 'Touching and romantic heartfelt letter (~250 words)' },
        { id: 'Wedding & Commitment Vows', label: 'Wedding Vows', icon: '💍', desc: 'Solemn lifelong promises and shared future' },
        { id: 'Lyrical Love Poem', label: 'Poem', icon: '🌹', desc: 'Free verse poetry with tender imagery' },
        { id: 'Sweet Love Note', label: 'Sweet Note', icon: '💌', desc: 'Short, sweet postcard message (~80 words)' },
        { id: 'Reconciliation Letter', label: 'Apology & Peace', icon: '🕊️', desc: 'Sincere words of peace and healing' },
      ];

  // Tone options
  const toneOptions = isFr
    ? [
        { id: 'Romantique & Tendre', label: 'Romantique & Tendre', icon: '✨' },
        { id: 'Passionné & Ardent', label: 'Passionné & Ardent', icon: '🔥' },
        { id: 'Complice & Souriant', label: 'Complice & Amusant', icon: '😊' },
        { id: 'Poétique & Éloquent', label: 'Poétique & Éloquent', icon: '📖' },
        { id: 'Solennel & Éternel', label: 'Solennel & Éternel', icon: '💍' },
      ]
    : [
        { id: 'Romantic & Tender', label: 'Romantic & Tender', icon: '✨' },
        { id: 'Passionate & Fiery', label: 'Passionate & Fiery', icon: '🔥' },
        { id: 'Playful & Warm', label: 'Playful & Warm', icon: '😊' },
        { id: 'Poetic & Eloquent', label: 'Poetic & Eloquent', icon: '📖' },
        { id: 'Solemn & Eternal', label: 'Solemn & Eternal', icon: '💍' },
      ];

  // Duration options
  const durationOptions = isFr
    ? ['Premiers mois ensemble', '1 à 3 ans', '3 à 7 ans', 'Plus de 10 ans']
    : ['First few months', '1 to 3 years', '3 to 7 years', '10+ years'];

  // Client-side literary romantic template generator (graceful fallback)
  const generateFallbackLetter = (): string => {
    const to = recipientName.trim() || (isFr ? 'Mon amour' : 'My Love');
    const from = senderName.trim() || (isFr ? 'Avec tout mon cœur' : 'With all my heart');
    const memoriesSnippet = specialMemories.trim();
    const qualitiesSnippet = keyQualities.trim();

    if (isFr) {
      if (formatType.includes('Poème')) {
        return `${to},

Dans le silence où le monde s'efface,
Ton regard est l'aurore qui me guide.
${memoriesSnippet ? `Je me souviens de ${memoriesSnippet},\nComme d'une étincelle suspendue au temps.` : "Chaque instant partagé à tes côtés est un trésor."}

${qualitiesSnippet ? `J'aime en toi ${qualitiesSnippet},\nCette grâce infinie qui apaise mon âme.` : "J'aime la douceur de ta présence et l'éclat de ton sourire."}

Que les jours s'écoulent et que les saisons passent,
Mon cœur ne sait battre qu'à ton rythme.
Tu es mon port, ma lumière et mon éternité.

${from}`;
      }

      if (formatType.includes('Vœux')) {
        return `Mon cher et tendre ${to},

Aujourd’hui, devant tout ce qui nous unit, je choisis de t’offrir ce que j’ai de plus précieux : mon présent, mon avenir et ma fidélité inconditionnelle.

Depuis que nos chemins se sont croisés, tu as transformé mon quotidien en une aventure lumineuse. ${memoriesSnippet ? `Lorsque je repense à nos souvenirs, notamment ${memoriesSnippet}, je mesure la chance infinie d’avoir trouvé mon âme sœur.` : 'Chaque instant passé ensemble confirme la force de notre tandem.'}

${qualitiesSnippet ? `J’admire tant en toi ${qualitiesSnippet}. Tu m’inspires à devenir chaque jour une meilleure version de moi-même.` : 'Ton intelligence de cœur et ta bienveillance sont les piliers de notre bonheur.'}

Je te promets d’être ton refuge dans les tempêtes, ton partenaire dans chaque éclat de rire, et de t’aimer avec la même ardeur quand le temps déposera ses rides sur nos mains enlacées.

Pour aujourd’hui et pour tous les lendemains,
${from}`;
      }

      if (formatType.includes('express')) {
        return `Pour toi, ${to},

Juste un petit mot glissé pour te rappeler combien tu illumines ma vie. ${memoriesSnippet ? `Ce matin encore, je souriais en repensant à ${memoriesSnippet}. ` : ''}${qualitiesSnippet ? `Merci d'être cette personne si précieuse, avec ${qualitiesSnippet}. ` : ''}

Hâte de te serrer dans mes bras ce soir. Je t’aime plus que les mots ne sauraient le dire.

${from}`;
      }

      if (formatType.includes('réconciliation')) {
        return `Mon cher ${to},

Il y a des moments où les mots nous échappent, où la fatigue ou les maladresses créent une distance qui me fait mal au cœur. Mais ce soir, je ne veux laisser aucune ombre entre nous.

Ce qui compte infiniment plus que n’importe quel désaccord passager, c’est l’amour immense que j’ai pour toi. ${memoriesSnippet ? `Quand je pense à nous, à ${memoriesSnippet}, je me rappelle pourquoi notre lien est unique et indestructible.` : ''}

${qualitiesSnippet ? `Je chéris profondément ${qualitiesSnippet}, et je regrette sincèrement si j'ai pu te blesser.` : 'Je tiens tellement à nous.'}

Faisons la paix, reprenons-nous la main et avançons ensemble.

${from}`;
      }

      // Default: Lettre d'amour émouvante
      return `Mon amour, mon cher ${to},

Il y a des pensées que le tumulte des journées relègue au second plan, mais qui n’en finissent jamais d’habiter mon cœur. Aujourd’hui, j’avais simplement besoin de m’arrêter un instant pour t’écrire ce que je ressens pour toi.

Quand je regarde le chemin que nous avons parcouru ensemble, je suis empli(e) d’une gratitude immense. ${memoriesSnippet ? `Je repense si souvent à ${memoriesSnippet} ; ce sont ces fragments de vie partagée qui ont forgé notre complicité et gravé ton sourire en moi.` : 'Chaque étape à tes côtés m’a appris ce que signifiait aimer véritablement.'}

${qualitiesSnippet ? `Ce qui me touche chaque jour, c’est ${qualitiesSnippet}. Tu as cette manière unique de rendre le monde plus beau, plus rassurant et infiniment plus doux.` : 'Ta générosité, ta délicatesse et la chaleur de ton regard sont pour moi un refuge inestimable.'}

Quels que soient les défis ou les années qui défilent, sache que mon engagement envers toi reste intact et profond. Tu es mon évidence, ma plus belle rencontre et mon plus grand projet.

Avec tout mon amour et toute ma tendresse,
${from}`;
    }

    // English Fallback
    return `Dearest ${to},

In the quiet moments when the world slows down, my thoughts invariably return to you. Today, I wanted to take a moment to tell you what my heart whispers every single day.

Looking back on our journey together, I feel an overwhelming sense of gratitude. ${memoriesSnippet ? `I often find myself smiling when I remember ${memoriesSnippet}. Those memories are treasures I keep closest to my heart.` : 'Walking hand in hand with you has made life an extraordinary adventure.'}

${qualitiesSnippet ? `What I cherish most about you is ${qualitiesSnippet}. You have an effortless way of bringing warmth, joy, and peace into my world.` : 'Your gentle spirit, your strength, and your laughter are my safe harbor.'}

No matter where life takes us, my commitment and devotion to you are timeless. You are my home, my confidant, and the love of my life.

Forever and always,
${from}`;
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientName.trim()) return;

    setIsGenerating(true);
    window.scrollTo({ top: 300, behavior: 'smooth' });

    try {
      const res = await fetch('/api/generate-love-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientName: recipientName.trim(),
          senderName: senderName.trim(),
          formatType,
          tone,
          relationshipDuration,
          specialMemories: specialMemories.trim(),
          keyQualities: keyQualities.trim(),
          language: currentLang,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.text) {
          setGeneratedLetter(data.text);
          saveToHistory(data.text);
          triggerConfetti();
          return;
        }
      }
      // If server route returns fallback flag or fails
      const fallback = generateFallbackLetter();
      setGeneratedLetter(fallback);
      saveToHistory(fallback);
      triggerConfetti();
    } catch {
      // Offline or network error: use rich romantic generator
      const fallback = generateFallbackLetter();
      setGeneratedLetter(fallback);
      saveToHistory(fallback);
      triggerConfetti();
    } finally {
      setIsGenerating(false);
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  };

  const saveToHistory = (content: string) => {
    const item: GeneratedLetter = {
      id: `${Date.now()}`,
      recipientName: recipientName.trim(),
      senderName: senderName.trim(),
      formatType,
      tone,
      content,
      createdAt: new Date().toLocaleDateString(isFr ? 'fr-FR' : 'en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    };
    setSavedLetters((prev) => [item, ...prev.slice(0, 9)]);
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { x: 0.5, y: 0.5 },
        colors: ['#FF6B8A', '#FFA8BA', '#FFD166'],
        zIndex: 9999,
      });
    } catch {}
  };

  const handleCopy = async () => {
    if (!generatedLetter) return;
    try {
      await navigator.clipboard.writeText(generatedLetter);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {}
  };

  const handlePrint = () => {
    if (!generatedLetter) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${recipientName} - Lettre d'Amour</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;600&display=swap');
            body {
              font-family: 'Playfair Display', Georgia, serif;
              padding: 60px 80px;
              max-width: 650px;
              margin: 0 auto;
              background-color: #FFFDF9;
              color: #2D2327;
              line-height: 1.8;
              font-size: 16px;
            }
            .header-ornament {
              text-align: center;
              color: #FF6B8A;
              font-size: 24px;
              margin-bottom: 30px;
            }
            .letter-content {
              white-space: pre-wrap;
              text-align: justify;
            }
            .footer-tag {
              margin-top: 40px;
              text-align: center;
              font-family: 'Plus Jakarta Sans', sans-serif;
              font-size: 11px;
              color: #999;
              border-top: 1px solid #EAD8C7;
              padding-top: 15px;
            }
          </style>
        </head>
        <body>
          <div class="header-ornament">❦  ❤  ❦</div>
          <div class="letter-content">${generatedLetter.replace(/\n/g, '<br/>')}</div>
          <div class="footer-tag">Créé avec délicatesse sur LoveQuiz • ${new Date().toLocaleDateString()}</div>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleShareWhatsApp = () => {
    if (!generatedLetter) return;
    const text = encodeURIComponent(generatedLetter);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-10 px-4 space-y-10">
      {/* Title & Introduction */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-coral">
          <span>✨</span>
          <span>{isFr ? 'IA ÉMOTIONNELLE DE COUPLE' : 'EMOTIONAL RELATIONSHIP AI'}</span>
          <span>·</span>
          <span>{isFr ? '100% Sincère & Sur-Mesure' : 'Heartfelt & Bespoke'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-deep-black tracking-tight">
          {isFr ? 'Générateur de Lettres d’Amour & Vœux' : 'AI Love Letter & Vows Generator'}
        </h2>
        <p className="text-xs sm:text-sm text-text-gray leading-relaxed">
          {isFr
            ? 'Vous avez les sentiments, trouvez les mots justes. Renseignez quelques souvenirs intimes et laissez notre plume amoureuse rédiger une déclaration touchante, unique et inoubliable.'
            : 'You have the feelings; let us help you find the exact words. Share a few sweet memories and generate a bespoke, literary love declaration or solemn wedding vows.'}
        </p>
      </div>

      {/* Main Grid: Form on Left, Preview/Result on Right */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* LEFT COLUMN: The Customization Form */}
        <form
          onSubmit={handleGenerate}
          className="md:col-span-6 lg:col-span-6 bg-white rounded-3xl border border-powder p-5 sm:p-6 md:p-6 lg:p-8 shadow-xs space-y-4 sm:space-y-5"
        >
          {/* Recipient & Sender Names */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-bold text-deep-black flex items-center gap-1">
                <span>{isFr ? 'Pour qui ? (Destinataire) *' : 'Recipient Name *'}</span>
              </label>
              <input
                type="text"
                required
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder={isFr ? 'Ex: Camille, Thomas...' : 'e.g. Emma, David...'}
                className="w-full px-3.5 py-2.5 rounded-xl border border-powder text-xs sm:text-sm focus:outline-none focus:border-coral bg-off-white min-h-[44px]"
              />
            </div>
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-bold text-deep-black flex items-center gap-1">
                <span>{isFr ? 'De la part de (Signature)' : 'Sender Name / Sign-off'}</span>
              </label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder={isFr ? 'Votre prénom ou surnom' : 'Your name or nickname'}
                className="w-full px-3.5 py-2.5 rounded-xl border border-powder text-xs sm:text-sm focus:outline-none focus:border-coral bg-off-white min-h-[44px]"
              />
            </div>
          </div>

          {/* Format Selection */}
          <div className="space-y-2 text-left">
            <label className="text-xs font-bold text-deep-black flex items-center justify-between">
              <span>{isFr ? 'Format du texte souhaité' : 'Desired Format'}</span>
              <span className="text-[10px] text-text-gray font-normal">{isFr ? '5 styles' : '5 styles'}</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {formatOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setFormatType(opt.id)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[64px] ${
                    formatType === opt.id
                      ? 'border-coral bg-light-pink text-deep-black shadow-2xs font-semibold'
                      : 'border-powder bg-white hover:border-coral/40 text-text-gray hover:text-deep-black'
                  }`}
                >
                  <span className="text-base">{opt.icon}</span>
                  <span className="text-xs leading-tight mt-1">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tone Selection */}
          <div className="space-y-2 text-left">
            <label className="text-xs font-bold text-deep-black">
              {isFr ? 'Tonalité émotionnelle' : 'Emotional Tone'}
            </label>
            <div className="flex flex-wrap gap-1.5">
              {toneOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setTone(opt.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer flex items-center gap-1.5 ${
                    tone === opt.id
                      ? 'border-coral bg-coral text-white shadow-2xs'
                      : 'border-powder bg-white text-text-gray hover:text-deep-black hover:border-powder'
                  }`}
                >
                  <span>{opt.icon}</span>
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Relationship Duration */}
          <div className="space-y-2 text-left">
            <label className="text-xs font-bold text-deep-black">
              {isFr ? 'Durée de votre histoire' : 'Relationship Duration'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {durationOptions.map((dur) => (
                <button
                  key={dur}
                  type="button"
                  onClick={() => setRelationshipDuration(dur)}
                  className={`py-2 px-2 text-center text-xs rounded-xl border transition-all cursor-pointer ${
                    relationshipDuration === dur
                      ? 'border-coral bg-light-pink text-coral font-bold shadow-2xs'
                      : 'border-powder bg-white text-text-gray hover:text-deep-black'
                  }`}
                >
                  {dur}
                </button>
              ))}
            </div>
          </div>

          {/* Special Memories Input */}
          <div className="space-y-1.5 text-left">
            <label className="text-xs font-bold text-deep-black flex items-center justify-between">
              <span>{isFr ? 'Souvenirs ou anecdotes marquantes' : 'Personal Memories or Inside Jokes'}</span>
              <span className="text-[10px] text-coral font-medium">{isFr ? 'Recommandé ✨' : 'Recommended ✨'}</span>
            </label>
            <textarea
              rows={2}
              value={specialMemories}
              onChange={(e) => setSpecialMemories(e.target.value)}
              placeholder={
                isFr
                  ? 'Ex: Notre premier baiser sous la pluie à Rome, tes fous rires quand tu prépares le gâteau, notre weekend improvisé...'
                  : 'e.g. Our rainy walk in Rome, your laugh when baking, our late night talk...'
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-powder text-xs sm:text-sm focus:outline-none focus:border-coral bg-off-white resize-none"
            />
          </div>

          {/* Key Qualities Input */}
          <div className="space-y-1.5 text-left">
            <label className="text-xs font-bold text-deep-black">
              {isFr ? 'Ce que vous admirez le plus chez cette personne' : 'What you admire most about them'}
            </label>
            <input
              type="text"
              value={keyQualities}
              onChange={(e) => setKeyQualities(e.target.value)}
              placeholder={
                isFr
                  ? 'Ex: Sa patience infinie, son regard pétillant, sa tendresse...'
                  : 'e.g. Their boundless empathy, contagious smile, kindness...'
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-powder text-xs sm:text-sm focus:outline-none focus:border-coral bg-off-white min-h-[44px]"
            />
          </div>

          {/* Generate Button */}
          <button
            type="submit"
            disabled={isGenerating || !recipientName.trim()}
            className={`btn-primary w-full py-3.5 rounded-full justify-center text-sm font-bold min-h-[48px] shadow-md group ${
              isGenerating || !recipientName.trim() ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-lg'
            }`}
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin text-base">🪄</span>
                <span>{isFr ? 'Écriture de votre lettre d’amour...' : 'Composing your letter...'}</span>
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span>🪄</span>
                <span>{isFr ? 'Rédiger ma lettre d’amour' : 'Generate Love Letter'}</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            )}
          </button>
        </form>

        {/* RIGHT COLUMN: The Parchment Preview / Results */}
        <div className="md:col-span-6 lg:col-span-6 space-y-6">
          {generatedLetter ? (
            <div className="bg-[#FFFDF9] rounded-3xl border-2 border-[#EEDCC9] p-6 sm:p-8 shadow-md relative overflow-hidden text-left space-y-6 animate-fade-in-up">
              {/* Decorative top ribbon */}
              <div className="flex items-center justify-between border-b border-[#EEDCC9] pb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl">💌</span>
                  <div>
                    <p className="text-xs font-bold text-deep-black uppercase tracking-wider">
                      {formatType}
                    </p>
                    <p className="text-[11px] text-text-gray">
                      {tone} · {isFr ? 'Pour' : 'To'} {recipientName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleCopy}
                    className="p-2 rounded-lg bg-white border border-[#EEDCC9] hover:bg-light-pink text-xs font-semibold text-deep-black transition-colors cursor-pointer flex items-center gap-1"
                    title={isFr ? 'Copier le texte' : 'Copy text'}
                  >
                    <span>{copied ? '✓' : '📋'}</span>
                    <span className="hidden sm:inline">{copied ? (isFr ? 'Copié' : 'Copied') : (isFr ? 'Copier' : 'Copy')}</span>
                  </button>

                  <button
                    onClick={handlePrint}
                    className="p-2 rounded-lg bg-white border border-[#EEDCC9] hover:bg-light-pink text-xs font-semibold text-deep-black transition-colors cursor-pointer flex items-center gap-1"
                    title={isFr ? 'Imprimer / PDF' : 'Print / PDF'}
                  >
                    <span>🖨️</span>
                    <span className="hidden sm:inline">{isFr ? 'Imprimer' : 'Print'}</span>
                  </button>

                  <button
                    onClick={handleShareWhatsApp}
                    className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1"
                    title="WhatsApp"
                  >
                    <span>💬</span>
                  </button>
                </div>
              </div>

              {/* The Letter Body (Warm romantic serif typography) */}
              <div className="font-serif text-sm sm:text-base leading-relaxed text-[#2D2327] whitespace-pre-line space-y-4 px-1 selection:bg-light-pink selection:text-coral">
                {generatedLetter}
              </div>

              {/* Bottom Card Footer */}
              <div className="border-t border-[#EEDCC9] pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-gray">
                <span className="italic">
                  {isFr ? 'Fait avec amour sur LoveQuiz' : 'Crafted with love on LoveQuiz'}
                </span>
                <button
                  onClick={handleGenerate}
                  className="text-xs text-coral font-bold hover:underline cursor-pointer flex items-center gap-1"
                >
                  <span>🔄</span>
                  <span>{isFr ? 'Générer une autre version' : 'Regenerate another version'}</span>
                </button>
              </div>
            </div>
          ) : (
            /* Placeholder state before generation */
            <div className="bg-white/80 rounded-3xl border border-dashed border-powder p-8 sm:p-12 text-center space-y-4 flex flex-col items-center justify-center min-h-[420px]">
              <div className="w-16 h-16 rounded-full bg-light-pink border border-coral/30 flex items-center justify-center text-3xl animate-soft-bounce">
                💌
              </div>
              <div className="space-y-1 max-w-sm">
                <h4 className="text-base font-bold text-deep-black">
                  {isFr ? 'Votre parchemin attend vos mots' : 'Your parchment awaits your words'}
                </h4>
                <p className="text-xs text-text-gray leading-relaxed">
                  {isFr
                    ? 'Remplissez le formulaire à gauche (prénom, format, quelques anecdotes) pour voir apparaître instantanément votre lettre d’amour personnalisée.'
                    : 'Fill in the form on the left with names and memories to generate your custom heartfelt declaration in seconds.'}
                </p>
              </div>
              <div className="text-[11px] text-coral font-medium bg-powder/50 px-3 py-1 rounded-full">
                {isFr ? '✓ Génération immédiate & confidentielle' : '✓ Instant generation & 100% private'}
              </div>
            </div>
          )}

          {/* Saved Letters History Drawer */}
          {savedLetters.length > 0 && (
            <div className="bg-white rounded-2xl border border-powder p-5 text-left space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-deep-black flex items-center gap-1.5">
                  <span>📚</span>
                  <span>{isFr ? 'Vos lettres enregistrées' : 'Your Saved Letters'}</span>
                </h4>
                <span className="text-[10px] text-text-gray">
                  {savedLetters.length} {isFr ? 'lettres en mémoire' : 'saved'}
                </span>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {savedLetters.map((l) => (
                  <div
                    key={l.id}
                    onClick={() => {
                      setGeneratedLetter(l.content);
                      setRecipientName(l.recipientName);
                      setSenderName(l.senderName);
                      setFormatType(l.formatType);
                      setTone(l.tone);
                      window.scrollTo({ top: 350, behavior: 'smooth' });
                    }}
                    className="p-2.5 rounded-xl bg-off-white hover:bg-light-pink/40 border border-powder/60 cursor-pointer transition-colors flex items-center justify-between text-xs"
                  >
                    <div className="truncate mr-2">
                      <p className="font-bold text-deep-black truncate">
                        {l.recipientName ? `${isFr ? 'Pour' : 'To'} ${l.recipientName}` : l.formatType}
                      </p>
                      <p className="text-[10px] text-text-gray truncate">{l.formatType} · {l.createdAt}</p>
                    </div>
                    <span className="text-coral font-semibold text-xs shrink-0">
                      {isFr ? 'Afficher' : 'View'} →
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
