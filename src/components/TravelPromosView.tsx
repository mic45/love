import React, { useState } from 'react';
import { Language, translations } from '../translations';

interface TravelPromosViewProps {
  currentLang: Language;
}

export interface TravelOffer {
  id: string;
  brand: string;
  brandSubtitleFr: string;
  brandSubtitleEn: string;
  category: 'transfer' | 'flight' | 'activities' | 'esim' | 'car' | 'insurance';
  logoColor: string;
  logoBg: string;
  iconEmoji: string;
  periodFr: string;
  periodEn: string;
  discountFr: string;
  discountEn: string;
  descriptionFr: string;
  descriptionEn: string;
  couplePitchFr: string;
  couplePitchEn: string;
  link: string;
  badgeFr?: string;
  badgeEn?: string;
}

export const TRAVEL_OFFERS: TravelOffer[] = [
  {
    id: 'intui-travel',
    brand: 'intui.travel',
    brandSubtitleFr: 'Transferts privés aéroport & hôtel',
    brandSubtitleEn: 'Private airport & hotel transfers',
    category: 'transfer',
    logoColor: '#E50914',
    logoBg: 'bg-red-50',
    iconEmoji: '🚗',
    periodFr: '13 août — 31 octobre 2026',
    periodEn: 'Aug 13 — Oct 31, 2026',
    discountFr: '5%',
    discountEn: '5%',
    descriptionFr: 'Valable pour les transferts à toutes dates et destinations.',
    descriptionEn: 'Valid for transfers across all dates and destinations worldwide.',
    couplePitchFr: 'Parfait pour débuter votre escapade en amoureux : réservez votre chauffeur privé à l’arrivée pour éviter les files d’attente et rejoindre votre hôtel en duo en toute sérénité.',
    couplePitchEn: 'Perfect to start your romantic getaway: book your private driver upon arrival to skip taxi lines and reach your hotel as a couple with zero stress.',
    link: 'https://intui.tp.st/ofW8kYtl?erid=2VtzqvA5VWK',
    badgeFr: 'Coup de cœur couple',
    badgeEn: 'Couple Favorite',
  },
  {
    id: 'airhelp',
    brand: 'AirHelp',
    brandSubtitleFr: 'Non valable aux États-Unis',
    brandSubtitleEn: 'Not valid in the United States',
    category: 'flight',
    logoColor: '#0066FF',
    logoBg: 'bg-blue-50',
    iconEmoji: '✈️',
    periodFr: '25 juin — 30 novembre 2026',
    periodEn: 'Jun 25 — Nov 30, 2026',
    discountFr: '11%',
    discountEn: '11%',
    descriptionFr: '11 % de réduction sur les abonnements AirHelp + Smart et AirHelp + Pro',
    descriptionEn: '11% discount on AirHelp + Smart and AirHelp + Pro plans',
    couplePitchFr: 'Sécurisez vos vacances en duo : vol retardé, surbooké ou annulé pendant votre séjour ? Récupérez jusqu’à 600 € d’indemnisation par passager sans tracas administratif.',
    couplePitchEn: 'Protect your holiday as a duo: flight delayed, overbooked, or cancelled? Claim up to €600 compensation per passenger with zero paperwork hassle.',
    link: 'https://airhelp.tp.st/qyULsYJB?erid=2VtzqxcSKDo',
    badgeFr: 'Sérénité Garantie',
    badgeEn: 'Peace of Mind',
  },
  {
    id: 'airalo',
    brand: 'Airalo',
    brandSubtitleFr: 'eSIM mondiale n°1 dans +200 pays',
    brandSubtitleEn: 'Global #1 eSIM in 200+ countries',
    category: 'esim',
    logoColor: '#FF6B00',
    logoBg: 'bg-orange-50',
    iconEmoji: '📱',
    periodFr: 'Offre exclusive 2026',
    periodEn: 'Exclusive 2026 offer',
    discountFr: 'Jusqu’à -15%',
    discountEn: 'Up to -15%',
    descriptionFr: 'Forfaits data mobiles prépayés locaux et régionaux sans frais d’itinérance.',
    descriptionEn: 'Prepaid mobile data packages locally and regionally with zero roaming charges.',
    couplePitchFr: 'Restez connectés à deux à l’étranger : utilisez Google Maps pour vos balades romantiques, réservez vos restos en direct et postez vos stories sans mauvaise surprise sur votre facture.',
    couplePitchEn: 'Stay seamlessly connected as a couple: use maps on romantic walks, book dinner tables live, and post memories without bill shock.',
    link: 'https://airalo.tp.st/e0K2KpM4',
    badgeFr: 'Essentiel Voyage',
    badgeEn: 'Travel Essential',
  },
  {
    id: 'tiqets',
    brand: 'Tiqets',
    brandSubtitleFr: 'Billets coupe-file musées & monuments',
    brandSubtitleEn: 'Skip-the-line museum & attraction tickets',
    category: 'activities',
    logoColor: '#00A699',
    logoBg: 'bg-teal-50',
    iconEmoji: '🎟️',
    periodFr: 'Valable toute l’année 2026',
    periodEn: 'Valid throughout 2026',
    discountFr: 'Jusqu’à -15%',
    discountEn: 'Up to -15%',
    descriptionFr: 'Accès instantané sur smartphone aux plus beaux monuments, châteaux et belvédères du monde.',
    descriptionEn: 'Instant mobile tickets for world-famous museums, castles, and panoramic viewpoints.',
    couplePitchFr: 'Ne perdez plus 2h dans la file d’attente sous la pluie : entrez directement main dans la main au Colisée, au Louvre ou au sommet de la Tour Eiffel pour un date culturel parfait.',
    couplePitchEn: 'Never wait 2 hours in line hand-in-hand in the rain: enter directly into the Colosseum, the Louvre, or the Eiffel Tower for a dream date.',
    link: 'https://tiqets.tp.st/k0g79NCE',
    badgeFr: 'Date Romantique',
    badgeEn: 'Romantic Date',
  },
  {
    id: 'klook',
    brand: 'Klook',
    brandSubtitleFr: 'Expériences, excursions & parcs d’attractions',
    brandSubtitleEn: 'Experiences, day trips & romantic tours',
    category: 'activities',
    logoColor: '#FF5722',
    logoBg: 'bg-orange-50',
    iconEmoji: '🎡',
    periodFr: 'Offres spéciales 2026',
    periodEn: 'Special 2026 deals',
    discountFr: 'Jusqu’à -60%',
    discountEn: 'Up to -60%',
    descriptionFr: 'Visites insolites, dîners croisières, spas thermaux et billets d’attractions à prix réduits.',
    descriptionEn: 'Unique tours, dinner cruises, thermal wellness spas, and attractions at discounted rates.',
    couplePitchFr: 'Surprenez votre moitié avec une activité mémorable : vol en montgolfière à deux, journée thermale de rêve ou croisière au coucher de soleil.',
    couplePitchEn: 'Surprise your significant other with unforgettable experiences: sunrise hot-air balloon flights, thermal spas, or sunset dinner cruises.',
    link: 'https://klook.tp.st/VGBX805I',
    badgeFr: 'Top Activités',
    badgeEn: 'Top Activities',
  },
  {
    id: 'yesim',
    brand: 'Yesim',
    brandSubtitleFr: 'eSIM internationale & internet illimité',
    brandSubtitleEn: 'International eSIM & unlimited data',
    category: 'esim',
    logoColor: '#7C3AED',
    logoBg: 'bg-purple-50',
    iconEmoji: '📶',
    periodFr: 'Offre active 2026',
    periodEn: 'Active 2026 promo',
    discountFr: '-10%',
    discountEn: '-10%',
    descriptionFr: 'Forfaits data illimités dans +150 pays avec activation en un clic et VPN inclus.',
    descriptionEn: 'Unlimited data plans in 150+ countries with 1-click activation and included VPN.',
    couplePitchFr: 'Idéal pour les couples nomades ou les escapades lointaines : surfez en illimité à deux sans jamais manquer de batterie sociale ni de réseau.',
    couplePitchEn: 'Ideal for nomadic couples and long-haul getaways: browse without limits together without ever losing GPS or network connection.',
    link: 'https://yesim.tp.st/EgPbUpbc',
    badgeFr: 'Internet Illimité',
    badgeEn: 'Unlimited Data',
  },
  {
    id: 'gocity',
    brand: 'Go City',
    brandSubtitleFr: 'Pass touristique tout-en-un multi-attractions',
    brandSubtitleEn: 'All-inclusive multi-attraction city passes',
    category: 'activities',
    logoColor: '#2563EB',
    logoBg: 'bg-blue-50',
    iconEmoji: '🏙️',
    periodFr: 'Valable toute l’année 2026',
    periodEn: 'Valid throughout 2026',
    discountFr: 'Jusqu’à -50%',
    discountEn: 'Up to -50%',
    descriptionFr: 'Un seul pass digital pour visiter les incontournables de New York, Paris, Londres, Rome, Dubai, etc.',
    descriptionEn: 'One digital sightseeing pass for top attractions in New York, Paris, London, Rome, Dubai, etc.',
    couplePitchFr: 'Maximisez vos visites en amoureux tout en divisant votre budget tickets par deux. Plus d’économies pour s’offrir des dîners aux chandelles !',
    couplePitchEn: 'Explore the world’s most romantic cities together while cutting ticket costs in half. More budget left for candlelight dinners!',
    link: 'https://gocity.tp.st/2wYVCd1N',
    badgeFr: 'Super Économie',
    badgeEn: 'Super Savings',
  },
  {
    id: 'autoeurope',
    brand: 'Auto Europe',
    brandSubtitleFr: 'Comparateur de location de voitures n°1',
    brandSubtitleEn: 'Global car rental comparator with best rate guarantee',
    category: 'car',
    logoColor: '#DC2626',
    logoBg: 'bg-red-50',
    iconEmoji: '🚘',
    periodFr: 'Offres toute l’année 2026',
    periodEn: 'All-year 2026 deals',
    discountFr: 'Jusqu’à -25%',
    discountEn: 'Up to -25%',
    descriptionFr: 'Location de voiture dans 24 000 agences et 180 pays avec annulation sans frais jusqu’à 48h.',
    descriptionEn: 'Car rental across 24,000 locations in 180 countries with free cancellation up to 48 hours.',
    couplePitchFr: 'Vivez le grand road-trip romantique : sillonnez la côte amalfitaine, les châteaux de la Loire ou les collines toscanes en totale liberté à deux.',
    couplePitchEn: 'Experience the ultimate romantic road trip: cruise along the Amalfi Coast, Loire Valley castles, or Tuscan hills in total freedom.',
    link: 'https://autoeurope.tp.st/ygcosx0C',
    badgeFr: 'Road Trip Couple',
    badgeEn: 'Road Trip Duo',
  },
  {
    id: 'economybookings',
    brand: 'EconomyBookings',
    brandSubtitleFr: 'Voitures économiques & citadines au meilleur tarif',
    brandSubtitleEn: 'Budget & city car rentals at competitive rates',
    category: 'car',
    logoColor: '#16A34A',
    logoBg: 'bg-emerald-50',
    iconEmoji: '🚙',
    periodFr: 'Valable en 2026',
    periodEn: 'Valid in 2026',
    discountFr: 'Jusqu’à -30%',
    discountEn: 'Up to -30%',
    descriptionFr: 'Plus de 800 loueurs mondiaux comparés en temps réel (Sixt, Hertz, Europcar, Avis, Budget).',
    descriptionEn: '800+ worldwide rental suppliers compared in real time (Sixt, Hertz, Europcar, Avis, Budget).',
    couplePitchFr: 'Idéal pour les petites virées du week-end à la mer ou à la campagne : louez une citadine moderne et économique pour rouler en tête-à-tête.',
    couplePitchEn: 'Ideal for romantic countryside or seaside weekend breaks: rent a modern city car with maximum comfort and low cost.',
    link: 'https://economybookings.tp.st/vlA8wm8s',
    badgeFr: 'Petit Budget',
    badgeEn: 'Smart Budget',
  },
  {
    id: 'bikesbooking',
    brand: 'BikesBooking',
    brandSubtitleFr: 'Location de scooters, motos & vélos',
    brandSubtitleEn: 'Scooter, motorcycle & bicycle rentals',
    category: 'car',
    logoColor: '#D97706',
    logoBg: 'bg-amber-50',
    iconEmoji: '🛵',
    periodFr: 'Saison 2026',
    periodEn: '2026 Season',
    discountFr: 'Meilleurs tarifs garantis',
    discountEn: 'Best price guarantee',
    descriptionFr: 'Réservation en ligne de deux-roues dans +70 pays avec casques inclus et assurance.',
    descriptionEn: 'Online two-wheeler booking in 70+ countries with helmets and insurance included.',
    couplePitchFr: 'Quoi de plus poétique qu’une virée en Vespa dans les ruelles italiennes ou un coucher de soleil sur une île grecque, blottis l’un contre l’autre ?',
    couplePitchEn: 'Nothing is more poetic than a vintage Vespa ride through Italian cobblestone alleys or watching Greek island sunsets hugging each other.',
    link: 'https://bikesbooking.tp.st/OgFNVeAB',
    badgeFr: 'Dolce Vita',
    badgeEn: 'Dolce Vita',
  },
  {
    id: 'wayaway',
    brand: 'WayAway',
    brandSubtitleFr: 'Comparateur de vols pas chers & cashback cash',
    brandSubtitleEn: 'Cheap flight aggregator & real cashback',
    category: 'flight',
    logoColor: '#0284C7',
    logoBg: 'bg-sky-50',
    iconEmoji: '🛫',
    periodFr: 'Offre active 2026',
    periodEn: 'Active 2026 promo',
    discountFr: 'Cashback & Prix mini',
    discountEn: 'Cashback & Best Rates',
    descriptionFr: 'Déniche les tarifs les plus bas parmi des centaines de compagnies aériennes avec remboursement cash.',
    descriptionEn: 'Finds the lowest fares across hundreds of airlines with actual cash reimbursement on bookings.',
    couplePitchFr: 'Trouvez vos billets d’avion au meilleur tarif pour vos week-ends surprise en amoureux et récupérez du cashback sur vos prochaines vacances ensemble.',
    couplePitchEn: 'Find the lowest airfare for your surprise couple weekends and earn cash back for your next vacation together.',
    link: 'https://tp.st/vNWQhzAF',
    badgeFr: 'Bons Plans Vols',
    badgeEn: 'Flight Deals',
  },
  {
    id: 'ekta',
    brand: 'EKTA Traveling',
    brandSubtitleFr: 'Assurance voyage internationale complète',
    brandSubtitleEn: 'Comprehensive worldwide travel insurance',
    category: 'insurance',
    logoColor: '#4F46E5',
    logoBg: 'bg-indigo-50',
    iconEmoji: '🛡️',
    periodFr: 'Valable toute l’année 2026',
    periodEn: 'Valid throughout 2026',
    discountFr: '-10%',
    discountEn: '-10%',
    descriptionFr: 'Couverture médicale d’urgence, rapatriement, perte de bagages et assistance 24/7 dès 1€/jour.',
    descriptionEn: 'Emergency medical coverage, repatriation, lost luggage, and 24/7 assistance from €1/day.',
    couplePitchFr: 'Voyagez l’esprit totalement apaisé : être bien protégé à l’étranger garantit que rien ne viendra gâcher votre séjour à deux.',
    couplePitchEn: 'Travel with absolute serenity: comprehensive coverage ensures nothing spoils your magical moments as a couple.',
    link: 'https://ektatraveling.tp.st/uxdFAxqS',
    badgeFr: 'Protection Duo',
    badgeEn: 'Duo Protection',
  },
];

