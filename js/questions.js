/**
 * LoveQuiz — Banque Complète de Questions Bilingue (FR / EN)
 * 10 Catégories x 10 Questions = 100 Questions de haute précision psychologique
 * Scores de 0 (très problématique) à 3 (très sain / constructif)
 */

const questions = [
  // =========================================================================
  // 1. COMMUNICATION (IDs 1 - 10)
  // =========================================================================
  {
    id: 1,
    category: "communication",
    text: {
      fr: "Quand votre partenaire vous parle d'un problème personnel, vous...",
      en: "When your partner talks to you about a personal problem, you..."
    },
    options: [
      { id: "A", text: { fr: "Écoutez activement avec empathie, sans chercher à juger", en: "Listen actively with empathy, without judgment" }, score: 3 },
      { id: "B", text: { fr: "Cherchez immédiatement des solutions pratiques", en: "Immediately search for practical solutions" }, score: 2 },
      { id: "C", text: { fr: "Ramenez la discussion à votre propre expérience", en: "Bring the conversation back to your own experience" }, score: 1 },
      { id: "D", text: { fr: "Minimisez l'importance du souci pour le rassurer", en: "Minimize the issue to reassure them" }, score: 1 }
    ]
  },
  {
    id: 2,
    category: "communication",
    text: {
      fr: "Vous préférez discuter des sujets difficiles...",
      en: "You prefer to discuss difficult topics..."
    },
    options: [
      { id: "A", text: { fr: "Dans un moment de calme dédié, en face à face", en: "In a dedicated calm moment, face to face" }, score: 3 },
      { id: "B", text: { fr: "Sur le vif, dès que la gêne apparaît", en: "Right on the spot, as soon as discomfort arises" }, score: 2 },
      { id: "C", text: { fr: "Par message ou écrit pour mieux poser vos idées", en: "Through text or writing to gather thoughts" }, score: 2 },
      { id: "D", text: { fr: "Le plus tard possible en espérant que ça se tasse", en: "As late as possible hoping it fades away" }, score: 0 }
    ]
  },
  {
    id: 3,
    category: "communication",
    text: {
      fr: "Votre partenaire ne comprend pas votre point de vue. Vous...",
      en: "Your partner doesn't understand your point of view. You..."
    },
    options: [
      { id: "A", text: { fr: "Reformulez calmement avec d'autres mots et des exemples", en: "Rephrase calmly with other words and examples" }, score: 3 },
      { id: "B", text: { fr: "Demandez ce qui bloque précisément dans sa compréhension", en: "Ask what specifically is unclear in their view" }, score: 3 },
      { id: "C", text: { fr: "Montez d'un ton pour appuyer vos arguments", en: "Raise your tone to press your arguments" }, score: 1 },
      { id: "D", text: { fr: "Laissez tomber avec agacement en vous renfermant", en: "Drop it with frustration and withdraw" }, score: 0 }
    ]
  },
  {
    id: 4,
    category: "communication",
    text: {
      fr: "Vous exprimez vos émotions...",
      en: "You express your emotions..."
    },
    options: [
      { id: "A", text: { fr: "En disant 'Je ressens...' sans accuser l'autre", en: "By saying 'I feel...' without accusing them" }, score: 3 },
      { id: "B", text: { fr: "Assez spontanément, parfois avec excès d'intensité", en: "Spontaneously, sometimes with high intensity" }, score: 2 },
      { id: "C", text: { fr: "Uniquement quand la coupe est totalement pleine", en: "Only when the emotional cup overflows" }, score: 1 },
      { id: "D", text: { fr: "Par le silence ou des mimiques boudeuses", en: "Through silence or sullen facial expressions" }, score: 0 }
    ]
  },
  {
    id: 5,
    category: "communication",
    text: {
      fr: "Quand vous êtes en désaccord, vous...",
      en: "When you disagree, you..."
    },
    options: [
      { id: "A", text: { fr: "Cherchez un terrain d'entente respectueux des deux", en: "Seek common ground respectful of both sides" }, score: 3 },
      { id: "B", text: { fr: "Admettez que vous puissiez voir les choses différemment", en: "Agree to disagree peacefully" }, score: 3 },
      { id: "C", text: { fr: "Voulez absolument avoir le dernier mot", en: "Insist on having the last word" }, score: 1 },
      { id: "D", text: { fr: "Faites semblant d'être d'accord pour avoir la paix", en: "Pretend to agree just to keep the peace" }, score: 1 }
    ]
  },
  {
    id: 6,
    category: "communication",
    text: {
      fr: "Votre partenaire a besoin de parler d'un sujet lourd. Vous...",
      en: "Your partner needs to talk about a heavy topic. You..."
    },
    options: [
      { id: "A", text: { fr: "Coupez vos écrans et lui offrez votre présence totale", en: "Turn off screens and offer full presence" }, score: 3 },
      { id: "B", text: { fr: "L'écoutez tout en continuant doucement vos tâches", en: "Listen while quietly finishing current tasks" }, score: 2 },
      { id: "C", text: { fr: "Remettez la discussion à plus tard par fatigue", en: "Postpone the talk due to fatigue" }, score: 1 },
      { id: "D", text: { fr: "Soupirez en qualifiant le sujet de prise de tête", en: "Sigh and dismiss it as unnecessary drama" }, score: 0 }
    ]
  },
  {
    id: 7,
    category: "communication",
    text: {
      fr: "Vous partagez vos pensées intimes...",
      en: "You share your intimate thoughts..."
    },
    options: [
      { id: "A", text: { fr: "Avec une confiance totale et sans retenue", en: "With complete confidence and uninhibited trust" }, score: 3 },
      { id: "B", text: { fr: "Assez facilement sur l'essentiel", en: "Quite easily on most core matters" }, score: 2 },
      { id: "C", text: { fr: "Seulement si votre partenaire insiste avec douceur", en: "Only if your partner gently asks first" }, score: 2 },
      { id: "D", text: { fr: "Presque jamais, par pudeur ou peur du jugement", en: "Almost never, due to shyness or fear of judgment" }, score: 1 }
    ]
  },
  {
    id: 8,
    category: "communication",
    text: {
      fr: "Quand votre partenaire formule une critique constructive, vous...",
      en: "When your partner offers constructive criticism, you..."
    },
    options: [
      { id: "A", text: { fr: "Réfléchissez au fond du message avec ouverture", en: "Reflect on the substance with an open mind" }, score: 3 },
      { id: "B", text: { fr: "Demandez des précisions pour mieux comprendre", en: "Ask for clarification to understand better" }, score: 3 },
      { id: "C", text: { fr: "Vous justifiez immédiatement pour vous défendre", en: "Immediately justify yourself defensively" }, score: 1 },
      { id: "D", text: { fr: "Répliquez par une critique en retour", en: "Counterattack with a criticism of your own" }, score: 0 }
    ]
  },
  {
    id: 9,
    category: "communication",
    text: {
      fr: "Vous pratiquez l'écoute active en...",
      en: "You practice active listening by..."
    },
    options: [
      { id: "A", text: { fr: "Validant ses ressentis sans l'interrompre", en: "Validating their feelings without interrupting" }, score: 3 },
      { id: "B", text: { fr: "Posant des questions ouvertes pour creuser", en: "Asking open-ended questions to explore deeper" }, score: 3 },
      { id: "C", text: { fr: "Donnant votre avis avant qu'il/elle n'ait terminé", en: "Giving advice before they finish speaking" }, score: 1 },
      { id: "D", text: { fr: "Acquiesçant mécaniquement la tête dans vos pensées", en: "Nodding along while lost in your own thoughts" }, score: 1 }
    ]
  },
  {
    id: 10,
    category: "communication",
    text: {
      fr: "Vous exprimez votre gratitude et vos mercis...",
      en: "You express your gratitude and appreciation..."
    },
    options: [
      { id: "A", text: { fr: "Tous les jours, pour les petites comme les grandes choses", en: "Every day, for both small and big things" }, score: 3 },
      { id: "B", text: { fr: "Régulièrement, quand un geste vous touche particulièrement", en: "Regularly, whenever a gesture touches you" }, score: 2 },
      { id: "C", text: { fr: "Rarement, car vous trouvez que cela va de soi", en: "Rarely, as you feel it goes without saying" }, score: 1 },
      { id: "D", text: { fr: "Uniquement lors d'occasions formelles", en: "Only on formal occasions" }, score: 1 }
    ]
  },

  // =========================================================================
  // 2. VALUES — VALEURS (IDs 11 - 20)
  // =========================================================================
  {
    id: 11,
    category: "values",
    text: {
      fr: "Vos valeurs fondamentales dans la vie sont...",
      en: "Your core values in life are..."
    },
    options: [
      { id: "A", text: { fr: "Parfaitement claires et partagées avec votre partenaire", en: "Crystal clear and warmly shared with your partner" }, score: 3 },
      { id: "B", text: { fr: "En grande partie concordantes avec quelques nuances", en: "Mostly matching with a few healthy nuances" }, score: 3 },
      { id: "C", text: { fr: "Encore en cours de définition au fil du temps", en: "Still being explored and clarified over time" }, score: 2 },
      { id: "D", text: { fr: "Assez opposées, ce qui crée des tensions de fond", en: "Quite divergent, causing recurring fundamental friction" }, score: 0 }
    ]
  },
  {
    id: 12,
    category: "values",
    text: {
      fr: "L'importance de la dimension spirituelle ou religieuse dans votre vie...",
      en: "The importance of spiritual or religious beliefs in your life..."
    },
    options: [
      { id: "A", text: { fr: "Est respectée mutuellement, qu'elle soit partagée ou non", en: "Is mutually respected, whether shared or not" }, score: 3 },
      { id: "B", text: { fr: "Est alignée et renforce notre complicité quotidienne", en: "Is aligned and deepens our everyday connection" }, score: 3 },
      { id: "C", text: { fr: "Est un sujet discret que nous abordons peu", en: "Is a private topic we seldom bring up" }, score: 2 },
      { id: "D", text: { fr: "Crée des incompréhensions ou des jugements mutuels", en: "Causes misunderstandings or mutual judgment" }, score: 0 }
    ]
  },
  {
    id: 13,
    category: "values",
    text: {
      fr: "Votre vision du succès et de la réussite...",
      en: "Your vision of success and achievement..."
    },
    options: [
      { id: "A", text: { fr: "Place l'épanouissement personnel et le couple en priorité", en: "Prioritizes personal fulfillment and relationship harmony" }, score: 3 },
      { id: "B", text: { fr: "Équilibre ambitions professionnelles et sérénité de vie", en: "Balances professional ambition and peace of mind" }, score: 3 },
      { id: "C", text: { fr: "Se mesure surtout aux revenus et au statut social", en: "Is mainly measured by income and social status" }, score: 1 },
      { id: "D", text: { fr: "Est floue et crée un décalage d'énergie avec l'autre", en: "Is unclear, causing energy mismatches with partner" }, score: 1 }
    ]
  },
  {
    id: 14,
    category: "values",
    text: {
      fr: "L'importance accordée à la bienveillance et à la solidarité...",
      en: "The importance given to kindness and community support..."
    },
    options: [
      { id: "A", text: { fr: "Un pilier quotidien qui guide nos actions et nos choix", en: "A daily pillar guiding our actions and life choices" }, score: 3 },
      { id: "B", text: { fr: "Une valeur forte que nous cultivons à notre rythme", en: "A strong value we cultivate at our own pace" }, score: 2 },
      { id: "C", text: { fr: "Secondaire par rapport à la réussite individuelle", en: "Secondary compared to individual achievement" }, score: 1 },
      { id: "D", text: { fr: "Rarement prise en compte dans notre quotidien", en: "Rarely factored into daily considerations" }, score: 1 }
    ]
  },
  {
    id: 15,
    category: "values",
    text: {
      fr: "Vos priorités essentielles dans la vie...",
      en: "Your essential life priorities..."
    },
    options: [
      { id: "A", text: { fr: "Sont harmonieuses et discutées régulièrement à deux", en: "Are harmonious and regularly discussed together" }, score: 3 },
      { id: "B", text: { fr: "Se complètent bien malgré des approches différentes", en: "Complement each other well despite different angles" }, score: 2 },
      { id: "C", text: { fr: "Concurrencent souvent le temps accordé à la relation", en: "Often compete with quality time for the relationship" }, score: 1 },
      { id: "D", text: { fr: "Sont inconciliables et créent de la rancœur", en: "Feel irreconcilable and foster lingering resentment" }, score: 0 }
    ]
  },
  {
    id: 16,
    category: "values",
    text: {
      fr: "Votre conception de l'engagement amoureux...",
      en: "Your vision of romantic commitment..."
    },
    options: [
      { id: "A", text: { fr: "Une promesse mutuelle d'évoluer et se soutenir fidèlement", en: "A mutual promise to grow and support each other faithfully" }, score: 3 },
      { id: "B", text: { fr: "Un choix renouvelé chaque jour avec enthousiasme", en: "A choice renewed daily with sincere enthusiasm" }, score: 3 },
      { id: "C", text: { fr: "Une responsabilité parfois lourde à porter", en: "A responsibility that sometimes feels demanding" }, score: 1 },
      { id: "D", text: { fr: "Une restriction de liberté qui fait un peu peur", en: "A constraint on freedom that triggers slight fear" }, score: 1 }
    ]
  },
  {
    id: 17,
    category: "values",
    text: {
      fr: "L'importance de l'honnêteté et de la franchise...",
      en: "The importance of honesty and authenticity..."
    },
    options: [
      { id: "A", text: { fr: "Absolue, toujours enveloppée de tact et de bienveillance", en: "Absolute, always wrapped in tact and kindness" }, score: 3 },
      { id: "B", text: { fr: "Primordiale, même si les vérités piquent parfois", en: "Paramount, even if tough truths sting temporarily" }, score: 2 },
      { id: "C", text: { fr: "Relative, quelques omissions valent mieux que des drames", en: "Relative, white lies are preferable to unnecessary drama" }, score: 1 },
      { id: "D", text: { fr: "Faible, vous cachez souvent des choses par facilité", en: "Low, you frequently conceal things out of convenience" }, score: 0 }
    ]
  },
  {
    id: 18,
    category: "values",
    text: {
      fr: "Votre vision de la liberté au sein du couple...",
      en: "Your vision of personal freedom inside the relationship..."
    },
    options: [
      { id: "A", text: { fr: "Complices et inséparables, tout en ayant son jardin secret", en: "Deeply bonded, while nurturing private gardens" }, score: 3 },
      { id: "B", text: { fr: "Une autonomie saine qui enrichit nos retrouvailles", en: "Healthy autonomy that enriches when we reunite" }, score: 3 },
      { id: "C", text: { fr: "Un sujet sensible où l'un surveille souvent l'autre", en: "A touchy subject where one often polices the other" }, score: 1 },
      { id: "D", text: { fr: "Deux vies parallèles sans véritable esprit d'équipe", en: "Two parallel lives without a unified team spirit" }, score: 0 }
    ]
  },
  {
    id: 19,
    category: "values",
    text: {
      fr: "L'attachement aux traditions et aux rituels de vie...",
      en: "Attachment to traditions and personal life rituals..."
    },
    options: [
      { id: "A", text: { fr: "Nous créons nos propres traditions tout en respectant le passé", en: "We create our own traditions while honoring the past" }, score: 3 },
      { id: "B", text: { fr: "Nous nous adaptons avec flexibilité aux coutumes de chacun", en: "We adapt flexibly to each other's heritage and customs" }, score: 3 },
      { id: "C", text: { fr: "L'un impose ses rituels sans écouter les souhaits de l'autre", en: "One partner imposes rituals without listening to the other" }, score: 1 },
      { id: "D", text: { fr: "Rejet total des rituels familiaux, source de blocage", en: "Total rejection of traditions, causing stubborn deadlock" }, score: 1 }
    ]
  },
  {
    id: 20,
    category: "values",
    text: {
      fr: "Votre philosophie de vie face aux aléas...",
      en: "Your life philosophy when adversity strikes..."
    },
    options: [
      { id: "A", text: { fr: "Optimisme lucide : chaque épreuve renforce notre complicité", en: "Grounded optimism: each challenge strengthens our bond" }, score: 3 },
      { id: "B", text: { fr: "Pragmatisme : nous avançons un pas après l'autre", en: "Pragmatism: we move forward one steady step at a time" }, score: 2 },
      { id: "C", text: { fr: "Anxiété : tendance à dramatiser les imprévus", en: "Anxiety: tendency to catastrophize unexpected changes" }, score: 1 },
      { id: "D", text: { fr: "Fatalisme : nous baissons vite les bras ensemble", en: "Fatalism: quick to resign and surrender to defeat" }, score: 0 }
    ]
  },

  // =========================================================================
  // 3. INTIMACY — INTIMITÉ (IDs 21 - 30)
  // =========================================================================
  {
    id: 21,
    category: "intimacy",
    text: {
      fr: "Votre langage de l'amour principal est...",
      en: "Your primary love language is..."
    },
    options: [
      { id: "A", text: { fr: "Connu et activement nourri par votre partenaire", en: "Known and actively nurtured by your partner" }, score: 3 },
      { id: "B", text: { fr: "Compris dans les grandes lignes avec de beaux gestes", en: "Understood in broad strokes with thoughtful gestures" }, score: 3 },
      { id: "C", text: { fr: "Différent de celui de votre partenaire, demandant des efforts", en: "Different from your partner's, requiring conscious effort" }, score: 2 },
      { id: "D", text: { fr: "Ignoré ou négligé, créant un manque affectif", en: "Ignored or neglected, causing an emotional void" }, score: 0 }
    ]
  },
  {
    id: 22,
    category: "intimacy",
    text: {
      fr: "Vous exprimez votre affection physique...",
      en: "You express physical affection..."
    },
    options: [
      { id: "A", text: { fr: "Spontanément : câlins, baisers et caresses tout au long du jour", en: "Spontaneously: hugs, kisses, and touches throughout the day" }, score: 3 },
      { id: "B", text: { fr: "Régulièrement dans l'intimité de votre foyer", en: "Regularly in the quiet comfort of your home" }, score: 2 },
      { id: "C", text: { fr: "Surtout quand l'un de vous en fait la demande explicite", en: "Mostly when one of you explicitly initiates it" }, score: 1 },
      { id: "D", text: { fr: "Rarement, vous êtes mal à l'aise avec les contacts", en: "Rarely, you feel uneasy with physical touch" }, score: 1 }
    ]
  },
  {
    id: 23,
    category: "intimacy",
    text: {
      fr: "L'importance des moments d'intimité à deux sans distraction...",
      en: "The importance of undistracted intimate moments..."
    },
    options: [
      { id: "A", text: { fr: "Indispensable : nous sanctuarisons des moments pour nous", en: "Essential: we protect sacred couple time without devices" }, score: 3 },
      { id: "B", text: { fr: "Précieux, même si nos agendas rendent cela parfois serré", en: "Valuable, even if busy schedules make it challenging" }, score: 2 },
      { id: "C", text: { fr: "Secondaire, la présence dans la même pièce suffit souvent", en: "Secondary, being in the same room is usually enough" }, score: 1 },
      { id: "D", text: { fr: "Inexistante, les écrans s'interposent constamment", en: "Non-existent, screens are constantly in between us" }, score: 0 }
    ]
  },
  {
    id: 24,
    category: "intimacy",
    text: {
      fr: "Vous vous sentez profondément aimé·e quand...",
      en: "You feel deeply loved when..."
    },
    options: [
      { id: "A", text: { fr: "Votre partenaire vous regarde avec tendresse et attention totale", en: "Your partner looks at you with tender, undivided attention" }, score: 3 },
      { id: "B", text: { fr: "Il/elle anticipe un petit besoin ou rend un service délicat", en: "They anticipate a small need or offer a thoughtful service" }, score: 3 },
      { id: "C", text: { fr: "Il/elle vous offre des cadeaux matériels", en: "They offer you material gifts" }, score: 2 },
      { id: "D", text: { fr: "Vous doutez souvent de son attachement sincère", en: "You often doubt their sincere attachment" }, score: 0 }
    ]
  },
  {
    id: 25,
    category: "intimacy",
    text: {
      fr: "Votre aisance avec la vulnérabilité émotionnelle...",
      en: "Your comfort with emotional vulnerability..."
    },
    options: [
      { id: "A", text: { fr: "Totale : vous pouvez pleurer ou douter sans crainte", en: "Complete: you can cry or doubt without fear" }, score: 3 },
      { id: "B", text: { fr: "Bonne, même si cela demande parfois un temps de chauffe", en: "Good, even if it requires a little warm-up time" }, score: 2 },
      { id: "C", text: { fr: "Difficile : vous préférez paraître toujours fort(e)", en: "Difficult: you prefer to always project strength" }, score: 1 },
      { id: "D", text: { fr: "Bloquée : vous redoutez que vos faiblesses soient retournées contre vous", en: "Blocked: you fear weaknesses will be weaponized" }, score: 0 }
    ]
  },
  {
    id: 26,
    category: "intimacy",
    text: {
      fr: "La communication autour de vos désirs et de votre vie intime...",
      en: "Communication regarding desires and your intimate life..."
    },
    options: [
      { id: "A", text: { fr: "Fluide, joyeuse, respectueuse et sans aucun tabou", en: "Smooth, joyful, respectful, and free of any taboos" }, score: 3 },
      { id: "B", text: { fr: "Bienveillante, même si certains sujets restent timides", en: "Gentle, even if certain subjects feel shy" }, score: 2 },
      { id: "C", text: { fr: "Rare et maladroite, souvent source de timidité", en: "Rare and awkward, often sparking discomfort" }, score: 1 },
      { id: "D", text: { fr: "Inexistante ou source de rancœur et de frustration", en: "Non-existent or a wellspring of frustration and tension" }, score: 0 }
    ]
  },
  {
    id: 27,
    category: "intimacy",
    text: {
      fr: "Vous partagez vos peurs secrètes...",
      en: "You share your secret fears..."
    },
    options: [
      { id: "A", text: { fr: "En sachant que vous serez accueilli(e) avec douceur", en: "Knowing you will be received with loving gentleness" }, score: 3 },
      { id: "B", text: { fr: "Quand le climat émotionnel s'y prête bien", en: "Whenever the emotional atmosphere feels right" }, score: 2 },
      { id: "C", text: { fr: "Avec parcimonie, de peur d'inquiéter l'autre", en: "Sparingly, out of worry of alarming your partner" }, score: 2 },
      { id: "D", text: { fr: "Jamais, vous gardez une forteresse intérieure étanche", en: "Never, you maintain an impenetrable inner fortress" }, score: 0 }
    ]
  },
  {
    id: 28,
    category: "intimacy",
    text: {
      fr: "L'importance des petites surprises romantiques inattendues...",
      en: "The importance of unexpected romantic surprises..."
    },
    options: [
      { id: "A", text: { fr: "Elles enchantent notre quotidien et entretiennent la flamme", en: "They delight our daily life and keep the romance glowing" }, score: 3 },
      { id: "B", text: { fr: "Appréciées de temps en temps pour marquer le coup", en: "Appreciated every now and then to mark special times" }, score: 2 },
      { id: "C", text: { fr: "Peu fréquentes mais nos rituels simples nous conviennent", en: "Infrequent, but our cozy routines suit us fine" }, score: 2 },
      { id: "D", text: { fr: "Totalement absentes, la routine nous a un peu endormis", en: "Totally missing, routine has lulled us to sleep" }, score: 1 }
    ]
  },
  {
    id: 29,
    category: "intimacy",
    text: {
      fr: "Vous exprimez vos besoins affectifs...",
      en: "You express your emotional needs..."
    },
    options: [
      { id: "A", text: { fr: "Clairement et simplement, sans reproche ni passif-agressif", en: "Clearly and simply, without passive-aggressive blame" }, score: 3 },
      { id: "B", text: { fr: "Quand vous sentez que votre réservoir est presque vide", en: "Whenever you notice your emotional tank running empty" }, score: 2 },
      { id: "C", text: { fr: "En espérant que votre partenaire devine par télépathie", en: "Hoping your partner magically guesses telepathically" }, score: 1 },
      { id: "D", text: { fr: "Par des reproches amers : 'Tu ne fais jamais attention !'", en: "Through bitter accusations: 'You never pay attention!'" }, score: 0 }
    ]
  },
  {
    id: 30,
    category: "intimacy",
    text: {
      fr: "Votre définition et respect de la fidélité...",
      en: "Your definition and practice of fidelity..."
    },
    options: [
      { id: "A", text: { fr: "Des règles du jeu transparentes, explicites et honorées à 100%", en: "Transparent, explicit relationship agreements honored 100%" }, score: 3 },
      { id: "B", text: { fr: "Une loyauté évidente fondée sur le respect du pacte de couple", en: "Clear loyalty built on respecting the couple's pact" }, score: 3 },
      { id: "C", text: { fr: "Des limites un peu floues qui suscitent parfois des doutes", en: "Somewhat blurry boundaries that occasionally raise doubts" }, score: 1 },
      { id: "D", text: { fr: "Des tentations ou des secrets qui pèsent sur la confiance", en: "Temptations or secrets that undermine mutual trust" }, score: 0 }
    ]
  },

  // =========================================================================
  // 4. CONFLICT — GESTION DES CONFLITS (IDs 31 - 40)
  // =========================================================================
  {
    id: 31,
    category: "conflict",
    text: {
      fr: "Face à un conflit naissant, vous...",
      en: "Facing an emerging conflict, you..."
    },
    options: [
      { id: "A", text: { fr: "Faites une pause pour respirer et traiter le fond calmement", en: "Take a pause to breathe and address the root issue calmly" }, score: 3 },
      { id: "B", text: { fr: "Exposez immédiatement les faits de manière constructive", en: "Present the facts immediately in a constructive manner" }, score: 2 },
      { id: "C", text: { fr: "Fuyez la pièce pour éviter toute altercation", en: "Flee the room to avoid any altercation" }, score: 1 },
      { id: "D", text: { fr: "Attaquez pour ne pas vous laisser déborder", en: "Attack first so as not to be overwhelmed" }, score: 0 }
    ]
  },
  {
    id: 32,
    category: "conflict",
    text: {
      fr: "Vous vous excusez lorsque vous avez blessé votre partenaire...",
      en: "You apologize when you have hurt your partner..."
    },
    options: [
      { id: "A", text: { fr: "Sincèrement, en reconnaissant l'impact de vos paroles", en: "Sincerely, acknowledging the impact of your words" }, score: 3 },
      { id: "B", text: { fr: "Une fois que la pression est redescendue après quelques heures", en: "Once the pressure cools down after a few hours" }, score: 2 },
      { id: "C", text: { fr: "Avec un 'Oui mais toi aussi...' qui annule l'excuse", en: "With a 'Yes, but you too...' that invalidates the apology" }, score: 1 },
      { id: "D", text: { fr: "Jamais, votre fierté vous empêche de dire pardon", en: "Never, pride prevents you from saying sorry" }, score: 0 }
    ]
  },
  {
    id: 33,
    category: "conflict",
    text: {
      fr: "Quand vous êtes submergé(e) par la colère, vous...",
      en: "When overwhelmed by anger, you..."
    },
    options: [
      { id: "A", text: { fr: "Nommez l'émotion et demandez un temps mort pour décompresser", en: "Name the emotion and ask for a timeout to cool down" }, score: 3 },
      { id: "B", text: { fr: "Allez marcher ou faire du sport pour évacuer la charge", en: "Go for a walk or work out to release tension" }, score: 3 },
      { id: "C", text: { fr: "Lancez des piques acerbes dont vous avez honte après", en: "Throw sharp jabs you later feel ashamed of" }, score: 1 },
      { id: "D", text: { fr: "Criez, claquez les portes ou brisez des objets", en: "Yell, slam doors, or break objects" }, score: 0 }
    ]
  },
  {
    id: 34,
    category: "conflict",
    text: {
      fr: "Vous accordez votre pardon...",
      en: "You grant forgiveness..."
    },
    options: [
      { id: "A", text: { fr: "De tout cœur, sans ressortir les dossiers dans de futures disputes", en: "Wholeheartedly, without weaponizing past records later" }, score: 3 },
      { id: "B", text: { fr: "Progressivement, en observant les efforts de réparation", en: "Gradually, while observing genuine reparative efforts" }, score: 2 },
      { id: "C", text: { fr: "En apparence, tout en gardant une amertume secrète", en: "On the surface, while secretly harboring resentment" }, score: 1 },
      { id: "D", text: { fr: "Presque jamais, vous êtes très rancunier(e)", en: "Almost never, you hold long-lasting grudges" }, score: 0 }
    ]
  },
  {
    id: 35,
    category: "conflict",
    text: {
      fr: "Pour désamorcer les tensions au sein du foyer, vous...",
      en: "To defuse household tension, you..."
    },
    options: [
      { id: "A", text: { fr: "Utilisez l'humour tendre ou un geste affectueux réconfortant", en: "Use gentle humor or a warm affectionate hug" }, score: 3 },
      { id: "B", text: { fr: "Proposez un thé ou une pause pour repartir de zéro", en: "Offer a warm drink or a pause to reset fresh" }, score: 3 },
      { id: "C", text: { fr: "Boudez chacun dans votre coin jusqu'à ce que ça passe", en: "Pout in your respective corners until it blows over" }, score: 1 },
      { id: "D", text: { fr: "Attisez le feu en répétant les reproches", en: "Fuel the flames by repeating complaints" }, score: 0 }
    ]
  },
  {
    id: 36,
    category: "conflict",
    text: {
      fr: "Quand votre partenaire vous signale une promesse non tenue, vous...",
      en: "When your partner points out an unkept promise, you..."
    },
    options: [
      { id: "A", text: { fr: "Assumez votre oubli et proposez une solution immédiate", en: "Own up to the oversight and propose an immediate fix" }, score: 3 },
      { id: "B", text: { fr: "Expliquez les circonstances avec honnêteté", en: "Explain the circumstances honestly" }, score: 2 },
      { id: "C", text: { fr: "Minimisez l'impact en disant que ce n'est pas si grave", en: "Minimize the impact, saying it's not a big deal" }, score: 1 },
      { id: "D", text: { fr: "Niez catégoriquement avoir promis quoi que ce soit", en: "Flatly deny having promised anything at all" }, score: 0 }
    ]
  },
  {
    id: 37,
    category: "conflict",
    text: {
      fr: "Dans la recherche de compromis, vous considérez que...",
      en: "When finding compromises, you believe that..."
    },
    options: [
      { id: "A", text: { fr: "Le but est que les deux partenaires se sentent respectés", en: "The goal is for both partners to feel respected and heard" }, score: 3 },
      { id: "B", text: { fr: "Chacun doit faire la moitié du chemin avec équité", en: "Each partner should meet halfway in fairness" }, score: 2 },
      { id: "C", text: { fr: "C'est souvent vous qui cédez pour éviter les drames", en: "You are often the one giving in to avoid drama" }, score: 1 },
      { id: "D", text: { fr: "Faire un compromis est une marque de faiblesse", en: "Compromise is a sign of weakness" }, score: 0 }
    ]
  },
  {
    id: 38,
    category: "conflict",
    text: {
      fr: "Vous reconnaissez vos propres erreurs ou maladresses...",
      en: "You acknowledge your own mistakes or blunders..."
    },
    options: [
      { id: "A", text: { fr: "Facilement, car se tromper fait partie de la vie", en: "Easily, because making mistakes is human" }, score: 3 },
      { id: "B", text: { fr: "Après une courte hésitation, une fois la pression tombée", en: "After brief hesitation, once the heat subsides" }, score: 2 },
      { id: "C", text: { fr: "Uniquement si on vous met des preuves irréfutables sous les yeux", en: "Only when faced with undeniable evidence" }, score: 1 },
      { id: "D", text: { fr: "Jamais, vous rejetez systématiquement la faute sur l'autre", en: "Never, you systematically shift blame onto the other" }, score: 0 }
    ]
  },
  {
    id: 39,
    category: "conflict",
    text: {
      fr: "Votre gestion du ressentiment au fil des mois...",
      en: "Your management of resentment over the months..."
    },
    options: [
      { id: "A", text: { fr: "Les abcès sont crevés au fur et à mesure sans laisser de dépôt", en: "Issues are cleared out as they arise without leftover residue" }, score: 3 },
      { id: "B", text: { fr: "Nous faisons des points d'étape réguliers pour nous réajuster", en: "We do regular check-ins to readjust our connection" }, score: 3 },
      { id: "C", text: { fr: "Quelques frustrations s'accumulent sans être dites", en: "A few frustrations build up silently without being spoken" }, score: 1 },
      { id: "D", text: { fr: "Une rancœur lourde et toxique s'est enkystée", en: "Heavy, toxic resentment has hardened between us" }, score: 0 }
    ]
  },
  {
    id: 40,
    category: "conflict",
    text: {
      fr: "Face aux sujets particulièrement délicats ou tabous...",
      en: "Facing sensitive or awkward topics..."
    },
    options: [
      { id: "A", text: { fr: "Vous les abordez avec un cadre sécurisant et beaucoup de délicatesse", en: "You address them in a safe setting with thoughtful delicacy" }, score: 3 },
      { id: "B", text: { fr: "Vous attendez le bon moment pour en parler doucement", en: "You wait for the right calm moment to bring them up" }, score: 2 },
      { id: "C", text: { fr: "Vous les contournez par peur de provoquer une dispute", en: "You bypass them out of fear of sparking a row" }, score: 1 },
      { id: "D", text: { fr: "Vous refusez catégoriquement d'en discuter", en: "You categorically refuse to discuss them" }, score: 0 }
    ]
  },

  // =========================================================================
  // 5. FUTURE — PROJETS D'AVENIR (IDs 41 - 50)
  // =========================================================================
  {
    id: 41,
    category: "future",
    text: {
      fr: "Vos projets à 5 ans...",
      en: "Your 5-year plans..."
    },
    options: [
      { id: "A", text: { fr: "Sont clairement définis et partagés avec enthousiasme", en: "Are clearly mapped out and excitedly shared" }, score: 3 },
      { id: "B", text: { fr: "Ont une ligne directrice commune que nous ajustons", en: "Have a shared general direction that we fine-tune" }, score: 3 },
      { id: "C", text: { fr: "Restent flous, nous vivons plutôt au jour le jour", en: "Remain fuzzy, we live day by day" }, score: 2 },
      { id: "D", text: { fr: "Sont divergents et menacent notre avenir commun", en: "Are divergent and threaten our shared future" }, score: 0 }
    ]
  },
  {
    id: 42,
    category: "future",
    text: {
      fr: "L'importance de la carrière et des ambitions professionnelles...",
      en: "The importance of career and professional ambition..."
    },
    options: [
      { id: "A", text: { fr: "Nous nous soutenons mutuellement dans nos réussites pro", en: "We enthusiastically support each other's career goals" }, score: 3 },
      { id: "B", text: { fr: "Un bon équilibre où le travail ne phagocyte pas notre vie de couple", en: "A sound balance where work doesn't consume couple life" }, score: 3 },
      { id: "C", text: { fr: "L'ambition de l'un pénalise lourdement le quotidien du couple", en: "One partner's ambition severely penalizes daily couple life" }, score: 1 },
      { id: "D", text: { fr: "Une jalousie ou une concurrence malsaine s'est installée", en: "Unhealthy jealousy or competition has emerged" }, score: 0 }
    ]
  },
  {
    id: 43,
    category: "future",
    text: {
      fr: "Votre vision du mariage ou du partenariat civil (PACS / union)...",
      en: "Your perspective on marriage or legal civil partnership..."
    },
    options: [
      { id: "A", text: { fr: "Totalement accordée sur la forme d'engagement qui nous correspond", en: "Completely aligned on the form of commitment suited for us" }, score: 3 },
      { id: "B", text: { fr: "Discutée sereinement avec respect pour les souhaits de chacun", en: "Discussed serenely with mutual respect for each preference" }, score: 3 },
      { id: "C", text: { fr: "L'un attend un engagement que l'autre hésite à donner", en: "One awaits a commitment the other is hesitant to make" }, score: 1 },
      { id: "D", text: { fr: "Visions inconciliables qui bloquent toute projection", en: "Incompatible visions causing persistent stalemate" }, score: 0 }
    ]
  },
  {
    id: 44,
    category: "future",
    text: {
      fr: "Vos souhaits concernant les enfants et la parentalité...",
      en: "Your wishes regarding children and parenting..."
    },
    options: [
      { id: "A", text: { fr: "Parfaitement synchronisés (désir d'enfant ou choix sans enfant)", en: "Seamlessly synchronized (parenting desire or child-free choice)" }, score: 3 },
      { id: "B", text: { fr: "Alignés sur le principe, avec des détails de calendrier à peaufiner", en: "Aligned in principle, with minor timeline details to tune" }, score: 2 },
      { id: "C", text: { fr: "Un sujet d'incertitude qui demande encore maturation", en: "An uncertain topic that still requires deeper reflection" }, score: 1 },
      { id: "D", text: { fr: "Désaccord fondamental : l'un en veut absolument, l'autre pas du tout", en: "Fundamental dealbreaker: one insists, the other refuses" }, score: 0 }
    ]
  },
  {
    id: 45,
    category: "future",
    text: {
      fr: "Votre lieu de vie idéal (ville, campagne, étranger)...",
      en: "Your ideal living environment (city, countryside, abroad)..."
    },
    options: [
      { id: "A", text: { fr: "Nous rêvons du même cadre de vie chaleureux", en: "We dream of the exact same warm living setting" }, score: 3 },
      { id: "B", text: { fr: "Prêts à des compromis géographiques stimulants", en: "Ready for exciting geographical compromises" }, score: 3 },
      { id: "C", text: { fr: "Des préférences opposées qui compliquent le choix du logement", en: "Opposite preferences complicating real estate choices" }, score: 1 },
      { id: "D", text: { fr: "Refus catégorique de quitter son environnement pour suivre l'autre", en: "Categorical refusal to move or follow the other" }, score: 0 }
    ]
  },
  {
    id: 46,
    category: "future",
    text: {
      fr: "Vos objectifs d'épargne et d'investissement à long terme...",
      en: "Your long-term savings and investment goals..."
    },
    options: [
      { id: "A", text: { fr: "Construits ensemble dans la sérénité et la clarté", en: "Built together with serenity, clarity, and discipline" }, score: 3 },
      { id: "B", text: { fr: "Sains et sécurisants pour l'avenir du foyer", en: "Sound and protective for the household's future" }, score: 3 },
      { id: "C", text: { fr: "Gérés sans réelle stratégie de prévoyance", en: "Managed without real foresight or strategy" }, score: 1 },
      { id: "D", text: { fr: "Visions financières divergentes qui font peur", en: "Divergent financial visions creating anxiety" }, score: 0 }
    ]
  },
  {
    id: 47,
    category: "future",
    text: {
      fr: "Votre vision de la retraite et des vieux jours...",
      en: "Your vision of retirement and golden years..."
    },
    options: [
      { id: "A", text: { fr: "Vieillir ensemble avec complicité et projets réjouissants", en: "Growing old together with deep love and joyful adventures" }, score: 3 },
      { id: "B", text: { fr: "Une image douce et paisible de nos années futures", en: "A sweet and peaceful picture of our future years" }, score: 3 },
      { id: "C", text: { fr: "Trop lointain pour y songer sérieusement", en: "Too distant to seriously contemplate" }, score: 2 },
      { id: "D", text: { fr: "Difficile de s'imaginer encore ensemble à cet horizon", en: "Hard to imagine still being together that far ahead" }, score: 0 }
    ]
  },
  {
    id: 48,
    category: "future",
    text: {
      fr: "L'importance des voyages et découvertes à deux...",
      en: "The importance of travel and joint discoveries..."
    },
    options: [
      { id: "A", text: { fr: "Un moteur d'émerveillement et de souvenirs partagés précieux", en: "A powerful engine for wonder and cherished shared memories" }, score: 3 },
      { id: "B", text: { fr: "Un plaisir régulier selon nos moyens et envies", en: "A steady pleasure within our means and desires" }, score: 3 },
      { id: "C", text: { fr: "Des styles de vacances très différents difficiles à concilier", en: "Vastly different vacation styles hard to reconcile" }, score: 1 },
      { id: "D", text: { fr: "Source de stress et de conflits systématiques", en: "A systematic source of vacation stress and arguments" }, score: 0 }
    ]
  },
  {
    id: 49,
    category: "future",
    text: {
      fr: "Vos projets d'achat immobilier ou de patrimoine...",
      en: "Your real estate or homeownership plans..."
    },
    options: [
      { id: "A", text: { fr: "Une ambition partagée avec transparence juridique et financière", en: "A shared aspiration with transparent financial planning" }, score: 3 },
      { id: "B", text: { fr: "Une étape envisagée avec prudence et bon sens", en: "A milestone considered with prudence and good sense" }, score: 2 },
      { id: "C", text: { fr: "Des craintes ou des divergences sur l'engagement matériel", en: "Apprehensions or disagreements over property commitment" }, score: 1 },
      { id: "D", text: { fr: "Un refus de construire ensemble sur le plan patrimonial", en: "A refusal to build joint assets together" }, score: 0 }
    ]
  },
  {
    id: 50,
    category: "future",
    text: {
      fr: "Votre équilibre entre vie professionnelle et vie personnelle...",
      en: "Your work-life balance..."
    },
    options: [
      { id: "A", text: { fr: "Priorité claire donnée au bien-être et au temps à deux", en: "Clear priority given to couple wellbeing and quality time" }, score: 3 },
      { id: "B", text: { fr: "Bien orchestré, avec des périodes intenses gérées en équipe", en: "Well orchestrated, with busy periods tackled as a team" }, score: 3 },
      { id: "C", text: { fr: "Le travail déborde souvent sur les soirées et week-ends", en: "Work frequently spills into evenings and weekends" }, score: 1 },
      { id: "D", text: { fr: "Épuisement chronique qui détériore le lien affectif", en: "Chronic burnout deteriorating your emotional bond" }, score: 0 }
    ]
  },

  // =========================================================================
  // 6. DAILY — VIE QUOTIDIENNE (IDs 51 - 60)
  // =========================================================================
  {
    id: 51,
    category: "daily",
    text: {
      fr: "Votre routine matinale en couple...",
      en: "Your morning routine together..."
    },
    options: [
      { id: "A", text: { fr: "Un moment chaleureux avec un mot doux ou un câlin réconfortant", en: "A warm ritual with gentle words or a comforting cuddle" }, score: 3 },
      { id: "B", text: { fr: "Chacun son rythme sans pression, avec respect de l'autre", en: "Each at their own pace without pressure or interference" }, score: 3 },
      { id: "C", text: { fr: "Une course contre la montre souvent stressante", en: "A rushed race against the clock that feels stressful" }, score: 1 },
      { id: "D", text: { fr: "Mauvaise humeur et reproches matinaux réguliers", en: "Regular morning grumpiness and irritable remarks" }, score: 0 }
    ]
  },
  {
    id: 52,
    category: "daily",
    text: {
      fr: "Vous préférez que vos soirées en semaine soient...",
      en: "On weekday evenings, you prefer..."
    },
    options: [
      { id: "A", text: { fr: "Un temps de décompression partagé (dîner, échanges, détente)", en: "Shared relaxation time (dinner, catch-up, unwind)" }, score: 3 },
      { id: "B", text: { fr: "Un doux mélange de temps ensemble et d'activités perso", en: "A nice blend of couple time and personal hobbies" }, score: 3 },
      { id: "C", text: { fr: "Chacun sur ses écrans dans des pièces séparées", en: "Glued to individual screens in separate rooms" }, score: 1 },
      { id: "D", text: { fr: "Pesantes avec une sensation d'ennui ou d'agacement", en: "Gloomy with feelings of boredom or tension" }, score: 0 }
    ]
  },
  {
    id: 53,
    category: "daily",
    text: {
      fr: "Votre organisation et ordre dans la maison...",
      en: "Your home organization and tidiness..."
    },
    options: [
      { id: "A", text: { fr: "Un niveau d'ordre harmonieux respecté par les deux sans crise", en: "A harmonious level of cleanliness respected without drama" }, score: 3 },
      { id: "B", text: { fr: "Des styles différents mais nous nous adaptons avec tolérance", en: "Different styles, but handled with healthy tolerance" }, score: 2 },
      { id: "C", text: { fr: "Source récurrente de reproches ménagers ('Range tes affaires !')", en: "Recurring nagging about tidiness ('Pick up your stuff!')" }, score: 1 },
      { id: "D", text: { fr: "Un champ de bataille permanent qui use le couple", en: "A non-stop battleground that wears down the relationship" }, score: 0 }
    ]
  },
  {
    id: 54,
    category: "daily",
    text: {
      fr: "Vos habitudes alimentaires et moments de repas...",
      en: "Your eating habits and mealtime moments..."
    },
    options: [
      { id: "A", text: { fr: "Des repas conviviaux partagés avec plaisir", en: "Convivial meals shared with mutual pleasure" }, score: 3 },
      { id: "B", text: { fr: "Une alimentation adaptée aux goûts de chacun avec souplesse", en: "Food tailored to each palate with flexibility" }, score: 3 },
      { id: "C", text: { fr: "Manger sur le pouce chacun de son côté", en: "Eating on the run without real connection" }, score: 1 },
      { id: "D", text: { fr: "Des désaccords constants sur les menus et les courses", en: "Constant friction over groceries, menus, and cooking" }, score: 1 }
    ]
  },
  {
    id: 55,
    category: "daily",
    text: {
      fr: "Votre ponctualité et gestion du temps...",
      en: "Your punctuality and time management..."
    },
    options: [
      { id: "A", text: { fr: "Respect mutuel des horaires et des engagements pris", en: "Mutual respect for schedules and agreed commitments" }, score: 3 },
      { id: "B", text: { fr: "Quelques retards bénins accueillis avec sourire", en: "Occasional minor delays met with a forgiving smile" }, score: 2 },
      { id: "C", text: { fr: "Des retards chroniques qui agacent profondément l'autre", en: "Chronic tardiness deeply exasperating the other" }, score: 1 },
      { id: "D", text: { fr: "Un mépris total du temps de l'autre", en: "Total disregard for the other person's time" }, score: 0 }
    ]
  },
  {
    id: 56,
    category: "daily",
    text: {
      fr: "La répartition de la charge mentale logistique...",
      en: "The distribution of mental and logistic load..."
    },
    options: [
      { id: "A", text: { fr: "Équilibrée : chacun anticipe et prend des initiatives spontanées", en: "Balanced: both anticipate and take spontaneous initiative" }, score: 3 },
      { id: "B", text: { fr: "Partagée après un simple échange sans avoir à quémander", en: "Shared comfortably following a simple friendly chat" }, score: 3 },
      { id: "C", text: { fr: "L'un porte l'essentiel et se sent surchargé sans être entendu", en: "One bears the brunt, feeling overloaded and unheard" }, score: 1 },
      { id: "D", text: { fr: "Déséquilibre total source d'épuisement et de ressentiment", en: "Severe imbalance causing burnout and bitter resentment" }, score: 0 }
    ]
  },
  {
    id: 57,
    category: "daily",
    text: {
      fr: "Vos habitudes de sommeil et rythmes biologiques...",
      en: "Your sleep patterns and biological rhythms..."
    },
    options: [
      { id: "A", text: { fr: "Rythmes accordés ou gérés avec délicatesse pour le repos de l'autre", en: "Matched rhythms or handled with great care for other's sleep" }, score: 3 },
      { id: "B", text: { fr: "Des heures de coucher différentes mais un rituel câlin préservé", en: "Different bedtimes but a sweet cuddle ritual preserved" }, score: 3 },
      { id: "C", text: { fr: "Des perturbations régulières qui entraînent de la fatigue", en: "Frequent sleep disruptions leading to persistent fatigue" }, score: 1 },
      { id: "D", text: { fr: "Chambre à part forcée par frustration et conflits", en: "Separate bedrooms forced by ongoing frustration and conflict" }, score: 0 }
    ]
  },
  {
    id: 58,
    category: "daily",
    text: {
      fr: "L'intrusion des smartphones et écrans dans votre quotidien...",
      en: "The intrusion of smartphones and screens in daily life..."
    },
    options: [
      { id: "A", text: { fr: "Usage maîtrisé avec des moments 100% déconnectés à deux", en: "Mindful use with 100% unplugged couple moments" }, score: 3 },
      { id: "B", text: { fr: "Présents mais nous savons ranger le téléphone sur demande", en: "Present, but we readily put phones away when asked" }, score: 2 },
      { id: "C", text: { fr: "Le 'phubbing' (nez dans l'écran) arrive un peu trop souvent", en: "Phubbing (eyes glued to screen) happens too often" }, score: 1 },
      { id: "D", text: { fr: "Les écrans ont presque totalement remplacé nos échanges", en: "Screens have almost entirely replaced verbal interaction" }, score: 0 }
    ]
  },
  {
    id: 59,
    category: "daily",
    text: {
      fr: "La réalisation des corvées ménagères (lessive, vaisselle, ménage)...",
      en: "Managing household chores (laundry, dishes, cleaning)..."
    },
    options: [
      { id: "A", text: { fr: "Une véritable équipe solidaire sans calcul mesquin", en: "A genuine supportive team without petty scorekeeping" }, score: 3 },
      { id: "B", text: { fr: "Une répartition claire qui convient aux deux partenaires", en: "A clear, equitable breakdown that suits both partners" }, score: 3 },
      { id: "C", text: { fr: "Il faut constamment demander pour que les choses soient faites", en: "Constant nagging is needed just to get tasks done" }, score: 1 },
      { id: "D", text: { fr: "L'un fait tout pendant que l'autre se désengage", en: "One does everything while the other totally disengages" }, score: 0 }
    ]
  },
  {
    id: 60,
    category: "daily",
    text: {
      fr: "Votre gestion des temps de pause et des week-ends...",
      en: "Managing weekend downtime and unstructured breaks..."
    },
    options: [
      { id: "A", text: { fr: "Une belle harmonie entre repos bienfaisant et sorties stimulantes", en: "A lovely balance of rejuvenating rest and fun outings" }, score: 3 },
      { id: "B", text: { fr: "Nous planifions avec souplesse selon nos envies du moment", en: "We plan flexibly based on our current mood and energy" }, score: 3 },
      { id: "C", text: { fr: "Des envies contradictoires qui génèrent de la frustration le dimanche", en: "Conflicting wishes generating Sunday evening blues" }, score: 1 },
      { id: "D", text: { fr: "Week-ends gâchés par l'inaction subie ou les tensions", en: "Weekends ruined by passive boredom or friction" }, score: 0 }
    ]
  },

  // =========================================================================
  // 7. MONEY — ARGENT (IDs 61 - 70)
  // =========================================================================
  {
    id: 61,
    category: "money",
    text: {
      fr: "Votre rapport global à l'argent et à la dépense...",
      en: "Your overall relationship with money and spending..."
    },
    options: [
      { id: "A", text: { fr: "Sain et apaisé : l'argent est un outil au service de notre vie", en: "Healthy and peaceful: money serves our life goals" }, score: 3 },
      { id: "B", text: { fr: "Prévoyant et équilibré entre plaisir présent et épargne", en: "Prudent and balanced between fun today and future savings" }, score: 3 },
      { id: "C", text: { fr: "Source d'anxiété fréquente ou d'achats compulsifs", en: "A frequent source of anxiety or compulsive impulse buys" }, score: 1 },
      { id: "D", text: { fr: "Sujet explosif qui déclenche immédiatement des disputes", en: "An explosive trigger that sparks immediate arguments" }, score: 0 }
    ]
  },
  {
    id: 62,
    category: "money",
    text: {
      fr: "Dans le couple, vous préférez gérer les comptes...",
      en: "Within the couple, you prefer financial accounts to be..."
    },
    options: [
      { id: "A", text: { fr: "Un système clair et transparent (compte commun + comptes persos)", en: "A clear transparent model (joint account + personal accounts)" }, score: 3 },
      { id: "B", text: { fr: "Tout en commun ou tout séparé, avec un accord mutuel total", en: "Fully pooled or separated, backed by total mutual consent" }, score: 3 },
      { id: "C", text: { fr: "Un flou artistique qui crée de la méfiance de temps en temps", en: "Vague financial ambiguity breeding occasional distrust" }, score: 1 },
      { id: "D", text: { fr: "Un contrôle financier unilatéral exercé par l'un sur l'autre", en: "Unilateral financial control exerted by one over the other" }, score: 0 }
    ]
  },
  {
    id: 63,
    category: "money",
    text: {
      fr: "Quand l'un gagne nettement plus que l'autre...",
      en: "When one partner earns significantly more than the other..."
    },
    options: [
      { id: "A", text: { fr: "Prorata équitable et respect total sans rapport de pouvoir", en: "Fair pro-rata sharing and full respect without power games" }, score: 3 },
      { id: "B", text: { fr: "Solidarité d'équipe : le niveau de vie du foyer est partagé", en: "Team solidarity: household living standard is shared equally" }, score: 3 },
      { id: "C", text: { fr: "Un malaise subtil ou un sentiment de dépendance chez l'un", en: "Subtle awkwardness or feeling of financial dependence" }, score: 1 },
      { id: "D", text: { fr: "Des reproches ou du mépris fondé sur la fiche de paie", en: "Belittling or disdain based on paycheck differences" }, score: 0 }
    ]
  },
  {
    id: 64,
    category: "money",
    text: {
      fr: "Votre discipline d'épargne mensuelle...",
      en: "Your monthly savings discipline..."
    },
    options: [
      { id: "A", text: { fr: "Régulière et convenue ensemble pour financer nos rêves", en: "Consistent and co-planned to fund our dreams" }, score: 3 },
      { id: "B", text: { fr: "Raisonnable selon les surplus de fin de mois", en: "Sensible based on remaining end-of-month buffers" }, score: 2 },
      { id: "C", text: { fr: "Aléatoire, nous vivons souvent à flux tendu", en: "Random, we frequently live paycheck to paycheck" }, score: 1 },
      { id: "D", text: { fr: "Inexistante, les découverts bancaires s'accumulent", en: "Non-existent, overdrafts and debts keep piling up" }, score: 0 }
    ]
  },
  {
    id: 65,
    category: "money",
    text: {
      fr: "Votre approche des crédits et de l'endettement...",
      en: "Your approach to loans and personal debt..."
    },
    options: [
      { id: "A", text: { fr: "Réservés uniquement aux projets majeurs (logement) après accord", en: "Reserved exclusively for major assets (housing) upon joint consent" }, score: 3 },
      { id: "B", text: { fr: "Gérés avec rigueur et remboursés scrupuleusement", en: "Managed rigorously and paid back scrupulously" }, score: 3 },
      { id: "C", text: { fr: "Quelques crédits conso qui alourdissent le budget", en: "A few consumer loans weighing down the monthly budget" }, score: 1 },
      { id: "D", text: { fr: "Dettes dissimulées à l'autre par honte ou mensonge", en: "Debts concealed from partner out of shame or deceit" }, score: 0 }
    ]
  },
  {
    id: 66,
    category: "money",
    text: {
      fr: "Face à une dépense imprévue ou un coup dur financier...",
      en: "Facing an unexpected expense or financial hardship..."
    },
    options: [
      { id: "A", text: { fr: "On fait bloc ensemble avec sang-froid pour trouver des solutions", en: "We join forces with composure to find solutions" }, score: 3 },
      { id: "B", text: { fr: "Nous mobilisons notre épargne de précaution sans paniquer", en: "We draw on our emergency fund without panic" }, score: 3 },
      { id: "C", text: { fr: "Le stress financier entraîne des reproches mutuels", en: "Financial stress leads to blaming each other" }, score: 1 },
      { id: "D", text: { fr: "Chacun refuse d'aider l'autre et se replie sur ses sous", en: "Refusal to help each other, retreating into hoarding" }, score: 0 }
    ]
  },
  {
    id: 67,
    category: "money",
    text: {
      fr: "Vos achats coup de cœur ou dépenses plaisir...",
      en: "Your personal splurge or impulse pleasure spending..."
    },
    options: [
      { id: "A", text: { fr: "Chacun a son budget libre sans avoir à se justifier", en: "Each has discretionary pocket money without justifying" }, score: 3 },
      { id: "B", text: { fr: "Raisonnables et transparents pour les montants importants", en: "Reasonable and transparent for larger amounts" }, score: 3 },
      { id: "C", text: { fr: "Des dépenses cachées de peur de se faire sermonner", en: "Hidden purchases out of fear of being lectured" }, score: 1 },
      { id: "D", text: { fr: "Dépenses compulsives menaçant l'équilibre du ménage", en: "Compulsive spending jeopardizing household stability" }, score: 0 }
    ]
  },
  {
    id: 68,
    category: "money",
    text: {
      fr: "Le budget consacré aux loisirs, sorties et vacances...",
      en: "The budget allocated to leisure, outings, and vacations..."
    },
    options: [
      { id: "A", text: { fr: "Un investissement assumé dans notre bonheur et nos souvenirs", en: "A deliberate investment in our shared joy and memories" }, score: 3 },
      { id: "B", text: { fr: "Calculé de manière réaliste et partagée avec joie", en: "Calculated realistically and shared with enthusiasm" }, score: 3 },
      { id: "C", text: { fr: "L'un trouve toujours que l'autre dépense trop pour les loisirs", en: "One constantly accuses the other of overspending on leisure" }, score: 1 },
      { id: "D", text: { fr: "Rien n'est prévu, nous nous privons constamment par peur", en: "Nothing is budgeted; we constantly deprive ourselves out of fear" }, score: 1 }
    ]
  },
  {
    id: 69,
    category: "money",
    text: {
      fr: "Votre rapport aux marques, au standing et au luxe...",
      en: "Your view on prestige brands, standing, and luxury..."
    },
    options: [
      { id: "A", text: { fr: "Aligné sur ce qui compte vraiment : qualité durable et simplicité", en: "Aligned on what truly matters: lasting quality and simplicity" }, score: 3 },
      { id: "B", text: { fr: "Des goûts assumés qui respectent nos capacités financières", en: "Personal tastes that respect our actual financial boundaries" }, score: 3 },
      { id: "C", text: { fr: "Un décalage entre un profil dépensier et un profil très économe", en: "Mismatch between a big spender and an ultra-thrifty partner" }, score: 1 },
      { id: "D", text: { fr: "Le besoin de paraître au-dessus de nos moyens réels", en: "The urge to display a lifestyle beyond actual means" }, score: 0 }
    ]
  },
  {
    id: 70,
    category: "money",
    text: {
      fr: "La transparence financière au sein de votre couple...",
      en: "Financial transparency within your relationship..."
    },
    options: [
      { id: "A", text: { fr: "Clarté complète : aucun compte secret, confiance réciproque", en: "Full clarity: zero secret accounts, genuine reciprocal trust" }, score: 3 },
      { id: "B", text: { fr: "Bonne visibilité sur les revenus et les charges communes", en: "Good visibility on joint incomes and shared expenses" }, score: 3 },
      { id: "C", text: { fr: "Des zones d'ombre ou des rétentions d'informations financières", en: "Grey areas or withheld financial details" }, score: 1 },
      { id: "D", text: { fr: "Infidélité financière avérée (mensonges sur les gains ou pertes)", en: "Outright financial infidelity (lies about earnings or losses)" }, score: 0 }
    ]
  },

  // =========================================================================
  // 8. FAMILY — FAMILLE (IDs 71 - 80)
  // =========================================================================
  {
    id: 71,
    category: "family",
    text: {
      fr: "Votre relation avec vos parents et familles respectives...",
      en: "Your relationship with your respective parents and families..."
    },
    options: [
      { id: "A", text: { fr: "Chaleureuse, avec des frontières saines et protectrices du couple", en: "Warm, with healthy boundaries safeguarding the couple" }, score: 3 },
      { id: "B", text: { fr: "Respectueuse et bienveillante malgré quelques maladresses", en: "Respectful and kind despite occasional clumsy moments" }, score: 3 },
      { id: "C", text: { fr: "Envahissante : la famille s'immisce trop dans nos décisions", en: "Intrusive: in-laws interfere too much in couple decisions" }, score: 1 },
      { id: "D", text: { fr: "Conflictuelle et toxique, empoisonnant notre quotidien", en: "Toxic and hostile, constantly poisoning couple peace" }, score: 0 }
    ]
  },
  {
    id: 72,
    category: "family",
    text: {
      fr: "L'importance des réunions de famille et fêtes (Noël, anniversaires)...",
      en: "The importance of family gatherings and holidays..."
    },
    options: [
      { id: "A", text: { fr: "Un plaisir partagé avec alternance équitable et apaisée", en: "Shared joy with a peaceful, equitable rotation" }, score: 3 },
      { id: "B", text: { fr: "Nous nous organisons avec souplesse selon nos envies", en: "We organize flexibly based on our current energy" }, score: 3 },
      { id: "C", text: { fr: "Chaque fête devient un casse-tête générateur de tensions", en: "Every holiday becomes a tense negotiation headache" }, score: 1 },
      { id: "D", text: { fr: "Obligations familiales subies comme une corvée punitive", en: "Family duties endured like a punitive chore" }, score: 0 }
    ]
  },
  {
    id: 73,
    category: "family",
    text: {
      fr: "Votre vision de l'éducation et de l'autorité auprès des enfants...",
      en: "Your vision of child-rearing, values, and parenting discipline..."
    },
    options: [
      { id: "A", text: { fr: "Front uni : bienveillance, écoute et limites claires partagées", en: "United front: warmth, active listening, and shared boundaries" }, score: 3 },
      { id: "B", text: { fr: "Styles complémentaires débriefés à l'écart des enfants", en: "Complementary styles debriefed away from the kids" }, score: 3 },
      { id: "C", text: { fr: "L'un contredit souvent l'autre devant les enfants", en: "One frequently undermines the other in front of the kids" }, score: 1 },
      { id: "D", text: { fr: "Philosophies éducatives en guerre ouverte permanente", en: "Parenting philosophies in permanent open warfare" }, score: 0 }
    ]
  },
  {
    id: 74,
    category: "family",
    text: {
      fr: "Vos limites posées avec la belle-famille...",
      en: "Setting boundaries with your in-laws..."
    },
    options: [
      { id: "A", text: { fr: "Le couple passe en premier : soutien indéfectible face aux ingérences", en: "The couple comes first: unwavering loyalty against meddling" }, score: 3 },
      { id: "B", text: { fr: "Des limites polies et fermes appliquées avec diplomatie", en: "Polite and firm boundaries applied with diplomacy" }, score: 3 },
      { id: "C", text: { fr: "L'un n'ose jamais dire non à ses propres parents", en: "One partner never dares say no to their own parents" }, score: 1 },
      { id: "D", text: { fr: "La belle-famille dicte les règles de notre vie de couple", en: "In-laws dictate the rules of our domestic life" }, score: 0 }
    ]
  },
  {
    id: 75,
    category: "family",
    text: {
      fr: "Le temps passé avec les familles au cours de l'année...",
      en: "Time spent with extended families over the year..."
    },
    options: [
      { id: "A", text: { fr: "Dosé idéalement pour nourrir les liens sans saturer", en: "Ideally balanced to nourish bonds without overload" }, score: 3 },
      { id: "B", text: { fr: "Ajustable selon la forme et les disponibilités de chacun", en: "Adjustable based on energy and availability" }, score: 3 },
      { id: "C", text: { fr: "Trop fréquent au détriment de nos week-ends à deux", en: "Too frequent at the expense of couple weekends" }, score: 1 },
      { id: "D", text: { fr: "Rupture brutale ou exclusion douloureuse d'un des côtés", en: "Abrupt estrangement or painful exclusion on one side" }, score: 0 }
    ]
  },
  {
    id: 76,
    category: "family",
    text: {
      fr: "Les traditions familiales héritées de votre enfance...",
      en: "Family traditions inherited from your childhood..."
    },
    options: [
      { id: "A", text: { fr: "Nous tricotons ensemble un mélange unique de nos deux histoires", en: "We weave together a unique blend of our two family histories" }, score: 3 },
      { id: "B", text: { fr: "Chacun fait découvrir ses coutumes avec ouverture", en: "Each shares their customs with welcoming curiosity" }, score: 3 },
      { id: "C", text: { fr: "Pression d'adopter les traditions de l'un au détriment de l'autre", en: "Pressure to adopt one's traditions at the other's expense" }, score: 1 },
      { id: "D", text: { fr: "Mépris ou moquerie envers l'héritage familial de l'autre", en: "Mockery or disdain toward the partner's family heritage" }, score: 0 }
    ]
  },
  {
    id: 77,
    category: "family",
    text: {
      fr: "Le soutien mutuel lors d'une épreuve familiale (deuil, maladie d'un proche)...",
      en: "Mutual support during family trials (illness, loss of a relative)..."
    },
    options: [
      { id: "A", text: { fr: "Une présence indéfectible, un roc d'amour et d'aide logistique", en: "Unwavering presence, a rock of love and emotional support" }, score: 3 },
      { id: "B", text: { fr: "Une écoute pleine d'égards pour accompagner la douleur", en: "Attentive listening to support during grief" }, score: 3 },
      { id: "C", text: { fr: "Une maladresse ou une prise de distance involontaire", en: "Awkwardness or unintentional emotional withdrawal" }, score: 1 },
      { id: "D", text: { fr: "Indifférence ou reproches sur la baisse de disponibilité", en: "Indifference or complaints about reduced availability" }, score: 0 }
    ]
  },
  {
    id: 78,
    category: "family",
    text: {
      fr: "La gestion des conflits entre votre partenaire et vos proches...",
      en: "Handling friction between your partner and your relatives..."
    },
    options: [
      { id: "A", text: { fr: "Vous protégez votre partenaire tout en appelant au respect mutuel", en: "You stand by your partner while calling for mutual dignity" }, score: 3 },
      { id: "B", text: { fr: "Vous cherchez la médiation sans laisser votre moitié isolée", en: "You seek mediation without leaving your spouse isolated" }, score: 3 },
      { id: "C", text: { fr: "Vous restez passif(ve) au milieu en fuyant l'arbitrage", en: "You stay passive in the middle, evading accountability" }, score: 1 },
      { id: "D", text: { fr: "Vous prenez systématiquement le parti de vos parents contre votre partenaire", en: "You systematically side with your parents against your partner" }, score: 0 }
    ]
  },
  {
    id: 79,
    category: "family",
    text: {
      fr: "L'entraide financière ou matérielle avec vos familles respectives...",
      en: "Financial or practical assistance involving extended families..."
    },
    options: [
      { id: "A", text: { fr: "Décidée d'un commun accord en préservant l'équilibre du couple", en: "Decided by mutual agreement protecting couple security" }, score: 3 },
      { id: "B", text: { fr: "Transparente et proportionnée à nos réelles capacités", en: "Transparent and proportionate to our actual capacity" }, score: 3 },
      { id: "C", text: { fr: "Aides données en cachette sans avertir le conjoint", en: "Assistance given secretly without informing partner" }, score: 1 },
      { id: "D", text: { fr: "Siphonage des ressources du couple au profit des proches", en: "Draining couple resources for demanding relatives" }, score: 0 }
    ]
  },
  {
    id: 80,
    category: "family",
    text: {
      fr: "L'épanouissement de votre propre cellule familiale...",
      en: "The thriving of your own newly formed family unit..."
    },
    options: [
      { id: "A", text: { fr: "Considéré comme la priorité numéro une de notre foyer", en: "Recognized as the number one priority of our household" }, score: 3 },
      { id: "B", text: { fr: "Préservé avec soin comme un cocon chaleureux", en: "Carefully protected as a warm and loving sanctuary" }, score: 3 },
      { id: "C", text: { fr: "Encore trop dépendant de l'approbation des aînés", en: "Still overly reliant on older relatives' approval" }, score: 1 },
      { id: "D", text: { fr: "Fragmenté et perméable aux commérages extérieurs", en: "Fractured and permeable to external family gossip" }, score: 0 }
    ]
  },

  // =========================================================================
  // 9. HOBBIES — LOISIRS (IDs 81 - 90)
  // =========================================================================
  {
    id: 81,
    category: "hobbies",
    text: {
      fr: "Vos activités et loisirs préférés...",
      en: "Your favorite leisure activities and hobbies..."
    },
    options: [
      { id: "A", text: { fr: "Un mélange réjouissant d'intérêts communs et de passions perso", en: "A joyful blend of shared interests and personal passions" }, score: 3 },
      { id: "B", text: { fr: "Nous découvrons régulièrement de nouvelles choses ensemble", en: "We regularly explore fresh activities together" }, score: 3 },
      { id: "C", text: { fr: "Très peu d'intérêts communs mais nous nous tolérons", en: "Very few common interests, though peacefully tolerated" }, score: 2 },
      { id: "D", text: { fr: "L'un dénigre ou critique les loisirs de l'autre", en: "One belittles or mocks the hobbies of the other" }, score: 0 }
    ]
  },
  {
    id: 82,
    category: "hobbies",
    text: {
      fr: "Votre style de sorties et de soirées préférées...",
      en: "Your preferred style of social outings and evenings..."
    },
    options: [
      { id: "A", text: { fr: "Nous alternons harmonieusement entre sorties festives et cocons calmes", en: "We seamlessly alternate between social nights and cozy stay-ins" }, score: 3 },
      { id: "B", text: { fr: "Nous nous arrangeons pour que chacun y trouve son compte", en: "We arrange outings so each partner's taste is fulfilled" }, score: 3 },
      { id: "C", text: { fr: "L'un est très fêtard et l'autre casanier, créant des frictions", en: "One is an extroverted night owl, the other a homebody" }, score: 1 },
      { id: "D", text: { fr: "Isolement complet ou sorties systématiquement séparées", en: "Total isolation or systematically separate social lives" }, score: 0 }
    ]
  },
  {
    id: 83,
    category: "hobbies",
    text: {
      fr: "Votre rapport au sport et à l'exercice physique...",
      en: "Your attitude toward fitness, sports, and health..."
    },
    options: [
      { id: "A", text: { fr: "Encouragement mutuel et respect du rythme de santé de chacun", en: "Mutual cheerleading and respect for each other's pace" }, score: 3 },
      { id: "B", text: { fr: "Pratique partagée ou solo dans la bonne humeur", en: "Enjoyed solo or jointly in good spirits" }, score: 3 },
      { id: "C", text: { fr: "Pression ou remarques blessantes sur la silhouette et l'effort", en: "Pressure or hurtful remarks about body shape and exercise" }, score: 1 },
      { id: "D", text: { fr: "Sédentarité subie ou obsession sportive destructrice", en: "Unhealthy stagnation or destructive fitness obsession" }, score: 0 }
    ]
  },
  {
    id: 84,
    category: "hobbies",
    text: {
      fr: "Vos centres d'intérêt culturels (lecture, cinéma, musique, musées)...",
      en: "Your cultural interests (books, movies, music, museums)..."
    },
    options: [
      { id: "A", text: { fr: "Des conversations stimulantes qui nourrissent notre complicité", en: "Stimulating conversations that nourish our intellectual spark" }, score: 3 },
      { id: "B", text: { fr: "Curiosité sincère pour l'univers artistique de l'autre", en: "Sincere curiosity for the other's artistic universe" }, score: 3 },
      { id: "C", text: { fr: "Goûts artistiques totalement imperméables", en: "Completely segregated and incompatible artistic tastes" }, score: 1 },
      { id: "D", text: { fr: "Jugement méprisant : 'Ce que tu aimes est nul ou idiot'", en: "Condescending judgment: 'What you like is trash or stupid'" }, score: 0 }
    ]
  },
  {
    id: 85,
    category: "hobbies",
    text: {
      fr: "L'importance des moments de solitude et de calme pour soi...",
      en: "The importance of solitude and peaceful me-time..."
    },
    options: [
      { id: "A", text: { fr: "Respectée avec bienveillance : être seul recharge l'amour", en: "Warmly respected: solitude recharges the capacity to love" }, score: 3 },
      { id: "B", text: { fr: "Accordée naturellement sans que l'autre ne se vexe", en: "Granted naturally without partner taking personal offense" }, score: 3 },
      { id: "C", text: { fr: "Vécue par l'autre comme un rejet affectif ou un abandon", en: "Perceived by the other as cold rejection or abandonment" }, score: 1 },
      { id: "D", text: { fr: "Interdite : interdiction d'avoir du temps sans le partenaire", en: "Forbidden: zero allowed time away from partner" }, score: 0 }
    ]
  },
  {
    id: 86,
    category: "hobbies",
    text: {
      fr: "Vos projets créatifs, manuels ou artistiques...",
      en: "Your creative, DIY, or artistic projects..."
    },
    options: [
      { id: "A", text: { fr: "Nous nous encourageons avec admiration et fierté", en: "We encourage each other with admiration and pride" }, score: 3 },
      { id: "B", text: { fr: "Nous bricolons ou créons parfois des réalisations à deux", en: "We occasionally team up on fun DIY or artistic projects" }, score: 3 },
      { id: "C", text: { fr: "Perçus comme une perte de temps inutile par l'un des deux", en: "Viewed as a useless waste of time by one partner" }, score: 1 },
      { id: "D", text: { fr: "Sabotage ou découragement actif des talents de l'autre", en: "Active discouragement or sabotaging of creative talents" }, score: 0 }
    ]
  },
  {
    id: 87,
    category: "hobbies",
    text: {
      fr: "Votre amour de la nature, des balades et du grand air...",
      en: "Your love of nature, outdoor walks, and fresh air..."
    },
    options: [
      { id: "A", text: { fr: "Une source de ressourcement profonde partagée avec délice", en: "A profound source of grounding shared with joy" }, score: 3 },
      { id: "B", text: { fr: "Des escapades nature régulières qui font du bien à l'esprit", en: "Regular nature getaways that refresh our minds" }, score: 3 },
      { id: "C", text: { fr: "L'un adore le grand air, l'autre refuse catégoriquement d'enfiler des baskets", en: "One loves the outdoors, the other refuses to leave the couch" }, score: 1 },
      { id: "D", text: { fr: "Réticence absolue à sortir de chez soi", en: "Total refusal to ever leave the house" }, score: 1 }
    ]
  },
  {
    id: 88,
    category: "hobbies",
    text: {
      fr: "La gestion de vos cercles d'amis respectifs...",
      en: "Managing your respective circles of friends..."
    },
    options: [
      { id: "A", text: { fr: "Amis communs soudés et liberté totale de voir ses propres potes", en: "Warm mutual friends plus total freedom to see solo pals" }, score: 3 },
      { id: "B", text: { fr: "Bonne entente globale avec les groupes de chacun", en: "Good overall rapport with each partner's friend group" }, score: 3 },
      { id: "C", text: { fr: "Jalousie ou réticence lorsque l'autre sort avec ses amis", en: "Jealousy or passive resistance when partner sees friends" }, score: 1 },
      { id: "D", text: { fr: "Tentative délibérée d'isoler son partenaire de son entourage", en: "Deliberate attempt to cut partner off from their social life" }, score: 0 }
    ]
  },
  {
    id: 89,
    category: "hobbies",
    text: {
      fr: "La curiosité d'apprendre et de grandir ensemble...",
      en: "Curiosity to learn, read, and grow together..."
    },
    options: [
      { id: "A", text: { fr: "Nous nous transmettons nos découvertes avec passion et émerveillement", en: "We share insights and discoveries with passion and wonder" }, score: 3 },
      { id: "B", text: { fr: "Nous aimons écouter l'autre parler de ce qui le passionne", en: "We love hearing the other speak about what sparks their heart" }, score: 3 },
      { id: "C", text: { fr: "Chacun reste enfermé dans ses certitudes sans curiosité", en: "Each remains closed off in fixed certainties without curiosity" }, score: 1 },
      { id: "D", text: { fr: "Moqueries sur la soif d'apprendre de son conjoint", en: "Mocking a partner's intellectual curiosity or studies" }, score: 0 }
    ]
  },
  {
    id: 90,
    category: "hobbies",
    text: {
      fr: "Vos passions de longue date (gaming, musique, collection, artisanat)...",
      en: "Your long-standing passions (gaming, music, collecting, crafts)..."
    },
    options: [
      { id: "A", text: { fr: "Soutenues avec fierté et intégrées dans notre vie de manière équilibrée", en: "Supported with pride and integrated with healthy balance" }, score: 3 },
      { id: "B", text: { fr: "Respectées même si le partenaire n'y participe pas directement", en: "Respected even if the partner does not directly take part" }, score: 3 },
      { id: "C", text: { fr: "Une passion dévorante qui empiète de façon excessive sur le couple", en: "An all-consuming hobby excessively infringing on the couple" }, score: 1 },
      { id: "D", text: { fr: "Exigence d'abandonner sa passion par jalousie ou caprice", en: "Demanding partner abandon their passion out of spite" }, score: 0 }
    ]
  },

  // =========================================================================
  // 10. SPIRITUALITY — SPIRITUALITÉ & SENS DE LA VIE (IDs 91 - 100)
  // =========================================================================
  {
    id: 91,
    category: "spirituality",
    text: {
      fr: "Votre conception de la spiritualité et du sens profond de l'existence...",
      en: "Your conception of spirituality and life's deeper meaning..."
    },
    options: [
      { id: "A", text: { fr: "Une quête intérieure enrichissante partagée dans le respect", en: "An enriching inner quest shared with profound mutual respect" }, score: 3 },
      { id: "B", text: { fr: "Des sensibilités distinctes vécues avec tolérance et ouverture", en: "Distinct sensibilities practiced with tolerance and openness" }, score: 3 },
      { id: "C", text: { fr: "Un sujet rarement exploré par manque d'intérêt", en: "A subject rarely touched upon due to lack of curiosity" }, score: 2 },
      { id: "D", text: { fr: "Un fanatisme ou un rejet agressif des croyances de l'autre", en: "Fanaticism or aggressive intolerance toward partner's faith" }, score: 0 }
    ]
  },
  {
    id: 92,
    category: "spirituality",
    text: {
      fr: "Vos pratiques de méditation, recueillement ou pleine conscience...",
      en: "Your practices of mindfulness, meditation, or reflection..."
    },
    options: [
      { id: "A", text: { fr: "Un ancrage bénéfique pour cultiver notre paix intérieure", en: "A wholesome anchor cultivating our mutual inner peace" }, score: 3 },
      { id: "B", text: { fr: "Une démarche personnelle respectée par le partenaire", en: "A personal path respectfully honored by the partner" }, score: 3 },
      { id: "C", text: { fr: "Occasionnelle, quand le stress devient trop intense", en: "Occasional, whenever stress becomes overwhelming" }, score: 2 },
      { id: "D", text: { fr: "Tournée en ridicule par le partenaire comme une perte de temps", en: "Ridiculed by partner as silly or useless" }, score: 0 }
    ]
  },
  {
    id: 93,
    category: "spirituality",
    text: {
      fr: "Votre sentiment de gratitude face aux cadeaux simples de la vie...",
      en: "Your sense of gratitude for life's simple gifts..."
    },
    options: [
      { id: "A", text: { fr: "Cultivé au quotidien : nous savons apprécier la chance d'être ensemble", en: "Cultivated daily: we cherish the blessing of being together" }, score: 3 },
      { id: "B", text: { fr: "Ressenti régulièrement lors des moments de grâce à deux", en: "Felt regularly during gentle moments of grace" }, score: 3 },
      { id: "C", text: { fr: "Éclipsé par des plaintes et une insatisfaction chronique", en: "Eclipsed by chronic complaints and dissatisfaction" }, score: 1 },
      { id: "D", text: { fr: "Inexistant : aigreur permanente face au sort", en: "Non-existent: permanent bitterness toward existence" }, score: 0 }
    ]
  },
  {
    id: 94,
    category: "spirituality",
    text: {
      fr: "Votre connexion avec la nature et le vivant...",
      en: "Your connection with nature and the living world..."
    },
    options: [
      { id: "A", text: { fr: "Un respect sacré qui inspire nos choix écologiques et éthiques", en: "A sacred respect guiding our ecological and ethical choices" }, score: 3 },
      { id: "B", text: { fr: "Une source de paix et de beauté que nous apprécions", en: "A source of beauty and peace that we appreciate" }, score: 3 },
      { id: "C", text: { fr: "Une sensibilité différente que nous accordons sans heurts", en: "Different sensibilities negotiated smoothly" }, score: 2 },
      { id: "D", text: { fr: "Indifférence totale envers la préservation de l'environnement", en: "Complete disregard for nature and environmental care" }, score: 1 }
    ]
  },
  {
    id: 95,
    category: "spirituality",
    text: {
      fr: "Votre engagement dans le développement personnel et la thérapie...",
      en: "Your commitment to personal growth and psychological healing..."
    },
    options: [
      { id: "A", text: { fr: "Nous encourageons nos prises de conscience et notre guérison émotionnelle", en: "We encourage self-awareness and emotional healing with love" }, score: 3 },
      { id: "B", text: { fr: "Ouverts aux lectures et aux conseils de psychologie de couple", en: "Receptive to readings and relationship psychology guidance" }, score: 3 },
      { id: "C", text: { fr: "Réticence à se remettre en question ou à consulter", en: "Reluctance to question oneself or seek professional help" }, score: 1 },
      { id: "D", text: { fr: "Refus orgueilleux : 'Je n'ai aucun problème, c'est toi qui es fou/folle'", en: "Arrogant denial: 'I have no issues, you are the crazy one'" }, score: 0 }
    ]
  },
  {
    id: 96,
    category: "spirituality",
    text: {
      fr: "Votre philosophie face à la vulnérabilité et au lâcher-prise...",
      en: "Your philosophy regarding vulnerability and letting go..."
    },
    options: [
      { id: "A", text: { fr: "Accepter ce qui ne dépend pas de nous et cultiver la confiance", en: "Accepting what is outside our control and cultivating trust" }, score: 3 },
      { id: "B", text: { fr: "Nous nous aidons mutuellement à décompresser face aux imprévus", en: "We help each other decompress when surprises occur" }, score: 3 },
      { id: "C", text: { fr: "Un besoin maniaque de tout contrôler qui use le couple", en: "A compulsive need to control everything exhausting the couple" }, score: 1 },
      { id: "D", text: { fr: "Angoisse permanente projetée sous forme de reproches", en: "Permanent existential dread dumped as daily accusations" }, score: 0 }
    ]
  },
  {
    id: 97,
    category: "spirituality",
    text: {
      fr: "Votre rapport aux épreuves et au pardon transcendant...",
      en: "Your relationship with hardship and transcendent forgiveness..."
    },
    options: [
      { id: "A", text: { fr: "L'amour est plus fort que les ego : le pardon répare et libère", en: "Love is stronger than ego: forgiveness heals and liberates" }, score: 3 },
      { id: "B", text: { fr: "Nous croyons aux secondes chances accordées avec lucidité", en: "We believe in second chances granted with clear eyes" }, score: 3 },
      { id: "C", text: { fr: "Pardonner est très difficile et laisse des cicatrices douloureuses", en: "Forgiving is very hard and leaves painful open wounds" }, score: 1 },
      { id: "D", text: { fr: "Loi du talion : vengeance et cruauté dès qu'une faute survient", en: "Eye for an eye: cruelty and revenge whenever a fault happens" }, score: 0 }
    ]
  },
  {
    id: 98,
    category: "spirituality",
    text: {
      fr: "Votre vision de la mort, du deuil et de l'impermanence...",
      en: "Your relationship with mortality, grief, and impermanence..."
    },
    options: [
      { id: "A", text: { fr: "Conscience que le temps est précieux, nous poussant à nous aimer intensément", en: "Awareness that time is fleeting, driving us to love intensely" }, score: 3 },
      { id: "B", text: { fr: "Un sujet abordé avec sérénité et écoute compatissante", en: "A topic addressed with calm and compassionate listening" }, score: 3 },
      { id: "C", text: { fr: "Une angoisse existentielle lourde difficile à évoquer", en: "Heavy existential anxiety that feels awkward to express" }, score: 1 },
      { id: "D", text: { fr: "Tabou total rejeté avec violence dès qu'il est effleuré", en: "Total taboo violently shut down as soon as touched upon" }, score: 0 }
    ]
  },
  {
    id: 99,
    category: "spirituality",
    text: {
      fr: "Vos valeurs transcendantales (amour inconditionnel, vérité, justice)...",
      en: "Your transcendent values (unconditional love, truth, justice)..."
    },
    options: [
      { id: "A", text: { fr: "Elles illuminent nos choix et nous guident comme une boussole morale", en: "They illuminate our choices and serve as our moral compass" }, score: 3 },
      { id: "B", text: { fr: "Nous cherchons à nous élever mutuellement vers le meilleur", en: "We strive to uplift each other toward the best version of ourselves" }, score: 3 },
      { id: "C", text: { fr: "Des idéaux abstraits qui s'effacent vite face aux intérêts égoïstes", en: "Abstract ideals quickly fading in front of selfish interests" }, score: 1 },
      { id: "D", text: { fr: "Cynisme complet : 'Tout n'est que manipulation et intérêt'", en: "Total cynicism: 'Everything is just manipulation and ego'" }, score: 0 }
    ]
  },
  {
    id: 100,
    category: "spirituality",
    text: {
      fr: "La célébration de la magie d'être ensemble au quotidien...",
      en: "Celebrating the daily magic and blessing of being together..."
    },
    options: [
      { id: "A", text: { fr: "Nous prenons conscience régulièrement du cadeau précieux de notre amour", en: "We regularly pause to marvel at the precious gift of our love" }, score: 3 },
      { id: "B", text: { fr: "Des moments de complicité silencieuse où tout semble parfait", en: "Moments of quiet synchrony where everything feels just right" }, score: 3 },
      { id: "C", text: { fr: "Pris dans le tourbillon de la vie, nous oublions parfois de savourer", en: "Swept by the daily grind, we sometimes forget to savor it" }, score: 2 },
      { id: "D", text: { fr: "La magie a totalement disparu et a laissé place à la désillusion", en: "The magic has vanished, replaced by bitter disillusionment" }, score: 0 }
    ]
  }
];

// =========================================================================
// EXPORTS
// =========================================================================

// Export pour utilisation dans Node / modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = questions;
}

// Pour utilisation directe dans le navigateur
if (typeof window !== 'undefined') {
  window.questions = questions;
}
