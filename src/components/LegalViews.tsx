import React, { useState } from 'react';
import { Language, translations } from '../translations';
import bgAboutWarm from '../assets/images/bg_about_warm_1790377550969.jpg';

interface LegalViewProps {
  type: 'mentions' | 'confidentialite' | '404';
  currentLang: Language;
  onBackHome: () => void;
}

export const LegalViews: React.FC<LegalViewProps> = ({ type: initialType, currentLang, onBackHome }) => {
  const t = translations[currentLang];
  const isFr = currentLang === 'fr';

  // Active sub-tab between Mentions, Confidentialité/RGPD, and CGU
  const [activeTab, setActiveTab] = useState<'mentions' | 'confidentialite' | 'cgu'>(
    initialType === 'mentions' ? 'mentions' : 'confidentialite'
  );

  // Interactive local data management state
  const [clearedSuccess, setClearedSuccess] = useState(false);
  const [localStorageCount, setLocalStorageCount] = useState<number>(() => {
    try {
      return Object.keys(localStorage).filter((k) => k.startsWith('lovequiz')).length;
    } catch {
      return 0;
    }
  });

  const handleClearLocalStorage = () => {
    try {
      const keys = Object.keys(localStorage).filter((k) => k.startsWith('lovequiz'));
      keys.forEach((k) => localStorage.removeItem(k));
      setLocalStorageCount(0);
      setClearedSuccess(true);
      setTimeout(() => setClearedSuccess(false), 4000);
    } catch {
      // ignore
    }
  };

  if (initialType === '404') {
    return (
      <section className="py-16 sm:py-20 px-4 text-center max-w-xl mx-auto animate-fade-in-up">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-light-pink border-2 border-coral flex items-center justify-center mx-auto mb-6 animate-soft-bounce">
          <span className="text-3xl sm:text-4xl">💔</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-deep-black mb-3">
          404
        </h1>
        <h2 className="text-xl sm:text-2xl font-bold text-deep-black mb-3">
          {t.notFound.title}
        </h2>
        <p className="text-sm sm:text-base text-text-gray mb-8">
          {t.notFound.desc}
        </p>
        <button
          id="not-found-back-btn"
          onClick={onBackHome}
          className="btn-primary w-full sm:w-auto justify-center min-h-[44px] group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          <span>{t.notFound.btn}</span>
        </button>
      </section>
    );
  }

  return (
    <div className="relative min-h-[85vh] py-8 sm:py-14 px-4 sm:px-6 lg:px-8">
      {/* Background Ambient Warm Romantic Light */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <img
          src={bgAboutWarm}
          alt=""
          aria-hidden="true"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter blur-xs scale-105 opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-off-white/85 via-off-white/70 to-off-white"></div>
        <div className="absolute top-20 left-10 w-80 h-80 bg-powder/50 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-pastel-yellow/40 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto text-left relative z-10">
        {/* Back Button */}
        <button
          onClick={onBackHome}
          className="inline-flex items-center gap-2 text-sm font-semibold text-coral mb-6 sm:mb-8 hover:text-coral-dark cursor-pointer transition-colors min-h-[44px] group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          <span>{t.legal.backHome}</span>
        </button>

        {/* Legal Card Header & Tabs */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 border border-powder shadow-lg space-y-8 animate-fade-in-up">
          {/* Header Title */}
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-light-pink border border-coral/30 text-coral text-xs font-bold mb-3 shadow-xs">
              <span>⚖️</span>
              <span>{isFr ? 'Conformité Légale & Transparence' : 'Legal Compliance & Transparency'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-deep-black tracking-tight mb-2">
              {activeTab === 'mentions'
                ? (isFr ? 'Mentions Légales' : 'Legal Notices')
                : activeTab === 'confidentialite'
                ? (isFr ? 'Politique de Confidentialité & RGPD' : 'Privacy Policy & GDPR')
                : (isFr ? 'Conditions Générales d’Utilisation' : 'Terms of Service')}
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-text-gray/80">
              {isFr ? 'Dernière mise à jour et validation : Septembre 2026' : 'Last updated and validated: September 2026'}
            </p>
          </div>

          {/* Sub-Tabs Switcher */}
          <div className="flex flex-wrap gap-2 border-b border-powder pb-4">
            <button
              onClick={() => setActiveTab('mentions')}
              className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer min-h-[42px] touch-manipulation active:scale-95 ${
                activeTab === 'mentions'
                  ? 'bg-coral text-white shadow-xs'
                  : 'bg-light-pink text-text-gray hover:text-deep-black hover:bg-powder'
              }`}
            >
              🏛️ {isFr ? 'Mentions Légales' : 'Legal Notices'}
            </button>
            <button
              onClick={() => setActiveTab('confidentialite')}
              className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer min-h-[42px] touch-manipulation active:scale-95 ${
                activeTab === 'confidentialite'
                  ? 'bg-coral text-white shadow-xs'
                  : 'bg-light-pink text-text-gray hover:text-deep-black hover:bg-powder'
              }`}
            >
              🔒 {isFr ? 'Confidentialité & RGPD' : 'Privacy & GDPR'}
            </button>
            <button
              onClick={() => setActiveTab('cgu')}
              className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer min-h-[42px] touch-manipulation active:scale-95 ${
                activeTab === 'cgu'
                  ? 'bg-coral text-white shadow-xs'
                  : 'bg-light-pink text-text-gray hover:text-deep-black hover:bg-powder'
              }`}
            >
              📜 {isFr ? 'Conditions d’Utilisation' : 'Terms of Use'}
            </button>
          </div>

          {/* TAB 1: MENTIONS LÉGALES */}
          {activeTab === 'mentions' && (
            <div className="space-y-6 text-text-gray text-xs sm:text-sm md:text-base leading-relaxed animate-fade-in-up">
              <section className="space-y-2">
                <h2 className="text-lg sm:text-xl font-bold text-deep-black flex items-center gap-2">
                  <span>1.</span> {isFr ? 'Éditeur du site' : 'Publisher Information'}
                </h2>
                <p>
                  {isFr ? (
                    <>
                      Le site internet <strong>LoveQuiz</strong> (accessible à l’adresse officielle{' '}
                      <code>https://www.lovequiz.com</code>) est édité par :
                    </>
                  ) : (
                    <>
                      The <strong>LoveQuiz</strong> website (available at <code>https://www.lovequiz.com</code>) is published by:
                    </>
                  )}
                </p>
                <div className="p-4 rounded-xl bg-off-white border border-powder space-y-1 font-medium text-deep-black text-xs sm:text-sm">
                  <p><strong>{isFr ? 'Directeur de la publication' : 'Publication Director'} :</strong> Henri Marchal</p>
                  <p><strong>{isFr ? 'Contact éditorial & Support' : 'Editorial & Support Email'} :</strong> <a href="mailto:henrimarchal4@gmail.com" className="text-coral underline">henrimarchal4@gmail.com</a></p>
                  <p><strong>{isFr ? 'Siège & Localisation' : 'Location'} :</strong> Paris, France 🇫🇷</p>
                  <p><strong>{isFr ? 'Statut' : 'Status'} :</strong> {isFr ? 'Éditeur indépendant de services numériques et psychologie positive' : 'Independent publisher of digital relationship tools'}</p>
                </div>
                <p className="text-xs text-text-gray/90">
                  {isFr
                    ? 'Conformément aux dispositions de l’article 6 de la Loi n° 2004-575 du 21 juin 2004 pour la Confiance dans l’Économie Numérique (LCEN).'
                    : 'In compliance with French and European electronic commerce transparency directives.'}
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg sm:text-xl font-bold text-deep-black flex items-center gap-2">
                  <span>2.</span> {isFr ? 'Hébergement & Infrastructure' : 'Hosting Provider'}
                </h2>
                <p>
                  {isFr ? (
                    <>
                      Le site et l’application LoveQuiz sont hébergés sur les infrastructures sécurisées de haute disponibilité de :
                    </>
                  ) : (
                    <>
                      The LoveQuiz website and applications are hosted on the high-availability secure infrastructure of:
                    </>
                  )}
                </p>
                <div className="p-4 rounded-xl bg-off-white border border-powder space-y-1 font-medium text-deep-black text-xs sm:text-sm">
                  <p><strong>{isFr ? 'Hébergeur' : 'Hosting Provider'} :</strong> Google Cloud Platform (Google Ireland Limited)</p>
                  <p><strong>{isFr ? 'Adresse' : 'Address'} :</strong> Gordon House, Barrow Street, Dublin 4, Irlande</p>
                  <p><strong>{isFr ? 'Centre de données' : 'Data Center Region'} :</strong> Région Europe-West (Paris / Frankfurt / Belgique) - Conforme RGPD</p>
                  <p><strong>{isFr ? 'Certifications' : 'Certifications'} :</strong> ISO 27001, SOC 1/2/3, PCI DSS, conformité totale aux clauses contractuelles types de l’Union Européenne.</p>
                </div>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg sm:text-xl font-bold text-deep-black flex items-center gap-2">
                  <span>3.</span> {isFr ? 'Propriété intellectuelle & Droits réservés' : 'Intellectual Property'}
                </h2>
                <p>
                  {isFr ? (
                    <>
                      L’ensemble des éléments constituant le site <strong>LoveQuiz</strong> (textes, structure générale, algorithmes de calcul de compatibilité, questionnaire en 15 questions, archétypes relationnels, design visuel, illustrations vectorielles, animations et logo) sont protégés par le Code de la Propriété Intellectuelle et constituent la propriété exclusive d’Henri Marchal et de LoveQuiz.
                    </>
                  ) : (
                    <>
                      All components of <strong>LoveQuiz</strong> (texts, structure, algorithmic compatibility scoring, 15-question quiz matrix, relationship archetypes, artwork, vector graphics, animations, and branding) are protected under international copyright and intellectual property laws.
                    </>
                  )}
                </p>
                <p>
                  {isFr
                    ? 'Toute reproduction, représentation, modification ou extraction intégrale ou partielle de ces éléments, par quelque procédé que ce soit, sans l’autorisation écrite préalable de l’éditeur, est formellement interdite et constitutive d’une contrefaçon sanctionnée par les articles L. 335-2 et suivants du Code de la propriété intellectuelle.'
                    : 'Any reproduction, alteration, scraping, or distribution of these assets without prior written consent is strictly prohibited.'}
                </p>
              </section>
            </div>
          )}

          {/* TAB 2: POLITIQUE DE CONFIDENTIALITÉ & RGPD */}
          {activeTab === 'confidentialite' && (
            <div className="space-y-6 text-text-gray text-xs sm:text-sm md:text-base leading-relaxed animate-fade-in-up">
              {/* Engagement Banner */}
              <div className="p-4 sm:p-5 rounded-2xl bg-light-pink border border-coral/30 flex items-start gap-3.5">
                <span className="text-2xl shrink-0">🛡️</span>
                <div className="space-y-1 text-xs sm:text-sm">
                  <p className="font-bold text-coral">
                    {isFr ? 'Engagement « Zéro Traçage Intrusif & Zéro Vente de Données »' : 'Zero Intrusive Tracking & Zero Data Sale Commitment'}
                  </p>
                  <p className="text-deep-black">
                    {isFr
                      ? 'L’intimité de votre couple est sacrée. Vos réponses aux tests ne sont jamais vendues, jamais transmises à des tiers, et sont traitées en toute confidentialité.'
                      : 'Your couple intimacy is confidential. Your quiz answers are never sold, never shared with third parties, and are processed locally.'}
                  </p>
                </div>
              </div>

              <section className="space-y-2">
                <h2 className="text-lg sm:text-xl font-bold text-deep-black flex items-center gap-2">
                  <span>1.</span> {isFr ? 'Responsable du Traitement (DPO)' : 'Data Controller (DPO)'}
                </h2>
                <p>
                  {isFr ? (
                    <>
                      Le responsable du traitement des données personnelles au sens du Règlement Général sur la Protection des Données (RGPD - Règlement UE 2016/679) et de la Loi Informatique et Libertés est :
                    </>
                  ) : (
                    <>
                      The Data Controller under the General Data Protection Regulation (GDPR - EU Regulation 2016/679) is:
                    </>
                  )}
                </p>
                <div className="p-3.5 rounded-xl bg-off-white border border-powder text-xs sm:text-sm font-medium text-deep-black">
                  <p><strong>Henri Marchal</strong> — Délégué à la Protection des Données (DPO)</p>
                  <p>Email direct de contact RGPD : <a href="mailto:henrimarchal4@gmail.com" className="text-coral underline">henrimarchal4@gmail.com</a></p>
                </div>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg sm:text-xl font-bold text-deep-black flex items-center gap-2">
                  <span>2.</span> {isFr ? 'Minimisation & Traitement Local (Privacy by Design)' : 'Data Minimization & Local Processing'}
                </h2>
                <p>
                  {isFr ? (
                    <>
                      <strong>• Réponses au Quiz & Outils :</strong> Le calcul des 5 piliers de compatibilité, du profil d’archétype, de l’alchimie astrale et des langages d’amour est effectué <em>exclusivement côté client (dans votre navigateur)</em>. Aucune réponse intime n’est associée à votre identité civile.
                    </>
                  ) : (
                    <>
                      <strong>• Quiz Answers & Tools:</strong> The calculation of the 5 compatibility pillars, archetype profiles, astral alchemy, and love languages is performed <em>strictly client-side in your browser</em>.
                    </>
                  )}
                </p>
                <p>
                  {isFr ? (
                    <>
                      <strong>• Formulaire de contact :</strong> Lorsque vous nous envoyez un message via le formulaire, les données collectées (nom, email, message) sont utilisées dans le seul but de vous répondre et sont conservées pendant une durée maximale de 12 mois.
                    </>
                  ) : (
                    <>
                      <strong>• Contact Form:</strong> Data submitted via the contact form (name, email, message) is used solely to respond to your inquiry and retained for up to 12 months.
                    </>
                  )}
                </p>
                <p>
                  {isFr ? (
                    <>
                      <strong>• Newsletter :</strong> En cas d’inscription volontaire, votre adresse email est collectée uniquement pour vous envoyer nos conseils relationnels hebdomadaires. Vous pouvez vous désinscrire à tout moment en 1 clic.
                    </>
                  ) : (
                    <>
                      <strong>• Newsletter:</strong> Optional email subscriptions are used exclusively for couple advice notes, with one-click unsubscribe.
                    </>
                  )}
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg sm:text-xl font-bold text-deep-black flex items-center gap-2">
                  <span>3.</span> {isFr ? 'Cookies & Stockage Local (Directive ePrivacy)' : 'Cookies & Local Storage'}
                </h2>
                <p>
                  {isFr
                    ? 'LoveQuiz respecte les recommandations de la CNIL concernant les traceurs. Nous n’utilisons aucun cookie de ciblage publicitaire intrusif. Le stockage local (localStorage) de votre terminal est utilisé uniquement pour :'
                    : 'LoveQuiz complies with EU ePrivacy standards. We do not deploy intrusive advertising trackers. LocalStorage is used strictly for:'}
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
                  <li>{isFr ? 'Mémoriser votre choix de langue (FR ou EN) pour vos futures visites.' : 'Remembering your language preference (FR or EN).'}</li>
                  <li>{isFr ? 'Sauvegarder temporairement votre progression dans le quiz pour éviter de recommencer en cas de rafraîchissement accidentel.' : 'Temporarily caching quiz progression so an accidental refresh does not reset your answers.'}</li>
                </ul>

                {/* Interactive Local Storage Clear Widget */}
                <div className="mt-4 p-4 rounded-2xl bg-off-white border border-powder space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-deep-black">
                        {isFr ? 'Gestionnaire de vos données locales' : 'Local Data Management'}
                      </p>
                      <p className="text-xs text-text-gray">
                        {isFr
                          ? `${localStorageCount} élément(s) actuellement sauvegardé(s) localement sur cet appareil.`
                          : `${localStorageCount} item(s) currently stored locally on this device.`}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleClearLocalStorage}
                      className="px-4 py-2 rounded-full bg-white text-coral border border-coral/30 text-xs font-semibold hover:bg-coral hover:text-white transition-all cursor-pointer shadow-xs active:scale-95 shrink-0"
                    >
                      🗑️ {isFr ? 'Effacer mes données locales' : 'Clear my local data'}
                    </button>
                  </div>
                  {clearedSuccess && (
                    <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold animate-fadeIn flex items-center gap-2">
                      <span>✓</span>
                      <span>{isFr ? 'Toutes vos données locales LoveQuiz ont été effacées avec succès !' : 'All local LoveQuiz data cleared successfully!'}</span>
                    </div>
                  )}
                </div>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg sm:text-xl font-bold text-deep-black flex items-center gap-2">
                  <span>4.</span> {isFr ? 'Vos Droits RGPD & Réclamations CNIL' : 'Your GDPR Rights & CNIL Complaint'}
                </h2>
                <p>
                  {isFr
                    ? 'Conformément aux articles 15 à 22 du RGPD, vous disposez des droits suivants sur vos données :'
                    : 'In compliance with articles 15 through 22 of the GDPR, you retain the following rights:'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div className="p-3 rounded-xl bg-off-white border border-powder">
                    <p className="font-bold text-deep-black">{isFr ? '• Droit d’accès et de rectification' : '• Right of Access & Rectification'}</p>
                    <p className="text-text-gray mt-0.5">{isFr ? 'Obtenir une copie de vos données et les corriger.' : 'Obtain a copy of and rectify personal data.'}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-off-white border border-powder">
                    <p className="font-bold text-deep-black">{isFr ? '• Droit à l’effacement (oubli)' : '• Right to Erasure (Forgotten)'}</p>
                    <p className="text-text-gray mt-0.5">{isFr ? 'Suppression immédiate de tout message ou email.' : 'Immediate deletion of any message or email.'}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-off-white border border-powder">
                    <p className="font-bold text-deep-black">{isFr ? '• Droit d’opposition et de retrait' : '• Right to Object & Withdraw'}</p>
                    <p className="text-text-gray mt-0.5">{isFr ? 'Retirer votre consentement à tout instant.' : 'Withdraw consent at any time.'}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-off-white border border-powder">
                    <p className="font-bold text-deep-black">{isFr ? '• Droit à la portabilité' : '• Right to Data Portability'}</p>
                    <p className="text-text-gray mt-0.5">{isFr ? 'Recevoir vos données dans un format structuré.' : 'Receive your data in a structured format.'}</p>
                  </div>
                </div>
                <p className="pt-2">
                  {isFr ? (
                    <>
                      Pour exercer l’un de ces droits, contactez directement Henri Marchal par email à :{' '}
                      <a href="mailto:henrimarchal4@gmail.com" className="text-coral font-bold underline">
                        henrimarchal4@gmail.com
                      </a>
                      . Nous vous répondrons sous un délai maximum de 30 jours.
                    </>
                  ) : (
                    <>
                      To exercise any of these rights, contact Henri Marchal directly via email at:{' '}
                      <a href="mailto:henrimarchal4@gmail.com" className="text-coral font-bold underline">
                        henrimarchal4@gmail.com
                      </a>
                      . Response guaranteed within 30 days.
                    </>
                  )}
                </p>
                <p className="text-xs text-text-gray/80">
                  {isFr
                    ? 'Si vous estimez que vos droits ne sont pas respectés, vous avez également le droit d’introduire une réclamation auprès de la CNIL (Commission Nationale de l’Informatique et des Libertés - 3 Place de Fontenoy, 75007 Paris - www.cnil.fr).'
                    : 'If you consider that your data rights are not respected, you also hold the right to lodge a complaint with your national supervisory authority (e.g. CNIL in France - www.cnil.fr).'}
                </p>
              </section>
            </div>
          )}

          {/* TAB 3: CONDITIONS GÉNÉRALES D'UTILISATION (CGU) */}
          {activeTab === 'cgu' && (
            <div className="space-y-6 text-text-gray text-xs sm:text-sm md:text-base leading-relaxed animate-fade-in-up">
              <section className="space-y-2">
                <h2 className="text-lg sm:text-xl font-bold text-deep-black flex items-center gap-2">
                  <span>1.</span> {isFr ? 'Objet & Nature du service' : 'Purpose & Nature of Service'}
                </h2>
                <p>
                  {isFr ? (
                    <>
                      LoveQuiz propose des questionnaires interactifs, des outils ludiques de couple et des contenus éducatifs inspirés de la psychologie positive relationnelle. Le service est fourni à titre indicatif, pédagogique et ludique pour encourager la communication bienveillante au sein des couples.
                    </>
                  ) : (
                    <>
                      LoveQuiz provides interactive questionnaires, playful couple tools, and educational guides inspired by positive relationship psychology. The service is provided for educational and recreational purposes to foster compassionate dialogue.
                    </>
                  )}
                </p>
                <div className="p-3.5 rounded-xl bg-pastel-yellow/60 border border-amber-300 text-xs sm:text-sm text-deep-black">
                  ⚠️ <strong>{isFr ? 'Avertissement important' : 'Important Notice'} :</strong>{' '}
                  {isFr
                    ? 'LoveQuiz ne remplace en aucun cas une thérapie de couple, un suivi médical, psychologique ou psychiatrique professionnel. En cas de détresse psychologique ou conjugale grave, nous encourageons vivement à consulter un professionnel de santé agréé.'
                    : 'LoveQuiz does not replace licensed medical, psychological, or couple therapy. In situations of distress, please seek support from accredited healthcare specialists.'}
                </div>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg sm:text-xl font-bold text-deep-black flex items-center gap-2">
                  <span>2.</span> {isFr ? 'Gratuité & Accès au service' : 'Free Access & Availability'}
                </h2>
                <p>
                  {isFr
                    ? 'L’accès au quiz principal en 15 questions, au calculateur astrologique, au test des 5 langages et aux articles du blog est gratuit. L’éditeur met tout en œuvre pour assurer une disponibilité 24/7 de la plateforme mais ne saurait être tenu responsable d’éventuelles interruptions pour maintenance technique.'
                    : 'Access to the 15-question quiz, astrology tool, love languages test, and blog is free of charge. The publisher aims for 24/7 uptime but cannot be held liable for scheduled maintenance.'}
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg sm:text-xl font-bold text-deep-black flex items-center gap-2">
                  <span>3.</span> {isFr ? 'Droit applicable et juridiction compétente' : 'Applicable Law & Jurisdiction'}
                </h2>
                <p>
                  {isFr
                    ? 'Les présentes mentions légales, conditions d’utilisation et politique de confidentialité sont régies par le droit français. En cas de litige relatif à l’interprétation ou à l’exécution du service, une solution amiable sera recherchée en priorité avant toute action judiciaire devant les tribunaux compétents de Paris.'
                    : 'These legal terms are governed by French and European Union law. Any disputes shall seek amicable resolution prior to submission before competent courts in Paris, France.'}
                </p>
              </section>
            </div>
          )}

          {/* Contact Direct Assistance Footer Box */}
          <div className="pt-6 border-t border-powder flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-off-white p-4 sm:p-6 rounded-2xl">
            <div className="space-y-1">
              <p className="text-xs sm:text-sm font-bold text-deep-black">
                {isFr ? 'Une question sur vos données ou sur les mentions légales ?' : 'Questions regarding your data or legal terms?'}
              </p>
              <p className="text-xs text-text-gray">
                {isFr ? 'Henri Marchal vous répond personnellement par email.' : 'Henri Marchal personally answers your questions via email.'}
              </p>
            </div>
            <a
              href="mailto:henrimarchal4@gmail.com"
              className="btn-primary text-xs py-2.5 px-5 rounded-full whitespace-nowrap min-h-[42px] shadow-xs hover:shadow-md"
            >
              ✉️ {isFr ? 'Contacter Henri Marchal' : 'Contact Henri Marchal'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
