import React, { useState } from 'react';
import { Language, translations } from '../translations';
import { BLOG_POSTS, BlogPost } from '../data/blogData';
import coupleChatImg from '../assets/images/couple_communication_chat_1790262319749.jpg';
import coupleQuizImg from '../assets/images/couple_quiz_journey_1790262285021.jpg';
import romanticDatesImg from '../assets/images/romantic_date_ideas_1790262308114.jpg';
import heroCoupleImg from '../assets/images/hero_couple_love_1790262271844.jpg';

interface BlogViewProps {
  currentLang: Language;
  onSelectArticle: (post: BlogPost) => void;
}

export const BlogView: React.FC<BlogViewProps> = ({ currentLang, onSelectArticle }) => {
  const t = translations[currentLang];
  const [selectedTag, setSelectedTag] = useState<string>('all');

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

  const filteredPosts = selectedTag === 'all'
    ? BLOG_POSTS
    : BLOG_POSTS.filter((p) => p.categoryKey === selectedTag);

  return (
    <section id="blog-section" className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
        <div className="text-xs font-bold tracking-wider uppercase text-coral mb-2">
          {t.blog.tag}
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-deep-black mb-3">
          {t.blog.title}
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-text-gray">
          {t.blog.subtitle}
        </p>
      </div>

      {/* Category Filter Controls */}
      <div className="flex flex-nowrap sm:flex-wrap items-center justify-start sm:justify-center gap-2 mb-8 sm:mb-10 overflow-x-auto no-scrollbar py-1 px-1 -mx-2 sm:mx-0">
        <button
          onClick={() => setSelectedTag('all')}
          className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all min-h-[40px] touch-manipulation active:scale-95 ${
            selectedTag === 'all'
              ? 'bg-coral text-white shadow-xs'
              : 'bg-white text-text-gray border border-powder hover:bg-light-pink hover:text-deep-black'
          }`}
        >
          {t.blog.allCategories}
        </button>
        <button
          onClick={() => setSelectedTag('psychology')}
          className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all min-h-[40px] touch-manipulation active:scale-95 ${
            selectedTag === 'psychology'
              ? 'bg-coral text-white shadow-xs'
              : 'bg-white text-text-gray border border-powder hover:bg-light-pink hover:text-deep-black'
          }`}
        >
          Psychologie de couple
        </button>
        <button
          onClick={() => setSelectedTag('communication')}
          className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all min-h-[40px] touch-manipulation active:scale-95 ${
            selectedTag === 'communication'
              ? 'bg-coral text-white shadow-xs'
              : 'bg-white text-text-gray border border-powder hover:bg-light-pink hover:text-deep-black'
          }`}
        >
          Communication
        </button>
        <button
          onClick={() => setSelectedTag('routine')}
          className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all min-h-[40px] touch-manipulation active:scale-95 ${
            selectedTag === 'routine'
              ? 'bg-coral text-white shadow-xs'
              : 'bg-white text-text-gray border border-powder hover:bg-light-pink hover:text-deep-black'
          }`}
        >
          Vie à deux & Routine
        </button>
        <button
          onClick={() => setSelectedTag('habits')}
          className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all min-h-[40px] touch-manipulation active:scale-95 ${
            selectedTag === 'habits'
              ? 'bg-coral text-white shadow-xs'
              : 'bg-white text-text-gray border border-powder hover:bg-light-pink hover:text-deep-black'
          }`}
        >
          5 Langages
        </button>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {filteredPosts.map((post) => {
          const pData = post[currentLang];
          const coverImg = getPostCover(post.id);

          return (
            <article
              key={post.id}
              id={`blog-card-${post.id}`}
              onClick={() => onSelectArticle(post)}
              className="bg-white rounded-2xl border border-powder p-4 sm:p-6 match-card flex flex-col justify-between cursor-pointer group"
            >
              <div>
                {/* Article Cover Image */}
                <div className="rounded-xl overflow-hidden mb-4 h-48 sm:h-52 w-full bg-powder/40">
                  <img
                    src={coverImg}
                    alt={pData.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Clean Metadata Header */}
                <div className="flex items-center gap-2 text-xs font-medium text-text-gray mb-2.5">
                  <span className="font-semibold text-coral">{post.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.date}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.readTimeMin} {t.blog.readTime}</span>
                </div>

                {/* Title */}
                <h2 className="text-lg sm:text-xl font-bold text-deep-black group-hover:text-coral transition-colors mb-2 leading-snug">
                  {pData.title}
                </h2>

                {/* Excerpt */}
                <p className="text-xs sm:text-sm text-text-gray mb-5 line-clamp-2 leading-relaxed">
                  {pData.excerpt}
                </p>
              </div>

              {/* Author & Read More */}
              <div className="pt-3.5 border-t border-powder flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-light-pink border border-coral/25 flex items-center justify-center font-bold text-xs text-coral">
                    {post.author.charAt(0)}
                  </div>
                  <div className="text-xs">
                    <p className="font-semibold text-deep-black">{post.author}</p>
                    <p className="text-text-gray">{currentLang === 'fr' ? post.authorRoleFr : post.authorRoleEn}</p>
                  </div>
                </div>

                <span className="text-xs sm:text-sm font-semibold text-coral group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  {t.blog.readMore} →
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
