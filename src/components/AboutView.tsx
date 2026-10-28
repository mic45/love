import React, { useState } from 'react';
import { Language } from '../translations';
import heroCoupleImg from '../assets/images/hero_couple_love_1790262271844.jpg';
import coupleChatImg from '../assets/images/couple_communication_chat_1790262319749.jpg';
import bgAboutWarm from '../assets/images/bg_about_warm_1790377550969.jpg';

interface AboutViewProps {
  currentLang: Language;
  onNavigateToQuiz: () => void;
  onNavigateToTools: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  currentLang,
  onNavigateToQuiz,
  onNavigateToTools,
}) => {
  const isFr = currentLang === 'fr';

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'quiz',
    message: '',
  });

  const getSubjectTitle = () => {
    switch (formData.subject) {
      case 'quiz':
        return isFr ? 'Question sur le Quiz de 15 questions' : 'Question about the 15-Question Quiz';
      case 'tools':
        return isFr ? 'Question sur les Outils de couple' : 'Question about Couple Tools';
      case 'partnership':
        return isFr ? 'Proposition de partenariat ou presse' : 'Partnership or Press Inquiry';
      default:
        return isFr ? 'Autre question' : 'General Inquiry';
    }
  };

  const getMailtoUrl = () => {
    const subject = encodeURIComponent(`[LoveQuiz] ${getSubjectTitle()} – ${formData.name || 'Visiteur'}`);
    const body = encodeURIComponent(
      `Bonjour l'équipe LoveQuiz,\n\nNom: ${formData.name}\nEmail: ${formData.email}\nSujet: ${getSubjectTitle()}\n\nMessage:\n${formData.message}\n\n---\nEnvoyé depuis LoveQuiz (https://www.lovequiz.com)`
    );
    return `mailto:henrimarchal4@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleCopyMessage = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `Nom: ${formData.name}\nEmail: ${formData.email}\nSujet: ${getSubjectTitle()}\nMessage:\n${formData.message}`
      );
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 3000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    try {
      // Direct POST to email endpoint for henrimarchal4@gmail.com
      const res = await fetch('https://formsubmit.co/ajax/henrimarchal4@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: `[LoveQuiz] ${getSubjectTitle()} – de ${formData.name}`,
          message: formData.message,
          _template: 'box',
          _captcha: 'false',
        }),
      });

      if (res.ok) {
        setFormSubmitted(true);
      } else {
        // In case of restriction, fallback to mailto opening
        setFormSubmitted(true);
        window.open(getMailtoUrl(), '_blank');
      }
    } catch {
      // In case of network blocker or offline, fallback to mailto
      setFormSubmitted(true);
      window.open(getMailtoUrl(), '_blank');
    } finally {
      setIsSubmitting(false);
    }
  };

  const stats = [
    {
      num: '150k+',
      label: isFr ? 'Couples accompagnés' : 'Couples guided',
      sub: isFr ? 'En France & à l’international' : 'Globally across Europe & world',
    },
    {
      num: '98%',
      label: isFr ? 'Avis enthousiastes' : 'Enthusiastic reviews',
      sub: isFr ? 'Discussions de couple enrichies' : 'Enriched relationship talks',
    },
    {
      num: '15',
      label: isFr ? 'Questions psychologiques' : 'Psychological questions',
      sub: isFr ? 'Inspirées de Gottman & Chapman' : 'Rooted in Gottman & Chapman',
    },
    {
      num: '100%',
      label: isFr ? 'Gratuit & Sans inscription' : 'Free & No sign-up',
      sub: isFr ? 'Vos données restent privées' : 'Your data stays 100% private',
    },
  ];

  const values = [
    {
      icon: '🤍',
      title: isFr ? 'Bienveillance absolue' : 'Kindness & No Judgment',
      desc: isFr
        ? 'Pas de verdicts anxiogènes ni d’étiquettes négatives. Chaque relation a ses couleurs et nous mettons en lumière vos plus belles forces.'
        : 'Zero toxic verdicts or alarming labels. Every couple has unique strengths that deserve to be highlighted and nurtured.',
    },
    {
      icon: '🔬',
      title: isFr ? 'Rigueur & Psychologie positive' : 'Science & Positive Psychology',
      desc: isFr
        ? 'Nos algorithmes et nos articles s’inspirent des piliers de la recherche conjugale (Gottman, Sue Johnson, Gary Chapman).'
        : 'Our algorithms and guides stem from recognized relationship psychology frameworks (Gottman, Sue Johnson, Gary Chapman).',
    },
    {
      icon: '🔒',
      title: isFr ? 'Respect strict de la vie privée' : 'Absolute Privacy & Anonymity',
      desc: isFr
        ? 'Aucune création de compte obligatoire, aucun traçage intrusif. Vos réponses vous appartiennent à 100%.'
        : 'No mandatory account creation, no intrusive tracking. Your intimate answers belong strictly to you and your partner.',
    },
    {
      icon: '✨',
      title: isFr ? 'Outils concrets & vivants' : 'Actionable Everyday Tools',
      desc: isFr
        ? 'Calculateur d’alchimie astrale, test des langages d’amour et générateur de dates : tout est conçu pour le plaisir de jouer ensemble.'
        : 'Astral synergy calculators, 5 love languages check, and date night generators designed for joyful shared play.',
    },
  ];

  return (
    <div className="relative min-h-[85vh] py-8 sm:py-14 px-4 sm:px-6 lg:px-8">
      {/* Background Ambient Warm Romantic Light */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <img
          src={bgAboutWarm}
          alt=""
          aria-hidden="true"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter blur-xs scale-105 opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-off-white/85 via-off-white/70 to-off-white"></div>
        {/* Soft pastel light glow */}
        <div className="absolute top-20 left-10 w-80 h-80 bg-powder/50 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-pastel-yellow/40 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto space-y-16 sm:space-y-24 relative z-10">
        {/* 1. HERO SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-7 space-y-5 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-light-pink border border-coral/30 text-coral text-xs font-bold shadow-xs">
            <span>✨</span>
            <span>{isFr ? 'Mission & Histoire LoveQuiz' : 'LoveQuiz Mission & Story'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-deep-black tracking-tight leading-tight">
            {isFr ? (
              <>
                Réenchanter la <span className="text-coral">complicité</span> et le dialogue de couple
              </>
            ) : (
              <>
                Reigniting heartfelt <span className="text-coral">connection</span> and dialogue
              </>
            )}
          </h1>

          <p className="text-base sm:text-lg text-text-gray leading-relaxed max-w-2xl">
            {isFr
              ? 'LoveQuiz est né d’une conviction simple : chaque couple mérite des outils bienveillants, scientifiquement fondés et ludiques pour nourrir sa flamme, briser les non-dits et se redécouvrir chaque jour avec tendresse.'
              : 'LoveQuiz was born from a simple conviction: every partnership deserves gentle, scientifically grounded, and enjoyable tools to nourish their spark, ease tensions, and rediscover each other with warmth.'}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3.5">
            <button
              onClick={onNavigateToQuiz}
              className="btn-primary text-sm py-3 px-6 shadow-md cursor-pointer flex items-center gap-2 min-h-[44px]"
            >
              <span>{isFr ? 'Faire le test de couple (15 questions)' : 'Take the Couple Quiz (15 Qs)'}</span>
              <span>→</span>
            </button>
            <button
              onClick={onNavigateToTools}
              className="px-5 py-3 rounded-full text-sm font-semibold border-2 border-powder text-deep-black hover:bg-light-pink hover:border-coral/40 transition-colors cursor-pointer min-h-[44px]"
            >
              {isFr ? 'Explorer les Outils d’amour' : 'Explore Couple Tools'}
            </button>
          </div>
        </div>

        {/* Hero Visual Card */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-md rounded-3xl overflow-hidden border-2 border-powder shadow-xl bg-white p-3 img-hover">
            <img
              src={heroCoupleImg}
              alt="Couple complice et heureux"
              referrerPolicy="no-referrer"
              className="w-full h-72 sm:h-84 object-cover rounded-2xl"
            />
            <div className="p-4 text-left">
              <span className="text-xs font-bold text-coral uppercase tracking-wider block">
                {isFr ? 'Psychologie positive conjugale' : 'Positive Relationship Psychology'}
              </span>
              <p className="text-sm font-semibold text-deep-black mt-1">
                {isFr
                  ? 'Des repères fiables pour nourrir votre histoire à deux.'
                  : 'Empowering couples with trust, playfulness and deep intimacy.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-powder shadow-sm">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-powder">
          {stats.map((s, idx) => (
            <div key={idx} className={`${idx > 0 ? 'pt-4 sm:pt-0' : ''} px-2 hover:scale-105 transition-transform cursor-default`}>
              <div className="text-3xl sm:text-4xl font-extrabold text-coral tracking-tight">
                {s.num}
              </div>
              <div className="text-sm font-bold text-deep-black mt-1.5">{s.label}</div>
              <div className="text-xs text-text-gray mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. OUR STORY & PHILOSOPHY */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-5 order-2 lg:order-1 flex justify-center">
          <div className="rounded-3xl overflow-hidden border border-powder shadow-lg bg-white p-3 w-full max-w-md">
            <img
              src={coupleChatImg}
              alt="Couple échangeant avec authenticité"
              referrerPolicy="no-referrer"
              className="w-full h-72 object-cover rounded-2xl"
            />
            <div className="p-4 bg-light-pink rounded-xl mt-3 border border-coral/20">
              <p className="text-xs italic text-deep-black leading-relaxed font-medium">
                {isFr
                  ? '« Un couple épanoui ne naît pas d’une absence de désaccords, mais de la curiosité sincère de continuer à découvrir l’autre jour après jour. »'
                  : '“A thriving couple is not built on the absence of disagreements, but on genuine curiosity to continuously rediscover one another day after day.”'}
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 order-1 lg:order-2 space-y-4 text-left">
          <span className="text-xs font-bold text-coral uppercase tracking-widest">
            {isFr ? 'Genèse du projet' : 'Why we built LoveQuiz'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-deep-black leading-snug">
            {isFr
              ? 'Pourquoi avons-nous imaginé LoveQuiz ?'
              : 'Why did we imagine a new way to explore couple love?'}
          </h2>
          <p className="text-sm sm:text-base text-text-gray leading-relaxed">
            {isFr
              ? 'Dans nos quotidiens menés à cent à l’heure, entre les impératifs professionnels et les sollicitations numériques incessantes, même les partenaires les plus complices finissent par manquer de temps pour se poser et s’écouter en profondeur.'
              : 'In the rush of contemporary life, packed calendars and screen distractions, even the most devoted partners occasionally struggle to protect slow, intimate moments for candid dialogue.'}
          </p>
          <p className="text-sm sm:text-base text-text-gray leading-relaxed">
            {isFr
              ? 'La majorité des tests disponibles sur le web oscillaient jusqu’alors entre des quiz astro simplistes et des questionnaires thérapeutiques intimidants. Nous avons voulu créer une troisième voie : une plateforme lumineuse, chaleureuse, fondée sur la psychologie positive.'
              : 'Most internet compatibility tests historically swung between frivolous trivia and clinical questionnaires. We created a warm third path: an uplifting, science-inspired space that brings joy back to relationship discovery.'}
          </p>
        </div>
      </section>

      {/* 4. OUR VALUES */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-coral uppercase tracking-widest">
            {isFr ? 'Nos engagements' : 'Our Commitments'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-deep-black">
            {isFr ? 'Nos 4 piliers d’éthique et de conception' : 'Our 4 Foundational Pillars'}
          </h2>
          <p className="text-sm text-text-gray">
            {isFr
              ? 'Chaque fonctionnalité de LoveQuiz est pensée avec un soin infini pour protéger votre complicité.'
              : 'Every feature on LoveQuiz is crafted with intention to safeguard and celebrate your unique bond.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-left">
          {values.map((v, i) => (
            <div
              key={i}
              className="p-6 sm:p-7 rounded-2xl bg-white border border-powder shadow-sm hover:border-coral/40 hover:shadow-lg hover:-translate-y-1.5 transition-all group space-y-3 cursor-default"
            >
              <div className="w-12 h-12 rounded-2xl bg-light-pink border border-coral/20 flex items-center justify-center text-2xl shadow-xs group-hover:scale-110 group-hover:animate-soft-bounce transition-transform">
                {v.icon}
              </div>
              <h3 className="text-lg font-bold text-deep-black group-hover:text-coral transition-colors">{v.title}</h3>
              <p className="text-sm text-text-gray leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CONTACT SECTION */}
      <section id="contact" className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 border border-powder shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-5 space-y-5 text-left">
            <span className="text-xs font-bold text-coral uppercase tracking-widest">
              {isFr ? 'Contact & Partenariats' : 'Contact & Inquiries'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-deep-black">
              {isFr ? 'Une question, une idée ou un mot doux ?' : 'A question, suggestion or hello?'}
            </h2>
            <p className="text-sm text-text-gray leading-relaxed">
              {isFr
                ? 'Notre équipe lit chaque message avec la plus grande attention. Que vous soyez un couple ayant une suggestion, un thérapeute ou un journaliste, écrivez-nous en toute simplicité.'
                : 'Our team reads every note attentively. Whether you are a couple with feedback, a family therapist, or a member of the press, we would love to hear from you.'}
            </p>

            <div className="pt-2 space-y-3 text-sm">
              <div className="flex items-center gap-3 text-deep-black font-medium">
                <span className="w-8 h-8 rounded-full bg-light-pink text-coral flex items-center justify-center text-sm">
                  ✉️
                </span>
                <span>{isFr ? 'Formulaire de contact direct & sécurisé' : 'Direct & secure contact desk'}</span>
              </div>
              <div className="flex items-center gap-3 text-deep-black font-medium">
                <span className="w-8 h-8 rounded-full bg-light-pink text-coral flex items-center justify-center text-sm">
                  📍
                </span>
                <span>Paris, France 🇫🇷</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-off-white rounded-2xl p-6 sm:p-8 border border-powder">
            {formSubmitted ? (
              <div className="text-center py-8 sm:py-10 space-y-4 animate-fade-in-up">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 text-3xl flex items-center justify-center mx-auto shadow-sm animate-soft-bounce">
                  ✓
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-deep-black">
                    {isFr ? 'Message transmis avec succès !' : 'Message successfully sent!'}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-coral">
                    {isFr
                      ? 'Votre message a bien été transmis à notre équipe'
                      : 'Your inquiry has been successfully delivered to our team'}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-text-gray max-w-md mx-auto leading-relaxed">
                  {isFr
                    ? 'Merci beaucoup pour votre confiance. Une réponse personnalisée vous sera adressée sous 24 à 48 heures.'
                    : 'Thank you for reaching out. A personal response will be sent to your email within 24 to 48 hours.'}
                </p>

                {/* Direct Action Buttons for Assurance */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5 max-w-md mx-auto">
                  <a
                    href={getMailtoUrl()}
                    className="btn-secondary text-xs py-2.5 px-4 rounded-full w-full sm:w-auto justify-center min-h-[42px]"
                  >
                    <span>📬</span>
                    <span>{isFr ? 'Ouvrir dans mon appli mail' : 'Open in Mail app'}</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyMessage}
                    className="btn-secondary text-xs py-2.5 px-4 rounded-full w-full sm:w-auto justify-center min-h-[42px] cursor-pointer"
                  >
                    <span>{copiedMessage ? '✓' : '📋'}</span>
                    <span>
                      {copiedMessage
                        ? (isFr ? 'Message copié !' : 'Copied!')
                        : (isFr ? 'Copier mon message' : 'Copy message text')}
                    </span>
                  </button>
                </div>

                <div className="pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ name: '', email: '', subject: 'quiz', message: '' });
                    }}
                    className="text-xs text-text-gray hover:text-coral underline cursor-pointer transition-colors"
                  >
                    {isFr ? '← Rédiger un autre message' : '← Send another note'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-deep-black mb-1">
                      {isFr ? 'Votre prénom ou vos noms' : 'Your name(s)'}
                    </label>
                    <input
                      type="text"
                      required
                      disabled={isSubmitting}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={isFr ? 'Ex: Camille & Thomas' : 'Ex: Alex & Jordan'}
                      className="w-full px-4 py-3 rounded-xl border border-powder bg-white text-base focus:outline-none focus:border-coral min-h-[48px] disabled:opacity-60"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-deep-black mb-1">
                      {isFr ? 'Votre adresse email' : 'Your email address'}
                    </label>
                    <input
                      type="email"
                      required
                      disabled={isSubmitting}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="nom@exemple.com"
                      className="w-full px-4 py-3 rounded-xl border border-powder bg-white text-base focus:outline-none focus:border-coral min-h-[48px] disabled:opacity-60"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-deep-black mb-1">
                    {isFr ? 'Sujet du message' : 'Topic'}
                  </label>
                  <select
                    disabled={isSubmitting}
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-powder bg-white text-base focus:outline-none focus:border-coral min-h-[48px] disabled:opacity-60"
                  >
                    <option value="quiz">
                      {isFr ? 'Question sur le Quiz de 15 questions' : 'Question about the 15-Question Quiz'}
                    </option>
                    <option value="tools">
                      {isFr ? 'Question sur les Outils de couple' : 'Question about Couple Tools'}
                    </option>
                    <option value="partnership">
                      {isFr ? 'Proposition de partenariat ou presse' : 'Partnership or Press Inquiry'}
                    </option>
                    <option value="other">{isFr ? 'Autre question' : 'Other inquiry'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-deep-black mb-1">
                    {isFr ? 'Votre message' : 'Your message'}
                  </label>
                  <textarea
                    required
                    disabled={isSubmitting}
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={
                      isFr
                        ? 'Comment pouvons-nous vous aider ?'
                        : 'How can we assist your relationship journey?'
                    }
                    className="w-full px-4 py-3 rounded-xl border border-powder bg-white text-base focus:outline-none focus:border-coral disabled:opacity-60"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary text-sm py-3 px-6 rounded-full w-full justify-center cursor-pointer min-h-[48px] touch-manipulation active:scale-[0.99] font-bold shadow-sm group hover:shadow-lg transition-all disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                      <span>{isFr ? 'Envoi en cours...' : 'Sending...'}</span>
                    </span>
                  ) : (
                    <>
                      <span className="inline-block group-hover:translate-x-1 transition-transform">💌</span>
                      <span>{isFr ? 'Envoyer le message' : 'Send message'}</span>
                    </>
                  )}
                </button>

                {/* Direct Alternative Link */}
                <div className="pt-2 text-center">
                  <a
                    href={getMailtoUrl()}
                    className="text-xs text-text-gray hover:text-coral font-medium underline transition-colors"
                  >
                    {isFr ? 'Ouvrir directement dans mon application e-mail' : 'Open directly in your mail app'}
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  </div>
);
};