export const TravelPromosView: React.FC<TravelPromosViewProps> = ({ currentLang }) => {
  const isFr = currentLang === 'fr';
  const t = translations[currentLang].travelPromos;

  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: t.categories.all, icon: '🌟' },
    { id: 'transfer', label: t.categories.transfer, icon: '🚗' },
    { id: 'flight', label: t.categories.flight, icon: '✈️' },
    { id: 'activities', label: t.categories.activities, icon: '🎟️' },
    { id: 'esim', label: t.categories.esim, icon: '📱' },
    { id: 'car', label: t.categories.car, icon: '🚘' },
    { id: 'insurance', label: t.categories.insurance, icon: '🛡️' },
  ];

  const filteredOffers = TRAVEL_OFFERS.filter((offer) => {
    const matchesBrand = selectedBrand === 'all' || offer.brand.toLowerCase() === selectedBrand.toLowerCase();
    const matchesCategory = selectedCategory === 'all' || offer.category === selectedCategory;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      query === '' ||
      offer.brand.toLowerCase().includes(query) ||
      (isFr ? offer.descriptionFr : offer.descriptionEn).toLowerCase().includes(query) ||
      (isFr ? offer.couplePitchFr : offer.couplePitchEn).toLowerCase().includes(query) ||
      (isFr ? offer.brandSubtitleFr : offer.brandSubtitleEn).toLowerCase().includes(query);
    return matchesBrand && matchesCategory && matchesSearch;
  });

  const handleCopyLink = (offer: TravelOffer) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(offer.link);
    }
    setCopiedId(offer.id);
    setToastMessage(`${offer.brand} : ${t.toastCopied}`);
    setTimeout(() => {
      setCopiedId(null);
      setToastMessage(null);
    }, 3500);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Romantic Incitation Banner for Couples */}
      <div className="bg-gradient-to-r from-light-pink via-white to-blue-50/70 border border-coral/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-52 h-52 bg-coral/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-coral/30 text-coral text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
            <span>✈️</span>
            <span>{t.badge}</span>
            <span className="bg-coral text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
              {t.offersCountBadge}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-deep-black mb-2 leading-tight">
            {t.title}
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-text-gray leading-relaxed mb-4">
            {t.subtitle}
          </p>

          {/* Quick couple benefits pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 text-xs font-medium text-deep-black">
            <div className="flex items-center gap-2 bg-white/85 backdrop-blur-2xs px-3 py-2 rounded-xl border border-coral/15 shadow-2xs">
              <span className="text-base">🚗</span>
              <span className="line-clamp-1">{t.pillTransfers}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/85 backdrop-blur-2xs px-3 py-2 rounded-xl border border-coral/15 shadow-2xs">
              <span className="text-base">📱</span>
              <span className="line-clamp-1">{t.pillEsim}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/85 backdrop-blur-2xs px-3 py-2 rounded-xl border border-coral/15 shadow-2xs">
              <span className="text-base">🎟️</span>
              <span className="line-clamp-1">{t.pillPasses}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/85 backdrop-blur-2xs px-3 py-2 rounded-xl border border-coral/15 shadow-2xs">
              <span className="text-base">🛡️</span>
              <span className="line-clamp-1">{t.pillProtection}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Promo Codes Container matching user CSS selector 1 */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200/90 shadow-sm overflow-hidden p-4 sm:p-6 md:p-8 space-y-6">
        {/* Filter controls row */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 pb-3 border-b border-gray-100">
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 flex-1">
            {/* Top Dropdown Filter (matches user screenshot "Toutes les marques") */}
            <div className="relative w-full sm:w-60">
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full appearance-none bg-white border border-gray-300 hover:border-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-medium text-deep-black cursor-pointer transition-all shadow-2xs pr-10"
                aria-label={t.filterAllBrands}
              >
                <option value="all">{t.filterAllBrands}</option>
                {TRAVEL_OFFERS.map((o) => (
                  <option key={o.id} value={o.brand}>{o.brand}</option>
                ))}
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Quick search input */}
            <div className="relative flex-1 w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full bg-white border border-gray-300 hover:border-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 rounded-xl pl-9 pr-4 py-2.5 text-xs sm:text-sm text-deep-black transition-all shadow-2xs"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-bold"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <span className="text-xs text-text-gray shrink-0 text-right font-medium">
            {filteredOffers.length} {filteredOffers.length > 1 ? t.offersAvailable : t.offerAvailable}
          </span>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Desktop Table View (Exact layout matching user screenshot) */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-xs font-semibold text-gray-700">
                <th className="py-3 px-4 w-52">{t.thProgram}</th>
                <th className="py-3 px-4 w-44">{t.thDate}</th>
                <th className="py-3 px-4 w-28">{t.thDiscount}</th>
                <th className="py-3 px-4">{t.thDescription}</th>
                <th className="py-3 px-4 text-right w-52">{t.thActions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
              {filteredOffers.map((offer) => {
                const subtitle = isFr ? offer.brandSubtitleFr : offer.brandSubtitleEn;
                const period = isFr ? offer.periodFr : offer.periodEn;
                const discount = isFr ? offer.discountFr : offer.discountEn;
                const description = isFr ? offer.descriptionFr : offer.descriptionEn;
                const pitch = isFr ? offer.couplePitchFr : offer.couplePitchEn;
                const badge = isFr ? offer.badgeFr : offer.badgeEn;

                return (
                  <tr key={offer.id} className="hover:bg-gray-50/70 transition-colors">
                    {/* Column 1: Programme (Logo + Brand + Subtitle) */}
                    <td className="py-4 px-4 align-middle">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 shrink-0 flex items-center justify-center rounded-xl ${offer.logoBg} text-lg shadow-2xs border border-black/5`}
                        >
                          {offer.iconEmoji}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-deep-black text-sm">{offer.brand}</span>
                            {badge && (
                              <span className="text-[10px] font-bold text-coral bg-light-pink px-1.5 py-0.2 rounded-full border border-coral/20">
                                {badge}
                              </span>
                            )}
                          </div>
                          {subtitle && (
                            <div className="text-[11px] text-gray-500 mt-0.5 leading-tight">{subtitle}</div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Column 2: Date */}
                    <td className="py-4 px-4 align-middle text-xs text-gray-800 font-medium whitespace-nowrap">
                      {period}
                    </td>

                    {/* Column 3: Rabais */}
                    <td className="py-4 px-4 align-middle font-bold text-blue-600 text-sm whitespace-nowrap">
                      {discount}
                    </td>

                    {/* Column 4: Description */}
                    <td className="py-4 px-4 align-middle text-xs sm:text-sm text-gray-700 leading-snug">
                      <div className="font-normal text-deep-black/90">{description}</div>
                      <div className="mt-1 text-[11px] text-coral/95 font-medium flex items-start gap-1">
                        <span className="shrink-0 mt-0.5">💡</span>
                        <span className="leading-snug">{pitch}</span>
                      </div>
                    </td>

                    {/* Column 5: Action Buttons (Copier le lien + External link icon) */}
                    <td className="py-4 px-4 align-middle text-right">
                      <div className="inline-flex items-center gap-2 justify-end">
                        <button
                          type="button"
                          onClick={() => handleCopyLink(offer)}
                          className="px-4 py-2.5 rounded-xl bg-[#0066FF] hover:bg-blue-700 text-white font-semibold text-xs transition-all shadow-xs flex items-center gap-2 cursor-pointer active:scale-95 shrink-0"
                          title={t.copyBtn}
                        >
                          <svg className="w-4 h-4 fill-none stroke-white" strokeWidth="2" viewBox="0 0 24 24">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                          </svg>
                          <span>{copiedId === offer.id ? t.copiedBtn : t.copyBtn}</span>
                        </button>

                        <a
                          href={offer.link}
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                          className="p-2.5 rounded-xl border border-blue-600/40 text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer inline-flex items-center justify-center shrink-0"
                          title={`${t.visitTooltip} (${offer.brand})`}
                        >
                          <svg className="w-4 h-4 fill-none stroke-currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile & Tablet Responsive Cards View */}
        <div className="lg:hidden space-y-4">
          {filteredOffers.map((offer) => {
            const subtitle = isFr ? offer.brandSubtitleFr : offer.brandSubtitleEn;
            const period = isFr ? offer.periodFr : offer.periodEn;
            const discount = isFr ? offer.discountFr : offer.discountEn;
            const description = isFr ? offer.descriptionFr : offer.descriptionEn;
            const pitch = isFr ? offer.couplePitchFr : offer.couplePitchEn;
            const badge = isFr ? offer.badgeFr : offer.badgeEn;

            return (
              <div key={offer.id} className="border border-gray-200 rounded-2xl p-4 sm:p-5 space-y-3.5 bg-gray-50/40 hover:bg-white transition-all shadow-2xs">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 shrink-0 flex items-center justify-center rounded-xl ${offer.logoBg} text-xl shadow-2xs border border-black/5`}
                    >
                      {offer.iconEmoji}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-deep-black text-sm">{offer.brand}</span>
                        {badge && (
                          <span className="text-[10px] font-bold text-coral bg-light-pink px-2 py-0.5 rounded-full border border-coral/20">
                            {badge}
                          </span>
                        )}
                      </div>
                      {subtitle && (
                        <div className="text-[11px] text-gray-500 leading-tight mt-0.5">{subtitle}</div>
                      )}
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-bold text-xs shrink-0 border border-blue-200/60">
                    {discount}
                  </span>
                </div>

                {/* Dates & Details */}
                <div className="space-y-2 text-xs text-gray-700">
                  <div className="flex items-center gap-1.5 text-gray-500 font-medium">
                    <span>📅</span>
                    <span>{period}</span>
                  </div>
                  <p className="text-deep-black leading-snug">{description}</p>
                  <div className="p-2.5 rounded-xl bg-light-pink/60 border border-coral/15 text-[11px] text-coral leading-snug">
                    <span className="font-semibold">💡 {t.forYourCouple}</span>{' '}
                    {pitch}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => handleCopyLink(offer)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-[#0066FF] hover:bg-blue-700 text-white font-semibold text-xs transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    <svg className="w-4 h-4 fill-none stroke-white" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    <span>{copiedId === offer.id ? t.copiedBtn : t.copyBtn}</span>
                  </button>

                  <a
                    href={offer.link}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="py-2.5 px-3.5 rounded-xl border border-blue-600/40 text-blue-600 hover:bg-blue-50 transition-colors inline-flex items-center justify-center shrink-0 cursor-pointer"
                    title={`${t.visitTooltip} (${offer.brand})`}
                  >
                    <svg className="w-4 h-4 fill-none stroke-currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Small Affiliate Disclaimer Footer */}
        <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-gray-500">
          <span>{t.disclaimer}</span>
          <span className="text-gray-400">{t.disclaimerTag}</span>
        </div>
      </div>

      {/* Copy Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-deep-black text-white text-xs sm:text-sm font-semibold px-4 py-3 rounded-2xl shadow-xl border border-white/10 flex items-center gap-2 animate-bounce">
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
