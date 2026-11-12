import React, { useState } from 'react';
import { X, Star, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ReviewModal: React.FC = () => {
  const { language, isReviewModalOpen, setIsReviewModalOpen, addReview } = useApp();

  const [name, setName] = useState('');
  const [city, setCity] = useState('Атырау');
  const [rating, setRating] = useState(5);
  const [productName, setProductName] = useState('Табиғи Құлсары Шұбаты (2 л)');
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isReviewModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    addReview({
      name,
      city,
      rating,
      productName,
      textKk: text,
      textRu: text,
      verifiedBuyer: true,
      avatarLetter: name.charAt(0).toUpperCase()
    });

    setSubmitted(true);
  };

  const handleClose = () => {
    setIsReviewModalOpen(false);
    setSubmitted(false);
    setName('');
    setText('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
      />

      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-8">
          
          {/* Header */}
          <div className="p-5 bg-stone-900 text-white flex items-center justify-between">
            <h3 className="font-display text-base font-bold">
              {language === 'kk' ? 'Өз пікіріңізді қалдырыңыз' : 'Оставить отзыв'}
            </h3>
            <button
              onClick={handleClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 bg-[#FAF7F2]">
            {submitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-display font-bold text-stone-900 text-lg">
                  {language === 'kk' ? 'Пікіріңізге үлкен рақмет!' : 'Большое спасибо за отзыв!'}
                </h4>
                <p className="text-xs text-stone-600">
                  {language === 'kk'
                    ? 'Сіздің пікіріңіз сайтқа қосылды және басқа сатып алушыларға пайдалы болады.'
                    : 'Ваш отзыв опубликован и поможет другим жителям Атырау сделать выбор.'}
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleClose}
                    className="px-5 py-2 rounded-xl bg-amber-800 text-white text-xs font-bold"
                  >
                    Жабу
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                    {language === 'kk' ? 'Бағалау (жұлдызша):' : 'Ваша оценка:'}
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 cursor-pointer transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-stone-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                    {language === 'kk' ? 'Сіздің аты-жөніңіз:' : 'Ваше имя:'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Мысалы: Айгүл Серікқызы"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-white text-xs text-stone-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                      Қала / Аудан:
                    </label>
                    <input
                      type="text"
                      placeholder="Атырау (Авангард)"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-stone-300 bg-white text-xs text-stone-900"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                      Сатып алынған өнім:
                    </label>
                    <select
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-stone-300 bg-white text-xs text-stone-900"
                    >
                      <option value="Табиғи Құлсары Шұбаты (1 л)">Шұбат 1 л</option>
                      <option value="Табиғи Құлсары Шұбаты (1.5 л)">Шұбат 1.5 л</option>
                      <option value="Табиғи Құлсары Шұбаты (2 л)">Шұбат 2 л</option>
                      <option value="Табиғи Құлсары Шұбаты (5 л)">Шұбат 5 л</option>
                      <option value="Верблюжье молоко (1.5 л)">Түйе сүті 1.5 л</option>
                      <option value="Верблюжье молоко (2 л)">Түйе сүті 2 л</option>
                      <option value="Шұбат және Түйе сүті жинағы">Шұбат + Сүт жинағы</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                    {language === 'kk' ? 'Сіздің пікіріңіз:' : 'Ваш отзыв:'}
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Шұбаттың дәмі, көбігі, жеткізу жылдамдығы туралы жазыңыз..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-white text-xs text-stone-900"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  {language === 'kk' ? 'Пікірді жариялау' : 'Опубликовать отзыв'}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
