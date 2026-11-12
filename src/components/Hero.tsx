import React from 'react';
import { Phone, MessageCircle, MapPin, Sparkles, ShieldCheck, Truck, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { KazakhOrnament } from './KazakhOrnament';
import {
  CONTACT_PHONE,
  CONTACT_PHONE_FORMATTED,
  WHATSAPP_LINK,
  MARKET_ADDRESS_KK,
  MARKET_ADDRESS,
  INSTAGRAM_LINK,
  TIKTOK_LINK
} from '../data/initialData';

export const Hero: React.FC = () => {
  const { language, setIsCallbackOpen } = useApp();

  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(
      language === 'kk'
        ? 'Сәлеметсіз бе! Мен Құлсары шұбатына тапсырыс бергім келеді. Бағалары мен бүгінгі жеткізу туралы айтып жібересіз бе?'
        : 'Здравствуйте! Хочу заказать натуральный шубат из Кульсары. Подскажите наличие и условия доставки по Атырау.'
    );
    window.open(`${WHATSAPP_LINK}?text=${text}`, '_blank');
  };

  return (
    <section className="relative overflow-hidden pt-6 pb-14 lg:py-16 bg-gradient-to-b from-[#FBF8F3] via-[#F8F3EA] to-[#FAF7F2] border-b border-amber-900/10">
      {/* Background Kazakh pattern accent */}
      <div className="absolute inset-0 bg-kazakh-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Story, Title, Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Authentic Tagline & Origin */}
            <div className="flex items-center gap-2 mb-3">
              <KazakhOrnament size={18} color="#92400E" />
              <span className="text-xs font-bold tracking-wider uppercase text-amber-800">
                {language === 'kk'
                  ? 'Құлсарының құнарлы даласынан • 100% Табиғи өнім'
                  : 'Из чистых степей Кульсары • 100% Натуральный продукт'}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-[1.15] text-balance">
              {language === 'kk' ? (
                <>
                  Нағыз қазақы{' '}
                  <span className="text-amber-800 italic underline decoration-amber-600/30">
                    Құлсары Шұбаты
                  </span>{' '}
                  және Балғын Түйе Сүті
                </>
              ) : (
                <>
                  Настоящий степной{' '}
                  <span className="text-amber-800 italic underline decoration-amber-600/30">
                    Шубат из Кульсары
                  </span>{' '}
                  и Свежее Верблюжье Молоко
                </>
              )}
            </h1>

            {/* Descriptive Body */}
            <p className="mt-4 text-base sm:text-lg text-stone-700 leading-relaxed max-w-2xl">
              {language === 'kk'
                ? 'Баршаның сүйікті, қалың қаймақты шұбаты мен шипалы түйе сүті. Құлсарыдан күн сайын балғын күйінде жеткізіледі. Сарайшық базарынан алып кетіңіз немесе Атырау қаласы бойынша үйіңізге дейін жеткізуге тапсырыс беріңіз.'
                : 'Любимый всеми шубат с густой бархатистой пеной и целебное верблюжье молоко. Прямые ежедневные поставки из степей Кульсары. Заберите на рынке Сарайшык или оформите быструю доставку на дом по Атырау.'}
            </p>

            {/* Price Teaser inline */}
            <div className="mt-4 py-2.5 px-4 rounded-xl bg-amber-50/80 border border-amber-200/70 inline-flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-stone-800">
              <span className="font-semibold text-amber-900">
                {language === 'kk' ? 'Ыңғайлы литраж:' : 'Доступные объемы:'}
              </span>
              <span>1 л — <strong className="font-mono tabular-nums text-amber-950">1 560 ₸</strong></span>
              <span>·</span>
              <span>1.5 л — <strong className="font-mono tabular-nums text-amber-950">2 300 ₸</strong></span>
              <span>·</span>
              <span>2 л — <strong className="font-mono tabular-nums text-amber-950">3 080 ₸</strong></span>
              <span>·</span>
              <span>5 л — <strong className="font-mono tabular-nums text-amber-950">7 500 ₸</strong></span>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#products"
                className="px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-amber-800 hover:bg-amber-900 active:scale-98 shadow-md hover:shadow-lg transition-all text-center whitespace-nowrap"
              >
                {language === 'kk' ? 'Өнімдерді таңдау' : 'Выбрать объем и заказать'}
              </a>

              <button
                onClick={handleWhatsAppOrder}
                className="px-5 py-3.5 rounded-xl font-bold text-sm text-emerald-900 bg-emerald-100/90 hover:bg-emerald-200/90 border border-emerald-300/80 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 text-emerald-700" />
                <span>WhatsApp тапсырыс</span>
              </button>

              <button
                onClick={() => setIsCallbackOpen(true)}
                className="px-4 py-3.5 rounded-xl font-medium text-xs sm:text-sm text-stone-700 hover:text-stone-900 hover:bg-stone-200/60 border border-stone-300 transition-all cursor-pointer whitespace-nowrap"
              >
                {language === 'kk' ? 'Қоңырау сұрау' : 'Заказать звонок'}
              </button>
            </div>

            {/* Quick trust strip */}
            <div className="mt-8 pt-6 border-t border-amber-900/10 flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-800 shrink-0" />
                <span>
                  {language === 'kk'
                    ? 'Сарайшық базары, Мәденов 1 а/1'
                    : 'Рынок Сарайшык, ул. Маденов 1 а/1'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-800 shrink-0" />
                <span>
                  {language === 'kk'
                    ? 'Жеткізу 500 ₸ бастап'
                    : 'Доставка по городу от 500 ₸'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-800 shrink-0" />
                <a href={`tel:${CONTACT_PHONE}`} className="hover:text-amber-800 font-semibold font-mono">
                  {CONTACT_PHONE_FORMATTED}
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Image Card with Rich Kazakh Heritage */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/80 bg-stone-900 group">
              <img
                src="/src/assets/images/hero_shubat_steppes_1794479575409.jpg"
                alt="Натуральный кульсаринский шубат в традиционной посуде"
                className="w-full h-80 sm:h-96 lg:h-full object-cover transition-transform duration-700 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

              {/* Top Fresh Badge */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs">
                <span className="px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md text-amber-300 font-medium border border-amber-500/30 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>{language === 'kk' ? 'Бүгінгі сауылған' : 'Свежий удой'}</span>
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md text-stone-200 border border-white/10 font-mono">
                  Құлсары ➔ Атырау
                </span>
              </div>

              {/* Bottom Overlay Info */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="font-display text-lg font-bold">
                  {language === 'kk' ? 'Тәбет ашар қалың көбік' : 'Густая бархатная пена'}
                </p>
                <p className="text-xs text-stone-300 mt-0.5">
                  {language === 'kk'
                    ? 'Дәстүрлі әдіспен ашытылған, табиғи шипалық қасиеті мол'
                    : 'Сквашен по вековым традициям, натуральный кладезь иммунитета'}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Column Proof / Feature Strip below Hero Split */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 pt-8 border-t border-amber-900/10">
          <div className="p-4 rounded-xl bg-white/70 border border-amber-900/10 shadow-xs">
            <span className="text-xs text-amber-800 font-bold uppercase tracking-wider block">01. Шығу тегі</span>
            <p className="font-display font-bold text-stone-900 mt-1 text-sm sm:text-base">Құлсары даласы</p>
            <p className="text-xs text-stone-600 mt-0.5">Экологиялық таза өріс, табиғи жайылым</p>
          </div>

          <div className="p-4 rounded-xl bg-white/70 border border-amber-900/10 shadow-xs">
            <span className="text-xs text-amber-800 font-bold uppercase tracking-wider block">02. Денсаулыққа пайда</span>
            <p className="font-display font-bold text-stone-900 mt-1 text-sm sm:text-base">Витаминдер мен пробиотиктер</p>
            <p className="text-xs text-stone-600 mt-0.5">С дәрумені мол, ас қорытуды жеңілдетеді</p>
          </div>

          <div className="p-4 rounded-xl bg-white/70 border border-amber-900/10 shadow-xs">
            <span className="text-xs text-amber-800 font-bold uppercase tracking-wider block">03. Сату нүктесі</span>
            <p className="font-display font-bold text-stone-900 mt-1 text-sm sm:text-base">Сарайшық базары</p>
            <p className="text-xs text-stone-600 mt-0.5">Мәденов 1 а/1 мекенжайы бойынша дайын</p>
          </div>

          <div className="p-4 rounded-xl bg-white/70 border border-amber-900/10 shadow-xs">
            <span className="text-xs text-amber-800 font-bold uppercase tracking-wider block">04. Жылдам байланыс</span>
            <p className="font-display font-bold text-stone-900 mt-1 text-sm sm:text-base">WhatsApp & Kaspi</p>
            <p className="text-xs text-stone-600 mt-0.5">Ыңғайлы онлайн тапсырыс пен QR төлем</p>
          </div>
        </div>

      </div>
    </section>
  );
};
