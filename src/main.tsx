import * as Sentry from '@sentry/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Global safeguard against Google Translate / browser extensions / auto-translation mutating DOM text nodes.
// When an extension wraps or replaces a text node (e.g. with <font> tags), React's DOM reconciler throws:
// "NotFoundError: Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node."
if (typeof Node !== 'undefined' && Node.prototype) {
  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function <T extends Node>(child: T): T {
    if (child.parentNode !== this) {
      if (typeof console !== 'undefined' && console.warn) {
        console.warn('DOM safeguard: child parent mismatch handled safely', child, this);
      }
      return child;
    }
    return originalRemoveChild.apply(this, [child]) as T;
  };

  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function <T extends Node>(newNode: T, referenceNode: Node | null): T {
    if (referenceNode && referenceNode.parentNode !== this) {
      if (typeof console !== 'undefined' && console.warn) {
        console.warn('DOM safeguard: referenceNode parent mismatch handled safely', referenceNode, this);
      }
      return newNode;
    }
    return originalInsertBefore.apply(this, [newNode, referenceNode]) as T;
  };
}

// Initialize Sentry monitoring for real-time error capture without blocking mobile main-thread
Sentry.init({
  dsn: 'https://1ad3b97fbc7ef63465220fc5a3137c2b@o4512011007623168.ingest.de.sentry.io/4512220649488464',
  integrations: [
    Sentry.browserTracingIntegration(),
  ],
  tracesSampleRate: 0.2,
  tracePropagationTargets: ['localhost', /^\/api/],
  // Ignore known DOM manipulation errors caused by third-party browser extensions (Google Translate, Grammarly, etc.)
  ignoreErrors: [
    "Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.",
    "NotFoundError: Failed to execute 'removeChild' on 'Node'",
    "The node to be removed is not a child of this node.",
    "Failed to execute 'insertBefore' on 'Node'",
    "ResizeObserver loop completed with undelivered notifications",
    "ResizeObserver loop limit exceeded",
  ],
  beforeSend(event, hint) {
    const error = hint.originalException;
    if (error) {
      const msg = typeof error === 'string' ? error : (error as Error)?.message || '';
      if (
        msg.includes('removeChild') ||
        msg.includes('insertBefore') ||
        msg.includes('not a child of this node')
      ) {
        // Drop benign browser translation / extension DOM mutation noise
        return null;
      }
    }
    return event;
  },
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
              {String((error as Error)?.message || error)}
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
