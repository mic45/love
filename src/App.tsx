import React, { useState, useEffect } from 'react';
import { Language } from './translations';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { QuizEngine } from './components/QuizEngine';
import { ToolsView } from './components/ToolsView';
import { BlogView } from './components/BlogView';
import { ArticleView } from './components/ArticleView';
import { AboutView } from './components/AboutView';
import { MobileBottomNav } from './components/MobileBottomNav';
import { LegalViews } from './components/LegalViews';
import { PwaInstallPrompt } from './components/PwaInstallPrompt';
import { HeartParticles } from './components/HeartParticles';
import { ThemedQuizEngine } from './components/ThemedQuizEngine';
import { BLOG_POSTS, BlogPost } from './data/blogData';

export default function App() {
  // 1. Language state with localStorage persistence
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('lovequiz_lang');
      if (saved === 'fr' || saved === 'en') return saved;
    } catch {
      // ignore
    }
    return 'fr';
  });

  // 2. Navigation tab state
  const [activeTab, setActiveTab] = useState<
    'home' | 'quiz' | 'themed' | 'tools' | 'blog' | 'article' | 'about' | 'mentions' | 'confidentialite' | '404'
  >(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      const modeParam = params.get('mode');
      const refParam = params.get('ref');

      if (modeParam === 'challenge' || refParam === 'challenge') {
        return 'quiz';
      }

      if (tabParam === 'themed' || tabParam === 'themes' || params.get('view') === 'themed') {
        return 'themed';
      }

      if (tabParam && ['home', 'quiz', 'themed', 'tools', 'blog', 'about', 'mentions', 'confidentialite'].includes(tabParam)) {
        return tabParam as any;
      }
    } catch {
      // ignore
    }
    return 'home';
  });

  const [initialThemedQuizId, setInitialThemedQuizId] = useState<string | null>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get('theme') || null;
    } catch {
      return null;
    }
  });

  // 3. Selected article for detailed reading
  const [selectedArticle, setSelectedArticle] = useState<BlogPost>(BLOG_POSTS[0]);

  // 4. Dismissible top banner for mobile space optimization
  const [showTopBanner, setShowTopBanner] = useState(true);

  // Synchronize document title, meta descriptions, and language dynamically for SEO
  useEffect(() => {
    const isFr = currentLang === 'fr';
    document.documentElement.lang = currentLang;

    const seoConfig: Record<string, { title: string; desc: string }> = {
      home: {
        title: isFr
          ? 'LoveQuiz - Test de Compatibilité Amoureuse Gratuit (15 Questions)'
          : 'LoveQuiz – Free Relationship Compatibility Test (15 Questions)',
        desc: isFr
          ? 'Découvrez votre compatibilité amoureuse avec notre quiz gratuit de 15 questions. Basé sur la psychologie relationnelle. Résultats instantanés et privés.'
          : 'Evaluate your relationship compatibility with our free 15-question quiz based on psychological research. 100% private and instant results.',
      },
      quiz: {
        title: isFr
          ? 'Quiz de Couple (15 Questions) – Test de Compatibilité | LoveQuiz'
          : 'Couple Compatibility Quiz (15 Questions) | LoveQuiz',
        desc: isFr
          ? 'Répondez aux 15 questions pour évaluer votre complicité de couple, votre communication et votre avenir à deux.'
          : 'Answer 15 relationship questions to gauge intimacy, emotional communication, and your shared vision.',
      },
      themed: {
        title: isFr
          ? 'Quiz de Couple par Thème : Emménagement, Conflits, Passion, Finances | LoveQuiz'
          : 'Themed Relationship Quizzes: Moving In, Conflicts, Spark, Money | LoveQuiz',
        desc: isFr
          ? 'Choisissez un quiz ciblé de 2 minutes pour tester votre compatibilité sur un sujet clé : vie commune, désamorçage des disputes, intimité amoureuse ou gestion de l’argent.'
          : 'Take a focused 2-minute couple quiz on specific milestones: moving in together, fighting fair, reigniting intimacy, and shared finances.',
      },
      tools: {
        title: isFr
          ? 'Outils de Couple & Tests d’Amour Gratuits | LoveQuiz'
          : 'Couple Tools & Free Relationship Tests | LoveQuiz',
        desc: isFr
          ? 'Calculateur d’alchimie astrale, test des 5 langages de l’amour et générateur d’idées de dates romantiques pour couples.'
          : 'Zodiac compatibility calculator, 5 love languages test, and romantic date night generator for couples.',
      },
      blog: {
        title: isFr
          ? 'Blog Psychologie de Couple & Conseils Amoureux | LoveQuiz'
          : 'Relationship Psychology & Couple Advice Blog | LoveQuiz',
        desc: isFr
          ? 'Articles et conseils de psychologues pour nourrir votre complicité amoureuse, surmonter les conflits et réenchanter le quotidien.'
          : 'Expert articles and relationship advice to foster affection, resolve conflict, and sustain lasting intimacy.',
      },
      article: {
        title: `${selectedArticle[currentLang].title} | LoveQuiz`,
        desc: selectedArticle[currentLang].excerpt,
      },
      about: {
        title: isFr
          ? 'À Propos de LoveQuiz – Notre Mission & Contact | LoveQuiz'
          : 'About LoveQuiz – Our Mission & Contact | LoveQuiz',
        desc: isFr
          ? 'Découvrez l’histoire de LoveQuiz, notre équipe et nos 4 piliers d’éthique pour aider les couples à cultiver une intimité durable.'
          : 'Discover the story behind LoveQuiz, our relationship mission, and how we empower couples worldwide.',
      },
      mentions: {
        title: isFr ? 'Mentions Légales | LoveQuiz' : 'Legal Notices | LoveQuiz',
        desc: isFr ? 'Mentions légales, éditeur et hébergement du site LoveQuiz.' : 'Legal notice and publisher details for LoveQuiz.',
      },
      confidentialite: {
        title: isFr ? 'Politique de Confidentialité & RGPD | LoveQuiz' : 'Privacy Policy & GDPR | LoveQuiz',
        desc: isFr ? 'Respect strict de votre vie privée, anonymat garanti et conformité RGPD.' : 'Strict respect for your privacy, guaranteed anonymity, and GDPR compliance.',
      },
      '404': {
        title: 'Page introuvable | LoveQuiz',
        desc: 'Page introuvable sur LoveQuiz.',
      },
    };

    const currentSeo = seoConfig[activeTab] || seoConfig.home;
    document.title = currentSeo.title;

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', currentSeo.desc);
    }

    // Update OpenGraph Title & Desc
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', currentSeo.title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', currentSeo.desc);

    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', currentSeo.title);

    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', currentSeo.desc);
  }, [activeTab, currentLang, selectedArticle]);

  // Persist language on change
  const handleToggleLang = () => {
    const nextLang: Language = currentLang === 'fr' ? 'en' : 'fr';
    setCurrentLang(nextLang);
    try {
      localStorage.setItem('lovequiz_lang', nextLang);
    } catch {
      // ignore
    }
  };

  const handleNavigate = (
    tab: 'home' | 'quiz' | 'themed' | 'tools' | 'blog' | 'about' | 'mentions' | 'confidentialite' | '404'
  ) => {
    setActiveTab(tab);
    try {
      const url = new URL(window.location.href);
      if (tab === 'home') {
        url.searchParams.delete('tab');
        url.searchParams.delete('theme');
      } else {
        url.searchParams.set('tab', tab);
        if (tab !== 'themed') {
          url.searchParams.delete('theme');
        }
      }
      window.history.pushState({}, '', url.toString());
    } catch {
      // ignore
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToThemed = (themeId?: string) => {
    if (themeId) {
      setInitialThemedQuizId(themeId);
    }
    setActiveTab('themed');
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', 'themed');
      if (themeId) {
        url.searchParams.set('theme', themeId);
      } else {
        url.searchParams.delete('theme');
      }
      window.history.pushState({}, '', url.toString());
    } catch {
      // ignore
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [selectedTool, setSelectedTool] = useState<'letters' | 'loveLang' | 'zodiac' | 'dates'>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const tool = params.get('tool');
      if (tool === 'loveLang' || tool === 'zodiac' || tool === 'dates' || tool === 'letters') {
        return tool as any;
      }
    } catch {}
    return 'letters';
  });

  const handleNavigateToTools = (tool: 'letters' | 'loveLang' | 'zodiac' | 'dates' = 'letters') => {
    setSelectedTool(tool);
    handleNavigate('tools');
  };

  const handleOpenArticle = (post: BlogPost) => {
    setSelectedArticle(post);
    setActiveTab('article');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-off-white text-deep-black selection:bg-powder selection:text-coral overflow-hidden w-full pb-16 md:pb-0">
      {/* Top MatchMaker Banner / Notification */}
      {showTopBanner && (
        <div className="bg-powder text-coral py-1.5 px-3 sm:px-4 text-center text-xs font-semibold border-b border-coral/15 flex items-center justify-between sm:justify-center gap-2 relative">
          <div className="flex items-center gap-1.5 mx-auto">
            <span className="animate-pulse">✨</span>
            <span className="line-clamp-1 sm:line-clamp-none">
              {currentLang === 'fr'
                ? 'Édition Spéciale Couple 2026 : Le test de compatibilité complet est 100% gratuit !'
                : 'Special 2026 Couple Edition: The full relationship compatibility test is 100% free!'}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setShowTopBanner(false)}
            aria-label="Fermer le bandeau"
            className="text-coral/70 hover:text-coral p-1 rounded-full text-xs font-bold leading-none cursor-pointer shrink-0 ml-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        currentLang={currentLang}
        onToggleLang={handleToggleLang}
        activeTab={activeTab}
        onNavigate={handleNavigate}
      />

      {/* Evaporating Heart Particles (active on romantic pages: Home, Quiz, Themed, and Couple Tools) */}
      {(activeTab === 'home' || activeTab === 'quiz' || activeTab === 'themed' || activeTab === 'tools') && (
        <HeartParticles
          density={activeTab === 'quiz' || activeTab === 'themed' ? 'festive' : 'subtle'}
          interactive={true}
        />
      )}

      {/* Main Content View Switcher */}
      <main className="flex-1 relative">
        {activeTab === 'home' && (
          <HomeView
            currentLang={currentLang}
            onStartQuiz={() => handleNavigate('quiz')}
            onExploreTools={handleNavigateToTools}
            onNavigateToBlog={() => handleNavigate('blog')}
            onNavigateToThemed={handleNavigateToThemed}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizEngine
            currentLang={currentLang}
            onNavigateToTools={() => handleNavigateToTools('letters')}
            onNavigateToThemed={() => handleNavigate('themed')}
          />
        )}

        {activeTab === 'themed' && (
          <ThemedQuizEngine
            currentLang={currentLang}
            onNavigateToGeneralQuiz={() => handleNavigate('quiz')}
            initialThemeId={initialThemedQuizId}
          />
        )}

        {activeTab === 'tools' && (
          <ToolsView
            currentLang={currentLang}
            onNavigateToQuiz={() => handleNavigate('quiz')}
            initialTool={selectedTool}
          />
        )}

        {activeTab === 'blog' && (
          <BlogView
            currentLang={currentLang}
            onSelectArticle={handleOpenArticle}
          />
        )}

        {activeTab === 'article' && (
          <ArticleView
            post={selectedArticle}
            currentLang={currentLang}
            onBack={() => handleNavigate('blog')}
            onTakeQuiz={() => handleNavigate('quiz')}
          />
        )}

        {activeTab === 'about' && (
          <AboutView
            currentLang={currentLang}
            onNavigateToQuiz={() => handleNavigate('quiz')}
            onNavigateToTools={() => handleNavigate('tools')}
          />
        )}

        {activeTab === 'mentions' && (
          <LegalViews
            type="mentions"
            currentLang={currentLang}
            onBackHome={() => handleNavigate('home')}
          />
        )}

        {activeTab === 'confidentialite' && (
          <LegalViews
            type="confidentialite"
            currentLang={currentLang}
            onBackHome={() => handleNavigate('home')}
          />
        )}

        {activeTab === '404' && (
          <LegalViews
            type="404"
            currentLang={currentLang}
            onBackHome={() => handleNavigate('home')}
          />
        )}
      </main>

      {/* Deep Black Footer */}
      <Footer
        currentLang={currentLang}
        onNavigate={handleNavigate}
      />

      {/* Floating Bottom Nav for Mobile & Tablet */}
      <MobileBottomNav
        currentLang={currentLang}
        activeTab={activeTab}
        onNavigate={handleNavigate}
      />

      {/* Progressive Web App (PWA) Install Prompt */}
      <PwaInstallPrompt currentLang={currentLang} />
    </div>
  );
}
