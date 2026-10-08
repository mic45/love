export interface QuizQuestion {
  id: number;
  category: 'comm' | 'romance' | 'conflict' | 'future';
  fr: {
    question: string;
    description: string;
    options: {
      text: string;
      score: number; // 1 to 4
      pillarScore: { [key in 'comm' | 'romance' | 'conflict' | 'future']?: number };
    }[];
  };
  en: {
    question: string;
    description: string;
    options: {
      text: string;
      score: number;
      pillarScore: { [key in 'comm' | 'romance' | 'conflict' | 'future']?: number };
    }[];
  };
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: 'comm',
    fr: {
      question: 'Quand l’un de vous passe une mauvaise journée, comment réagissez-vous ?',
      description: 'L’écoute et l’empathie constituent le ciment émotionnel du couple.',
      options: [
        {
          text: 'On se pose ensemble, une écoute attentive sans jugement et un gros câlin réconfortant.',
          score: 4,
          pillarScore: { comm: 4, romance: 3 },
        },
        {
          text: 'On lui laisse un peu d’espace pour décompresser, puis on en parle calmement.',
          score: 3,
          pillarScore: { comm: 3, conflict: 3 },
        },
        {
          text: 'On essaie immédiatement de trouver des solutions pratiques et logiques.',
          score: 2,
          pillarScore: { comm: 2, future: 3 },
        },
        {
          text: 'On a du mal à communiquer ces jours-là et la tension a tendance à monter.',
          score: 1,
          pillarScore: { comm: 1, conflict: 1 },
        },
      ],
    },
    en: {
      question: 'When one of you has a tough day, how do you typically handle it?',
      description: 'Active listening and emotional empathy form the anchor of any relationship.',
      options: [
        {
          text: 'We sit down together, share unconditional listening, and share a warm hug.',
          score: 4,
          pillarScore: { comm: 4, romance: 3 },
        },
        {
          text: 'We grant a little breathing room first, then check in gently.',
          score: 3,
          pillarScore: { comm: 3, conflict: 3 },
        },
        {
          text: 'We immediately jump into pragmatic problem-solving mode.',
          score: 2,
          pillarScore: { comm: 2, future: 3 },
        },
        {
          text: 'Communication feels strained on those days, and friction easily builds.',
          score: 1,
          pillarScore: { comm: 1, conflict: 1 },
        },
      ],
    },
  },
  {
    id: 2,
    category: 'conflict',
    fr: {
      question: 'Lors d’un désaccord impromptu, quelle est votre dynamique habituelle ?',
      description: 'La façon dont vous réparez les micro-fissures détermine la longévité du lien.',
      options: [
        {
          text: 'On désamorce rapidement avec bienveillance, parfois une pointe d’humour tendre.',
          score: 4,
          pillarScore: { conflict: 4, comm: 4 },
        },
        {
          text: 'On prend le temps d’exprimer nos ressentis sans crier ni fuir la discussion.',
          score: 4,
          pillarScore: { conflict: 4, comm: 3 },
        },
        {
          text: 'L’un boude ou se renferme un moment avant de pouvoir enfin crever l’abcès.',
          score: 2,
          pillarScore: { conflict: 2, comm: 2 },
        },
        {
          text: 'Le ton monte vite, et les rancœurs anciennes ont tendance à ressortir.',
          score: 1,
          pillarScore: { conflict: 1, comm: 1 },
        },
      ],
    },
    en: {
      question: 'During a sudden disagreement, what is your typical dynamic?',
      description: 'How you repair minor fissures defines the durability of your intimacy.',
      options: [
        {
          text: 'We defuse things quickly with warmth and a touch of gentle humor.',
          score: 4,
          pillarScore: { conflict: 4, comm: 4 },
        },
        {
          text: 'We take the time to voice feelings without shouting or avoidance.',
          score: 4,
          pillarScore: { conflict: 4, comm: 3 },
        },
        {
          text: 'One of us withdraws or pouts for a while before finally clearing the air.',
          score: 2,
          pillarScore: { conflict: 2, comm: 2 },
        },
        {
          text: 'Voices elevate rapidly, and past grievances resurface easily.',
          score: 1,
          pillarScore: { conflict: 1, comm: 1 },
        },
      ],
    },
  },
  {
    id: 3,
    category: 'romance',
    fr: {
      question: 'Au quotidien, comment entretenez-vous la flamme et la tendresse ?',
      description: 'Les rituels d’affection nourrissent la complicité sur le long cours.',
      options: [
        {
          text: 'Petits mots doux, compliments spontanés, baisers volés et dates improvisés réguliers.',
          score: 4,
          pillarScore: { romance: 4, comm: 3 },
        },
        {
          text: 'Des soirées cocooning en tête-à-tête qu’on protège jalousement dans notre agenda.',
          score: 3,
          pillarScore: { romance: 3, future: 3 },
        },
        {
          text: 'Par des gestes pratiques ou des services rendus plutôt que de grands discours.',
          score: 3,
          pillarScore: { romance: 3, comm: 2 },
        },
        {
          text: 'La routine et la fatigue ont tendance à estomper les gestes romantiques ces temps-ci.',
          score: 1,
          pillarScore: { romance: 1, comm: 2 },
        },
      ],
    },
    en: {
      question: 'In day-to-day life, how do you nurture romantic spark and affection?',
      description: 'Daily affectionate micro-rituals sustain deep relational chemistry.',
      options: [
        {
          text: 'Sweet notes, spontaneous praise, stolen kisses, and regular date nights.',
          score: 4,
          pillarScore: { romance: 4, comm: 3 },
        },
        {
          text: 'Cozy one-on-one evenings that we strictly guard in our shared schedule.',
          score: 3,
          pillarScore: { romance: 3, future: 3 },
        },
        {
          text: 'Through helpful acts of service rather than grand romantic speeches.',
          score: 3,
          pillarScore: { romance: 3, comm: 2 },
        },
        {
          text: 'Routine and daily fatigue have dimmed our romantic gestures recently.',
          score: 1,
          pillarScore: { romance: 1, comm: 2 },
        },
      ],
    },
  },
  {
    id: 4,
    category: 'future',
    fr: {
      question: 'Quand vous évoquez l’avenir (voyages, logement, ambitions de vie)...',
      description: 'La concordance des valeurs et des aspirations est essentielle.',
      options: [
        {
          text: 'Nos yeux brillent ! Nos visions s’harmonisent naturellement et on avance main dans la main.',
          score: 4,
          pillarScore: { future: 4, romance: 4 },
        },
        {
          text: 'On discute posément des compromis à faire et on trouve toujours un juste équilibre.',
          score: 3,
          pillarScore: { future: 3, comm: 4 },
        },
        {
          text: 'On vit plutôt au jour le jour sans trop se projeter au-delà des prochains mois.',
          score: 2,
          pillarScore: { future: 2, romance: 3 },
        },
        {
          text: 'Certaines divergences fondamentales créent de l’appréhension quand on en parle.',
          score: 1,
          pillarScore: { future: 1, conflict: 2 },
        },
      ],
    },
    en: {
      question: 'When you talk about the future (travel, home, life goals)...',
      description: 'Aligned values and shared milestones provide security and inspiration.',
      options: [
        {
          text: 'Our eyes light up! Our visions synchronize smoothly and we build hand in hand.',
          score: 4,
          pillarScore: { future: 4, romance: 4 },
        },
        {
          text: 'We calmly discuss constructive compromises and reliably strike a healthy balance.',
          score: 3,
          pillarScore: { future: 3, comm: 4 },
        },
        {
          text: 'We live largely in the present without projecting too far past next month.',
          score: 2,
          pillarScore: { future: 2, romance: 3 },
        },
        {
          text: 'Certain core disagreements trigger hesitation whenever future topics arise.',
          score: 1,
          pillarScore: { future: 1, conflict: 2 },
        },
      ],
    },
  },
  {
    id: 5,
    category: 'comm',
    fr: {
      question: 'À quel point vous sentez-vous libre d’être 100% vous-même avec l’autre ?',
      description: 'La vulnérabilité en sécurité est la marque d’un amour authentique.',
      options: [
        {
          text: 'Totalement libre, même dans mes moments les plus vulnérables ou loufoques.',
          score: 4,
          pillarScore: { comm: 4, romance: 4 },
        },
        {
          text: 'Très à l’aise, bien que j’aie parfois peur de décevoir ou d’être jugé(e).',
          score: 3,
          pillarScore: { comm: 3, conflict: 3 },
        },
        {
          text: 'Je garde un petit jardin secret et certaines insécurités pour moi-même.',
          score: 2,
          pillarScore: { comm: 2, conflict: 3 },
        },
        {
          text: 'J’ai souvent l’impression de devoir porter un masque pour préserver la paix.',
          score: 1,
          pillarScore: { comm: 1, conflict: 1 },
        },
      ],
    },
    en: {
      question: 'How comfortable are you being 100% yourself around your partner?',
      description: 'Emotional safety to be vulnerable is the hallmark of enduring love.',
      options: [
        {
          text: 'Entirely free, even in my silliest, most vulnerable moments.',
          score: 4,
          pillarScore: { comm: 4, romance: 4 },
        },
        {
          text: 'Very comfortable, although I occasionally fear disappointing them.',
          score: 3,
          pillarScore: { comm: 3, conflict: 3 },
        },
        {
          text: 'I keep a private internal garden and certain insecurities to myself.',
          score: 2,
          pillarScore: { comm: 2, conflict: 3 },
        },
        {
          text: 'I often feel compelled to wear a mask to preserve the peace.',
          score: 1,
          pillarScore: { comm: 1, conflict: 1 },
        },
      ],
    },
  },
  {
    id: 6,
    category: 'romance',
    fr: {
      question: 'Quelle place accordez-vous aux rires et à l’amusement partagé ?',
      description: 'L’amitié amoureuse et la légèreté protègent le couple de l’usure.',
      options: [
        {
          text: 'On a des fous rires constants, nos « private jokes » et une vraie complicité complice.',
          score: 4,
          pillarScore: { romance: 4, comm: 4 },
        },
        {
          text: 'On partage de super moments détente chaque semaine dès qu’on décroche du travail.',
          score: 3,
          pillarScore: { romance: 3, comm: 3 },
        },
        {
          text: 'On rigole bien mais les responsabilités prennent souvent le dessus.',
          score: 2,
          pillarScore: { romance: 2, future: 3 },
        },
        {
          text: 'L’ambiance est devenue un peu trop sérieuse et fonctionnelle au quotidien.',
          score: 1,
          pillarScore: { romance: 1, comm: 2 },
        },
      ],
    },
    en: {
      question: 'What role do shared laughter and playfulness play in your dynamic?',
      description: 'Romantic friendship and lighthearted levity protect against relationship fatigue.',
      options: [
        {
          text: 'Endless shared laughter, inside jokes, and an effortless playful camaraderie.',
          score: 4,
          pillarScore: { romance: 4, comm: 4 },
        },
        {
          text: 'We enjoy wonderful relaxing times each week whenever we unplug from work.',
          score: 3,
          pillarScore: { romance: 3, comm: 3 },
        },
        {
          text: 'We share good laughs, but logistics and duties often dominate our headspace.',
          score: 2,
          pillarScore: { romance: 2, future: 3 },
        },
        {
          text: 'The atmosphere has drifted towards being strictly operational and serious.',
          score: 1,
          pillarScore: { romance: 1, comm: 2 },
        },
      ],
    },
  },
  {
    id: 7,
    category: 'conflict',
    fr: {
      question: 'Concernant l’autonomie et les sorties entre amis de chacun :',
      description: 'L’équilibre entre fusion et respiration personnelle est la clé de la longévité.',
      options: [
        {
          text: 'Totale confiance et encouragements mutuels ! Chacun s’épanouit sans jalousie toxique.',
          score: 4,
          pillarScore: { conflict: 4, comm: 4 },
        },
        {
          text: 'On a nos propres passions tout en se tenant gentiment au courant.',
          score: 3,
          pillarScore: { conflict: 3, romance: 3 },
        },
        {
          text: 'Il y a parfois de légères pointes de possessivité ou de petites réticences.',
          score: 2,
          pillarScore: { conflict: 2, comm: 2 },
        },
        {
          text: 'Les sorties séparées sont souvent source de tensions ou de reproches.',
          score: 1,
          pillarScore: { conflict: 1, comm: 1 },
        },
      ],
    },
    en: {
      question: 'Regarding individual independence and personal hobbies/friendships:',
      description: 'The balance between togetherness and individual breath is essential.',
      options: [
        {
          text: 'Complete trust and enthusiastic cheerleading! No toxic jealousy.',
          score: 4,
          pillarScore: { conflict: 4, comm: 4 },
        },
        {
          text: 'We cultivate distinct passions while keeping each other warmly posted.',
          score: 3,
          pillarScore: { conflict: 3, romance: 3 },
        },
        {
          text: 'Occasional mild possessiveness or hesitation surfaces occasionally.',
          score: 2,
          pillarScore: { conflict: 2, comm: 2 },
        },
        {
          text: 'Solo outings frequently spark friction, suspicion, or quiet resentment.',
          score: 1,
          pillarScore: { conflict: 1, comm: 1 },
        },
      ],
    },
  },
  {
    id: 8,
    category: 'future',
    fr: {
      question: 'Face aux choix financiers ou aux investissements du couple :',
      description: 'L’argent est un révélateur des priorités de vie et du sentiment de sécurité.',
      options: [
        {
          text: 'Transparence totale, confiance absolue et objectifs budgétaires clairs et partagés.',
          score: 4,
          pillarScore: { future: 4, comm: 4 },
        },
        {
          text: 'Chacun gère son argent avec une répartition équitable pour les charges communes.',
          score: 3,
          pillarScore: { future: 3, conflict: 3 },
        },
        {
          text: 'C’est un sujet parfois un peu délicat qu’on évite d’aborder trop souvent.',
          score: 2,
          pillarScore: { future: 2, comm: 2 },
        },
        {
          text: 'C’est une source régulière de reproches ou d’inégalités ressenties.',
          score: 1,
          pillarScore: { future: 1, conflict: 1 },
        },
      ],
    },
    en: {
      question: 'When handling financial decisions or long-term investments:',
      description: 'Money patterns often mirror deep life priorities and feelings of security.',
      options: [
        {
          text: 'Total transparency, grounded mutual trust, and clear shared budgetary goals.',
          score: 4,
          pillarScore: { future: 4, comm: 4 },
        },
        {
          text: 'Each manages their own account with an equitable split for joint expenses.',
          score: 3,
          pillarScore: { future: 3, conflict: 3 },
        },
        {
          text: 'It is occasionally an awkward topic that we prefer not to delve into too often.',
          score: 2,
          pillarScore: { future: 2, comm: 2 },
        },
        {
          text: 'It triggers recurring friction or perceived imbalance between us.',
          score: 1,
          pillarScore: { future: 1, conflict: 1 },
        },
      ],
    },
  },
  {
    id: 9,
    category: 'romance',
    fr: {
      question: 'Votre alchimie sensorielle et vos gestes de tendresse intime :',
      description: 'La connexion tactile et la tendresse complice rechargent la sécurité affective.',
      options: [
        {
          text: 'Un magnétisme vibrant et un dialogue ouvert et sans tabou sur nos envies.',
          score: 4,
          pillarScore: { romance: 4, comm: 4 },
        },
        {
          text: 'Une belle intimité réconfortante qui évolue au gré de nos rythmes de vie.',
          score: 3,
          pillarScore: { romance: 3, conflict: 3 },
        },
        {
          text: 'Des hauts et des bas selon le stress, on aimerait y consacrer plus de temps.',
          score: 2,
          pillarScore: { romance: 2, future: 2 },
        },
        {
          text: 'Une distance s’est installée et on a du mal à en parler ouvertement.',
          score: 1,
          pillarScore: { romance: 1, comm: 1 },
        },
      ],
    },
    en: {
      question: 'Your sensory chemistry and intimate moments of tenderness:',
      description: 'Tactile affection and shared physical warmth replenish emotional reassurance.',
      options: [
        {
          text: 'Vibrant magnetic chemistry and open, candid communication about our desires.',
          score: 4,
          pillarScore: { romance: 4, comm: 4 },
        },
        {
          text: 'Comforting, reassuring intimacy that flows naturally with our weekly rhythm.',
          score: 3,
          pillarScore: { romance: 3, conflict: 3 },
        },
        {
          text: 'Ups and downs depending on stress levels; we wish we made more time for it.',
          score: 2,
          pillarScore: { romance: 2, future: 2 },
        },
        {
          text: 'A growing emotional and physical distance that feels tricky to talk through.',
          score: 1,
          pillarScore: { romance: 1, comm: 1 },
        },
      ],
    },
  },
  {
    id: 10,
    category: 'comm',
    fr: {
      question: 'Si vous deviez résumer la force motrice de votre relation en un mot :',
      description: 'Ce mot illustre le cœur vibrant de votre promesse commune.',
      options: [
        {
          text: '« Inconditionnelle » — On forme une équipe soudée prête à traverser n’importe quelle tempête.',
          score: 4,
          pillarScore: { comm: 4, future: 4, romance: 4 },
        },
        {
          text: '« Apaisante » — C’est un havre de paix où je recharge mes batteries en toute quiétude.',
          score: 3,
          pillarScore: { comm: 3, romance: 3 },
        },
        {
          text: '« Passionnée » — Intense et palpitante, même si ça fait parfois des étincelles !',
          score: 3,
          pillarScore: { romance: 4, conflict: 2 },
        },
        {
          text: '« En questionnement » — On cherche notre nouvel équilibre pour continuer à avancer.',
          score: 1,
          pillarScore: { comm: 2, future: 2 },
        },
      ],
    },
    en: {
      question: 'If you had to capture the driving anchor of your partnership in one word:',
      description: 'This word mirrors the beating heart of your mutual pledge.',
      options: [
        {
          text: '“Unconditional” — We are an unbreakable team ready to weather any storm together.',
          score: 4,
          pillarScore: { comm: 4, future: 4, romance: 4 },
        },
        {
          text: '“Peaceful” — A sanctuary where I rest and recharge in total tranquility.',
          score: 3,
          pillarScore: { comm: 3, romance: 3 },
        },
        {
          text: '“Passionate” — Thrilling and intense, even when fireworks spark occasionally!',
          score: 3,
          pillarScore: { romance: 4, conflict: 2 },
        },
        {
          text: '“In Transition” — We are actively navigating a new rhythm to move forward.',
          score: 1,
          pillarScore: { comm: 2, future: 2 },
        },
      ],
    },
  },
  {
    id: 11,
    category: 'romance',
    fr: {
      question: 'Au milieu de vos semaines chargées, comment préservez-vous la complicité et le rire ?',
      description: 'L’humour et les clins d’œil spontanés allègent la charge mentale du quotidien.',
      options: [
        {
          text: 'On a nos rituels sacrés : des fous rires partagés, des surnoms secrets et des petites attentions chaque jour.',
          score: 4,
          pillarScore: { romance: 4, comm: 3 },
        },
        {
          text: 'On s’octroie un moment déconnecté en soirée ou le week-end pour vraiment décompresser ensemble.',
          score: 3,
          pillarScore: { romance: 3, future: 3 },
        },
        {
          text: 'C’est parfois difficile avec le rythme du travail, mais on essaie de garder le lien.',
          score: 2,
          pillarScore: { romance: 2, comm: 2 },
        },
        {
          text: 'La fatigue prend souvent le dessus et on oublie un peu de rigoler ensemble ces temps-ci.',
          score: 1,
          pillarScore: { romance: 1 },
        },
      ],
    },
    en: {
      question: 'Amid busy work weeks, how do you sustain playful banter and laughter together?',
      description: 'Spontaneous humor and shared jokes relieve the weight of daily routines.',
      options: [
        {
          text: 'We have our sacred rituals: daily inside jokes, warm nicknames, and playful surprises.',
          score: 4,
          pillarScore: { romance: 4, comm: 3 },
        },
        {
          text: 'We intentionally protect disconnected time in the evenings or weekends to truly unwind.',
          score: 3,
          pillarScore: { romance: 3, future: 3 },
        },
        {
          text: 'It can be challenging with work schedules, but we genuinely try to stay connected.',
          score: 2,
          pillarScore: { romance: 2, comm: 2 },
        },
        {
          text: 'Exhaustion often takes over, leaving little room for laughter and lighthearted fun lately.',
          score: 1,
          pillarScore: { romance: 1 },
        },
      ],
    },
  },
  {
    id: 12,
    category: 'conflict',
    fr: {
      question: 'Après une vive dispute ou un moment de froid, comment renouez-vous le lien ?',
      description: 'La capacité de réconciliation rapide protège l’estime et l’attachement mutuel.',
      options: [
        {
          text: 'L’un de nous fait le premier pas avec tendresse ou autodérision, on s’excuse sincèrement et on repart plus forts.',
          score: 4,
          pillarScore: { conflict: 4, comm: 4 },
        },
        {
          text: 'On laisse retomber la pression quelques heures, puis on s’explique posément autour d’un thé.',
          score: 3,
          pillarScore: { conflict: 3, comm: 3 },
        },
        {
          text: 'On fait comme si de rien n’était après quelques heures, sans toujours vider l’abcès.',
          score: 2,
          pillarScore: { conflict: 2 },
        },
        {
          text: 'La bouderie ou le silence pesant durent plusieurs jours avant qu’on ne reparle.',
          score: 1,
          pillarScore: { conflict: 1, comm: 1 },
        },
      ],
    },
    en: {
      question: 'Following a tense disagreement or cold silence, how do you reconnect?',
      description: 'The ability to make swift repair attempts safeguards long-term emotional security.',
      options: [
        {
          text: 'One of us reaches out with warm vulnerability, we apologize sincerely and move forward stronger.',
          score: 4,
          pillarScore: { conflict: 4, comm: 4 },
        },
        {
          text: 'We let emotions cool down for a few hours, then talk things through calmly over tea.',
          score: 3,
          pillarScore: { conflict: 3, comm: 3 },
        },
        {
          text: 'We act as if nothing happened after a while, without truly unpacking the root issue.',
          score: 2,
          pillarScore: { conflict: 2 },
        },
        {
          text: 'Cold silences linger for days before either of us breaks down the wall.',
          score: 1,
          pillarScore: { conflict: 1, comm: 1 },
        },
      ],
    },
  },
  {
    id: 13,
    category: 'future',
    fr: {
      question: 'Quand vous imaginez votre foyer et votre style de vie dans les prochaines années :',
      description: 'L’harmonie sur le rythme de vie et les priorités concrétise le projet de couple.',
      options: [
        {
          text: 'On est sur la même longueur d’onde sur nos priorités, notre lieu de vie et nos ambitions.',
          score: 4,
          pillarScore: { future: 4, comm: 3 },
        },
        {
          text: 'On a des tempéraments un peu différents, mais on trouve de super compromis qui nous stimulent.',
          score: 3,
          pillarScore: { future: 3, conflict: 3 },
        },
        {
          text: 'On évite parfois d’aborder les sujets profonds de peur de découvrir des désaccords.',
          score: 2,
          pillarScore: { future: 2, comm: 2 },
        },
        {
          text: 'Nos visions respectives semblent aujourd’hui tirer dans des directions opposées.',
          score: 1,
          pillarScore: { future: 1 },
        },
      ],
    },
    en: {
      question: 'When picturing your home environment and lifestyle in the coming years:',
      description: 'Alignment on day-to-day priorities and life aspirations solidifies your path.',
      options: [
        {
          text: 'We share identical enthusiasm regarding where we want to live and how we invest our time.',
          score: 4,
          pillarScore: { future: 4, comm: 3 },
        },
        {
          text: 'We have slightly different personal tastes, but we craft stimulating win-win compromises.',
          score: 3,
          pillarScore: { future: 3, conflict: 3 },
        },
        {
          text: 'We occasionally bypass deep long-term chats out of fear of uncovering discrepancies.',
          score: 2,
          pillarScore: { future: 2, comm: 2 },
        },
        {
          text: 'Our life visions feel as though they are diverging in incompatible directions right now.',
          score: 1,
          pillarScore: { future: 1 },
        },
      ],
    },
  },
  {
    id: 14,
    category: 'comm',
    fr: {
      question: 'Face à un doute personnel, une vulnérabilité ou un coup dur :',
      description: 'La sécurité psychologique est la marque d’un amour mature et durable.',
      options: [
        {
          text: 'Je peux tout lui confier sans masque ni pudeur excessive : je me sens 100% accepté(e).',
          score: 4,
          pillarScore: { comm: 4, romance: 4 },
        },
        {
          text: 'J’en parle avec confiance, même s’il me faut parfois un petit temps de réflexion avant.',
          score: 3,
          pillarScore: { comm: 3, conflict: 3 },
        },
        {
          text: 'Je garde certaines inquiétudes pour moi pour ne pas inquiéter ou agacer mon partenaire.',
          score: 2,
          pillarScore: { comm: 2 },
        },
        {
          text: 'J’ai peur d’être jugé(e) ou incompris(e) si je montre mes faiblesses.',
          score: 1,
          pillarScore: { comm: 1 },
        },
      ],
    },
    en: {
      question: 'When experiencing a personal vulnerability, inner doubt, or difficult hardship:',
      description: 'Emotional safety and freedom from judgment define deep, lasting intimacy.',
      options: [
        {
          text: 'I can confide everything raw and unfiltered: I feel completely seen, embraced, and safe.',
          score: 4,
          pillarScore: { comm: 4, romance: 4 },
        },
        {
          text: 'I share openly with trust, even if I need a short personal pause before talking.',
          score: 3,
          pillarScore: { comm: 3, conflict: 3 },
        },
        {
          text: 'I hold certain worries inside to avoid burdening or stressing my partner.',
          score: 2,
          pillarScore: { comm: 2 },
        },
        {
          text: 'I fear being judged or misunderstood if I reveal my insecurities and flaws.',
          score: 1,
          pillarScore: { comm: 1 },
        },
      ],
    },
  },
  {
    id: 15,
    category: 'romance',
    fr: {
      question: 'Quand l’un de vous réalise un succès personnel ou réalise un rêve :',
      description: 'La réjouissance mutuelle (la « résonance positive ») magnifie le bonheur conjugal.',
      options: [
        {
          text: 'C’est une joie immense et partagée ! On célèbre ça comme une victoire d’équipe avec enthousiasme.',
          score: 4,
          pillarScore: { romance: 4, future: 4 },
        },
        {
          text: 'On est sincèrement fier l’un de l’autre et on marque le coup avec un petit dîner sympa.',
          score: 3,
          pillarScore: { romance: 3, future: 3 },
        },
        {
          text: 'On est content, mais le train-train quotidien prend vite le dessus sur la fête.',
          score: 2,
          pillarScore: { romance: 2 },
        },
        {
          text: 'Une pointe de rivalité ou de distance peut parfois assombrir la célébration.',
          score: 1,
          pillarScore: { romance: 1, conflict: 1 },
        },
      ],
    },
    en: {
      question: 'When one of you accomplishes a milestone or reaches an individual ambition:',
      description: 'Active-constructive celebration (“compersion”) is a profound amplifier of connection.',
      options: [
        {
          text: 'Immense, ecstatic joint celebration! We cheer as a united team with genuine pride.',
          score: 4,
          pillarScore: { romance: 4, future: 4 },
        },
        {
          text: 'We are genuinely proud of one another and mark the occasion with a warm celebratory meal.',
          score: 3,
          pillarScore: { romance: 3, future: 3 },
        },
        {
          text: 'We are happy, though everyday routines quickly push celebration aside.',
          score: 2,
          pillarScore: { romance: 2 },
        },
        {
          text: 'Underlying tension, rivalry, or indifference occasionally dampens the milestone.',
          score: 1,
          pillarScore: { romance: 1, conflict: 1 },
        },
      ],
    },
  },
];

