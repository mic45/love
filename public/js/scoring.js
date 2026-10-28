/**
 * LoveQuiz — Système de Scoring, Interprétation et Affichage des Résultats
 * Fichier : js/scoring.js
 * 
 * Gère le calcul des scores, la détection des points forts / axes d'amélioration,
 * l'animation SVG du score, le rendu graphique des catégories, le partage et la persistance.
 */

// =========================================================================
// PARTIE 1 : ALGORITHME DE CALCUL
// =========================================================================

/**
 * Calcule le score global et la répartition par catégorie
 * @param {Array<{questionId: number, optionId?: string, score: number}>} answers - Réponses fournies
 * @param {Array<Object>} questions - Banque complète ou sous-ensemble des questions
 * @returns {{total: number, categories: Object<string, number>, totalScore: number, maxTotalScore: number}}
 */
function calculateScore(answers, questions) {
  if (!answers || !Array.isArray(answers) || answers.length === 0) {
    return {
      total: 0,
      categories: {},
      totalScore: 0,
      maxTotalScore: 0
    };
  }

  // Si aucune liste de questions n'est passée, essayer d'utiliser la globale window.questions
  const qList = (questions && Array.isArray(questions) && questions.length > 0)
    ? questions
    : (typeof window !== 'undefined' && window.questions ? window.questions : []);

  const totalQuestions = answers.length;
  const maxScorePerQuestion = 3;
  const maxTotalScore = totalQuestions * maxScorePerQuestion;

  let totalScore = 0;
  const categoryScores = {};
  const categoryMaxScores = {};

  // Calcul des scores cumulés
  answers.forEach(answer => {
    const question = qList.find(q => q.id === answer.questionId);
    const category = (question && question.category) ? question.category : 'general';

    if (!categoryScores[category]) {
      categoryScores[category] = 0;
      categoryMaxScores[category] = 0;
    }

    const s = typeof answer.score === 'number' ? answer.score : 0;
    totalScore += s;
    categoryScores[category] += s;
    categoryMaxScores[category] += maxScorePerQuestion;
  });

  // Calcul du pourcentage total
  const totalPercentage = maxTotalScore > 0 ? Math.round((totalScore / maxTotalScore) * 100) : 0;

  // Calcul des pourcentages par catégorie
  const categoryPercentages = {};
  Object.keys(categoryScores).forEach(category => {
    const maxCat = categoryMaxScores[category] || 1;
    categoryPercentages[category] = Math.round((categoryScores[category] / maxCat) * 100);
  });

  return {
    total: totalPercentage,
    categories: categoryPercentages,
    totalScore,
    maxTotalScore
  };
}

/**
 * Récupère l'interprétation qualitative bilingue selon le pourcentage obtenu
 * @param {number} score - Pourcentage global (0-100)
 * @returns {{title: string, message: string, color: string}}
 */
function getInterpretation(score) {
  const interpretations = {
    fr: {
      low: {
        title: "Relation à travailler",
        message: "Votre compatibilité présente des défis importants. Cela ne signifie pas que votre relation est condamnée, mais qu'elle nécessite du travail et de la communication.",
        color: "#FF4444"
      },
      medium: {
        title: "Compatibilité moyenne",
        message: "Vous avez une base solide mais certains aspects méritent attention. La communication ouverte vous aidera à renforcer votre lien.",
        color: "#FFA500"
      },
      good: {
        title: "Bonne compatibilité",
        message: "Vous partagez de nombreux points communs et valeurs. Continuez à nourrir votre relation avec attention et bienveillance.",
        color: "#4CAF50"
      },
      excellent: {
        title: "Match exceptionnel",
        message: "Félicitations ! Votre compatibilité est remarquable. Vous partagez des valeurs, une vision et une communication qui sont les piliers d'une relation épanouie.",
        color: "#FF6B8A"
      }
    },
    en: {
      low: {
        title: "Relationship needs work",
        message: "Your compatibility shows significant challenges. This doesn't mean your relationship is doomed, but it requires work and communication.",
        color: "#FF4444"
      },
      medium: {
        title: "Average compatibility",
        message: "You have a solid foundation but some aspects need attention. Open communication will help strengthen your bond.",
        color: "#FFA500"
      },
      good: {
        title: "Good compatibility",
        message: "You share many common points and values. Continue to nurture your relationship with care and kindness.",
        color: "#4CAF50"
      },
      excellent: {
        title: "Exceptional match",
        message: "Congratulations! Your compatibility is remarkable. You share values, vision, and communication that are the pillars of a fulfilling relationship.",
        color: "#FF6B8A"
      }
    }
  };

  let lang = 'fr';
  try {
    lang = localStorage.getItem('language') || localStorage.getItem('lovequiz_lang') || 'fr';
  } catch (e) {
    lang = 'fr';
  }
  if (lang !== 'fr' && lang !== 'en') lang = 'fr';

  if (score < 40) return interpretations[lang].low;
  if (score < 60) return interpretations[lang].medium;
  if (score < 80) return interpretations[lang].good;
  return interpretations[lang].excellent;
}

