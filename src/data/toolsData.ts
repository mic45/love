export interface LoveLanguageQuestion {
  id: number;
  fr: {
    question: string;
    optionA: { text: string; lang: 'words' | 'time' | 'gifts' | 'acts' | 'touch' };
    optionB: { text: string; lang: 'words' | 'time' | 'gifts' | 'acts' | 'touch' };
  };
  en: {
    question: string;
    optionA: { text: string; lang: 'words' | 'time' | 'gifts' | 'acts' | 'touch' };
    optionB: { text: string; lang: 'words' | 'time' | 'gifts' | 'acts' | 'touch' };
  };
}

export const LOVE_LANG_QUESTIONS: LoveLanguageQuestion[] = [
  {
    id: 1,
    fr: {
      question: 'Qu’est-ce qui vous fait vous sentir le plus aimé(e) au retour d’une longue journée ?',
      optionA: { text: 'Un câlin chaleureux et un baiser passionné sur le pas de la porte.', lang: 'touch' },
      optionB: { text: 'Un « Je suis tellement fier/fière de toi, tu as assuré ! » sincère.', lang: 'words' },
    },
    en: {
      question: 'What makes you feel most cherished after a demanding day?',
      optionA: { text: 'A warm, lingering hug and a tender kiss at the front door.', lang: 'touch' },
      optionB: { text: 'A heartfelt “I am so proud of you, you did amazing!”', lang: 'words' },
    },
  },
  {
    id: 2,
    fr: {
      question: 'Pendant le week-end, votre moment favori avec votre moitié est :',
      optionA: { text: 'Se promener des heures sans téléphones en discutant à cœur ouvert.', lang: 'time' },
      optionB: { text: 'Voir qu’il/elle a préparé mon petit déjeuner préféré sans rien demander.', lang: 'acts' },
    },
    en: {
      question: 'On a weekend, your absolute favorite moment with your partner is:',
      optionA: { text: 'Strolling for hours without phones, having deep honest conversations.', lang: 'time' },
      optionB: { text: 'Noticing they made my favorite breakfast without me asking.', lang: 'acts' },
    },
  },
  {
    id: 3,
    fr: {
      question: 'Pour marquer une occasion spéciale (anniversaire, fête) :',
      optionA: { text: 'Un cadeau choisi avec soin qui montre qu’il/elle écoute mes moindres désirs.', lang: 'gifts' },
      optionB: { text: 'Une lettre d’amour manuscrite détaillant pourquoi il/elle m’aime.', lang: 'words' },
    },
    en: {
      question: 'To celebrate a special occasion (birthday, anniversary):',
      optionA: { text: 'A thoughtful gift proving they truly pay attention to what I love.', lang: 'gifts' },
      optionB: { text: 'A handwritten romantic letter explaining all the reasons they love me.', lang: 'words' },
    },
  },
  {
    id: 4,
    fr: {
      question: 'Dans les moments de fatigue ou de stress :',
      optionA: { text: 'Qu’il/elle prenne en charge les corvées ou le dîner pour me soulager.', lang: 'acts' },
      optionB: { text: 'Un massage doux des épaules ou se blottir l’un contre l’autre sur le canapé.', lang: 'touch' },
    },
    en: {
      question: 'During overwhelming or stressful moments:',
      optionA: { text: 'Seeing them handle dinner or chores to take pressure off me.', lang: 'acts' },
      optionB: { text: 'A soothing shoulder rub or curling up together on the couch.', lang: 'touch' },
    },
  },
  {
    id: 5,
    fr: {
      question: 'Quelle surprise vous touche le plus en plein milieu de semaine ?',
      optionA: { text: 'Un petit objet ou un dessert qu’il/elle m’a rapporté en pensant à moi.', lang: 'gifts' },
      optionB: { text: 'M’emmener pour un coucher de soleil impromptu juste tous les deux.', lang: 'time' },
    },
    en: {
      question: 'Which surprise brightens your midweek spirits the most?',
      optionA: { text: 'A little treat or thoughtful item they picked up just thinking of me.', lang: 'gifts' },
      optionB: { text: 'Whisking me away to watch a spontaneous sunset together.', lang: 'time' },
    },
  },
];

export interface DateIdea {
  id: number;
  category: 'romantic' | 'cozy' | 'fun' | 'budget';
  icon: string;
  color: string;
  budget: string;
  fr: {
    title: string;
    desc: string;
    tag: string;
    time: string;
    tip?: string;
  };
  en: {
    title: string;
    desc: string;
    tag: string;
    time: string;
    tip?: string;
  };
}

