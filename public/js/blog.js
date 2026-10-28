/**
 * LoveQuiz — Blog Engine & Data (MatchMaker Style)
 * Fichier : js/blog.js
 */

const BLOG_ARTICLES = [
  {
    id: 1,
    categoryKey: 'communication',
    categoryName: { fr: 'Communication', en: 'Communication' },
    bgColor: '#FFE4EC',
    accentColor: '#FF6B8A',
    readTime: { fr: '5 min', en: '5 min' },
    date: { fr: '15 sept. 2026', en: 'Sept 15, 2026' },
    title: {
      fr: "Les 5 langages de l'amour expliqués",
      en: "The 5 Love Languages Explained"
    },
    excerpt: {
      fr: "Découvrez comment vous et votre partenaire exprimez l'amour et apprenez à parler le même langage pour éviter les malentendus du quotidien.",
      en: "Discover how you and your partner express love and learn to speak the same language to prevent daily misunderstandings."
    },
    content: {
      fr: "Chaque personne possède une manière privilégiée de recevoir et d'exprimer son affection. Le concept développé par Gary Chapman identifie cinq canaux majeurs : les paroles valorisantes, les moments de qualité, les cadeaux attentionnés, les services rendus et le contact physique. Quand deux partenaires s'expriment dans des langages différents sans le savoir, chacun peut avoir l'impression sincère de donner beaucoup tout en se sentant incompris. Identifier votre dialecte émotionnel mutuel est le premier pas vers une entente profonde.",
      en: "Every individual possesses a distinct way of receiving and giving affection. The framework pioneered by Gary Chapman highlights five major channels: words of affirmation, quality time, receiving gifts, acts of service, and physical touch. When partners speak differing emotional languages unknowingly, both may feel unappreciated despite honest efforts. Recognizing each other's emotional dialect is the most direct bridge to lasting intimacy."
    },
    illustrationSvg: `<svg viewBox="0 0 400 250" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="250" fill="#FFE4EC"/>
      <circle cx="200" cy="125" r="75" fill="#FFF0F3"/>
      <circle cx="150" cy="115" r="30" fill="#FFD1DC"/>
      <circle cx="250" cy="115" r="30" fill="#FFB6C1"/>
      <path d="M170 120 C185 100 215 100 230 120 C240 135 200 165 200 165 C200 165 160 135 170 120 Z" fill="#FF6B8A"/>
      <path d="M120 180 Q200 210 280 180" stroke="#FF6B8A" stroke-width="4" stroke-linecap="round"/>
      <circle cx="130" cy="70" r="10" fill="#FF8DA1"/>
      <circle cx="270" cy="65" r="8" fill="#FF8DA1"/>
      <circle cx="200" cy="45" r="14" fill="#FF4D73"/>
    </svg>`
  },
  {
    id: 2,
    categoryKey: 'communication',
    categoryName: { fr: 'Communication', en: 'Communication' },
    bgColor: '#D6F0FF',
    accentColor: '#38A3A5',
    readTime: { fr: '7 min', en: '7 min' },
    date: { fr: '10 sept. 2026', en: 'Sept 10, 2026' },
    title: {
      fr: "Comment communiquer sans se disputer",
      en: "How to communicate without arguing"
    },
    excerpt: {
      fr: "Les techniques de communication non-violente pour les couples : écoute active, reformulation et gestion bienveillante des désaccords.",
      en: "Non-violent communication techniques for couples: active listening, rephrasing, and gentle disagreement management."
    },
    content: {
      fr: "La divergence d'opinion est inévitable et saine dans un couple équilibré. Ce qui fragilise le lien, c'est l'escalade verbale réactive. En adoptant les préceptes de la communication non-violente (CNV) — observer les faits sans juger, exprimer son sentiment profond sans blâmer (« Je me sens déçu » plutôt que « Tu ne fais jamais attention ») et formuler une demande claire —, vous transformez une dispute potentielle en opportunité de complicité renforcée.",
      en: "Disagreements are natural and healthy in any balanced relationship. What damages emotional safety is reactive escalation. By embracing non-violent communication (NVC) principles — observing facts without judgment, expressing genuine feelings without blaming ('I feel overwhelmed' instead of 'You never help'), and stating constructive requests —, you convert potential conflicts into opportunities for genuine closeness."
    },
    illustrationSvg: `<svg viewBox="0 0 400 250" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="250" fill="#D6F0FF"/>
      <ellipse cx="200" cy="130" rx="90" ry="70" fill="#EBF7FF"/>
      <path d="M140 110 C140 90 175 90 175 110 C175 125 155 140 155 140 C155 140 140 125 140 110 Z" fill="#2E86AB"/>
      <path d="M225 110 C225 90 260 90 260 110 C260 125 245 140 245 140 C245 140 225 125 225 110 Z" fill="#38A3A5"/>
      <rect x="130" y="150" width="140" height="24" rx="12" fill="#FFFFFF"/>
      <circle cx="150" cy="162" r="4" fill="#38A3A5"/>
      <circle cx="170" cy="162" r="4" fill="#38A3A5"/>
      <circle cx="190" cy="162" r="4" fill="#38A3A5"/>
    </svg>`
  },
  {
    id: 3,
    categoryKey: 'conflict',
    categoryName: { fr: 'Conflits', en: 'Conflicts' },
    bgColor: '#FFF4D6',
    accentColor: '#DDA15E',
    readTime: { fr: '6 min', en: '6 min' },
    date: { fr: '5 sept. 2026', en: 'Sept 5, 2026' },
    title: {
      fr: "Gérer les conflits financiers en couple",
      en: "Managing financial conflicts"
    },
    excerpt: {
      fr: "L'argent est la première cause de dispute. Voici comment aborder sereinement le budget commun et les visions de l'épargne.",
      en: "Money is the #1 cause of arguments. Here's how to serenely discuss joint budgets and saving habits."
    },
    content: {
      fr: "Derrière les chiffres se cachent des croyances profondément ancrées liées à l'éducation, à la sécurité et à la liberté personnelle. Un partenaire panier-percé et un partenaire écureuil ne sont pas incompatibles, mais ils doivent établir des règles transparentes : un compte commun pour les charges fixes, des comptes individuels inviolables pour les plaisirs personnels, et des bilans budgétaires mensuels sans reproches.",
      en: "Beneath balance sheets lie deep psychological beliefs regarding safety, status, and freedom. A spender and a saver are not inherently incompatible, provided clear guardrails exist: a joint account for mutual living costs, separate personal discretion funds, and monthly money check-ins conducted in calm empathy rather than scrutiny."
    },
    illustrationSvg: `<svg viewBox="0 0 400 250" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="250" fill="#FFF4D6"/>
      <circle cx="200" cy="125" r="70" fill="#FFF9E8"/>
      <circle cx="200" cy="120" r="40" fill="#F4A261"/>
      <text x="190" y="130" font-family="Poppins, sans-serif" font-size="28" font-weight="700" fill="#FFFFFF">€</text>
      <circle cx="135" cy="150" r="22" fill="#E76F51"/>
      <circle cx="265" cy="150" r="22" fill="#E76F51"/>
      <path d="M185 70 L215 70" stroke="#DDA15E" stroke-width="4" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 4,
    categoryKey: 'couple',
    categoryName: { fr: 'Vie de couple', en: 'Couple life' },
    bgColor: '#D6FFE4',
    accentColor: '#2A9D8F',
    readTime: { fr: '4 min', en: '4 min' },
    date: { fr: '1 sept. 2026', en: 'Sept 1, 2026' },
    title: {
      fr: "L'importance du temps de qualité",
      en: "The importance of quality time"
    },
    excerpt: {
      fr: "Dans un monde hyperconnecté, comment préserver des moments privilégiés à deux loin des écrans et du stress quotidien.",
      en: "In a connected world, how to preserve precious one-on-one moments away from screens and daily stress."
    },
    content: {
      fr: "Être dans la même pièce les yeux rivés sur son smartphone n'est pas être ensemble. Le véritable temps de qualité implique une présence totale, une écoute active et le partage d'une expérience commune (cuisiner une nouvelle recette, se promener sans montre, s'interroger avec des questions de quiz complices). Vingt minutes d'attention ininterrompue valent mieux que quatre heures de cohabitation distraite.",
      en: "Sitting in the same living room with eyes glued to screens does not equate to intimacy. True quality time requires full cognitive presence, attentive listening, and shared vulnerability. Twenty minutes of intentional, device-free conversation foster more connection than hours of distracted coexistence."
    },
    illustrationSvg: `<svg viewBox="0 0 400 250" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="250" fill="#D6FFE4"/>
      <ellipse cx="200" cy="135" rx="85" ry="60" fill="#E8FFF0"/>
      <circle cx="160" cy="115" r="24" fill="#52B788"/>
      <circle cx="240" cy="115" r="24" fill="#2D6A4F"/>
      <path d="M190 145 Q200 135 210 145" stroke="#1B4332" stroke-width="3" stroke-linecap="round"/>
      <path d="M200 80 Q210 90 200 100 Q190 90 200 80 Z" fill="#FF6B8A"/>
    </svg>`
  },
  {
    id: 5,
    categoryKey: 'psychology',
    categoryName: { fr: 'Psychologie', en: 'Psychology' },
    bgColor: '#E8D6FF',
    accentColor: '#7209B7',
    readTime: { fr: '8 min', en: '8 min' },
    date: { fr: '25 août 2026', en: 'Aug 25, 2026' },
    title: {
      fr: "Comprendre l'attachement émotionnel",
      en: "Understanding emotional attachment"
    },
    excerpt: {
      fr: "Les 4 styles d'attachement et leur impact sur vos relations : sécurisant, anxieux, évitant ou désorganisé.",
      en: "The 4 attachment styles and their impact on your relationships: secure, anxious, avoidant, or disorganized."
    },
    content: {
      fr: "Hérités de notre enfance et modulés par nos expériences amoureuses passées, les styles d'attachement dictent nos réflexes face à l'intimité et à la distance. Quand un profil anxieux (qui craint l'abandon) rencontre un profil évitant (qui redoute l'étouffement), une danse épuisante s'installe. Décrypter ces mécanismes permet de désamorcer l'angoisse et de construire un havre sécurisant à deux.",
      en: "Rooted in early childhood and early romantic experiences, attachment styles govern our instinctive reactions to proximity and separation. When an anxious partner (fearing withdrawal) meets an avoidant partner (fearing engulfment), an exhausting chase ensues. Naming these dynamics allows couples to replace panic with mutual emotional reassurance."
    },
    illustrationSvg: `<svg viewBox="0 0 400 250" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="250" fill="#E8D6FF"/>
      <circle cx="200" cy="125" r="70" fill="#F4EBFF"/>
      <path d="M170 120 C160 90 200 80 200 110 C200 80 240 90 230 120 C220 150 200 160 200 160 C200 160 180 150 170 120 Z" fill="#9D4EDD"/>
      <circle cx="140" cy="85" r="14" fill="#C77DFF"/>
      <circle cx="260" cy="85" r="14" fill="#C77DFF"/>
      <path d="M140 100 Q170 130 200 110 Q230 130 260 100" stroke="#7B2CBF" stroke-width="2.5" stroke-dasharray="4 4" fill="none"/>
    </svg>`
  },
  {
    id: 6,
    categoryKey: 'couple',
    categoryName: { fr: 'Vie de couple', en: 'Couple life' },
    bgColor: '#FFE4EC',
    accentColor: '#E63946',
    readTime: { fr: '5 min', en: '5 min' },
    date: { fr: '20 août 2026', en: 'Aug 20, 2026' },
    title: {
      fr: "Raviver la flamme après des années",
      en: "Rekindling the flame after years"
    },
    excerpt: {
      fr: "10 idées concrètes pour retrouver la complicité, casser la routine et réenchanter le quotidien amoureux.",
      en: "10 concrete ideas to rediscover complicity, break routines, and rekindle everyday romance."
    },
    content: {
      fr: "La passion initiale laisse naturellement place à l'attachement compagnon. Pour entretenir le désir, il est indispensable d'introduire de la nouveauté partagée : planifier des rendez-vous surprises où l'un choisit l'activité sans rien révéler, réinstaurer le baiser conscient de 6 secondes, voyager dans des lieux inconnus et continuer à se poser des questions intimes inédites.",
      en: "Initial infatuation naturally evolves into companionate love. Sustaining attraction demands deliberate novelty: surprise dates organized entirely by one partner, mindful 6-second morning embraces, exploring unfamiliar destinations, and continuously updating your mental map of each other's dreams."
    },
    illustrationSvg: `<svg viewBox="0 0 400 250" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="250" fill="#FFE4EC"/>
      <circle cx="200" cy="130" r="65" fill="#FFF0F5"/>
      <path d="M200 75 C215 100 235 120 220 155 C210 170 190 170 180 155 C165 120 185 100 200 75 Z" fill="#FF4D6D"/>
      <path d="M200 110 C208 125 218 135 210 155 C205 162 195 162 190 155 C182 135 192 125 200 110 Z" fill="#FFB703"/>
    </svg>`
  },
  {
    id: 7,
    categoryKey: 'psychology',
    categoryName: { fr: 'Psychologie', en: 'Psychology' },
    bgColor: '#FFD6D6',
    accentColor: '#D90429',
    readTime: { fr: '9 min', en: '9 min' },
    date: { fr: '15 août 2026', en: 'Aug 15, 2026' },
    title: {
      fr: "Les signes d'une relation toxique",
      en: "Signs of a toxic relationship"
    },
    excerpt: {
      fr: "Comment identifier les drapeaux rouges avant qu'il ne soit trop tard et préserver son équilibre psychologique.",
      en: "How to identify red flags before it's too late and protect your psychological wellbeing."
    },
    content: {
      fr: "Un lien sain apporte apaisement et sécurité. Si vous marchez continuellement sur des œufs, si vos émotions sont systématiquement minimisées (gaslighting), si votre cercle social est lentement isolé ou si les reproches remplacent l'écoute, il est primordial de faire un pas de côté. Apprendre à distinguer un conflit passager d'une dynamique de contrôle est vital.",
      en: "Healthy love brings emotional calm and clarity. If you perpetually walk on eggshells, experience constant invalidation (gaslighting), or find your social circle subtly pruned away, taking a clear-eyed step back is essential. Discerning between normal growing pains and chronic toxic patterns is crucial to safeguarding your wellbeing."
    },
    illustrationSvg: `<svg viewBox="0 0 400 250" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="250" fill="#FFD6D6"/>
      <ellipse cx="200" cy="130" rx="80" ry="60" fill="#FFF0F0"/>
      <path d="M165 160 L165 90 L225 110 L165 130 Z" fill="#D90429"/>
      <rect x="160" y="90" width="5" height="85" fill="#2B2D42" rx="2"/>
      <circle cx="250" cy="120" r="18" fill="#EF233C" opacity="0.3"/>
    </svg>`
  },
  {
    id: 8,
    categoryKey: 'communication',
    categoryName: { fr: 'Communication', en: 'Communication' },
    bgColor: '#D6F0FF',
    accentColor: '#0077B6',
    readTime: { fr: '6 min', en: '6 min' },
    date: { fr: '10 août 2026', en: 'Aug 10, 2026' },
    title: {
      fr: "Comment poser les bonnes questions",
      en: "How to ask the right questions"
    },
    excerpt: {
      fr: "Les questions qui renforcent l'intimité et la compréhension mutuelle, pour aller au-delà du classique 'comment s'est passée ta journée ?'.",
      en: "Questions that strengthen intimacy and mutual understanding, going far beyond the usual 'how was your day?'."
    },
    content: {
      fr: "Remplacer le prévisible « Ça va ? » par des interrogations ouvertes stimule immédiatement la connexion neuronale et émotionnelle. Essayez : « Quel a été ton moment le plus inspirant cette semaine ? », « Y a-t-il un rêve secret que tu n'oses pas encore formuler ? » ou « De quoi aurais-tu besoin ce soir pour te sentir pleinement détendu(e) ? ». Vous redécouvrirez votre partenaire sous un jour fascinant.",
      en: "Replacing repetitive autopilot banter with thoughtful inquiries instantly shifts relational depth. Try asking: 'What energized you the most this week?', 'What is a personal aspiration you have hesitated to speak aloud?', or 'How can I support your peace of mind tonight?'. Deep questions cultivate lifelong curiosity."
    },
    illustrationSvg: `<svg viewBox="0 0 400 250" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="250" fill="#D6F0FF"/>
      <circle cx="200" cy="125" r="70" fill="#E8F4F8"/>
      <text x="180" y="145" font-family="Poppins, sans-serif" font-size="64" font-weight="700" fill="#0077B6">?</text>
      <circle cx="140" cy="80" r="10" fill="#90E0EF"/>
      <circle cx="260" cy="90" r="12" fill="#00B4D8"/>
    </svg>`
  },
  {
    id: 9,
    categoryKey: 'couple',
    categoryName: { fr: 'Vie de couple', en: 'Couple life' },
    bgColor: '#FFF4D6',
    accentColor: '#FB8500',
    readTime: { fr: '7 min', en: '7 min' },
    date: { fr: '5 août 2026', en: 'Aug 5, 2026' },
    title: {
      fr: "L'équilibre vie pro / vie de couple",
      en: "Work-life / couple-life balance"
    },
    excerpt: {
      fr: "Télétravail, horaires chargés : comment préserver son couple sans sacrifier ses ambitions professionnelles.",
      en: "Remote work, busy schedules: how to preserve your relationship without sacrificing professional ambitions."
    },
    content: {
      fr: "Lorsque la frontière entre le bureau et le salon s'estompe, la relation risque d'hériter uniquement des restes d'énergie mentale en fin de journée. Instaurez un rituel de sas de décompression (fermer son ordinateur à heure fixe, marcher dix minutes avant de se retrouver), sanctuarisez au moins un soir par semaine exclusivement dédié au couple, et valorisez mutuellement vos succès.",
      en: "When professional demands bleed indiscriminately into domestic hours, romantic partnerships receive only leftover emotional scraps. Cultivate a firm transition ritual (shutting laptops at a designated time, taking a short outdoor walk before reuniting), fiercely protect a weekly date night, and celebrate each other's career milestones."
    },
    illustrationSvg: `<svg viewBox="0 0 400 250" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="250" fill="#FFF4D6"/>
      <ellipse cx="200" cy="135" rx="85" ry="60" fill="#FFFBF0"/>
      <rect x="140" y="105" width="45" height="35" rx="6" fill="#023047"/>
      <path d="M225 110 C225 95 245 95 245 110 C245 125 235 135 235 135 C235 135 225 125 225 110 Z" fill="#FB8500"/>
      <line x1="130" y1="155" x2="270" y2="155" stroke="#FB8500" stroke-width="3" stroke-linecap="round"/>
    </svg>`
  }
];

// Dictionnaire de traductions bilingues
const BLOG_I18N = {
  fr: {
    navHome: "Accueil",
    navQuiz: "Quiz de couple",
    navTools: "Outils d’amour",
    navBlog: "Blog",
    langSwitch: "EN",
    headerCta: "Lancer le test",
    heroTitle: "Nos <span class='text-coral'>Articles & Conseils</span>",
    heroSubtitle: "Tout pour comprendre et améliorer votre relation",
    searchPlaceholder: "Rechercher un article...",
    allCategories: "Tous",
    filterCommunication: "Communication",
    filterConflicts: "Conflits",
    filterIntimacy: "Intimité",
    filterCouple: "Vie de couple",
    filterPsychology: "Psychologie",
    filterSexuality: "Sexualité",
    filterFamily: "Famille",
    readMore: "Lire la suite →",
    readTimePrefix: "",
    prevPage: "← Précédent",
    nextPage: "Suivant →",
    emptyTitle: "Aucun article trouvé",
    emptyDesc: "Essayez de modifier vos critères de recherche ou réinitialisez le filtre de catégorie.",
    resetFilter: "Réinitialiser les filtres",
    ctaTitle: "Vous avez <span class='highlight'>aimé</span> ces articles ?",
    ctaSubtitle: "Testez votre compatibilité avec notre quiz gratuit",
    ctaBtn: "Lancer le quiz",
    footerDesc: "LoveQuiz est le compagnon relationnel nouvelle génération, conçu pour renforcer la complicité et nourrir le dialogue au sein des couples du monde entier.",
    footerCol1: "Navigation",
    footerCol2: "Outils & Légal",
    footerLoveLang: "5 Langages d’amour",
    footerDateGen: "Générateur de dates",
    footerMentions: "Mentions légales",
    footerPrivacy: "Confidentialité RGPD",
    footerColNewsletter: "Newsletter Douceur",
    newsletterDesc: "Recevez une question complice et une idée de date chaque dimanche matin.",
    btnSubscribe: "S’inscrire",
    footerRights: "Tous droits réservés."
  },
  en: {
    navHome: "Home",
    navQuiz: "Couple Quiz",
    navTools: "Love Tools",
    navBlog: "Blog",
    langSwitch: "FR",
    headerCta: "Start Quiz",
    heroTitle: "Our <span class='text-coral'>Articles & Tips</span>",
    heroSubtitle: "Everything to understand and improve your relationship",
    searchPlaceholder: "Search an article...",
    allCategories: "All",
    filterCommunication: "Communication",
    filterConflicts: "Conflicts",
    filterIntimacy: "Intimacy",
    filterCouple: "Couple life",
    filterPsychology: "Psychology",
    filterSexuality: "Sexuality",
    filterFamily: "Family",
    readMore: "Read more →",
    readTimePrefix: "",
    prevPage: "← Previous",
    nextPage: "Next →",
    emptyTitle: "No articles found",
    emptyDesc: "Try modifying your search criteria or reset your category filter.",
    resetFilter: "Reset filters",
    ctaTitle: "You <span class='highlight'>liked</span> these articles?",
    ctaSubtitle: "Test your compatibility with our free quiz",
    ctaBtn: "Start the quiz",
    footerDesc: "LoveQuiz is the modern relational companion crafted to nurture intimacy, deep communication, and joy for couples worldwide.",
    footerCol1: "Navigation",
    footerCol2: "Tools & Legal",
    footerLoveLang: "5 Love Languages",
    footerDateGen: "Date Idea Generator",
    footerMentions: "Legal Notice",
    footerPrivacy: "Privacy Policy",
    footerColNewsletter: "Sweet Sunday Newsletter",
    newsletterDesc: "Get a thoughtful intimacy question and a cute date idea every Sunday morning.",
    btnSubscribe: "Subscribe",
    footerRights: "All rights reserved."
  }
};

// État de l'application Blog
let currentLang = 'fr';
let currentCategory = 'all';
let currentSearch = '';
let currentPage = 1;
const ITEMS_PER_PAGE = 6;

/**
 * Initialisation
 */
function initBlog() {
  // Récupérer la langue préférée
  try {
    const saved = localStorage.getItem('language') || localStorage.getItem('lovequiz_lang');
    if (saved === 'en' || saved === 'fr') {
      currentLang = saved;
    }
  } catch (e) {}

  // Vérifier si un filtre de catégorie est passé dans l'URL (?category=communication)
  try {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('category');
    if (cat) {
      currentCategory = cat.toLowerCase();
      document.querySelectorAll('.filter-pill').forEach(b => {
        b.classList.toggle('active', (b.getAttribute('data-category') || '').toLowerCase() === currentCategory);
      });
    }
  } catch (e) {}

  updateLanguageUI();
  setupEventListeners();
  renderArticles();
}

/**
 * Met à jour tous les éléments textuels avec data-i18n
 */
function updateLanguageUI() {
  const dict = BLOG_I18N[currentLang] || BLOG_I18N.fr;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      if (key === 'heroTitle' || key === 'ctaTitle') {
        el.innerHTML = dict[key];
      } else {
        el.textContent = dict[key];
      }
    }
  });

  // Mise à jour de l'input search
  const searchInput = document.getElementById('blog-search-input');
  if (searchInput) {
    searchInput.placeholder = dict.searchPlaceholder;
  }

  // Mise à jour du bouton langue
  const flagEl = document.getElementById('lang-flag');
  const codeEl = document.getElementById('lang-code');
  if (flagEl) flagEl.textContent = currentLang === 'fr' ? '🇫🇷' : '🇬🇧';
  if (codeEl) codeEl.textContent = currentLang.toUpperCase();
}

/**
 * Bascule la langue
 */
function toggleLanguage() {
  currentLang = currentLang === 'fr' ? 'en' : 'fr';
  try {
    localStorage.setItem('language', currentLang);
    localStorage.setItem('lovequiz_lang', currentLang);
  } catch (e) {}
  updateLanguageUI();
  renderArticles();
}

/**
 * Attache les écouteurs d'événements
 */
function setupEventListeners() {
  // Langue
  const langBtn = document.getElementById('lang-toggle-btn');
  if (langBtn) {
    langBtn.addEventListener('click', toggleLanguage);
  }

  // Filtres
  document.querySelectorAll('.filter-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-category') || 'all';
      currentPage = 1;
      renderArticles();
    });
  });

  // Recherche
  const searchInput = document.getElementById('blog-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.trim().toLowerCase();
      currentPage = 1;
      renderArticles();
    });
  }

  // Newsletter
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = currentLang === 'fr' ? 'Merci pour votre inscription !' : 'Thank you for subscribing!';
      alert(msg);
      newsletterForm.reset();
    });
  }

  // Fermeture modale
  const modal = document.getElementById('article-modal');
  const modalClose = document.getElementById('modal-close-btn');
  if (modalClose && modal) {
    modalClose.addEventListener('click', () => {
      modal.classList.remove('active');
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }
}

/**
 * Rendu des cartes d'articles avec filtrage et pagination
 */
function renderArticles() {
  const grid = document.getElementById('articles-grid');
  const paginationWrap = document.getElementById('pagination-wrap');
  const dict = BLOG_I18N[currentLang];

  if (!grid) return;

  // Filtrage combiné (catégorie + recherche texte)
  const filtered = BLOG_ARTICLES.filter(article => {
    const matchCat = (currentCategory === 'all') || (article.categoryKey === currentCategory);
    const titleText = (article.title[currentLang] || article.title.fr).toLowerCase();
    const excerptText = (article.excerpt[currentLang] || article.excerpt.fr).toLowerCase();
    const matchSearch = !currentSearch || titleText.includes(currentSearch) || excerptText.includes(currentSearch);
    return matchCat && matchSearch;
  });

  // Gestion du cas vide
  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🔍</div>
        <h3 class="empty-state-title">${dict.emptyTitle}</h3>
        <p class="empty-state-desc">${dict.emptyDesc}</p>
        <button class="filter-pill active" onclick="resetSearchAndFilter()">${dict.resetFilter}</button>
      </div>
    `;
    if (paginationWrap) paginationWrap.innerHTML = '';
    return;
  }

  // Calcul pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  if (currentPage > totalPages) currentPage = totalPages;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginated = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Rendu des cartes
  grid.innerHTML = '';
  paginated.forEach((article, idx) => {
    const card = document.createElement('article');
    card.className = 'article-card';
    card.id = `article-card-${article.id}`;
    card.style.animation = `slideUp 0.3s ease forwards ${idx * 0.08}s`;

    const catName = article.categoryName[currentLang] || article.categoryName.fr;
    const dateStr = article.date[currentLang] || article.date.fr;
    const readTimeStr = article.readTime[currentLang] || article.readTime.fr;
    const titleStr = article.title[currentLang] || article.title.fr;
    const excerptStr = article.excerpt[currentLang] || article.excerpt.fr;

    card.innerHTML = `
      <div class="card-image-wrap" style="background-color: ${article.bgColor};">
        <span class="card-badge">${catName}</span>
        ${article.illustrationSvg}
      </div>
      <div class="card-body">
        <div>
          <h3 class="card-title">${titleStr}</h3>
          <p class="card-excerpt">${excerptStr}</p>
        </div>
        <div>
          <div class="card-meta">
            <span class="meta-item"><i class="fa-regular fa-calendar"></i> ${dateStr}</span>
            <span class="meta-item"><i class="fa-regular fa-clock"></i> ${readTimeStr}</span>
          </div>
          <a class="card-link" href="article.html?id=${article.id}">${dict.readMore}</a>
        </div>
      </div>
    `;

    card.addEventListener('click', (e) => {
      // Si on clique sur un lien ou un bouton, laisser le comportement par défaut
      if (e.target.closest('a') || e.target.closest('button')) return;
      window.location.href = `article.html?id=${article.id}`;
    });

    grid.appendChild(card);
  });

  // Rendu pagination
  renderPagination(totalPages);
}