/**
 * Génère les 3 points forts majeurs et les 3 axes d'amélioration prioritaires
 * @param {Object<string, number>} categoryScores - Scores en % par catégorie
 * @returns {{strengths: Array<{category: string, score: number, text: string}>, weaknesses: Array<{category: string, score: number, text: string}>}}
 */
function generateStrengthsAndWeaknesses(categoryScores) {
  let lang = 'fr';
  try {
    lang = localStorage.getItem('language') || localStorage.getItem('lovequiz_lang') || 'fr';
  } catch (e) {
    lang = 'fr';
  }
  if (lang !== 'fr' && lang !== 'en') lang = 'fr';

  const categoryNames = {
    fr: {
      communication: "Communication",
      values: "Valeurs",
      intimacy: "Intimité",
      conflict: "Gestion des conflits",
      future: "Projets d'avenir",
      daily: "Vie quotidienne",
      money: "Argent",
      family: "Famille",
      hobbies: "Loisirs",
      spirituality: "Spiritualité"
    },
    en: {
      communication: "Communication",
      values: "Values",
      intimacy: "Intimacy",
      conflict: "Conflict management",
      future: "Future plans",
      daily: "Daily life",
      money: "Money",
      family: "Family",
      hobbies: "Hobbies",
      spirituality: "Spirituality"
    }
  };

  const entries = Object.entries(categoryScores || {});
  if (entries.length === 0) {
    return { strengths: [], weaknesses: [] };
  }

  // Trie les catégories par score décroissant
  const sorted = entries.sort((a, b) => b[1] - a[1]);

  // 3 points forts (meilleurs scores)
  const strengthsCount = Math.min(3, sorted.length);
  const strengths = sorted.slice(0, strengthsCount).map(([category, score]) => {
    const rawName = (categoryNames[lang] && categoryNames[lang][category]) || category;
    return {
      category: rawName,
      score,
      text: lang === 'fr'
        ? `Votre ${rawName.toLowerCase()} est un point fort (${score}%)`
        : `Your ${rawName.toLowerCase()} is a strength (${score}%)`
    };
  });

  // 3 points à améliorer (moins bons scores)
  const weaknessesCount = Math.min(3, sorted.length);
  const weaknesses = sorted.slice(-weaknessesCount).reverse().map(([category, score]) => {
    const rawName = (categoryNames[lang] && categoryNames[lang][category]) || category;
    return {
      category: rawName,
      score,
      text: lang === 'fr'
        ? `La ${rawName.toLowerCase()} mérite attention (${score}%)`
        : `${rawName} needs attention (${score}%)`
    };
  });

  return { strengths, weaknesses };
}

// =========================================================================
// PARTIE 2 : AFFICHAGE DES RÉSULTATS
// =========================================================================

/**
 * Affiche l'écran des résultats complets avec animations
 * @param {{total: number, categories: Object<string, number>}} scoreData 
 * @param {string} partnerNames - Prénoms des partenaires (ex: "Alex & Sam")
 */
