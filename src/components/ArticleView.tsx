import React from 'react';
import { Language, translations } from '../translations';
import { BlogPost } from '../data/blogData';
import coupleChatImg from '../assets/images/couple_communication_chat_1790262319749.jpg';
import coupleQuizImg from '../assets/images/couple_quiz_journey_1790262285021.jpg';
import romanticDatesImg from '../assets/images/romantic_date_ideas_1790262308114.jpg';
import heroCoupleImg from '../assets/images/hero_couple_love_1790262271844.jpg';

interface ArticleViewProps {
  post: BlogPost;
  currentLang: Language;
  onBack: () => void;
  onTakeQuiz: () => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  post,
  currentLang,
  onBack,
  onTakeQuiz,
}) => {
  const t = translations[currentLang];
  const pData = post[currentLang];

  const getPostCover = (id: string) => {
    switch (id) {
      case '1':
        return heroCoupleImg;
      case '2':
        return coupleQuizImg;
      case '3':
        return coupleChatImg;
      case '4':
        return romanticDatesImg;
      default:
        return coupleChatImg;
    }
  };

  const coverImg = getPostCover(post.id);

  return (
    <article className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto animate-fade-in-up">
      {/* Back to blog button */}
      <button
        id="back-to-blog-btn"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-semibold text-coral hover:text-coral-dark mb-6 sm:mb-8 cursor-pointer transition-colors min-h-[44px] group"
      >
        <span className="group-hover:-translate-x-1.5 transition-transform duration-200">←</span>
        <span>{t.blog.backToBlog}</span>
      </button>

      {/* Article Header */}
      <header className="mb-6 sm:mb-8 text-left">
        <div className="flex items-center gap-2 text-xs font-medium text-text-gray mb-3 sm:mb-4">
          <span className="font-semibold text-coral">{post.category}</span>
          <span aria-hidden="true">·</span>
          <span>{post.date}</span>
          <span aria-hidden="true">·</span>
          <span>{post.readTimeMin} {t.blog.readTime}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-deep-black mb-5 sm:mb-6 leading-tight">
          {pData.title}
        </h1>

        <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-off-white border border-powder">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-light-pink border border-coral/30 flex items-center justify-center font-bold text-sm text-coral shrink-0">
            {post.author.charAt(0)}
          </div>
          <div>
            <p className="text-xs sm:text-sm font-bold text-deep-black">{post.author}</p>
            <p className="text-xs text-text-gray">{currentLang === 'fr' ? post.authorRoleFr : post.authorRoleEn}</p>
          </div>
        </div>
      </header>

      {/* Featured Header Image */}
      <div className="mb-8 rounded-2xl sm:rounded-3xl overflow-hidden border border-powder shadow-md">
        <img
          src={coverImg}
          alt={pData.title}
          referrerPolicy="no-referrer"
          className="w-full h-64 sm:h-80 md:h-96 object-cover object-center"
        />
      </div>

      {/* Quote Banner */}
      <div className="my-6 sm:my-8 p-5 sm:p-6 rounded-2xl bg-light-pink border-l-4 border-coral italic text-sm sm:text-base md:text-lg text-deep-black font-medium leading-relaxed">
        “{pData.quote}”
      </div>

      {/* Key Takeaways Box */}
      <div className="my-6 sm:my-8 p-5 sm:p-6 rounded-2xl bg-pastel-yellow border border-amber-300/30">
        <h3 className="text-sm sm:text-base font-bold text-deep-black mb-3 flex items-center gap-2">
          <span>💡</span>
          <span>{currentLang === 'fr' ? 'À retenir absolument :' : 'Key takeaways :'}</span>
        </h3>
        <ul className="space-y-2 text-xs sm:text-sm text-text-gray">
          {pData.takeaways.map((point, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="text-coral font-bold shrink-0">✓</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Body Content Sections */}
      <div className="space-y-6 sm:space-y-8 my-8 sm:my-10 text-deep-black">
        <p className="text-base sm:text-lg leading-relaxed font-medium text-deep-black">
          {pData.intro}
        </p>

        {pData.contentSections.map((sec, idx) => (
          <div key={idx} className="space-y-2 sm:space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-deep-black pt-3 sm:pt-4">
              {sec.heading}
            </h2>
            <p className="text-sm sm:text-base text-text-gray leading-relaxed">
              {sec.body}
            </p>
          </div>
        ))}
      </div>

      {/* Quiz CTA Box at the bottom of article */}
      <div className="my-10 sm:my-12 p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-light-pink border border-coral/25 text-center shadow-xs">
        <div className="text-xs font-bold uppercase tracking-wider text-coral mb-2">
          {currentLang === 'fr' ? 'Passez à l’action' : 'Take action'}
        </div>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-deep-black mb-2 sm:mb-3">
          {currentLang === 'fr' ? 'Où en est votre couple aujourd’hui ?' : 'Where does your relationship stand today?'}
        </h3>
        <p className="text-xs sm:text-sm md:text-base text-text-gray max-w-xl mx-auto mb-6 leading-relaxed">
          {currentLang === 'fr'
            ? 'Découvrez votre indice de complicité en 10 questions douces et sans tabou. C’est 100% gratuit et instantané.'
            : 'Discover your chemistry score in 10 gentle, candid questions. 100% free and instant.'}
        </p>
        <button
          id="article-bottom-quiz-cta"
          onClick={onTakeQuiz}
          className="btn-primary w-full sm:w-auto px-8 py-3.5 text-base justify-center min-h-[48px]"
        >
          {currentLang === 'fr' ? 'Lancer le LoveQuiz Gratuit' : 'Take the Free LoveQuiz'}
        </button>
      </div>
    </article>
  );
};
