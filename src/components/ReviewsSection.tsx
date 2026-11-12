import React, { useState } from 'react';
import { Star, MessageSquarePlus, CheckCircle2, ShieldCheck, ThumbsUp } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { KazakhOrnament } from './KazakhOrnament';
import { Review } from '../types';

export const ReviewsSection: React.FC = () => {
  const { language, reviews, addReview, setIsReviewModalOpen } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'shubat' | 'milk'>('all');

  const filteredReviews = reviews.filter((r) => {
    if (activeFilter === 'shubat') return r.productName.toLowerCase().includes('шұбат') || r.productName.toLowerCase().includes('шубат');
    if (activeFilter === 'milk') return r.productName.toLowerCase().includes('сүт') || r.productName.toLowerCase().includes('молок');
    return true;
  });

  return (
    <section id="reviews" className="py-16 sm:py-20 bg-[#F7F2EA] border-t border-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 pb-6 border-b border-amber-900/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <KazakhOrnament size={16} color="#92400E" />
              <span className="text-xs font-bold tracking-wider uppercase text-amber-800">
                {language === 'kk' ? 'Адал баға мен ризашылық' : 'Честные отзывы и доверие'}
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              {language === 'kk' ? 'Тұтынушылардың пікірлері' : 'Отзывы наших покупателей'}
            </h2>
            <p className="mt-2 text-stone-600 text-xs sm:text-sm max-w-xl">
              {language === 'kk'
                ? 'Атырау тұрғындарының Құлсары шұбаты мен верблюжье молоко туралы шынайы лебіздері.'
                : 'Мнения жителей Атырау о нашем шубате и верблюжьем молоке прямо из Кульсары.'}
            </p>
          </div>

          {/* Leave a review button */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="px-5 py-3 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all cursor-pointer whitespace-nowrap"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>{language === 'kk' ? 'Пікір қалдыру' : 'Оставить отзыв'}</span>
            </button>
          </div>
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-2 mb-8">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-amber-900 text-white shadow-xs'
                : 'bg-white/80 text-stone-700 hover:bg-white border border-stone-200'
            }`}
          >
            {language === 'kk' ? 'Барлық пікірлер' : 'Все отзывы'} ({reviews.length})
          </button>
          <button
            onClick={() => setActiveFilter('shubat')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeFilter === 'shubat'
                ? 'bg-amber-900 text-white shadow-xs'
                : 'bg-white/80 text-stone-700 hover:bg-white border border-stone-200'
            }`}
          >
            {language === 'kk' ? 'Шұбат туралы' : 'О шубате'}
          </button>
          <button
            onClick={() => setActiveFilter('milk')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeFilter === 'milk'
                ? 'bg-amber-900 text-white shadow-xs'
                : 'bg-white/80 text-stone-700 hover:bg-white border border-stone-200'
            }`}
          >
            {language === 'kk' ? 'Түйе сүті туралы' : 'О верблюжьем молоке'}
          </button>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl border border-stone-200/90 p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                {/* Header with Avatar & Rating */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 font-bold flex items-center justify-center text-xs">
                      {review.avatarLetter}
                    </div>
                    <div>
                      <p className="font-bold text-xs text-stone-900 leading-tight">
                        {review.name}
                      </p>
                      <span className="text-[10px] text-stone-500">{review.city}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-amber-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Verified Tag as clean unboxed text */}
                <div className="flex items-center gap-2 text-[11px] text-stone-500 mb-2">
                  <span className="text-amber-900 font-semibold">{review.productName}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Тексерілген сатып алушы</span>
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-xs text-stone-700 leading-relaxed italic">
                  "{language === 'kk' ? review.textKk : review.textRu}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 text-[10px] text-stone-400 flex items-center justify-between">
                <span>{review.date}</span>
                <span className="text-stone-500">Сарайшық базары</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