function displayResults(scoreData, partnerNames) {
  let lang = 'fr';
  try {
    lang = localStorage.getItem('language') || localStorage.getItem('lovequiz_lang') || 'fr';
  } catch (e) {
    lang = 'fr';
  }
  if (lang !== 'fr' && lang !== 'en') lang = 'fr';

  const interpretation = getInterpretation(scoreData.total);
  const { strengths, weaknesses } = generateStrengthsAndWeaknesses(scoreData.categories);

  // Masquer les sections de quiz et afficher les résultats (compatibilité double ID)
  const quizSection = document.getElementById('quiz-section') || document.getElementById('section-quiz');
  if (quizSection) quizSection.style.display = 'none';

  const introSection = document.getElementById('intro-section') || document.getElementById('section-intro');
  if (introSection) introSection.style.display = 'none';

  const configSection = document.getElementById('config-section') || document.getElementById('section-config');
  if (configSection) configSection.style.display = 'none';

  const resultsSection = document.getElementById('results-section') || document.getElementById('section-results');
  if (resultsSection) resultsSection.style.display = 'block';

  // Mise à jour du titre et des prénoms
  const titleEl = document.getElementById('result-title');
  if (titleEl) {
    titleEl.textContent = lang === 'fr' ? 'Votre compatibilité' : 'Your compatibility';
  }

  const namesEl = document.getElementById('result-names') || document.getElementById('results-names-label');
  if (namesEl) {
    namesEl.textContent = partnerNames || (lang === 'fr' ? 'Vous & Votre partenaire' : 'You & Your partner');
  }

  // Animation du cercle de score
  animateScoreCircle(scoreData.total, interpretation.color);

  // Affichage des barres de catégorie (top 5 ordonné)
  const sortedCategories = Object.entries(scoreData.categories || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const categoryContainer = document.getElementById('category-bars') || document.getElementById('result-category-bars');
  if (categoryContainer) {
    categoryContainer.innerHTML = '';
    sortedCategories.forEach(([category, score]) => {
      const bar = createCategoryBar(category, score, lang);
      categoryContainer.appendChild(bar);
    });
  }

  // Rendu de l'interprétation
  const interpTitleEl = document.getElementById('interpretation-title') || document.getElementById('result-interp-title');
  if (interpTitleEl) {
    interpTitleEl.textContent = interpretation.title;
    interpTitleEl.style.color = interpretation.color;
  }

  const interpMsgEl = document.getElementById('interpretation-message') || document.getElementById('result-interp-message');
  if (interpMsgEl) {
    interpMsgEl.textContent = interpretation.message;
  }

  // Rendu des points forts
  const strengthsContainer = document.getElementById('strengths-list') || document.getElementById('result-strengths');
  if (strengthsContainer) {
    strengthsContainer.innerHTML = '';
    strengths.forEach(s => {
      const li = document.createElement('li');
      li.className = 'strength-item';
      li.innerHTML = `<span class="icon" style="margin-right: 8px;">✅</span><span>${s.text}</span>`;
      strengthsContainer.appendChild(li);
    });
  }

  // Rendu des points à améliorer
  const weaknessesContainer = document.getElementById('weaknesses-list') || document.getElementById('result-improvements');
  if (weaknessesContainer) {
    weaknessesContainer.innerHTML = '';
    weaknesses.forEach(w => {
      const li = document.createElement('li');
      li.className = 'weakness-item';
      li.innerHTML = `<span class="icon" style="margin-right: 8px;">💡</span><span>${w.text}</span>`;
      weaknessesContainer.appendChild(li);
    });
  }

  // Scroll fluide vers la section des résultats
  if (resultsSection) {
    resultsSection.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * Anime la jauge circulaire SVG avec une courbe d'accélération fluide (ease-out cubic)
 * @param {number} percentage - Pourcentage cible (0-100)
 * @param {string} color - Couleur hexadécimale associée
 */
function animateScoreCircle(percentage, color) {
  const circle = document.getElementById('score-circle') ||
                 document.getElementById('result-svg-circle') ||
                 document.querySelector('.circle-progress');

  const textEl = document.getElementById('score-percentage') ||
                 document.getElementById('result-score-number');

  if (!circle) {
    if (textEl) {
      textEl.textContent = `${percentage}%`;
      textEl.style.color = color;
    }
    return;
  }

  // Calcul du rayon et du périmètre
  const rVal = (circle.r && circle.r.baseVal) ? circle.r.baseVal.value : 80;
  const circumference = rVal * 2 * Math.PI;

  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = circumference;
  circle.style.stroke = color;

  const targetOffset = circumference - (percentage / 100) * circumference;

  let start = null;
  const duration = 2000;

  function animate(timestamp) {
    if (!start) start = timestamp;
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3); // ease-out cubic

    const currentOffset = circumference - ((circumference - targetOffset) * easeProgress);
    circle.style.strokeDashoffset = currentOffset;

    if (textEl) {
      const currentPercentage = Math.round(easeProgress * percentage);
      textEl.textContent = `${currentPercentage}%`;
      if (textEl.tagName === 'text') {
        textEl.style.fill = color;
      } else {
        textEl.style.color = color;
      }
    }

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      circle.style.strokeDashoffset = targetOffset;
      if (textEl) textEl.textContent = `${percentage}%`;
    }
  }

  requestAnimationFrame(animate);
}

/**
 * Crée un élément DOM stylisé pour afficher la barre de progression d'une catégorie
 * @param {string} category - Clé de la catégorie
 * @param {number} score - Score en %
 * @param {string} lang - 'fr' ou 'en'
 * @returns {HTMLDivElement}
 */
function createCategoryBar(category, score, lang) {
  const categoryNames = {
    fr: {
      communication: "Communication",
      values: "Valeurs",
      intimacy: "Intimité",
      conflict: "Conflits",
      future: "Projets",
      daily: "Quotidien",
      money: "Argent",
      family: "Famille",
      hobbies: "Loisirs",
      spirituality: "Spiritualité"
    },
    en: {
      communication: "Communication",
      values: "Values",
      intimacy: "Intimacy",
      conflict: "Conflicts",
      future: "Future",
      daily: "Daily",
      money: "Money",
      family: "Family",
      hobbies: "Hobbies",
      spirituality: "Spirituality"
    }
  };

  const container = document.createElement('div');
  container.className = 'category-bar';
  container.style.cssText = 'display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 12px;';

  const name = document.createElement('span');
  name.className = 'category-name';
  name.style.cssText = 'width: 120px; font-size: 13px; font-weight: 600; text-align: left; color: #1A1A1A; flex-shrink: 0;';
  name.textContent = (categoryNames[lang] && categoryNames[lang][category]) || category;

  const barContainer = document.createElement('div');
  barContainer.className = 'bar-container';
  barContainer.style.cssText = 'flex: 1; height: 8px; background: #E5E7EB; border-radius: 999px; overflow: hidden; position: relative;';

  const bar = document.createElement('div');
  bar.className = 'bar-fill';
  bar.style.cssText = 'height: 100%; width: 0%; background-color: #FF6B8A; border-radius: 999px; transition: width 1s cubic-bezier(0.16, 1, 0.3, 1);';

  const percentage = document.createElement('span');
  percentage.className = 'bar-percentage';
  percentage.style.cssText = 'width: 44px; font-size: 13px; font-weight: 700; color: #FF6B8A; text-align: right; flex-shrink: 0;';
  percentage.textContent = `${score}%`;

  barContainer.appendChild(bar);
  container.appendChild(name);
  container.appendChild(barContainer);
  container.appendChild(percentage);

  // Déclenchement de l'animation de remplissage
  setTimeout(() => {
    bar.style.width = `${Math.min(100, Math.max(0, score))}%`;
  }, 100);

  return container;
}

// =========================================================================
// PARTIE 3 : PARTAGE DES RÉSULTATS
// =========================================================================

/**
 * Déclenche le partage natif (Web Share API sur smartphone) ou la copie du lien dans le presse-papier
 * @param {{total: number, categories?: Object}} scoreData 
 * @param {string} partnerNames 
 */
async function shareResults(scoreData, partnerNames) {
  let lang = 'fr';
  try {
    lang = localStorage.getItem('language') || localStorage.getItem('lovequiz_lang') || 'fr';
  } catch (e) {
    lang = 'fr';
  }
  if (lang !== 'fr' && lang !== 'en') lang = 'fr';

  const total = scoreData && typeof scoreData.total === 'number' ? scoreData.total : 0;
  const interpretation = getInterpretation(total);
  const pNames = partnerNames || (lang === 'fr' ? 'Notre couple' : 'Our relationship');

  // Construction d'une URL partageable intégrant les résultats
  const currentUrl = new URL(window.location.href);
  currentUrl.searchParams.set('score', total.toString());
  currentUrl.searchParams.set('couple', encodeURIComponent(pNames));

  const shareData = {
    title: lang === 'fr' ? 'Résultat LoveQuiz' : 'LoveQuiz Result',
    text: lang === 'fr'
      ? `${pNames} : ${total}% de compatibilité - ${interpretation.title}`
      : `${pNames}: ${total}% compatibility - ${interpretation.title}`,
    url: currentUrl.toString()
  };

  // Essayer d'abord la Web Share API (mobile / support natif)
  if (navigator.share) {
    try {
      await navigator.share(shareData);
      showToast(lang === 'fr' ? 'Partagé avec succès !' : 'Shared successfully!');
      return;
    } catch (err) {
      // Annulation utilisateur ou non supporté en contexte courant -> repli vers clipboard
      if (err.name === 'AbortError') return;
      console.warn('Share API fallback to clipboard:', err);
    }
  }

  // Repli : Copie dans le presse-papier
  const textToCopy = `${shareData.text} — ${shareData.url}`;
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(textToCopy);
      showToast(lang === 'fr' ? 'Lien copié dans le presse-papier !' : 'Link copied to clipboard!');
    } else {
      // Ancien fallback input si clipboard api non dispo
      const tempInput = document.createElement('textarea');
      tempInput.value = textToCopy;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      showToast(lang === 'fr' ? 'Lien copié dans le presse-papier !' : 'Link copied to clipboard!');
    }
  } catch (err) {
    console.error('Clipboard copy error:', err);
    showToast(lang === 'fr' ? 'Erreur lors de la copie' : 'Copy error');
  }
}

