/**
 * LoveQuiz — Main Shared Script & Performance Monitoring
 */

// PARTIE 9 : Monitoring Performance (Core Web Vitals)
if ('PerformanceObserver' in window) {
  try {
    const perfObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (window.__LOVEQUIZ_DEBUG_PERF__) {
          console.log(`[CWV] ${entry.name}: ${Math.round(entry.startTime)}ms`, entry);
        }
      }
    });
    perfObserver.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
  } catch (err) {
    // Graceful fallback for older browsers
  }
}

// Quick prefetch on hover for internal primary links
document.addEventListener('DOMContentLoaded', () => {
  const prefetchLinks = ['quiz.html', 'blog.html', 'tools.html'];
  const hoveredUrls = new Set();

  document.querySelectorAll('a[href]').forEach((link) => {
    const href = link.getAttribute('href');
    if (href && prefetchLinks.includes(href)) {
      link.addEventListener('mouseenter', () => {
        if (!hoveredUrls.has(href)) {
          hoveredUrls.add(href);
          const prefetchEl = document.createElement('link');
          prefetchEl.rel = 'prefetch';
          prefetchEl.href = href;
          document.head.appendChild(prefetchEl);
        }
      }, { passive: true });
    }
  });
});