/**
 * Rendu des boutons de pagination
 */
function renderPagination(totalPages) {
  const wrap = document.getElementById('pagination-wrap');
  const dict = BLOG_I18N[currentLang];
  if (!wrap) return;

  if (totalPages <= 1) {
    wrap.innerHTML = '';
    return;
  }

  let html = '';

  // Bouton Précédent
  html += `
    <button class="page-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="goToPage(${currentPage - 1})">
      ${dict.prevPage}
    </button>
  `;

  // Numéros de page
  for (let i = 1; i <= totalPages; i++) {
    html += `
      <button class="page-btn ${currentPage === i ? 'active' : ''}" onclick="goToPage(${i})">
        ${i}
      </button>
    `;
  }

  // Bouton Suivant
  html += `
    <button class="page-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="goToPage(${currentPage + 1})">
      ${dict.nextPage}
    </button>
  `;

  wrap.innerHTML = html;
}

function goToPage(page) {
  currentPage = page;
  renderArticles();
  const section = document.getElementById('articles-section');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function resetSearchAndFilter() {
  currentSearch = '';
  currentCategory = 'all';
  currentPage = 1;
  const searchInput = document.getElementById('blog-search-input');
  if (searchInput) searchInput.value = '';
  document.querySelectorAll('.filter-pill').forEach(b => {
    b.classList.toggle('active', (b.getAttribute('data-category') || 'all') === 'all');
  });
  renderArticles();
}

/**
 * Affiche la modale de lecture complète d'un article
 */
function openArticleModal(article) {
  const modal = document.getElementById('article-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalMeta = document.getElementById('modal-meta');
  const modalBadge = document.getElementById('modal-badge');
  const modalContent = document.getElementById('modal-content');

  if (!modal) return;

  const catName = article.categoryName[currentLang] || article.categoryName.fr;
  const titleStr = article.title[currentLang] || article.title.fr;
  const dateStr = article.date[currentLang] || article.date.fr;
  const readTimeStr = article.readTime[currentLang] || article.readTime.fr;
  const contentStr = article.content[currentLang] || article.content.fr;
  const excerptStr = article.excerpt[currentLang] || article.excerpt.fr;

  if (modalBadge) modalBadge.textContent = catName;
  if (modalTitle) modalTitle.textContent = titleStr;
  if (modalMeta) {
    modalMeta.textContent = `${dateStr} • ${readTimeStr}`;
  }
  if (modalContent) {
    modalContent.innerHTML = `
      <div class="modal-quote">« ${excerptStr} »</div>
      <p>${contentStr}</p>
      <div class="modal-takeaway-box">
        <h4 style="font-weight:600;margin-bottom:8px;color:#FF6B8A;">
          ${currentLang === 'fr' ? '💡 Point clé à retenir' : '💡 Key takeaway'}
        </h4>
        <p style="font-size:14px;color:#555;">
          ${currentLang === 'fr' 
            ? 'La régularité et la bienveillance dans les petits gestes quotidiens fondent la solidité d’un couple durable.'
            : 'Consistency and kindness in small everyday actions form the foundation of a lasting partnership.'}
        </p>
      </div>
    `;
  }

  modal.classList.add('active');
}

// Initialisation au chargement du DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBlog);
} else {
  initBlog();
}