/**
 * Affiche une notification toast discrète et élégante
 * @param {string} message - Message à afficher
 */
function showToast(message) {
  const existingToasts = document.querySelectorAll('.toast');
  existingToasts.forEach(t => t.remove());

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;

  // Styles inline garantissant l'affichage sans dépendance CSS externe
  toast.style.cssText = `
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: #1A1A1A;
    color: #FFFFFF;
    padding: 12px 24px;
    border-radius: 30px;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    z-index: 99999;
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    pointer-events: none;
  `;

  document.body.appendChild(toast);

  // Animation d'entrée
  setTimeout(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  }, 10);

  // Disparition après 3 secondes
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, 3000);
}

// =========================================================================
// PARTIE 4 : RECOMMENCER LE QUIZ
// =========================================================================

/**
 * Réinitialise complètement le quiz et renvoie à l'écran d'introduction
 */
function restartQuiz() {
  try {
    // Nettoyage des clés de progression dans localStorage
    localStorage.removeItem('lovequiz_progress');
    localStorage.removeItem('lovequiz_answers');
  } catch (e) {
    console.warn('Storage clear error:', e);
  }

  // Masque les résultats et affiche l'intro (supporte les deux conventions d'IDs)
  const resultsSection = document.getElementById('results-section') || document.getElementById('section-results');
  if (resultsSection) resultsSection.style.display = 'none';

  const introSection = document.getElementById('intro-section') || document.getElementById('section-intro');
  if (introSection) introSection.style.display = 'block';

  const quizSection = document.getElementById('quiz-section') || document.getElementById('section-quiz');
  if (quizSection) quizSection.style.display = 'none';

  const configSection = document.getElementById('config-section') || document.getElementById('section-config');
  if (configSection) configSection.style.display = 'none';

  // Réinitialisation des variables globales éventuelles dans quiz.js
  if (typeof window !== 'undefined') {
    if (window.answers) window.answers = [];
    if (typeof window.currentQuestion !== 'undefined') window.currentQuestion = 0;
    if (typeof window.initQuizState === 'function') window.initQuizState();
  }

  // Remonter en haut de page avec fluidité
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// =========================================================================
// PARTIE 5 : SAUVEGARDE / REPRISE
// =========================================================================

/**
 * Sauvegarde la progression courante du quiz dans localStorage
 * @param {number} [currentQuestion] - Index de la question courante
 * @param {Array} [answers] - Tableau des réponses enregistrées
 * @param {string} [partnerNames] - Prénoms du couple
 */
function saveProgress(currentQuestion, answers, partnerNames) {
  try {
    const qIndex = (typeof currentQuestion === 'number')
      ? currentQuestion
      : (typeof window !== 'undefined' && window.currentQuestion ? window.currentQuestion : 0);

    const ans = (answers && Array.isArray(answers))
      ? answers
      : (typeof window !== 'undefined' && window.answers ? window.answers : []);

    const names = partnerNames || (typeof window !== 'undefined' && window.partnerNames ? window.partnerNames : '');

    const progress = {
      currentQuestion: qIndex,
      answers: ans,
      partnerNames: names,
      timestamp: Date.now()
    };

    localStorage.setItem('lovequiz_progress', JSON.stringify(progress));
    localStorage.setItem('lovequiz_answers', JSON.stringify(ans));
  } catch (err) {
    console.warn('Unable to save progress to localStorage:', err);
  }
}

/**
 * Charge la progression sauvegardée si elle date de moins de 24h
 * @returns {Object|null} Objet de progression ou null si expiré/absent
 */
function loadProgress() {
  try {
    const saved = localStorage.getItem('lovequiz_progress');
    if (!saved) return null;

    const progress = JSON.parse(saved);
    const age = Date.now() - (progress.timestamp || 0);
    const oneDay = 24 * 60 * 60 * 1000;

    // Si sauvegarde de moins de 24h
    if (age < oneDay) {
      return progress;
    } else {
      // Expire après 24h
      localStorage.removeItem('lovequiz_progress');
      localStorage.removeItem('lovequiz_answers');
    }
  } catch (err) {
    console.warn('Error reading stored progress:', err);
  }
  return null;
}

// =========================================================================
// EXPORTATION UNIVERSELLE (NODE & NAVIGATEUR)
// =========================================================================

const scoringModule = {
  calculateScore,
  getInterpretation,
  generateStrengthsAndWeaknesses,
  displayResults,
  animateScoreCircle,
  createCategoryBar,
  shareResults,
  showToast,
  restartQuiz,
  saveProgress,
  loadProgress
};

// Export pour environnement Node / CommonJS
if (typeof module !== 'undefined' && module.exports) {
  module.exports = scoringModule;
}

// Export pour le navigateur (objet global scoring et fonctions accessibles sur window)
if (typeof window !== 'undefined') {
  window.scoring = scoringModule;
  window.calculateScore = calculateScore;
  window.getInterpretation = getInterpretation;
  window.generateStrengthsAndWeaknesses = generateStrengthsAndWeaknesses;
  window.displayResults = displayResults;
  window.animateScoreCircle = animateScoreCircle;
  window.createCategoryBar = createCategoryBar;
  window.shareResults = shareResults;
  window.showToast = showToast;
  window.restartQuiz = restartQuiz;
  window.saveProgress = saveProgress;
  window.loadProgress = loadProgress;
}
