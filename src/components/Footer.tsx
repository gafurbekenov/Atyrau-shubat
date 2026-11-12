import React from 'react';
import { Phone, MapPin, Instagram, MessageCircle, Clock, ShieldCheck, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { KazakhOrnament } from './KazakhOrnament';
import {
  CONTACT_PHONE,
  CONTACT_PHONE_FORMATTED,
  MARKET_ADDRESS_KK,
  MARKET_ADDRESS,
  SUPPLY_ORIGIN,
  INSTAGRAM_HANDLE,
  INSTAGRAM_LINK,
  TIKTOK_HANDLE,
  TIKTOK_LINK,
  WHATSAPP_LINK
} from '../data/initialData';

export const Footer: React.FC = () => {
  const { language, setIsCallbackOpen, setIsReviewModalOpen, setIsCrmOpen } = useApp();

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t-2 border-amber-800/40 relative overflow-hidden">
      {/* Decorative top ornament line */}
      <KazakhOrnament type="divider" className="mb-10 text-amber-600/40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand & Origin */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-amber-700/20 border border-amber-600/40 flex items-center justify-center text-amber-400 font-bold font-serif text-xl">
                Ш
              </div>
              <div>
                <span className="font-display text-2xl font-bold text-white tracking-tight">
                  Атырау Шұбат
                </span>
                <span className="block text-xs text-amber-500 font-semibold">
                  {language === 'kk' ? 'Құлсары қаласынан тікелей' : 'Напрямую из г. Кульсары'}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-md">
              {language === 'kk'
                ? 'Атырау халқы мен қонақтарына арналған 100% табиғи қалың қаймақты шұбат және балғын верблюжье молоко. Сарайшық базарынан алып кетіңіз немесе қала бойынша жылдам жеткізуге тапсырыс беріңіз.'
                : '100% натуральный шубат с пышной пенкой и свежее верблюжье молоко для жителей и гостей Атырау. Самовывоз с рынка Сарайшык или бережная доставка на дом.'}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => setIsCallbackOpen(true)}
                className="px-4 py-2 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                {language === 'kk' ? 'Кері байланыс сұрау' : 'Заказать обратный звонок'}
              </button>
              <button
                onClick={() => setIsReviewModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium border border-stone-700 transition-colors cursor-pointer"
              >
                {language === 'kk' ? 'Пікір қалдыру' : 'Оставить отзыв'}
              </button>
            </div>
          </div>

          {/* Contacts & Market Point */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-display font-bold text-white text-base">
              {language === 'kk' ? 'Байланыс және Сату нүктесі' : 'Контакты и Точка продаж'}
            </h4>

            <div className="space-y-2.5 text-xs text-stone-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-stone-400 block text-[11px]">Сату мекенжайы:</span>
                  <span className="font-semibold text-white">
                    {language === 'kk' ? MARKET_ADDRESS_KK : MARKET_ADDRESS}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-stone-400 block text-[11px]">Телефон мен WhatsApp:</span>
                  <a
                    href={`tel:${CONTACT_PHONE}`}
                    className="font-mono font-bold text-amber-400 hover:text-amber-300 text-sm"
                  >
                    {CONTACT_PHONE_FORMATTED}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-stone-400 block text-[11px]">Жұмыс кестесі:</span>
                  <span>Күн сайын: 08:00 – 20:00 (демалыссыз)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-white text-base">
              {language === 'kk' ? 'Әлеуметтік желілер' : 'Социальные сети'}
            </h4>

            <div className="space-y-2 text-xs">
              <a
                href={INSTAGRAM_LINK}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 p-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white transition-colors"
              >
                <Instagram className="w-4 h-4 text-pink-500" />
                <div>
                  <span className="text-[10px] text-stone-400 block">Instagram</span>
                  <span className="font-mono font-semibold">@{INSTAGRAM_HANDLE}</span>
                </div>
              </a>

              <a
                href={TIKTOK_LINK}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 p-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white transition-colors"
              >
                <div className="w-4 h-4 flex items-center justify-center font-bold text-white text-xs">
                  TT
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block">TikTok</span>
                  <span className="font-mono font-semibold">@{TIKTOK_HANDLE}</span>
                </div>
              </a>

              <a
                href={`${WHATSAPP_LINK}?text=Сәлеметсіз бе!`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 p-2 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 transition-colors border border-emerald-800/40"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <div>
                  <span className="text-[10px] text-emerald-400 block">WhatsApp Желісі</span>
                  <span className="font-mono font-semibold">Тапсырыс қабылдау</span>
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <span>© 2026 Атырау Шұбат. Барлық құқықтар қорғалған.</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsCrmOpen(true)}
              className="text-stone-400 hover:text-amber-400 transition-colors cursor-pointer"
            >
              CRM жүйесі
            </button>
            <span>·</span>
            <span>Құлсары ➔ Атырау</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
