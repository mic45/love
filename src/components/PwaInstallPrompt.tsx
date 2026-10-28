import React, { useState, useEffect } from 'react';
import { Language } from '../translations';

interface PwaInstallPromptProps {
  currentLang: Language;
}

export const PwaInstallPrompt: React.FC<PwaInstallPromptProps> = ({ currentLang }) => {
  const isFr = currentLang === 'fr';
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if already running in standalone mode
    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true
    ) {
      setIsStandalone(true);
      return;
    }

    // Check if iOS Safari
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIos(isIosDevice);

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else if (isIos) {
      setShowIosGuide(!showIosGuide);
    }
  };

  // Do not show if already installed in standalone or dismissed
  if (isStandalone || dismissed) {
    return null;
  }

  // Show if deferredPrompt exists OR if on iOS Safari (to explain how to install)
  const canShow = !!deferredPrompt || isIos;

  if (!canShow) {
    return null;
  }

  return (
    <aside
      aria-label={isFr ? "Installation de l'application" : "App installation"}
      className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 max-w-sm animate-fade-in-up no-print"
    >
      <div className="bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl border border-coral/30 shadow-xl space-y-2.5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-coral to-coral-dark text-white flex items-center justify-center font-bold text-lg shadow-xs">
              ❤️
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-deep-black">
                LoveQuiz {isFr ? 'sur votre écran' : 'on your phone'}
              </p>
              <p className="text-[11px] text-text-gray">
                {isFr ? 'Accès en 1 clic & mode hors-ligne' : '1-click access & offline mode'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="text-text-gray/60 hover:text-deep-black text-sm p-1 cursor-pointer"
            aria-label={isFr ? 'Fermer' : 'Close'}
          >
            ✕
          </button>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={handleInstallClick}
            className="btn-primary text-xs py-2 px-3.5 rounded-full w-full justify-center min-h-[38px] shadow-xs cursor-pointer active:scale-95"
          >
            <span>📲</span>
            <span>{isFr ? 'Installer l’application' : 'Install web app'}</span>
          </button>
        </div>

        {/* iOS installation guide tooltip */}
        {showIosGuide && (
          <div className="p-2.5 rounded-xl bg-light-pink border border-coral/20 text-[11px] text-deep-black space-y-1 animate-fadeIn">
            <p className="font-semibold text-coral">
              {isFr ? 'Comment installer sur iPhone :' : 'How to install on iPhone:'}
            </p>
            <p>
              {isFr
                ? '1. Touchez le bouton Partager ⎋ en bas de Safari.'
                : '1. Tap the Share button ⎋ in Safari.'}
            </p>
            <p>
              {isFr
                ? '2. Sélectionnez « Sur l’écran d’accueil » ⊞.'
                : '2. Select "Add to Home Screen" ⊞.'}
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};
