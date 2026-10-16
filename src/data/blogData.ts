export interface BlogPost {
  id: string;
  slug: string;
  category: string;
  categoryKey: 'communication' | 'routine' | 'habits' | 'psychology';
  date: string;
  readTimeMin: number;
  author: string;
  authorRoleFr: string;
  authorRoleEn: string;
  fr: {
    title: string;
    excerpt: string;
    quote: string;
    intro: string;
    takeaways: string[];
    contentSections: {
      heading: string;
      body: string;
    }[];
  };
  en: {
    title: string;
    excerpt: string;
    quote: string;
    intro: string;
    takeaways: string[];
    contentSections: {
      heading: string;
      body: string;
    }[];
  };
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: '5-secrets-couples-qui-durent',
    category: 'Psychologie de couple',
    categoryKey: 'psychology',
    date: '14 Fév 2026',
    readTimeMin: 5,
    author: 'Dr. Clara Monod',
    authorRoleFr: 'Psychologue clinicienne & thérapeute de couple',
    authorRoleEn: 'Clinical Psychologist & Couples Therapist',
    fr: {
      title: 'Les 5 secrets des couples qui durent 20 ans et plus',
      excerpt: 'Étudier les couples épanouis sur la durée révèle des habitudes surprenantes : l’amour durable n’est pas un miracle, c’est une chorégraphie quotidienne.',
      quote: '« Le véritable secret des relations heureuses ne réside pas dans l’absence de conflits, mais dans la rapidité et la douceur de la réconciliation. »',
      intro: 'Après avoir analysé des centaines de relations longues, un constat s’impose : les couples solides ne s’aiment pas plus fort au départ, ils s’aiment plus intelligemment au fil du temps.',
      takeaways: [
        'Pratiquer le ratio magique de Gottman (5 interactions positives pour 1 négative)',
        'Désamorcer l’escalade verbale dans les 90 premières secondes',
        'Conserver un jardin secret d’indépendance pour renouveler le désir',
      ],
      contentSections: [
        {
          heading: '1. Le rituel des 6 secondes d’affection',
          body: 'Un baiser de 6 secondes libère suffisamment d’ocytocine pour signaler au système nerveux que vous êtes en sécurité avec votre partenaire. Remplacez le simple bisou machinal du matin par une véritable étreinte consciente.',
        },
        {
          heading: '2. L’art de la réconciliation précoce',
          body: 'Dans les couples épanouis, lorsqu’une pique est lancée ou qu’un malentendu survient, l’un des partenaires fait rapidement une « tentative de réparation » : un sourire, une main tendue, ou un mot désamorçant. Cette bienveillance coupe court au ressentiment.',
        },
        {
          heading: '3. La curiosité jamais rassasiée',
          body: 'Même après deux décennies, ne partez jamais du principe que vous connaissez votre partenaire par cœur. Les êtres humains évoluent. Posez régulièrement des questions ouvertes sur ses rêves actuels et ses nouveaux désirs.',
        },
      ],
    },
    en: {
      title: 'The 5 Secrets of Couples Who Thrive Past 20 Years',
      excerpt: 'Observing long-standing flourishing couples reveals surprising daily habits: enduring love is not luck, it is a conscious relational choreography.',
      quote: '“The real hallmark of happy couples is not the absence of friction, but the speed and tenderness of their repair attempts.”',
      intro: 'Having worked with hundreds of long-term partnerships, one finding stands clear: enduring couples did not simply start with more passion; they nurtured affection more deliberately.',
      takeaways: [
        'Uphold the Gottman golden ratio (5 positive interactions for every 1 critique)',
        'Defuse emotional escalation within the first 90 seconds of tension',
        'Maintain a private sanctuary of autonomy to keep attraction fresh',
      ],
      contentSections: [
        {
          heading: '1. The 6-Second Affection Ritual',
          body: 'A six-second kiss releases enough oxytocin to signal genuine emotional safety to the nervous system. Transform automatic morning goodbyes into mindful moments of genuine physical reconnection.',
        },
        {
          heading: '2. The Mastery of Early Repair',
          body: 'In healthy partnerships, when irritation strikes, one partner promptly offers a gentle “repair attempt” — an outstretched hand, a self-aware laugh, or a warm acknowledgement. This prevents resentment from festering.',
        },
        {
          heading: '3. Never-Ending Curiosity',
          body: 'Even after decades together, never assume you have mapped every corner of your partner’s mind. People evolve. Keep asking genuine, open-ended questions about their new dreams and evolving passions.',
        },
      ],
    },
  },
  {
    id: '2',
    slug: 'desamorcer-dispute-3-minutes',
    category: 'Communication',
    categoryKey: 'communication',
    date: '02 Fév 2026',
    readTimeMin: 4,
    author: 'Maxime Laroche',
    authorRoleFr: 'Médiateur familial & coach relationnel',
    authorRoleEn: 'Relationship Mediator & Certified Coach',
    fr: {
      title: 'Comment désamorcer une dispute en moins de 3 minutes chrono',
      excerpt: 'La technique de la pause physiologique et du « Nous contre le problème » pour transformer une querelle stérile en rapprochement intime.',
      quote: '« En couple, vouloir avoir raison à tout prix revient à gagner une bataille pour perdre l’harmonie de son foyer. »',
      intro: 'Quand le ton monte, notre cerveau reptilien prend les commandes. Voici la méthode concrète pour court-circuiter l’emballement émotionnel en quelques respirations partagées.',
      takeaways: [
        'Utiliser le mot-clé « Pause Café » pour stopper net l’adrénaline',
        'Remplacer le « Tu » accusateur par le « Je ressens »',
        'Se tenir la main pendant l’explication calme le rythme cardiaque',
      ],
      contentSections: [
        {
          heading: 'Étape 1 : Le cessez-le-feu physiologique de 90 secondes',
          body: 'Lorsque le rythme cardiaque dépasse 100 battements par minute, la zone rationnelle du cerveau se coupe. Convenez d’un mot de passe complice qui impose 90 secondes de silence et 3 grandes expirations ventrales avant de poursuivre.',
        },
        {
          heading: 'Étape 2 : Recadrer le combat (Nous vs Le problème)',
          body: 'Asseyez-vous du même côté de la table. Ce simple changement physique d’angle rappelle que votre partenaire n’est pas votre adversaire, mais votre allié face à une situation contrariante.',
        },
      ],
    },
    en: {
      title: 'How to Defuse Any Argument in Under 3 Minutes Flat',
      excerpt: 'The physiological pause and the “Us vs The Problem” mindset to turn sterile friction into deeper mutual understanding.',
      quote: '“In love, insisting on being right at all costs means winning an argument only to damage the warmth of your shared home.”',
      intro: 'When voices rise, survival instincts hijack clear communication. Here is the step-by-step roadmap to intercept emotional overwhelm in a couple of collective breaths.',
      takeaways: [
        'Deploy a gentle code-word to immediately pause adrenaline spikes',
        'Swap accusatory “You” statements for vulnerable “I feel” reflections',
        'Holding hands while speaking physiologically stabilizes heart rates',
      ],
      contentSections: [
        {
          heading: 'Step 1: The 90-Second Biological Reset',
          body: 'When your heart rate surges over 100 bpm, executive logic shoves aside empathy. Agree in advance on a friendly code-word that triggers 90 seconds of quiet breathing before speaking again.',
        },
        {
          heading: 'Step 2: Reframe the Arena (Us vs The Problem)',
          body: 'Sit on the same side of the table. This physical alignment subconsciously reminds both partners that they are allies tackling a shared challenge together.',
        },
      ],
    },
  },
  {
    id: '3',
    slug: 'regle-des-2-2-2-routine',
    category: 'Vie à deux',
    categoryKey: 'routine',
    date: '28 Jan 2026',
    readTimeMin: 3,
    author: 'Élodie & Paul Vian',
    authorRoleFr: 'Auteurs et créateurs d’ateliers de couple',
    authorRoleEn: 'Authors & Couple Workshop Facilitators',
    fr: {
      title: 'La règle magique des 2-2-2 pour terrasser la routine',
      excerpt: 'Une règle mnémotechnique ultra simple adoptée par des milliers de couples pour préserver la complicité amoureuse au milieu de vies trépidantes.',
      quote: '« La routine n’est pas la mort de l’amour ; c’est l’oubli de la célébration mutuelle qui l’éteint. »',
      intro: 'Entre le travail, les courses, les écrans et les obligations, les moments de qualité s’évaporent. La règle des 2-2-2 offre un cadre protecteur pour préserver votre flamme.',
      takeaways: [
        'Toutes les 2 semaines : une vraie soirée en tête-à-tête sans parler intendance',
        'Tous les 2 mois : un week-end d’évasion à l’extérieur de la maison',
        'Tous les 2 ans : une semaine complète de vacances en amoureux',
      ],
      contentSections: [
        {
          heading: 'Pourquoi cette régularité change tout',
          body: 'L’anticipation du plaisir est aussi puissante que le plaisir lui-même. Savoir qu’un date arrive vendredi prochain nourrit le sourire tout au long d’une semaine de travail dense.',
        },
        {
          heading: 'Comment l’adapter à votre budget',
          body: 'Un « date » n’a pas besoin d’être luxueux. Une promenade nocturne dans votre ville préférée ou un pique-nique sous les étoiles suffisent amplement à réactiver la séduction.',
        },
      ],
    },
    en: {
      title: 'The 2-2-2 Golden Rule to Keep Monotony at Bay',
      excerpt: 'An ultra-simple framework embraced by thousands of couples to safeguard relational spark amidst hectic modern schedules.',
      quote: '“Routine itself does not erode love; neglecting intentional celebration is what quietly extinguishes it.”',
      intro: 'Between work demands, household errands, and digital noise, genuine connection often gets pushed aside. The 2-2-2 rule provides a sacred container for romance.',
      takeaways: [
        'Every 2 weeks: a dedicated evening date without discussing household logistics',
        'Every 2 months: a 48-hour weekend getaway outside the home',
        'Every 2 years: a full week-long romantic adventure for just the two of you',
      ],
      contentSections: [
        {
          heading: 'Why Rhythm Transforms Everything',
          body: 'Anticipation is just as uplifting as the experience itself. Looking forward to a cozy date on Friday infuses your entire work week with lighthearted warmth.',
        },
        {
          heading: 'How to Customize for Any Budget',
          body: 'A date night does not require exorbitant spending. An evening walk under twinkling string lights or homemade dessert in the park sparks intimacy effortlessly.',
        },
      ],
    },
  },
  {
    id: '4',
    slug: '5-langages-amour-guide-pratique',
    category: 'Habitudes d’amour',
    categoryKey: 'habits',
    date: '15 Jan 2026',
    readTimeMin: 6,
    author: 'Dr. Clara Monod',
    authorRoleFr: 'Psychologue clinicienne & thérapeute de couple',
    authorRoleEn: 'Clinical Psychologist & Couples Therapist',
    fr: {
      title: 'Les 5 Langages de l’Amour : Parlez-vous le même dialecte ?',
      excerpt: 'Pourquoi vous pouvez aimer quelqu’un de tout votre cœur sans qu’il se sente aimé, et comment traduire vos sentiments dans le bon canal affectif.',
      quote: '« L’amour sincère nécessite d’apprendre la langue affective maternelle de son partenaire, plutôt que d’insister à lui crier dans la sienne. »',
      intro: 'Inspiré des travaux de Gary Chapman, ce guide décrypte les 5 canaux fondamentaux d’expression affective pour harmoniser vos attentions amoureuses.',
      takeaways: [
        'Identifier votre langage primaire et celui de votre partenaire',
        'Comprendre pourquoi les cadeaux peuvent laisser de marbre quelqu’un qui a soif de temps de qualité',
        'Comment remplir le réservoir émotionnel de son couple au quotidien',
      ],
      contentSections: [
        {
          heading: 'Les 5 dialectes en un coup d’œil',
          body: '1) Les paroles valorisantes (mots doux, encouragements). 2) Les moments de qualité (attention totale sans écran). 3) Les cadeaux attentionnés (preuve concrète de pensée). 4) Les services rendus (soulager l’autre). 5) Le toucher physique (câlins, baisers, caresses).',
        },
        {
          heading: 'L’exercice du réservoir d’amour',
          body: 'Chaque dimanche soir, posez cette simple question : « De 0 à 10, à combien est ton réservoir d’amour cette semaine ? Que puis-je faire pour l’amener à 10 ? » Les réponses vont transformer votre quotidien.',
        },
      ],
    },
    en: {
      title: 'The 5 Love Languages: Are You Speaking the Same Dialect?',
      excerpt: 'Why you can love someone with all your heart yet leave them feeling empty, and how to translate your affection into their native emotional channel.',
      quote: '“Genuine love requires learning your partner’s primary love language rather than merely shouting in your own.”',
      intro: 'Rooted in the groundbreaking framework of Gary Chapman, this guide unpacks the 5 foundational affection channels to harmonize your daily connection.',
      takeaways: [
        'Identify your primary love language and that of your partner',
        'Understand why elaborate gifts fall flat for someone yearning for focused quality time',
        'How to reliably refill your partner’s emotional fuel tank every single week',
      ],
      contentSections: [
        {
          heading: 'The 5 Dialects at a Glance',
          body: '1) Words of Affirmation (tender compliments, verbal support). 2) Quality Time (uninterrupted presence). 3) Thoughtful Gifts (tangible symbols of care). 4) Acts of Service (alleviating daily burdens). 5) Physical Touch (comforting embraces, closeness).',
        },
        {
          heading: 'The Love Tank Check-in',
          body: 'Every Sunday evening, exchange this tender question: “From 0 to 10, where is your love tank right now? What can I do this week to bring it closer to 10?” The candid answers will enrich your bond.',
        },
      ],
    },
  },
];