export interface ArchetypeResult {
  id: string;
  badgeFr: string;
  badgeEn: string;
  titleFr: string;
  titleEn: string;
  taglineFr: string;
  taglineEn: string;
  descFr: string;
  descEn: string;
  strengthsFr: string[];
  strengthsEn: string[];
  growthFr: string[];
  growthEn: string[];
  color: string;
  accentBg: string;
}

export const ARCHETYPES: ArchetypeResult[] = [
  {
    id: 'soulmates',
    badgeFr: 'Les Âmes Sœurs Fusionnelles ✨',
    badgeEn: 'The Intuitive Soulmates ✨',
    titleFr: 'Une complicité rare et instinctive',
    titleEn: 'A rare, instinctive complicity',
    taglineFr: 'Votre alchimie émotionnelle dépasse la moyenne de 92% des couples testés.',
    taglineEn: 'Your emotional chemistry outperforms 92% of tested couples.',
    descFr: 'Vous bénéficiez d’une écoute exceptionnelle, d’une télépathie romantique au quotidien et d’un respect inconditionnel. Vous formez une équipe redoutable où chacun sublime la liberté de l’autre.',
    descEn: 'You share deep intuitive listening, day-to-day romantic synchrony, and unconditional respect. You function as an extraordinary team where mutual freedom elevates both partners.',
    strengthsFr: ['Empathie spontanée', 'Résolution bienveillante des conflits', 'Vision d’avenir parfaitement alignée'],
    strengthsEn: ['Spontaneous empathy', 'Gentle conflict resolution', 'Seamlessly aligned future aspirations'],
    growthFr: ['Pensez à préserver vos temps d’indépendance solo pour maintenir le désir vif', 'Osez exprimer les micro-frustrations avant qu’elles ne s’accumulent'],
    growthEn: ['Protect solo personal time to keep romantic longing fresh', 'Voice tiny micro-frustrations promptly before they simmer'],
    color: '#FF6B8A',
    accentBg: '#FFF0F3',
  },
  {
    id: 'explorers',
    badgeFr: 'Les Aventuriers Passionnés 🔥',
    badgeEn: 'The Passionate Explorers 🔥',
    titleFr: 'Une flamme vive et stimulante',
    titleEn: 'A bright, stimulating flame',
    taglineFr: 'Votre relation carbure à l’intensité, aux défis et au renouveau.',
    taglineEn: 'Your bond thrives on excitement, shared adventures, and reinvention.',
    descFr: 'Jamais d’ennui entre vous ! Votre dynamique est palpitante, pleine d’humour et d’idées folles. La passion est votre moteur premier et vous adorez vous surprendre mutuellement.',
    descEn: 'Never a dull moment! Your dynamic is magnetic, humorous, and daring. Passion is your primary fuel and you relish surprising one another on a weekly basis.',
    strengthsFr: ['Énergie romantique débordante', 'Capacité à casser la routine', 'Soutien audacieux des rêves de l’autre'],
    strengthsEn: ['Vibrant romantic energy', 'Natural ability to bust daily routine', 'Bold cheerleading of each other’s ambitions'],
    growthFr: ['Soignez les discussions calmes lors des moments de fatigue', 'Ne confondez pas le calme serein avec le manque d’amour'],
    growthEn: ['Prioritize gentle, non-reactive communication when tired', 'Do not mistake serene tranquility for a lack of love'],
    color: '#FF6B8A',
    accentBg: '#FFF4D6',
  },
  {
    id: 'balanced',
    badgeFr: 'Le Duo Complice & Équilibré 🌿',
    badgeEn: 'The Balanced & Grounded Duo 🌿',
    titleFr: 'Un ancrage solide et sécurisant',
    titleEn: 'A steady, reassuring anchor',
    taglineFr: 'Vous avez bâti un refuge d’amour doux, respectueux et durable.',
    taglineEn: 'You have built a peaceful sanctuary of gentle, respectful, long-lasting love.',
    descFr: 'Votre force réside dans la clarté de votre communication et la confiance mutuelle. Vous savez naviguer les aléas du quotidien avec pragmatisme tout en protégeant votre tendresse.',
    descEn: 'Your strength stems from emotional clarity and grounded trust. You navigate the bumps of daily living pragmatically while safeguarding tender affection.',
    strengthsFr: ['Confiance mutuelle inébranlable', 'Équilibre parfait vie de couple / vie personnelle', 'Gestion mature et apaisée des finances'],
    strengthsEn: ['Unshakeable mutual trust', 'Healthy balance between couple and personal life', 'Mature and serene financial harmony'],
    growthFr: ['Réinjectez des surprises et des dates insolites pour secouer la douce routine', 'Exprimez plus souvent vos compliments à voix haute'],
    growthEn: ['Inject spontaneous date nights to playfully rattle cozy routine', 'Vocalize compliments and appreciation out loud more often'],
    color: '#3B82F6',
    accentBg: '#D6F0FF',
  },
  {
    id: 'builders',
    badgeFr: 'Les Bâtisseurs de Bonheur 🏛️',
    badgeEn: 'The Steadfast Dream Builders 🏛️',
    titleFr: 'Une alliance loyale prête à tout bâtir',
    titleEn: 'A loyal partnership built to last',
    taglineFr: 'Votre dévouement et vos projets communs constituent votre plus grand trésor.',
    taglineEn: 'Your loyalty and concrete shared milestones are your greatest asset.',
    descFr: 'Vous partagez le sens de l’effort partagé et du soutien sans faille. Rien n’est laissé au hasard, vous avancez pas à pas vers un foyer chaleureux et épanouissant.',
    descEn: 'You embody deep loyalty, shared accountability, and steadfast devotion. Step by step, you are co-crafting a joyful, flourishing home and life journey.',
    strengthsFr: ['Fiabilité exemplaire', 'Projets d’avenir concrets et coordonnés', 'Solidarité familiale et matérielle'],
    strengthsEn: ['Exemplary reliability', 'Concrete, coordinated life milestones', 'Strong family and supportive solidarity'],
    growthFr: ['Accordez-vous le droit de lâcher prise sans penser aux tâches', 'Misez sur le jeu et l’insouciance à deux'],
    growthEn: ['Give yourselves permission to let go without tracking chores', 'Cultivate lighthearted silliness and carefree moments together'],
    color: '#10B981',
    accentBg: '#FFE4EC',
  },
];
