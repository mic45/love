export interface ThemedQuizOption {
  text: string;
  score: number; // 1 to 4
  insight?: string;
}

export interface ThemedQuizQuestion {
  id: number;
  question: string;
  context?: string;
  options: ThemedQuizOption[];
}

export interface ThemedQuizResultBracket {
  minScorePercent: number;
  verdict: string;
  headline: string;
  analysis: string;
  strengths: string[];
  growthAreas: string[];
  concreteTips: { title: string; desc: string }[];
  coupleChallenge: string;
}

export interface ThemedQuiz {
  id: 'cohabitation' | 'communication' | 'intimacy' | 'finances';
  category: string;
  badge: string;
  icon: string;
  accentColor: string;
  estimatedTime: string;
  questionCount: number;
  title: string;
  subtitle: string;
  pitch: string;
  questions: ThemedQuizQuestion[];
  results: ThemedQuizResultBracket[];
}

export const THEMED_QUIZZES: Record<'fr' | 'en', ThemedQuiz[]> = {
  fr: [
    {
      id: 'cohabitation',
      category: 'Vie Commune & Quotidien',
      badge: 'Emménagement & Foyer',
      icon: '🏠',
      accentColor: '#FF6B8A',
      estimatedTime: '2 min',
      questionCount: 6,
      title: 'Sommes-nous prêts à emménager ensemble ?',
      subtitle: 'Testez la compatibilité de vos modes de vie, le partage de l’espace et vos rituels au quotidien.',
      pitch: 'Passer du temps ensemble le week-end est une chose, partager le même toit 24h/24 en est une autre. Ce quiz évalue vos habitudes de vie, la charge logistique et le respect de l’espace personnel.',
      questions: [
        {
          id: 1,
          question: 'Comment gérez-vous l’ordre et le ménage chez vous en temps normal ?',
          context: 'L’organisation du foyer est la cause n°1 de micro-frictions quotidiennes.',
          options: [
            { text: 'Chacun a ses habitudes, mais on s’accorde toujours sans prise de tête.', score: 4 },
            { text: 'L’un est plus maniaque que l’autre, mais on trouve des compromis équitables.', score: 3 },
            { text: 'C’est parfois une source d’agacement quand les affaires traînent.', score: 2 },
            { text: 'On a des visions opposées : l’un est ultra-ordonné, l’autre très bordélique.', score: 1 },
          ],
        },
        {
          id: 2,
          question: 'De quelle quantité de temps seul(e) ou d’espace personnel avez-vous besoin ?',
          context: 'Savoir se ressourcer individuellement est le secret des colocations amoureuses durables.',
          options: [
            { text: 'On respecte parfaitement le besoin d’isolement de l’autre sans le prendre mal.', score: 4 },
            { text: 'On en a discuté et on sait préserver des moments pour nos hobbies perso.', score: 3 },
            { text: 'L’un de nous a parfois peur d’étouffer ou au contraire se sent rejeté quand l’autre s’isole.', score: 2 },
            { text: 'On ne s’est jamais posé la question, tout est souvent fusionnel ou confus.', score: 1 },
          ],
        },
        {
          id: 3,
          question: 'Avez-vous déjà fait un test de cohabitation prolongée (ex: vacances de 2-3 semaines) ?',
          options: [
            { text: 'Oui, plusieurs fois : c’était fluide, joyeux et naturel.', score: 4 },
            { text: 'Oui, il y a eu de légers ajustements au début, puis tout s’est bien passé.', score: 3 },
            { text: 'Uniquement quelques jours d’affilée, pas encore sur la durée.', score: 2 },
            { text: 'Jamais, ce sera un grand saut dans l’inconnu.', score: 1 },
          ],
        },
        {
          id: 4,
          question: 'Comment envisagez-vous la répartition des dépenses du logement (loyer, courses, factures) ?',
          options: [
            { text: 'C’est déjà clair et validé : au prorata des revenus ou 50/50 en toute sérénité.', score: 4 },
            { text: 'On a une idée générale, on affinera les détails à l’installation.', score: 3 },
            { text: 'Le sujet est un peu délicat ou n’a pas encore été chiffré concrètement.', score: 2 },
            { text: 'On évite d’en parler pour le moment de peur de créer une dispute.', score: 1 },
          ],
        },
        {
          id: 5,
          question: 'Recevoir des amis ou de la famille à l’improviste dans votre futur chez-vous :',
          options: [
            { text: 'On a la même vision de l’hospitalité et on se concerte toujours naturellement.', score: 4 },
            { text: 'On a convenu d’une règle simple : prévenir l’autre avant toute invitation.', score: 3 },
            { text: 'L’un est très casanier et l’autre adore avoir du monde tout le temps.', score: 2 },
            { text: 'C’est un désaccord récurrent : nos rythmes sociaux sont incompatibles.', score: 1 },
          ],
        },
        {
          id: 6,
          question: 'Quelle est votre principale motivation à vivre sous le même toit ?',
          options: [
            { text: 'Le désir profond de construire un cocon commun et de partager notre quotidien.', score: 4 },
            { text: 'L’évolution naturelle et excitante de notre histoire d’amour.', score: 3 },
            { text: 'Une opportunité pratique ou financière (fin de bail, économie de loyer).', score: 2 },
            { text: 'La peur de se perdre de vue ou la pression de l’entourage.', score: 1 },
          ],
        },
      ],
      results: [
        {
          minScorePercent: 80,
          verdict: 'Tandem Prêt à 100% ! ✨',
          headline: 'Feu vert éclatant : votre cocon d’amour vous attend',
          analysis: 'Vos valeurs pratiques, votre respect des espaces intimes et votre communication logistique sont alignés. Vous concevez la vie commune comme un enrichissement mutuel et non comme une contrainte.',
          strengths: ['Excellente gestion de l’espace personnel', 'Transparence financière et organisationnelle', 'Alignement des rythmes de vie'],
          growthAreas: ['Garder des rendez-vous amoureux à l’extérieur pour ne pas tomber dans la routine en pantoufles'],
          concreteTips: [
            { title: 'Rituel du sas de décompression', desc: 'Accordez-vous 15 minutes en rentrant du travail avant de déverser la logistique de la journée.' },
            { title: 'Date-night hebdomadaire sacralisée', desc: 'Fixez un soir par semaine où l’on s’habille chic et où l’on sort comme au premier rendez-vous.' },
          ],
          coupleChallenge: 'Visitez un magasin de déco ou un marché et choisissez ensemble un objet symbolique pour votre futur salon !',
        },
        {
          minScorePercent: 55,
          verdict: 'Très prometteur avec quelques réglages 🏡',
          headline: 'La volonté est là, posez les règles du jeu pour vous envoler',
          analysis: 'L’amour et le désir de vivre ensemble sont indéniables ! Cependant, quelques zones d’ombres méritent d’être clarifiées avant de signer le bail : répartition des corvées, budget courses et moments de solitude.',
          strengths: ['Enthousiasme et complicité affective', 'Capacité d’adaptation'],
          growthAreas: ['Préciser la répartition des dépenses', 'Définir les règles de propreté et d’invitations'],
          concreteTips: [
            { title: 'La charte de vie commune amusante', desc: 'Rédigez sur un carnet vos 3 règles d’or indispensables (bruit, sommeil, vaisselle).' },
            { title: 'Test grandeur nature', desc: 'Passez une semaine complète chez l’un sans ménagement comme de vrais colocataires amoureux.' },
          ],
          coupleChallenge: 'Faites la liste de vos 3 plus grandes craintes logistiques et discutez-en en dégustant un bon dessert.',
        },
        {
          minScorePercent: 0,
          verdict: 'Prenez encore un peu de temps 🌱',
          headline: 'Priorité au dialogue préalable pour protéger votre relation',
          analysis: 'Emménager trop vite peut fragiliser une relation encore en phase d’ajustement. Vous avez des différences notables de rythme, de gestion financière ou d’espace personnel. Rien d’insurmontable, mais cela demande des fondations plus claires.',
          strengths: ['Vous savez ce qui vous importe individuellement', 'Marge d’apprentissage à deux'],
          growthAreas: ['Désamorcer les sujets tabous (argent, ménage)', 'Respecter l’autonomie de chacun sans vexation'],
          concreteTips: [
            { title: 'Pas de précipitation sous contrainte', desc: 'Ne déménagez pas uniquement par souci d’économies ou par pression extérieure.' },
            { title: 'Week-ends d’immersion progressive', desc: 'Multipliez les séjours partagés de plusieurs jours pour vous observer dans le quotidien brut.' },
          ],
          coupleChallenge: 'Passez 48h ensemble sans aucune intervention d’écran ni livraison repas, en cuisinant et rangeant ensemble.',
        },
      ],
    },
    {
      id: 'communication',
      category: 'Harmonie & Dialogue',
      badge: 'Résolution des Désaccords',
      icon: '💬',
      accentColor: '#3A86FF',
      estimatedTime: '2 min',
      questionCount: 6,
      title: 'Comment votre couple désamorce-t-il les conflits ?',
      subtitle: 'Analysez votre style de dispute, votre capacité d’écoute active et la rapidité de vos réconciliations.',
      pitch: 'Ce ne sont pas les désaccords qui brisent les couples, mais la manière dont ils sont gérés. Ce test identifie si votre dynamique est constructive, évitante ou explosive.',
      questions: [
        {
          id: 1,
          question: 'Lorsqu’un reproche ou une contrariété survient, comment réagissez-vous ?',
          options: [
            { text: 'On formule son ressenti calmement avec le « je » sans attaquer l’autre.', score: 4 },
            { text: 'On attend d’avoir digéré l’émotion avant d’en parler posément.', score: 3 },
            { text: 'L’un a tendance à bouder ou à se fermer comme une coquille.', score: 2 },
            { text: 'Le ton monte vite, les vieux dossiers ressortent et on se coupe la parole.', score: 1 },
          ],
        },
        {
          id: 2,
          question: 'Après une vive dispute, combien de temps dure la tension ?',
          options: [
            { text: 'Moins d’une heure : on sait faire un câlin et s’excuser sans rancune.', score: 4 },
            { text: 'Quelques heures, le temps de reprendre ses esprits et de se retrouver.', score: 3 },
            { text: 'Parfois plus de 24h d’ambiance glaciale ou de silence pesant.', score: 2 },
            { text: 'Plusieurs jours, avec un ressentiment qui s’accumule sous le tapis.', score: 1 },
          ],
        },
        {
          id: 3,
          question: 'Êtes-vous capables de dire « Je suis désolé(e), j’ai eu tort » ?',
          options: [
            { text: 'Oui, naturellement et sincèrement, sans que ce soit perçu comme une défaite.', score: 4 },
            { text: 'Oui, même si l’amour-propre demande parfois un petit temps de pause.', score: 3 },
            { text: 'C’est très dur pour l’un de nous : on préfère agir comme si de rien n’était.', score: 2 },
            { text: 'Presque jamais : chacun campe sur ses positions et attend l’autre.', score: 1 },
          ],
        },
        {
          id: 4,
          question: 'Pendant un désaccord, l’un de vous utilise-t-il des phrases absolues (« Tu fais TOUJOURS ça », « Tu ne m’écoutes JAMAIS ») ?',
          options: [
            { text: 'Non, on reste concentrés sur l’événement précis du moment.', score: 4 },
            { text: 'Rarement, et on se reprend vite si le mot s’échappe.', score: 3 },
            { text: 'Assez fréquemment dans le feu de l’agacement.', score: 2 },
            { text: 'C’est systématique : le conflit devient une remise en cause de la personne.', score: 1 },
          ],
        },
        {
          id: 5,
          question: 'Vous sentez-vous réellement entendu(e) et validé(e) dans vos émotions par votre partenaire ?',
          options: [
            { text: 'Totalement : même en désaccord, mes ressentis sont pris au sérieux.', score: 4 },
            { text: 'La plupart du temps, même s’il faut parfois répéter ou insister.', score: 3 },
            { text: 'Mes émotions sont parfois minimisées (« Tu exagères », « C’est rien »).', score: 2 },
            { text: 'Je me sens souvent incompris(e) ou jugé(e) quand j’exprime mes peines.', score: 1 },
          ],
        },
        {
          id: 6,
          question: 'Avez-vous un code ou un signal pour interrompre une dispute avant le point de non-retour ?',
          options: [
            { text: 'Oui, un mot-code ou un geste pour faire une pause de 10 minutes.', score: 4 },
            { text: 'On arrive souvent à désamorcer avec une pointe d’autodérision.', score: 3 },
            { text: 'Pas formellement, on s’arrête quand la fatigue ou les larmes arrivent.', score: 2 },
            { text: 'Non, on va souvent trop loin dans les paroles blessantes.', score: 1 },
          ],
        },
      ],
      results: [
        {
          minScorePercent: 80,
          verdict: 'Communication Sereine & Constructive 🛡️',
          headline: 'Une maturité émotionnelle exemplaire qui solidifie votre amour',
          analysis: 'Vous possédez le super-pouvoir des couples durables : la capacité à être en désaccord sans cesser de vous aimer. Votre écoute active et votre promptitude à désamorcer les tensions préservent votre lien sacré.',
          strengths: ['Désescalade rapide', 'Empathie et respect mutuel', 'Pardon sincère sans rancœur'],
          growthAreas: ['Veiller à ne pas réprimer de petites frustrations par peur d’ébranler l’harmonie'],
          concreteTips: [
            { title: 'La règle du miroir', desc: 'Quand un sujet est sensible, reformulez ce que l’autre a dit : « Si j’ai bien compris, tu ressens... » avant de répondre.' },
            { title: 'Le check-in hebdomadaire de 10 minutes', desc: 'Chaque dimanche soir : « Comment s’est passée notre semaine à deux ? Qu’est-ce qui t’a fait plaisir ? »' },
          ],
          coupleChallenge: 'Accordez-vous 5 minutes de câlin en silence complet après chaque discussion sérieuse pour réaligner vos battements de cœur.',
        },
        {
          minScorePercent: 55,
          verdict: 'Dialogue Sincère à Pacifier ⚖️',
          headline: 'De l’amour et des ajustements pour éviter l’usure des non-dits',
          analysis: 'Votre tandem communique bien sur les choses positives, mais les moments de stress réveillent des mécanismes d’attaque-défense ou de retrait boudeur. En apprenant à temporiser avant d’exploser, vous gagnerez une sérénité immense.',
          strengths: ['Attachement profond', 'Envie partagée d’apaisement'],
          growthAreas: ['Bannir les généralisations (« toujours », « jamais »)', 'Raccourcir la durée de bouderie'],
          concreteTips: [
            { title: 'Le bouton pause de 20 minutes', desc: 'Dès que le rythme cardiaque s’emballe, dites : « Je t’aime, je veux qu’on trouve une solution, faisons 20 min de pause d’abord ».' },
            { title: 'Remplacer le « Tu » accusateur par le « Je » vulnérable', desc: 'Remplacez « Tu ne m’aides jamais » par « Je me sens débordé(e) et j’ai besoin de ton soutien ».' },
          ],
          coupleChallenge: 'Choisissez un « mot magique » rigolo (ex: Papaye ou Kangourou) qui oblige immédiatement les deux à se taire et sourire pendant une dispute.',
        },
        {
          minScorePercent: 0,
          verdict: 'Zone de Conflits Épuisante 🚨',
          headline: 'Urgence de réinventer vos codes de dialogue pour guérir le lien',
          analysis: 'Les disputes laissent des traces, s’enveniment ou se terminent par un mur de silence. Cette dynamique use l’amour à petit feu. Il est temps de changer les règles du jeu pour que chacun se sente en sécurité affective.',
          strengths: ['Prise de conscience salvatrice par ce quiz', 'Le lien peut se réparer avec de nouveaux outils'],
          growthAreas: ['Stopper les attaques personnelles et l’ironie mordante', 'Désarmer la peur de perdre la face'],
          concreteTips: [
            { title: 'Règle absolue : zéro écran pendant un échange', desc: 'Pas de téléphone à la main lors d’un débat difficile.' },
            { title: 'La lettre de réconciliation', desc: 'Si parler est trop difficile, écrivez vos émotions sur papier pour éviter les interruptions blessantes.' },
          ],
          coupleChallenge: 'Passez une semaine entière avec un défi zéro reproche direct : toute critique doit obligatoirement être précédée d’un compliment sincère.',
        },
      ],
    },
    {
      id: 'intimacy',
      category: 'Passion & Connexion',
      badge: 'Flamme & Complicité',
      icon: '🔥',
      accentColor: '#E63946',
      estimatedTime: '2 min',
      questionCount: 6,
      title: 'Où en est la flamme & l’intimité de votre duo ?',
      subtitle: 'Mesurez la tendresse au quotidien, la spontanéité, le désir et l’intensité de votre complicité secrète.',
      pitch: 'Entre la routine, le travail et la fatigue, comment se porte votre magnétisme amoureux ? Ce quiz ausculte la vitalité de votre lien physique, sensuel et affectif.',
      questions: [
        {
          id: 1,
          question: 'À quelle fréquence échangez-vous des gestes tendres gratuits (câlins, baisers volés, mains tenues sans attente derrière) ?',
          options: [
            { text: 'Tous les jours et plusieurs fois par jour, c’est notre seconde nature.', score: 4 },
            { text: 'Régulièrement, dès qu’on se retrouve le soir.', score: 3 },
            { text: 'Moins souvent qu’au début, la fatigue prend parfois le dessus.', score: 2 },
            { text: 'Très rarement : les gestes d’affection spontanés ont presque disparu.', score: 1 },
          ],
        },
        {
          id: 2,
          question: 'Ressentez-vous encore de l’admiration et du désir physique pour votre partenaire ?',
          options: [
            { text: 'Oui, une étincelle très vive et une attraction intacte.', score: 4 },
            { text: 'Oui, un désir doux et constant qui sait se réveiller.', score: 3 },
            { text: 'Par périodes : il y a des hauts et des bas marqués.', score: 2 },
            { text: 'Le lien ressemble davantage à une colocation amicale aujourd’hui.', score: 1 },
          ],
        },
        {
          id: 3,
          question: 'Quand avez-vous fait une vraie surprise amoureuse ou un date inédit pour la dernière fois ?',
          options: [
            { text: 'Ces dernières semaines : on aime pimenter les choses régulièrement.', score: 4 },
            { text: 'Le mois dernier, on s’efforce de garder ce rythme.', score: 3 },
            { text: 'Il y a plusieurs mois, la routine du quotidien a pris le dessus.', score: 2 },
            { text: 'On ne s’en souvient même plus, c’est métro-boulot-dodo.', score: 1 },
          ],
        },
        {
          id: 4,
          question: 'Arrivez-vous à parler librement de vos envies intimes, désirs et fantasmes sans tabou ?',
          options: [
            { text: 'En toute confiance et sans aucun jugement, c’est un espace libre et joyeux.', score: 4 },
            { text: 'Globalement oui, même si certains sujets demandent de la pudeur.', score: 3 },
            { text: 'C’est un peu gênant ou intimidant d’aborder le sujet.', score: 2 },
            { text: 'Sujet complètement verrouillé ou source de frustration silencieuse.', score: 1 },
          ],
        },
        {
          id: 5,
          question: 'Au lit ou sur le canapé le soir, quelle place ont vos téléphones portables ?',
          options: [
            { text: 'Bannis ! On privilégie la discussion, les regards et les caresses.', score: 4 },
            { text: 'On regarde un peu, mais on sait poser l’écran pour se retrouver.', score: 3 },
            { text: 'Chacun scrolle dans son coin jusqu’à s’endormir la plupart des soirs.', score: 2 },
            { text: 'Les écrans ont totalement remplacé nos moments d’intimité du coucher.', score: 1 },
          ],
        },
        {
          id: 6,
          question: 'Avez-vous des rituels secrets qui n’appartiennent qu’à vous deux (blagues privées, surnoms, regards complices) ?',
          options: [
            { text: 'Des dizaines ! On a un univers secret rien qu’à nous deux.', score: 4 },
            { text: 'Oui, une belle complicité qui nous fait souvent sourire.', score: 3 },
            { text: 'Un peu moins qu’avant, mais les réflexes reviennent vite.', score: 2 },
            { text: 'Presque plus, on a perdu cette petite magie légère.', score: 1 },
          ],
        },
      ],
      results: [
        {
          minScorePercent: 80,
          verdict: 'Flamme Incandescente & Passion Vivante 🔥',
          headline: 'Une alchimie sensuelle et émotionnelle rayonnante',
          analysis: 'Félicitations ! Vous réussissez le tour de force de marier la tendresse du quotidien et l’intensité du désir. Vos gestes d’affection spontanés et votre complicité intime créent un bouclier protecteur contre l’érosion du temps.',
          strengths: ['Attraction mutuelle vive', 'Rituels complices préservés', 'Communication intime sans tabou'],
          growthAreas: ['Continuer à innover pour ne jamais considérer cette alchimie comme un acquis'],
          concreteTips: [
            { title: 'Le baiser de 6 secondes de Gottman', desc: 'Un baiser passionné de 6 secondes chaque matin et chaque soir libère de l’ocytocine et renforce l’attachement.' },
            { title: 'La boîte aux petits mots coquins', desc: 'Glissez un mot doux ou suggestif dans la poche ou le sac de votre moitié à son insu.' },
          ],
          coupleChallenge: 'Ce soir, instaurez une heure complète zéro écran à la lueur des bougies avec massage réciproque des épaules.',
        },
        {
          minScorePercent: 55,
          verdict: 'Complicité Solide : La Flamme à Nourrir 🕯️',
          headline: 'L’amour est profond, la routine demande à être bousculée',
          analysis: 'Le lien affectif est chaleureux et sécurisant, mais le tourbillon de la vie moderne (fatigue, travail, logistique) a légèrement engourdi la spontanéité sensuelle. Une poignée d’initiatives simples suffira à réveiller des papillons.',
          strengths: ['Sécurité affective et confiance', 'Terreau fertile pour relancer le désir'],
          growthAreas: ['Sortir des écrans au coucher', 'Réinjecter de la surprise et du jeu'],
          concreteTips: [
            { title: 'Le couvre-feu digital 30 min avant de dormir', desc: 'Laissez les téléphones dans le salon pour transformer la chambre en sanctuaire du couple.' },
            { title: 'Le date mystère alternatif', desc: 'Chacun à votre tour, organisez un rendez-vous surprise dont l’autre ignore totalement le programme.' },
          ],
          coupleChallenge: 'Envoyez à votre partenaire en milieu d’après-midi un SMS mentionnant un souvenir intime marquant que vous avez partagé.',
        },
        {
          minScorePercent: 0,
          verdict: 'Flamme en Veilleuse : Réaction Requise ❄️',
          headline: 'Le syndrome des colocataires amoureux : réactivez l’étincelle',
          analysis: 'Vous partagez une vie, des responsabilités, mais la connexion sensuelle et romantique s’est étiolée sous le poids des habitudes. Ce n’est pas une fatalité : c’est souvent le signe que le couple a besoin de temps de qualité exclusif.',
          strengths: ['Le respect et l’histoire commune existent encore', 'Prise de conscience nécessaire'],
          growthAreas: ['Réapprendre le contact physique non sexualisé', 'Briser le silence sur les désirs insatisfaits'],
          concreteTips: [
            { title: 'La thérapie de la caresse désintéressée', desc: 'Se prendre dans les bras pendant 2 minutes sans aucune arrière-pensée de performance.' },
            { title: 'Week-end d’évasion en tête-à-tête', desc: 'Quittez votre environnement habituel pour réactiver la curiosité de l’autre.' },
          ],
          coupleChallenge: 'Asseyez-vous face à face et regardez-vous dans les yeux pendant 2 minutes d’affilée sans parler, puis prenez-vous dans les bras.',
        },
      ],
    },
    {
      id: 'finances',
      category: 'Projets & Avenir',
      badge: 'Finances & Argent',
      icon: '💎',
      accentColor: '#2EC4B6',
      estimatedTime: '2 min',
      questionCount: 6,
      title: 'Argent & Finances dans votre couple : Zéro tabou ?',
      subtitle: 'Comptes joints, dépenses perso, vision de l’épargne : vos finances sont-elles une force ou un sujet sensible ?',
      pitch: 'L’argent est l’un des sujets les plus chargés émotionnellement dans la vie à deux. Ce quiz décrypte vos croyances financières, votre équité et vos rêves matériels communs.',
      questions: [
        {
          id: 1,
          question: 'Comment décririez-vous le niveau de transparence financière entre vous ?',
          options: [
            { text: 'Transparence totale : on connaît nos revenus, charges et dettes respectives sans honte.', score: 4 },
            { text: 'Bonne transparence sur le budget commun, un jardin secret sur les petites dépenses perso.', score: 3 },
            { text: 'Un peu flou : on n’ose pas trop aborder le montant exact des salaires ou épargnes.', score: 2 },
            { text: 'Sujet tabou ou source régulière de cachotteries et de méfiance.', score: 1 },
          ],
        },
        {
          id: 2,
          question: 'Comment gérez-vous la différence éventuelle de revenus dans le couple ?',
          options: [
            { text: 'En toute équité : répartition au prorata des revenus pour que le reste à vivre soit juste.', score: 4 },
            { text: '50/50 consenti et ajusté avec souplesse quand l’un a un coup dur.', score: 3 },
            { text: 'Celui qui gagne moins se sent parfois complexé ou sous pression financière.', score: 2 },
            { text: 'Source de rancœur ou de déséquilibre de pouvoir dans les décisions.', score: 1 },
          ],
        },
        {
          id: 3,
          question: 'Quel est votre rapport respectif à l’épargne et aux dépenses impulsives ?',
          options: [
            { text: 'Très complémentaire : un équilibre sain entre kiffer le présent et bâtir l’avenir.', score: 4 },
            { text: 'Des styles un peu différents (l’un plus économe, l’autre plus dépensier), mais gérés calmement.', score: 3 },
            { text: 'L’un reproche souvent à l’autre de trop jeter l’argent par les fenêtres ou d’être trop radin.', score: 2 },
            { text: 'Incompatibilité majeure : anxiété permanente face aux choix financiers de l’autre.', score: 1 },
          ],
        },
        {
          id: 4,
          question: 'Pour un achat individuel coûteux (ex: technologie, mode, week-end perso), comment procédez-vous ?',
          options: [
            { text: 'Chacun a son compte personnel pour ses plaisirs sans avoir à rendre de comptes.', score: 4 },
            { text: 'On en parle en amont par bienveillance mutuelle sans s’interdire quoi que ce soit.', score: 3 },
            { text: 'On a parfois un sentiment de culpabilité ou peur d’être jugé(e).', score: 2 },
            { text: 'Ça déclenche des scènes de ménage et des comparaisons perpétuelles.', score: 1 },
          ],
        },
        {
          id: 5,
          question: 'Avez-vous des projets financiers partagés à 2-5 ans (achat immo, voyage, mariage, épargne de précaution) ?',
          options: [
            { text: 'Oui, une vision limpide et des objectifs clairs mis en place ensemble.', score: 4 },
            { text: 'On a de beaux rêves communs, il reste à fixer un plan d’épargne concret.', score: 3 },
            { text: 'Chacun a ses projets dans son coin sans réelle stratégie commune.', score: 2 },
            { text: 'Nos priorités d’avenir sont totalement divergentes.', score: 1 },
          ],
        },
        {
          id: 6,
          question: 'Si l’un des deux venait à traverser une période d’inactivité ou de reconversion :',
          options: [
            { text: 'L’autre soutiendrait l’effort comme une véritable équipe soudée.', score: 4 },
            { text: 'On s’adapterait en réduisant la voilure d’un commun accord.', score: 3 },
            { text: 'Cela générerait une angoisse considérable et de fortes tensions.', score: 2 },
            { text: 'Ce serait une crise majeure difficilement surmontable.', score: 1 },
          ],
        },
      ],
      results: [
        {
          minScorePercent: 80,
          verdict: 'Équilibre & Sérénité Financière 💎',
          headline: 'L’argent est un levier de liberté et de projets pour votre duo',
          analysis: 'Vous avez dépassé les tabous culturels liés à l’argent. Votre système de gestion respecte l’autonomie de chacun tout en consolidant les projets de couple. Vous formez une véritable équipe financière solide et généreuse.',
          strengths: ['Équité et absence de rancœur', 'Transparence et confiance mutuelle', 'Vision commune de l’épargne'],
          growthAreas: ['Réévaluer périodiquement les règles si la situation professionnelle évolue'],
          concreteTips: [
            { title: 'La règle des 3 comptes (Le système idéal)', desc: 'Un compte joint pour toutes les charges communes + Deux comptes individuels pour les dépenses plaisir sans justification.' },
            { title: 'Le « Sommet financier » semestriel décontracté', desc: 'Une fois tous les 6 mois devant un bon repas : faire le bilan des économies et fêter les étapes franchies.' },
          ],
          coupleChallenge: 'Définissez ensemble un « Projet Plaisir » secret à financer à deux dans les 6 prochains mois.',
        },
        {
          minScorePercent: 55,
          verdict: 'Système Opérationnel à Clarifier 📊',
          headline: 'Une bonne entente avec des zones de non-dits à lever',
          analysis: 'Le quotidien fonctionne mais les discussions d’argent génèrent parfois une légère gêne ou de la culpabilité. En fixant des règles du jeu objectives (qui paie quoi, seuil d’achat sans consultation), vous supprimerez 90% des frictions.',
          strengths: ['Bonne volonté et équilibre global', 'Désir d’honnêteté'],
          growthAreas: ['Clarifier la méthode de partage (50/50 vs prorata)', 'Sécuriser un compte plaisir individuel'],
          concreteTips: [
            { title: 'Le seuil de consultation', desc: 'Fixez un montant (ex: 150€) en-dessous duquel chacun achète ce qu’il veut sans demander, et au-dessus duquel on s’en parle.' },
            { title: 'Désamorcer le tabou', desc: 'Rappelez-vous que l’argent n’est qu’un outil d’énergie au service de vos rêves de vie.' },
          ],
          coupleChallenge: 'Révélez-vous sans honte l’achat le plus futile que vous avez fait ce mois-ci et riez-en ensemble !',
        },
        {
          minScorePercent: 0,
          verdict: 'Sujet Chaud & Source d’Anxiété ⚡',
          headline: 'Besoins urgents de clarté pour désamorcer les rancœurs',
          analysis: 'L’argent cristallise des sentiments de déséquilibre, de contrôle ou d’injustice dans votre relation. Ce n’est jamais une question de chiffres, mais d’émotions sous-jacentes (peur du manque, besoin de reconnaissance). Un recadrage sain est impératif.',
          strengths: ['Prise de conscience salvatrice par ce quiz', 'Possibilité d’apaiser la relation'],
          growthAreas: ['Mettre fin aux cachotteries', 'Dissocier valeur personnelle et montant du salaire'],
          concreteTips: [
            { title: 'Sortir de la dette morale', desc: 'Celui qui gagne plus ne doit pas décider de tout ; celui qui gagne moins ne doit pas se sentir coupable.' },
            { title: 'Séparer charges fixes et dépenses perso', desc: 'Chacun doit impérativement conserver une autonomie financière minimale.' },
          ],
          coupleChallenge: 'Prenez 30 minutes au calme avec un carnet pour noter uniquement les charges incompressibles du couple sans aborder les reproches passés.',
        },
      ],
    },
  ],
  en: [
    {
      id: 'cohabitation',
      category: 'Living Together & Daily Life',
      badge: 'Moving in Together',
      icon: '🏠',
      accentColor: '#FF6B8A',
      estimatedTime: '2 min',
      questionCount: 6,
      title: 'Are you ready to move in together?',
      subtitle: 'Test your lifestyle compatibility, shared space boundaries, and daily domestic habits.',
      pitch: 'Spending romantic weekends together is fun; sharing the same roof 24/7 is a whole different chapter. This quiz assesses household chores, personal space, and logistical alignment.',
      questions: [
        {
          id: 1,
          question: 'How do you usually handle tidiness and chores in your living space?',
          options: [
            { text: 'We have our own rhythms, but we always agree effortlessly.', score: 4 },
            { text: 'One is neater than the other, but we find fair compromises.', score: 3 },
            { text: 'It occasionally causes irritation when things are left lying around.', score: 2 },
            { text: 'We have opposite standards: one is ultra-clean, the other very messy.', score: 1 },
          ],
        },
        {
          id: 2,
          question: 'How much alone time or personal space do each of you need?',
          options: [
            { text: 'We deeply respect each other’s need for solo time without taking it personally.', score: 4 },
            { text: 'We have talked about it and safeguard time for our individual hobbies.', score: 3 },
            { text: 'One of us occasionally feels suffocated or rejected when the other pulls away.', score: 2 },
            { text: 'We’ve never addressed it; our boundaries are often blurred or tense.', score: 1 },
          ],
        },
        {
          id: 3,
          question: 'Have you ever tested extended cohabitation (e.g., 2–3 weeks on vacation)?',
          options: [
            { text: 'Yes, several times: it felt fluid, joyful, and completely natural.', score: 4 },
            { text: 'Yes, with minor early adjustments, and then everything went smoothly.', score: 3 },
            { text: 'Only a few days at a time, never for an extended period.', score: 2 },
            { text: 'Never, it will be a complete leap into the unknown.', score: 1 },
          ],
        },
        {
          id: 4,
          question: 'How do you plan to split rent, groceries, and domestic expenses?',
          options: [
            { text: 'It is already agreed: proportional to income or 50/50 with peace of mind.', score: 4 },
            { text: 'We have a general idea and will finalize details upon moving in.', score: 3 },
            { text: 'The topic is sensitive or hasn’t been calculated realistically yet.', score: 2 },
            { text: 'We avoid talking about it to prevent arguments.', score: 1 },
          ],
        },
        {
          id: 5,
          question: 'How do you feel about hosting impromptu guests, friends, or family?',
          options: [
            { text: 'We share the same social energy and consult each other naturally.', score: 4 },
            { text: 'We agree on a simple rule: give a heads-up before inviting anyone over.', score: 3 },
            { text: 'One is a homebody while the other constantly wants company.', score: 2 },
            { text: 'It is a recurring disagreement: our social rhythms clash.', score: 1 },
          ],
        },
        {
          id: 6,
          question: 'What is your core motivation for moving in together?',
          options: [
            { text: 'A deep desire to build a shared sanctuary and do life together.', score: 4 },
            { text: 'The natural and exciting evolution of our relationship.', score: 3 },
            { text: 'Financial convenience or external lease timing.', score: 2 },
            { text: 'Fear of growing apart or pressure from family/friends.', score: 1 },
          ],
        },
      ],
      results: [
        {
          minScorePercent: 80,
          verdict: '100% Ready for the Big Step! ✨',
          headline: 'Green light: Your shared haven is ready to blossom',
          analysis: 'Your domestic values, boundary respect, and logistical communication are thoroughly in sync. You view cohabitation as mutual growth rather than a constraint.',
          strengths: ['Great boundary respect', 'Financial transparency', 'Aligned lifestyle rhythms'],
          growthAreas: ['Remember to date outside the apartment to keep novelty alive'],
          concreteTips: [
            { title: 'The Decompression Transition', desc: 'Give each other 15 minutes of quiet when coming home before diving into logistical tasks.' },
            { title: 'Sacred Weekly Date Night', desc: 'Dedicate one evening a week to dress up and go out just like when you first met.' },
          ],
          coupleChallenge: 'Go to a home decor shop or market and pick one symbolic piece for your future living room together!',
        },
        {
          minScorePercent: 55,
          verdict: 'High Potential with a Few Ground Rules 🏡',
          headline: 'The love is there; establish clear expectations to thrive',
          analysis: 'The love and excitement are undeniable! However, a few potential friction points should be discussed before signing a lease: chore split, grocery budget, and solo downtime.',
          strengths: ['Deep affection and teamwork', 'Willingness to adapt'],
          growthAreas: ['Clarify budget mechanics', 'Agree on cleanliness standards and guests'],
          concreteTips: [
            { title: 'The Fun Living Charter', desc: 'Jot down your 3 non-negotiable domestic rules (noise, sleep, dishes).' },
            { title: 'Dry-Run Week', desc: 'Spend 7 full days living together with real domestic chores.' },
          ],
          coupleChallenge: 'List your top 2 logistical worries and share them over dessert with zero judgment.',
        },
        {
          minScorePercent: 0,
          verdict: 'Take a Little More Time 🌱',
          headline: 'Prioritize dialogue before rushing into shared living',
          analysis: 'Moving in too fast can strain a relationship still navigating early boundaries. You currently have noticeable differences in financial approach, clean habits, or personal space.',
          strengths: ['Clear individual priorities', 'Room for growth'],
          growthAreas: ['Conquer taboo topics (money, chores)', 'Safeguard individual autonomy'],
          concreteTips: [
            { title: 'Never rush for financial convenience alone', desc: 'Ensure emotional readiness matches the lease.' },
            { title: 'Longer trial stays', desc: 'Gradually increase multi-day visits to observe raw daily routines.' },
          ],
          coupleChallenge: 'Spend 48 hours cooking, cleaning, and relaxing together without ordering delivery or screen distraction.',
        },
      ],
    },
    {
      id: 'communication',
      category: 'Harmony & Dialogue',
      badge: 'Conflict Resolution',
      icon: '💬',
      accentColor: '#3A86FF',
      estimatedTime: '2 min',
      questionCount: 6,
      title: 'How does your couple de-escalate conflicts?',
      subtitle: 'Analyze your arguing style, active listening skills, and how quickly you reconcile.',
      pitch: 'It is not differences that break couples, but how disagreements are navigated. This test reveals whether your dynamic is constructive, avoidant, or explosive.',
      questions: [
        {
          id: 1,
          question: 'When a grievance or annoyance arises, how do you handle it?',
          options: [
            { text: 'We voice feelings calmly using “I” statements without attacking.', score: 4 },
            { text: 'We wait for high emotions to settle before talking it out.', score: 3 },
            { text: 'One tends to give the silent treatment or shut down.', score: 2 },
            { text: 'Voices escalate quickly, past grievances resurface, and we interrupt.', score: 1 },
          ],
        },
        {
          id: 2,
          question: 'Following a sharp disagreement, how long does the coldness last?',
          options: [
            { text: 'Under an hour: we know how to hug, apologize, and reset without grudges.', score: 4 },
            { text: 'A few hours to cool off and reconnect.', score: 3 },
            { text: 'Sometimes over 24 hours of heavy silence or cold air.', score: 2 },
            { text: 'Days at a time, with simmering resentment swept under the rug.', score: 1 },
          ],
        },
        {
          id: 3,
          question: 'Can both of you easily say: “I am sorry, I was wrong”?',
          options: [
            { text: 'Yes, genuinely and naturally, without viewing it as a defeat.', score: 4 },
            { text: 'Yes, even if ego needs a brief breather first.', score: 3 },
            { text: 'It’s very difficult for one of us; we prefer acting like nothing happened.', score: 2 },
            { text: 'Almost never: both dig heels in waiting for the other to break.', score: 1 },
          ],
        },
        {
          id: 4,
          question: 'Do either of you use absolutes during arguments (“You ALWAYS do this”, “You NEVER listen”)?',
          options: [
            { text: 'No, we stay anchored to the specific current event.', score: 4 },
            { text: 'Rarely, and we quickly apologize if a word slips out.', score: 3 },
            { text: 'Quite frequently in the heat of frustration.', score: 2 },
            { text: 'Systematically: arguments attack character rather than actions.', score: 1 },
          ],
        },
        {
          id: 5,
          question: 'Do you feel truly heard and validated by your partner when expressing distress?',
          options: [
            { text: 'Completely: even when disagreeing, my emotions are treated with care.', score: 4 },
            { text: 'Most of the time, though sometimes I need to re-explain.', score: 3 },
            { text: 'My emotions are often minimized (“You’re overreacting”, “It’s nothing”).', score: 2 },
            { text: 'I frequently feel misunderstood or judged when expressing hurt.', score: 1 },
          ],
        },
        {
          id: 6,
          question: 'Do you have an agreed signal or timeout to halt arguments before things turn toxic?',
          options: [
            { text: 'Yes, a codeword or gesture to take a 10-minute breath.', score: 4 },
            { text: 'We often de-escalate with gentle self-deprecating humor.', score: 3 },
            { text: 'Not formally; we usually stop when tears or exhaustion hit.', score: 2 },
            { text: 'No, we frequently push past healthy boundaries into hurtful remarks.', score: 1 },
          ],
        },
      ],
      results: [
        {
          minScorePercent: 80,
          verdict: 'Constructive & Emotionally Mature Dialogue 🛡️',
          headline: 'High emotional intelligence that protects your bond',
          analysis: 'You have mastered the secret of lasting couples: the ability to disagree without withdrawing love. Your active listening and swift repair attempts make your relationship exceptionally resilient.',
          strengths: ['Swift de-escalation', 'Empathetic mutual respect', 'Sincere forgiveness without score-keeping'],
          growthAreas: ['Be careful not to bottle up minor annoyances out of fear of rocking the boat'],
          concreteTips: [
            { title: 'The Reflective Mirror Rule', desc: 'When discussing a tender topic, reflect back what you heard: “If I understand correctly, you feel...” before replying.' },
            { title: 'The 10-Minute Sunday Check-in', desc: 'Every Sunday: “How did our week feel? What made you feel loved? What can we adjust?”' },
          ],
          coupleChallenge: 'Share a silent 5-minute embrace after any serious discussion to bring your nervous systems back into harmony.',
        },
        {
          minScorePercent: 55,
          verdict: 'Authentic Connection with Room to Soften ⚖️',
          headline: 'Strong love with a need to defuse defensive habits',
          analysis: 'You communicate wonderfully in happy times, but heightened stress triggers fight-or-flight defensiveness or sullen withdrawal. Learning to pause before reacting will bring peace.',
          strengths: ['Deep commitment', 'Genuine desire for closeness'],
          growthAreas: ['Eliminate absolutes (“always”, “never”)', 'Shorten sullen silence phases'],
          concreteTips: [
            { title: 'The 20-Minute Time-Out', desc: 'When heart rates spike above 100 bpm, say: “I love you, let’s take 20 minutes to breathe, then solve this together.”' },
            { title: 'Shift from “You” to “I”', desc: 'Replace “You never help” with “I’m feeling overwhelmed and would really appreciate your support right now.”' },
          ],
          coupleChallenge: 'Choose a silly codeword (e.g., Papaya or Penguin) that instantly obliges both of you to smile and pause mid-dispute.',
        },
        {
          minScorePercent: 0,
          verdict: 'Exhausting Conflict Cycles 🚨',
          headline: 'Time to rewrite your communication rules to protect love',
          analysis: 'Arguments leave bruises, escalate rapidly, or result in stonewalling. This pattern erodes affection over time. Establishing healthy communication guardrails will restore psychological safety.',
          strengths: ['Awareness gained from this assessment', 'Love can be rebuilt with fresh tools'],
          growthAreas: ['Stop personal jabs and sarcasm', 'Dismantle fear of losing face'],
          concreteTips: [
            { title: 'Absolute Zero-Screen Rule during talks', desc: 'No smartphones in hand during difficult conversations.' },
            { title: 'The Vulnerability Letter', desc: 'If speaking triggers panic, write your feelings down to avoid heated interruptions.' },
          ],
          coupleChallenge: 'Commit to a 7-day zero-direct-complaint challenge: any constructive feedback must be preceded by a sincere compliment.',
        },
      ],
    },
    {
      id: 'intimacy',
      category: 'Passion & Connection',
      badge: 'Spark & Romance',
      icon: '🔥',
      accentColor: '#E63946',
      estimatedTime: '2 min',
      questionCount: 6,
      title: 'How vibrant is your romantic spark & intimacy?',
      subtitle: 'Measure everyday tenderness, spontaneity, magnetic desire, and secret mutual complicity.',
      pitch: 'Between busy schedules, work stress, and routine, how is your couple’s romantic chemistry thriving? This quiz explores physical, sensual, and emotional vitality.',
      questions: [
        {
          id: 1,
          question: 'How frequently do you share affectionate touch with no strings attached (hugs, warm kisses, hand-holding)?',
          options: [
            { text: 'Daily and multiple times a day—it is second nature for us.', score: 4 },
            { text: 'Frequently whenever we reconnect in the evenings.', score: 3 },
            { text: 'Less than when we first started dating; fatigue often takes over.', score: 2 },
            { text: 'Rarely: spontaneous affection has nearly vanished.', score: 1 },
          ],
        },
        {
          id: 2,
          question: 'Do you still feel genuine admiration and physical desire for your partner?',
          options: [
            { text: 'Yes, a lively spark and effortless attraction.', score: 4 },
            { text: 'Yes, steady, warm desire that reignites easily.', score: 3 },
            { text: 'In distinct waves: high highs and prolonged lows.', score: 2 },
            { text: 'It currently feels more like affectionate roommates.', score: 1 },
          ],
        },
        {
          id: 3,
          question: 'When did you last plan a genuinely novel romantic date or surprise for each other?',
          options: [
            { text: 'Within the last few weeks: we love keeping the novelty alive.', score: 4 },
            { text: 'Last month: we do our best to maintain that cadence.', score: 3 },
            { text: 'Several months ago: daily routine swallowed date nights.', score: 2 },
            { text: 'We honestly cannot remember; it’s strictly work, chores, and sleep.', score: 1 },
          ],
        },
        {
          id: 4,
          question: 'Can you speak candidly about your intimate desires, fantasies, and boundaries without judgment?',
          options: [
            { text: 'With total trust and zero shame—it is a playful, safe space.', score: 4 },
            { text: 'Mostly yes, although some topics require a little delicacy.', score: 3 },
            { text: 'It feels slightly awkward or intimidating to bring up.', score: 2 },
            { text: 'Completely locked down or a source of silent tension.', score: 1 },
          ],
        },
        {
          id: 5,
          question: 'In bed or on the sofa at night, what role do smartphones play?',
          options: [
            { text: 'Banned! We prioritize eye contact, conversation, and touch.', score: 4 },
            { text: 'We browse a bit, but always put them away to connect.', score: 3 },
            { text: 'We each scroll separately until falling asleep most nights.', score: 2 },
            { text: 'Screens have completely replaced our evening intimacy.', score: 1 },
          ],
        },
        {
          id: 6,
          question: 'Do you share playful private rituals (inside jokes, nicknames, knowing glances)?',
          options: [
            { text: 'Dozens! We have our own secret couple language.', score: 4 },
            { text: 'Yes, a lovely bond that frequently makes us smile.', score: 3 },
            { text: 'Fewer than before, but the warmth returns when we make time.', score: 2 },
            { text: 'Hardly any; we’ve lost that lighthearted playfulness.', score: 1 },
          ],
        },
      ],
      results: [
        {
          minScorePercent: 80,
          verdict: 'Blazing Spark & Magnetic Passion 🔥',
          headline: 'A glowing blend of daily tenderness and sensual vitality',
          analysis: 'Congratulations! You manage the art of blending daily gentle affection with vibrant attraction. Your spontaneous affection and deep emotional intimacy form an impenetrable shield against monotony.',
          strengths: ['Electric mutual chemistry', 'Cherished private rituals', 'Open, playful intimacy'],
          growthAreas: ['Continue courting each other so this connection is never taken for granted'],
          concreteTips: [
            { title: 'The Gottman 6-Second Kiss', desc: 'A passionate 6-second kiss every morning and evening triggers oxytocin and cements emotional bonding.' },
            { title: 'The Flirty Pocket Note', desc: 'Slip an affectionate or playful note into your partner’s pocket or bag when they aren’t looking.' },
          ],
          coupleChallenge: 'Tonight, observe a 1-hour zero-screen sanctuary with candlelight and a relaxing shoulder massage.',
        },
        {
          minScorePercent: 55,
          verdict: 'Warm Complicity: Reignite the Sparks 🕯️',
          headline: 'Deep affection with a need to shake off predictable routine',
          analysis: 'Your bond is warm and deeply secure, but busy schedules and logistics have slightly dimmed spontaneous excitement. A few thoughtful rituals will effortlessly bring the butterflies back.',
          strengths: ['Emotional safety and trust', 'Solid foundation for intimacy'],
          growthAreas: ['Remove screens from the bedroom', 'Inject playful surprise back into dating'],
          concreteTips: [
            { title: '30-Minute Digital Curfew', desc: 'Charge phones outside the bedroom to make your sleeping space an intimate sanctuary.' },
            { title: 'Mystery Date Swap', desc: 'Take turns planning complete surprise dates where the partner has no idea what the itinerary is.' },
          ],
          coupleChallenge: 'Send your partner a midday message recounting your favorite intimate memory together.',
        },
        {
          minScorePercent: 0,
          verdict: 'Spark in Hibernation: Time for Reconnection ❄️',
          headline: 'Break the roommate trap: revive emotional & sensual warmth',
          analysis: 'You share life, chores, and responsibilities, but romantic spark has receded behind routine. This is not uncommon—it’s a wake-up call that your relationship needs dedicated, undivided nourishment.',
          strengths: ['Shared history and respect', 'Honest assessment via this quiz'],
          growthAreas: ['Reintroduce pressure-free physical touch', 'Talk openly about unmet romantic needs'],
          concreteTips: [
            { title: 'Pressure-free holding', desc: 'Hold each other for 2 quiet minutes without any expectation of sexual performance.' },
            { title: 'Change of scenery weekend', desc: 'Step out of your familiar domestic environment to reawaken curiosity.' },
          ],
          coupleChallenge: 'Sit face-to-face, hold hands, and look into each other’s eyes silently for 2 full minutes before sharing a hug.',
        },
      ],
    },
    {
      id: 'finances',
      category: 'Projects & Future',
      badge: 'Money & Wealth',
      icon: '💎',
      accentColor: '#2EC4B6',
      estimatedTime: '2 min',
      questionCount: 6,
      title: 'Money & Finances in your couple: Zero taboo?',
      subtitle: 'Joint accounts, personal allowances, savings goals: is money a team strength or friction?',
      pitch: 'Money is one of the most emotionally charged topics in couple life. This quiz decodes your financial values, sense of fairness, and long-term security vision.',
      questions: [
        {
          id: 1,
          question: 'How would you describe financial transparency between you two?',
          options: [
            { text: 'Total transparency: we know each other’s income, debts, and savings without shame.', score: 4 },
            { text: 'Clear on joint expenses, with healthy autonomy on personal treats.', score: 3 },
            { text: 'Somewhat vague: we feel awkward disclosing exact salary or savings figures.', score: 2 },
            { text: 'A taboo subject frequently accompanied by secrecy or mistrust.', score: 1 },
          ],
        },
        {
          id: 2,
          question: 'How do you handle any income disparity between you?',
          options: [
            { text: 'With fairness: proportional sharing based on earnings so discretionary income is balanced.', score: 4 },
            { text: 'A smooth 50/50 split, flexibly adjusted if one encounters a hurdle.', score: 3 },
            { text: 'The partner who earns less occasionally feels insecure or financially pressured.', score: 2 },
            { text: 'A persistent source of resentment or power imbalance in decision-making.', score: 1 },
          ],
        },
        {
          id: 3,
          question: 'What are your respective attitudes toward saving versus spontaneous spending?',
          options: [
            { text: 'Complementary: a healthy balance between enjoying today and securing tomorrow.', score: 4 },
            { text: 'Slightly different styles (one saver, one spender), but handled calmly.', score: 3 },
            { text: 'One frequently criticizes the other for being too frugal or too wasteful.', score: 2 },
            { text: 'Major clash: constant anxiety regarding each other’s spending choices.', score: 1 },
          ],
        },
        {
          id: 4,
          question: 'When making a major individual purchase (gadgets, fashion, solo weekend trip):',
          options: [
            { text: 'We each have personal accounts for guilt-free personal indulgence.', score: 4 },
            { text: 'We discuss it briefly in advance out of mutual courtesy.', score: 3 },
            { text: 'It sometimes triggers guilt or fear of judgment.', score: 2 },
            { text: 'It frequently causes arguments and reciprocal score-keeping.', score: 1 },
          ],
        },
        {
          id: 5,
          question: 'Do you have aligned 2-to-5 year financial goals (buying a home, travel, wedding, buffer fund)?',
          options: [
            { text: 'Yes, a shared vision with actionable saving plans in place.', score: 4 },
            { text: 'We share lovely dreams; we just need a concrete roadmap.', score: 3 },
            { text: 'Each saves independently without a unified joint vision.', score: 2 },
            { text: 'Our future material priorities are pulling in opposite directions.', score: 1 },
          ],
        },
        {
          id: 6,
          question: 'If one partner experienced a career transition or temporary job pause:',
          options: [
            { text: 'The other would step up as a proud, unified team.', score: 4 },
            { text: 'We would adapt by cutting back together in agreement.', score: 3 },
            { text: 'It would cause immense anxiety and relational strain.', score: 2 },
            { text: 'It would cause an existential crisis for the relationship.', score: 1 },
          ],
        },
      ],
      results: [
        {
          minScorePercent: 80,
          verdict: 'Financial Peace & Empowered Teamwork 💎',
          headline: 'Money serves as freedom and shared adventure for your duo',
          analysis: 'You have transcended cultural money taboos. Your financial system respects individual freedom while fortifying shared dreams. You operate as a trusted, equitable financial unit.',
          strengths: ['Fairness without resentment', 'Uncompromising mutual trust', 'Aligned long-term vision'],
          growthAreas: ['Periodically review agreements as life circumstances evolve'],
          concreteTips: [
            { title: 'The 3-Account Gold Standard', desc: '1 Joint account for shared domestic expenses + 2 Personal accounts for zero-justification treats.' },
            { title: 'Biannual Money Summit over Wine', desc: 'Every 6 months: celebrate milestones reached and adjust next goals in a relaxed setting.' },
          ],
          coupleChallenge: 'Agree on a secret “Fun Fund” purchase to accomplish together in the next 6 months.',
        },
        {
          minScorePercent: 55,
          verdict: 'Operational Setup with Areas to Clarify 📊',
          headline: 'Good intentions with unvoiced financial expectations',
          analysis: 'Daily bills are paid, but money talks occasionally evoke mild discomfort or guilt. By establishing objective rules (who pays what, threshold for consulting), you eliminate 90% of friction.',
          strengths: ['Goodwill and fairness', 'Desire for honesty'],
          growthAreas: ['Formalize contribution method (50/50 vs proportional)', 'Safeguard private guilt-free funds'],
          concreteTips: [
            { title: 'The Consultation Threshold', desc: 'Set an amount (e.g. $150) under which either can spend freely, and above which you check in.' },
            { title: 'Defuse the Taboo', desc: 'Remind yourselves that money is simply energy supporting your shared life goals.' },
          ],
          coupleChallenge: 'Share your most frivolous purchase this month with each other without judgment and have a good laugh!',
        },
        {
          minScorePercent: 0,
          verdict: 'Sensitive Subject & Underlying Stress ⚡',
          headline: 'Urgent need for clarity to dismantle resentment',
          analysis: 'Money currently triggers feelings of imbalance, control, or unfairness. It is rarely about the numbers themselves, but about underlying emotions (security, autonomy, respect). Resetting your financial dialogue is essential.',
          strengths: ['Honest realization through this assessment', 'Path to calm resolution'],
          growthAreas: ['End hidden expenses', 'Decouple personal self-worth from income size'],
          concreteTips: [
            { title: 'Eliminate moral debt', desc: 'Higher earner must not dictate everything; lower earner must not feel indebted.' },
            { title: 'Separate fixed bills from personal spending', desc: 'Each partner must retain a baseline of financial autonomy.' },
          ],
          coupleChallenge: 'Spend 30 quiet minutes listing only non-negotiable household expenses on paper without mentioning past disputes.',
        },
      ],
    },
  ],
};