export const DATE_IDEAS: DateIdea[] = [
  {
    id: 1,
    category: 'romantic',
    icon: '🏠',
    color: '#FF6B8A',
    budget: 'Petit budget',
    fr: {
      title: 'Pique-nique aux chandelles dans le salon',
      desc: 'Déplacez la table basse, étalez un plaid douillet, allumez quelques bougies et dégustez des tapas faites maison les yeux dans les yeux.',
      tag: 'Intime & Poétique',
      time: '2h30',
      tip: 'Préparez une playlist acoustique douce et éteignez tous les plafonniers.',
    },
    en: {
      title: 'Candlelit Indoor Living Room Picnic',
      desc: 'Slide the coffee table away, lay a plush blanket, light candles, and share homemade tapas gazing into each other’s eyes.',
      tag: 'Intimate & Poetic',
      time: '2.5 hrs',
      tip: 'Put on a soft acoustic playlist and turn off all overhead lights.',
    },
  },
  {
    id: 2,
    category: 'cozy',
    icon: '🛁',
    color: '#FFA8BA',
    budget: 'Gratuit',
    fr: {
      title: 'Soirée spa & playlist vinyles',
      desc: 'Bain moussant ou douche aux huiles essentielles, masques visage en duo et massage relaxant sur fond de musique lo-fi apaisante.',
      tag: 'Détente absolue',
      time: '2h00',
      tip: 'Chauffez légèrement l’huile de massage entre vos paumes avant de commencer.',
    },
    en: {
      title: 'At-Home Couple Spa & Vinyl Night',
      desc: 'A warm essential-oil shower or bath, matching face masks, and relaxing back rubs to the tune of soothing lo-fi sounds.',
      tag: 'Pure Bliss',
      time: '2 hrs',
      tip: 'Warm the massage oil between your palms before beginning.',
    },
  },
  {
    id: 3,
    category: 'fun',
    icon: '🍳',
    color: '#FFD166',
    budget: 'Petit budget',
    fr: {
      title: 'Défi « Top Chef » à l’aveugle',
      desc: 'Chacun dispose de 10 € et 20 minutes pour acheter des ingrédients secrets et concocter une assiette surprise à l’autre.',
      tag: 'Fous rires garantis',
      time: '1h30',
      tip: 'Désignez le gagnant selon l’audace de la présentation et le goût !',
    },
    en: {
      title: 'Blind Box “Top Chef” Cook-Off',
      desc: 'Each partner gets $10 and 20 minutes to fetch mystery ingredients and whip up a creative surprise dish for the other.',
      tag: 'Endless Laughs',
      time: '1.5 hrs',
      tip: 'Rate the winner based on creative plating and flavor!',
    },
  },
  {
    id: 4,
    category: 'budget',
    icon: '✨',
    color: '#3A86FF',
    budget: 'Gratuit',
    fr: {
      title: 'Chasse aux étoiles & chocolat chaud',
      desc: 'Remplissez un thermos de chocolat chaud épicé, emportez deux plaids et partez admirer les constellations loin des lumières de la ville.',
      tag: 'Magique & Économique',
      time: '1h45',
      tip: 'Téléchargez une application de carte du ciel pour repérer vos signes du zodiaque.',
    },
    en: {
      title: 'Stargazing & Spiced Hot Cocoa',
      desc: 'Fill a thermos with creamy hot chocolate, wrap yourselves in cozy blankets, and admire constellations away from city glow.',
      tag: 'Magical & Low Cost',
      time: '1 hr 45 min',
      tip: 'Download a night sky map app to locate each other’s astrological signs.',
    },
  },
  {
    id: 5,
    category: 'romantic',
    icon: '🌹',
    color: '#E63946',
    budget: 'Moyen',
    fr: {
      title: 'Redécouverte de votre premier rencard',
      desc: 'Retournez à l’endroit où vous vous êtes vus pour la première fois ou recréez la tenue et les boissons de ce jour mémorable.',
      tag: 'Nostalgie amoureuse',
      time: '3h00',
      tip: 'Faites comme si vous veniez de vous rencontrer pendant les 15 premières minutes !',
    },
    en: {
      title: 'First Date Re-enactment',
      desc: 'Revisit the exact place where you first crossed paths or recreate the outfits and drinks from that unforgettable first day.',
      tag: 'Romantic Nostalgia',
      time: '3 hrs',
      tip: 'Pretend you just met for the first 15 minutes for maximum butterflies!',
    },
  },
  {
    id: 6,
    category: 'fun',
    icon: '🎲',
    color: '#06D6A0',
    budget: 'Gratuit',
    fr: {
      title: 'Soirée jeux de société & gages amoureux',
      desc: 'Ressortez vos jeux de société préférés (Scrabble, Uno, cartes). Le perdant de chaque manche doit réaliser un gage doux ou un massage de 5 min.',
      tag: 'Ludique & Complice',
      time: '2h00',
      tip: 'Écrivez 10 gages bienveillants sur des petits papiers pliés dans un bol.',
    },
    en: {
      title: 'Board Games & Affectionate Forfeits',
      desc: 'Dust off favorite games (Uno, cards, Scrabble). The loser of each round owes a sweet romantic forfeit or a 5-minute foot rub.',
      tag: 'Playful Romance',
      time: '2 hrs',
      tip: 'Write 10 affectionate dares on slips of paper folded in a bowl.',
    },
  },
  {
    id: 7,
    category: 'romantic',
    icon: '🍸',
    color: '#8338EC',
    budget: 'Moyen',
    fr: {
      title: 'Bar clandestin & mixologie secrète',
      desc: 'Dénichez un speakeasy discret ou transformez votre cuisine en bar lounge : inventez un cocktail sur-mesure qui porte le nom de votre rencontre.',
      tag: 'Chic & Mystère',
      time: '2h30',
      tip: 'Habillez-vous sur votre 31 comme pour une fête secrète des années 20.',
    },
    en: {
      title: 'Speakeasy & Custom Mixology',
      desc: 'Unearth a hidden cocktail lounge or turn your kitchen counter into a bar: craft signature cocktails named after your love story.',
      tag: 'Chic & Mysterious',
      time: '2.5 hrs',
      tip: 'Dress to the nines as if sneaking into a 1920s secret soirée.',
    },
  },
  {
    id: 8,
    category: 'cozy',
    icon: '🎨',
    color: '#FB5607',
    budget: 'Petit budget',
    fr: {
      title: 'Atelier peinture & vin sur plaid',
      desc: 'Deux toiles vierges, quelques tubes d’acrylique et un verre de vin : peignez le portrait de l’autre sans regarder le résultat avant la révélation finale.',
      tag: 'Créatif & Émouvant',
      time: '2h00',
      tip: 'Ne cherchez pas le réalisme : l’humour et l’affection rendent le tableau magnifique.',
    },
    en: {
      title: 'Paint & Sip Living Room Studio',
      desc: 'Two small canvases, acrylic colors, and a glass of wine: paint each other’s portrait without revealing the canvas until the end.',
      tag: 'Creative Bonding',
      time: '2 hrs',
      tip: 'Don’t aim for perfection: laughter and tenderness make the artwork priceless.',
    },
  },
  {
    id: 9,
    category: 'budget',
    icon: '🌙',
    color: '#118AB2',
    budget: 'Gratuit',
    fr: {
      title: 'Balade nocturne & confidences secrètes',
      desc: 'Partez marcher dans votre quartier ou un parc calme quand la ville s’endort. Main dans la main, posez-vous 3 questions que vous n’avez jamais osé poser.',
      tag: 'Confidences intimes',
      time: '1h15',
      tip: 'Laissez les smartphones en mode silencieux dans le fond de votre poche.',
    },
    en: {
      title: 'Midnight Stroll & Deep Whispers',
      desc: 'Take an evening walk through quiet streets as the city sleeps. Hand in hand, ask each other 3 questions you’ve never asked before.',
      tag: 'Heartfelt Connection',
      time: '1 hr 15 min',
      tip: 'Keep smartphones on airplane mode tucked away in your coats.',
    },
  },
  {
    id: 10,
    category: 'romantic',
    icon: '🔥',
    color: '#D81159',
    budget: 'Gratuit',
    fr: {
      title: 'Jeu des 36 questions amoureuses d’Aron',
      desc: 'Les fameuses questions psychologiques conçues pour accélérer l’intimité et recréer le coup de foudre, conclues par 4 minutes de regard silencieux.',
      tag: 'Passion & Vulnérabilité',
      time: '2h00',
      tip: 'Prenez le temps d’écouter chaque réponse sans jugement.',
    },
    en: {
      title: 'Arthur Aron’s 36 Questions to Fall in Love',
      desc: 'The celebrated psychological questionnaire crafted to accelerate intimacy, concluded by 4 minutes of uninterrupted eye contact.',
      tag: 'Deep Vulnerability',
      time: '2 hrs',
      tip: 'Listen to every answer with total presence and zero judgment.',
    },
  },
];
