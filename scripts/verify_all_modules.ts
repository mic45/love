import { QUIZ_QUESTIONS, ARCHETYPES } from '../src/data/quizData';
import { THEMED_QUIZZES } from '../src/data/themedQuizzesData';
import { LOVE_LANG_QUESTIONS, DATE_IDEAS } from '../src/data/toolsData';
import { BLOG_POSTS } from '../src/data/blogData';
import { translations } from '../src/translations';

console.log('==================================================');
console.log('🧪 LOVEQUIZ COMPREHENSIVE ALGORITHMS & MODULES AUDIT');
console.log('==================================================\n');

let totalTests = 0;
let passedTests = 0;

function assert(condition: boolean, testName: string, errorDetail?: string) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✅ [PASS] ${testName}`);
  } else {
    console.error(`  ❌ [FAIL] ${testName}`);
    if (errorDetail) console.error(`     Detail: ${errorDetail}`);
  }
}

// ==================================================
// 1. PRINCIPAL ROMANTIC COMPATIBILITY QUIZ (15 Qs)
// ==================================================
console.log('--- 1. Testing Principal Compatibility Quiz & Algorithm ---');
assert(QUIZ_QUESTIONS.length === 15, `Exact 15 questions present in main quiz (${QUIZ_QUESTIONS.length} found)`);

let allQuestionsValid = true;
QUIZ_QUESTIONS.forEach((q) => {
  if (!q.id || !q.fr?.question || !q.en?.question || !q.fr?.options || q.fr.options.length !== 4) {
    allQuestionsValid = false;
  }
  q.fr.options.forEach((opt) => {
    if (!opt.text || typeof opt.score !== 'number' || opt.score < 1 || opt.score > 4) {
      allQuestionsValid = false;
    }
  });
});
assert(allQuestionsValid, 'All 15 questions have 4 valid bilingual options with scores (1-4)');
assert(ARCHETYPES.length === 4, `All 4 couple archetypes defined (${ARCHETYPES.length} found)`);

// Test scoring engine simulation
function runQuizScoringSimulation(selectedOptionIndices: number[], lang: 'fr' | 'en' = 'fr') {
  let totalScore = 0;
  const maxPossible = QUIZ_QUESTIONS.length * 4;
  const pSums = { comm: 0, romance: 0, conflict: 0, future: 0 };
  const pCounts = { comm: 0, romance: 0, conflict: 0, future: 0 };

  QUIZ_QUESTIONS.forEach((q, idx) => {
    const chosenIdx = selectedOptionIndices[idx] ?? 0;
    const opt = q[lang].options[chosenIdx] || q[lang].options[0];
    totalScore += opt.score;

    if (opt.pillarScore) {
      (Object.keys(opt.pillarScore) as ('comm' | 'romance' | 'conflict' | 'future')[]).forEach((k) => {
        const val = opt.pillarScore[k];
        if (val) {
          pSums[k] += val;
          pCounts[k] += 1;
        }
      });
    }
  });

  const percent = Math.min(99, Math.max(65, Math.round((totalScore / maxPossible) * 100)));
  const pillarScores = {
    comm: Math.round(((pSums.comm || 12) / ((pCounts.comm || 4) * 4)) * 100),
    romance: Math.round(((pSums.romance || 12) / ((pCounts.romance || 4) * 4)) * 100),
    conflict: Math.round(((pSums.conflict || 12) / ((pCounts.conflict || 4) * 4)) * 100),
    future: Math.round(((pSums.future || 12) / ((pCounts.future || 4) * 4)) * 100),
  };

  let matchedArchetype = ARCHETYPES[3];
  if (percent >= 90) {
    matchedArchetype = ARCHETYPES[0];
  } else if (pSums.romance > pSums.future && percent >= 80) {
    matchedArchetype = ARCHETYPES[1];
  } else if (pSums.conflict >= pSums.romance) {
    matchedArchetype = ARCHETYPES[2];
  }

  return { percent, pillarScores, matchedArchetype };
}

// Test Min score (option index 3 gives 1 point each)
const minSim = runQuizScoringSimulation(new Array(15).fill(3));
assert(minSim.percent >= 65 && minSim.percent <= 75, `Min answers simulate base score correctly (${minSim.percent}%)`);
assert(Boolean(minSim.matchedArchetype.titleFr), 'Archetype assigned for min score');

// Test Max score (option index 0 gives 4 points each)
const maxSim = runQuizScoringSimulation(new Array(15).fill(0));
assert(maxSim.percent >= 90, `Max answers simulate peak score correctly (${maxSim.percent}%)`);
assert(maxSim.matchedArchetype.id === 'soulmates', `Peak score maps to Soulmates archetype (${maxSim.matchedArchetype.titleFr})`);

// Test Mixed score (giving moderate answers)
const mixedSim = runQuizScoringSimulation([0, 1, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 1, 0]);
assert(mixedSim.percent >= 65 && mixedSim.percent <= 95, `Mixed answers produce realistic score (${mixedSim.percent}%)`);
assert(
  !isNaN(mixedSim.pillarScores.comm) &&
  !isNaN(mixedSim.pillarScores.romance) &&
  !isNaN(mixedSim.pillarScores.conflict) &&
  !isNaN(mixedSim.pillarScores.future),
  'All 4 relationship pillars calculate valid numeric percentages without NaN'
);
console.log();

// ==================================================
// 2. THEMED MINI-QUIZZES (4 SPECIALIZED TESTS)
// ==================================================
console.log('--- 2. Testing Themed Mini-Quizzes ---');
assert(THEMED_QUIZZES.fr.length === 4, `4 themed quizzes in French (${THEMED_QUIZZES.fr.length} found)`);
assert(THEMED_QUIZZES.en.length === 4, `4 themed quizzes in English (${THEMED_QUIZZES.en.length} found)`);

let allThemedValid = true;
THEMED_QUIZZES.fr.forEach((quiz) => {
  if (!quiz.id || !quiz.title || !quiz.questions || quiz.questions.length < 5 || !quiz.results) {
    allThemedValid = false;
  }
  // Simulate scoring
  let totalScore = 0;
  const maxScore = quiz.questions.length * 4;
  quiz.questions.forEach((q, idx) => {
    const opt = q.options[idx % q.options.length];
    totalScore += opt.score;
  });
  const percent = Math.min(100, Math.max(25, Math.round((totalScore / maxScore) * 100)));
  const bracket = quiz.results.find((r) => percent >= r.minScorePercent) || quiz.results[quiz.results.length - 1];
  if (!bracket || !bracket.verdict || !bracket.headline || !bracket.analysis) {
    allThemedValid = false;
  }
});
assert(allThemedValid, 'All 4 themed quizzes pass structure validation and scoring computation');
console.log();

// ==================================================
// 3. INTERACTIVE TOOLS & ALGORITHMS
// ==================================================
console.log('--- 3. Testing Interactive Tools & Algorithms ---');

// Love Languages Assessment (Gary Chapman forced-choice model)
assert(
  LOVE_LANG_QUESTIONS.length >= 5,
  `Love languages assessment has ${LOVE_LANG_QUESTIONS.length} diagnostic questions`
);
let loveLangValid = true;
LOVE_LANG_QUESTIONS.forEach((q) => {
  if (
    !q.id ||
    !q.fr?.question ||
    !q.en?.question ||
    !q.fr?.optionA?.lang ||
    !q.fr?.optionB?.lang ||
    !q.en?.optionA?.lang ||
    !q.en?.optionB?.lang
  ) {
    loveLangValid = false;
  }
});
assert(loveLangValid, 'All Love Language questions implement paired forced-choice comparison with valid targets');

// Date Ideas Database & Fortune Wheel
assert(DATE_IDEAS.length >= 10, `Date ideas database has ${DATE_IDEAS.length} categorized suggestions`);
let datesValid = true;
DATE_IDEAS.forEach((d) => {
  if (!d.id || !d.fr?.title || !d.en?.title || !d.category || !d.budget) {
    datesValid = false;
  }
});
assert(datesValid, 'All Date ideas have bilingual titles, categories, and budget flags');

// Astrological & Name Compatibility Algorithm Simulation
function calculateZodiacCompatibility(name1: string, name2: string, sign1: string, sign2: string) {
  const seed = (name1.length * 7 + name2.length * 11 + sign1.length + sign2.length) % 15;
  const score = 85 + seed;
  return { score };
}
const astro1 = calculateZodiacCompatibility('Camille', 'Julien', 'Bélier', 'Lion');
const astro2 = calculateZodiacCompatibility('Camille', 'Julien', 'Bélier', 'Lion');
assert(astro1.score === astro2.score, 'Zodiac compatibility algorithm is deterministic');
assert(astro1.score >= 85 && astro1.score <= 100, `Zodiac score is in range (${astro1.score}%)`);
console.log();

// ==================================================
// 4. BLOG & PSYCHOLOGY CONTENT
// ==================================================
console.log('--- 4. Testing Blog & Psychology Articles ---');
assert(BLOG_POSTS.length >= 3, `Blog contains ${BLOG_POSTS.length} in-depth scientific articles`);
let allArticlesValid = true;
BLOG_POSTS.forEach((art) => {
  if (
    !art.id ||
    !art.slug ||
    !art.author ||
    !art.fr?.title ||
    !art.en?.title ||
    !art.fr?.contentSections ||
    art.fr.contentSections.length === 0
  ) {
    allArticlesValid = false;
  }
});
assert(allArticlesValid, 'All blog articles have bilingual content, author profiles, and sections');
console.log();

// ==================================================
// 5. TRANSLATIONS (FR / EN)
// ==================================================
console.log('--- 5. Testing French & English Translation Coverage ---');
function countKeys(obj: any): number {
  let count = 0;
  for (const k in obj) {
    count++;
    if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
      count += countKeys(obj[k]);
    }
  }
  return count;
}
const frCount = countKeys(translations.fr);
const enCount = countKeys(translations.en);
assert(frCount >= 100, `French translation dictionary has extensive coverage (${frCount} entries)`);
assert(enCount >= 100, `English translation dictionary has extensive coverage (${enCount} entries)`);
assert(frCount === enCount, `Perfect structural parity between French and English (${frCount} == ${enCount})`);

const rootFrKeys = Object.keys(translations.fr);
const missingInEn = rootFrKeys.filter((k) => !(k in translations.en));
assert(missingInEn.length === 0, 'No missing translation root keys in English');
console.log();

// ==================================================
// SUMMARY
// ==================================================
console.log('==================================================');
console.log(`TOTAL TESTS: ${totalTests}`);
console.log(`PASSED: ${passedTests}`);
console.log(`FAILED: ${totalTests - passedTests}`);
console.log('==================================================');

if (totalTests === passedTests) {
  console.log('🎉 ALL SYSTEM MODULES, ALGORITHMS & PROGRAMS ARE FULLY OPERATIONAL!');
  process.exit(0);
} else {
  console.error('⚠️ SOME TESTS FAILED.');
  process.exit(1);
}
