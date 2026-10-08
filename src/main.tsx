import * as Sentry from '@sentry/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Initialize Sentry monitoring
Sentry.init({
  dsn: 'https://1ad3b97fbc7ef63465220fc5a3137c2b@o4512011007623168.ingest.de.sentry.io/4512220649488464',
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Tracing: capture 100% of transactions for comprehensive diagnostics
  tracesSampleRate: 1.0,
  tracePropagationTargets: ['localhost', /^\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Sentry.ErrorBoundary
      fallback={({ error, resetError }) => (
        <div className="min-h-screen flex items-center justify-center bg-[#FFFBF7] p-6 text-center">
          <div className="bg-white rounded-3xl p-8 max-w-md shadow-xl border border-powder">
            <div className="text-4xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold text-deep-black mb-2">Une erreur inattendue est survenue</h2>
            <p className="text-xs text-text-gray mb-4">
              L'incident a été automatiquement rapporté à notre console de surveillance Sentry.
            </p>
            <div className="bg-red-50 text-red-700 text-xs p-3 rounded-xl mb-4 text-left font-mono break-all">
              {String(error?.message || error)}
            </div>
            <button
              onClick={() => {
                resetError();
                window.location.reload();
              }}
              className="btn-primary text-xs py-2 px-6 rounded-full cursor-pointer"
            >
              Recharger l'application
            </button>
          </div>
        </div>
      )}
    >
      <App />
    </Sentry.ErrorBoundary>
  </StrictMode>,
);
