import React, { useState } from 'react';
import { Language, translations } from '../translations';

interface SocialShareButtonsProps {
  score: number;
  archetypeTitle: string;
  shareUrl: string;
  currentLang: Language;
  creatorName?: string;
  variant?: 'card' | 'compact' | 'mini-bar';
  showPreview?: boolean;
}

export const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({
  score,
  archetypeTitle,
  shareUrl,
  currentLang,
  creatorName = '',
  variant = 'card',
  showPreview = true,
}) => {
  const [copied, setCopied] = useState(false);
  const [messengerToast, setMessengerToast] = useState(false);
  const t = translations[currentLang];
  const isFr = currentLang === 'fr';

  const senderDisplay = creatorName.trim() || (isFr ? 'Moi' : 'Me');

  // Pre-formatted messages for each platform
  const shareMessage = isFr
    ? `❤️ ${senderDisplay} a obtenu un score de compatibilité de ${score}% sur LoveQuiz (${archetypeTitle}) ! Fais le test pour qu’on compare notre complicité : ${shareUrl}`
    : `❤️ ${senderDisplay} scored ${score}% love compatibility on LoveQuiz (${archetypeTitle})! Take the quiz to compare our harmony: ${shareUrl}`;

  const tweetText = isFr
    ? `J’ai testé notre alchimie amoureuse sur LoveQuiz : ${score}% de compatibilité (${archetypeTitle}) ! 💕 Faites le test gratuit :`
    : `Tested our relationship compatibility on LoveQuiz: ${score}% (${archetypeTitle})! 💕 Take the free test:`;

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleWhatsApp = () => {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleMessenger = () => {
    // Also copy to clipboard for convenience
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${shareMessage}`);
    }
    setMessengerToast(true);
    setTimeout(() => setMessengerToast(false), 4000);

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) {
      // Try native deep link on mobile, with fallback to send dialog
      const messengerAppUrl = `fb-messenger://share?link=${encodeURIComponent(shareUrl)}&app_id=291494419107518`;
      const fallbackUrl = `https://www.facebook.com/dialog/send?link=${encodeURIComponent(shareUrl)}&app_id=291494419107518&redirect_uri=${encodeURIComponent(shareUrl)}`;
      
      const start = Date.now();
      window.location.href = messengerAppUrl;
      setTimeout(() => {
        if (Date.now() - start < 1500) {
          window.open(fallbackUrl, '_blank', 'noopener,noreferrer');
        }
      }, 700);
    } else {
      // Desktop: Open Messenger / Facebook web dialog
      const fbDialog = `https://www.facebook.com/dialog/send?link=${encodeURIComponent(shareUrl)}&app_id=291494419107518&redirect_uri=${encodeURIComponent(shareUrl)}`;
      const fbShareFallback = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareMessage)}`;
      
      const opened = window.open(fbDialog, 'fbMessenger', 'width=620,height=560,toolbar=0,menubar=0,location=0');
      if (!opened) {
        window.open(fbShareFallback, '_blank', 'noopener,noreferrer');
      }
    }
  };

  const handleTwitter = () => {
    const hashtags = isFr ? 'LoveQuiz,Couple,Compatibilite' : 'LoveQuiz,CoupleGoals,Love';
    const xUrl = `https://x.com/intent/post?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(shareUrl)}&hashtags=${encodeURIComponent(hashtags)}`;
    window.open(xUrl, '_blank', 'width=600,height=480,noopener,noreferrer');
  };

  const handleSms = () => {
    const smsUrl = `sms:?&body=${encodeURIComponent(shareMessage)}`;
    window.location.href = smsUrl;
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: isFr ? 'LoveQuiz – Mon Score de Couple' : 'LoveQuiz – Couple Compatibility',
          text: shareMessage,
          url: shareUrl,
        });
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          handleCopyLink();
        }
      }
    } else {
      handleCopyLink();
    }
  };

  // Compact variant: Sleek horizontal bar (e.g. right under score badge)
  if (variant === 'compact' || variant === 'mini-bar') {
    return (
      <div className="flex flex-wrap items-center justify-center gap-2 pt-2 pb-1 no-print">
        <span className="text-xs font-semibold text-text-gray mr-1 flex items-center gap-1">
          <span>💌</span>
          <span>{isFr ? 'Partager :' : 'Share:'}</span>
        </span>

        {/* WhatsApp */}
        <button
          type="button"
          onClick={handleWhatsApp}
          title={isFr ? 'Partager sur WhatsApp' : 'Share on WhatsApp'}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white bg-[#25D366] hover:bg-[#1EBE5D] shadow-xs hover:shadow-sm transition-all transform hover:-translate-y-0.5 cursor-pointer active:scale-95"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 012.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.71 4.3 3.8.6.26 1.07.41 1.44.53.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.17-.48-.29z" />
          </svg>
          <span>WhatsApp</span>
        </button>

        {/* Messenger */}
        <button
          type="button"
          onClick={handleMessenger}
          title={isFr ? 'Partager sur Messenger' : 'Share on Messenger'}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#00B2FF] to-[#006AFF] hover:brightness-110 shadow-xs hover:shadow-sm transition-all transform hover:-translate-y-0.5 cursor-pointer active:scale-95"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.145 2 11.259c0 2.913 1.454 5.512 3.729 7.205V22l3.393-1.862c.917.254 1.887.391 2.878.391 5.523 0 10-4.145 10-9.27C22 6.145 17.523 2 12 2zm1.069 12.442l-2.73-2.91-5.328 2.91 5.86-6.223 2.795 2.91 5.264-2.91-5.861 6.223z" />
          </svg>
          <span>Messenger</span>
        </button>

        {/* Twitter / X */}
        <button
          type="button"
          onClick={handleTwitter}
          title={isFr ? 'Partager sur Twitter / 𝕏' : 'Share on Twitter / 𝕏'}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white bg-black hover:bg-neutral-800 shadow-xs hover:shadow-sm transition-all transform hover:-translate-y-0.5 cursor-pointer active:scale-95"
        >
          <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span>𝕏</span>
        </button>

        {/* Copy Link */}
        <button
          type="button"
          onClick={handleCopyLink}
          title={isFr ? 'Copier le lien direct' : 'Copy link'}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-deep-black bg-white border border-powder hover:border-coral/40 shadow-2xs hover:shadow-xs transition-all cursor-pointer active:scale-95"
        >
          <span>{copied ? '✓' : '🔗'}</span>
          <span>{copied ? (isFr ? 'Copié !' : 'Copied!') : (isFr ? 'Lien' : 'Link')}</span>
        </button>
      </div>
    );
  }

  // Full Card variant (Detailed sharing section)
  return (
    <div className="p-5 sm:p-7 rounded-3xl bg-white border-2 border-coral/30 shadow-md text-center space-y-5 no-print relative overflow-hidden">
      {/* Decorative gradient corner glow */}
      <div className="absolute -top-16 -right-16 w-36 h-36 bg-gradient-to-br from-coral/15 to-transparent rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="space-y-1.5 relative">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-coral/10 text-coral text-xs font-bold mb-1">
          <span>💌</span>
          <span>{t.quiz.shareScoreTitle}</span>
        </div>
        <h4 className="text-xl sm:text-2xl font-extrabold text-deep-black tracking-tight">
          {t.quiz.challengeTitle}
        </h4>
        <p className="text-xs sm:text-sm text-text-gray max-w-md mx-auto leading-relaxed">
          {t.quiz.shareScoreSubtitle}
        </p>
      </div>

      {/* Score Summary Badge Pill */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-light-pink border border-coral/25 text-xs text-deep-black font-semibold">
        <span>🏆</span>
        <span>
          {isFr ? 'Score à partager :' : 'Score to share:'}{' '}
          <strong className="text-coral font-bold">{score}%</strong> · {archetypeTitle}
        </span>
      </div>

      {/* Message Preview Box */}
      {showPreview && (
        <div className="max-w-md mx-auto p-3.5 rounded-2xl bg-off-white border border-powder text-left space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-bold text-text-gray uppercase tracking-wider">
            <span>{t.quiz.sharePreviewLabel}</span>
            <span className="text-coral">LoveQuiz</span>
          </div>
          <p className="text-xs text-deep-black font-medium leading-relaxed italic line-clamp-2">
            « {shareMessage} »
          </p>
        </div>
      )}

      {/* Platform Buttons Grid */}
      <div className="space-y-3 pt-1">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-w-lg mx-auto">
          {/* WhatsApp Button */}
          <button
            type="button"
            onClick={handleWhatsApp}
            className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-2xl font-bold text-xs sm:text-sm text-white bg-[#25D366] hover:bg-[#1EBE5D] shadow-xs hover:shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer active:scale-95"
          >
            <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 012.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.71 4.3 3.8.6.26 1.07.41 1.44.53.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.17-.48-.29z" />
            </svg>
            <span>{t.quiz.shareWhatsApp}</span>
          </button>

          {/* Facebook Messenger Button */}
          <button
            type="button"
            onClick={handleMessenger}
            className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-2xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#00B2FF] via-[#0084FF] to-[#006AFF] hover:brightness-110 shadow-xs hover:shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer active:scale-95"
          >
            <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.145 2 11.259c0 2.913 1.454 5.512 3.729 7.205V22l3.393-1.862c.917.254 1.887.391 2.878.391 5.523 0 10-4.145 10-9.27C22 6.145 17.523 2 12 2zm1.069 12.442l-2.73-2.91-5.328 2.91 5.86-6.223 2.795 2.91 5.264-2.91-5.861 6.223z" />
            </svg>
            <span>{t.quiz.shareMessenger}</span>
          </button>

          {/* Twitter / X Button */}
          <button
            type="button"
            onClick={handleTwitter}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-bold text-xs sm:text-sm text-white bg-black hover:bg-neutral-800 shadow-xs hover:shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer active:scale-95"
          >
            <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span>{t.quiz.shareTwitter}</span>
          </button>
        </div>

        {/* Secondary Row: SMS, Copy Link, Native Share */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 max-w-lg mx-auto">
          {/* SMS Button */}
          <button
            type="button"
            onClick={handleSms}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-blue-700 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors cursor-pointer active:scale-95"
          >
            <span className="text-sm">📱</span>
            <span>{t.quiz.shareSms}</span>
          </button>

          {/* Copy Link Button */}
          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-deep-black bg-white hover:bg-off-white border border-powder hover:border-coral/40 shadow-2xs transition-all cursor-pointer active:scale-95"
          >
            <span>{copied ? '✓' : '📋'}</span>
            <span>{copied ? t.quiz.shareCopied : t.quiz.shareCopy}</span>
          </button>

          {/* Native Web Share button (if supported) */}
          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <button
              type="button"
              onClick={handleNativeShare}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-text-gray hover:text-deep-black bg-white border border-powder hover:border-coral/30 transition-colors cursor-pointer"
            >
              <span>📲</span>
              <span>{t.quiz.shareNative}</span>
            </button>
          )}
        </div>
      </div>

      {/* Toast Alert for Messenger or Copied Link */}
      {messengerToast && (
        <div className="animate-fade-in-up text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 max-w-md mx-auto">
          💬 {t.quiz.shareToastMessenger}
        </div>
      )}
    </div>
  );
};
