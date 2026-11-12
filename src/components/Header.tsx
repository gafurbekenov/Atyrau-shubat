import React, { useState } from 'react';
import { ShoppingBag, User, Phone, Bell, ShieldCheck, BarChart3, Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CONTACT_PHONE_FORMATTED, CONTACT_PHONE } from '../data/initialData';

export const Header: React.FC = () => {
  const {
    language,
    setLanguage,
    cartTotalCount,
    setIsCartOpen,
    setIsCabinetOpen,
    setIsCrmOpen,
    setIsCallbackOpen,
    unreadNotificationsCount,
    notifications,
    markNotificationsAsRead
  } = useApp();

  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);

  return (
    <>
      {/* Top Announcement & Direct Contacts Bar */}
      <div className="bg-stone-900 text-stone-300 text-xs py-2 px-4 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-amber-500 font-semibold tracking-wide">
              {language === 'kk' ? '✦ БАЛҒЫН ПАРТИЯ:' : '✦ СВЕЖИЙ ПРИВОЗ:'}
            </span>
            <span className="text-stone-300">
              {language === 'kk'
                ? 'Құлсарыдан таңғы сауылған шұбат Сарайшық базарында (Мәденов 1 а/1)'
                : 'Шубат утреннего надоя из Кульсары на рынке Сарайшык (Маденов 1 а/1)'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs shrink-0">
            <button
              onClick={() => setIsCallbackOpen(true)}
              className="text-amber-400 hover:text-amber-300 underline underline-offset-2 transition-colors cursor-pointer"
            >
              {language === 'kk' ? 'Кері байланыс сұрау' : 'Заказать звонок'}
            </button>
            <span className="text-stone-600 hidden sm:inline">|</span>
            <a
              href={`tel:${CONTACT_PHONE}`}
              className="flex items-center gap-1.5 text-stone-200 hover:text-white font-medium transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span>{CONTACT_PHONE_FORMATTED}</span>
            </a>
            <span className="text-stone-600 hidden sm:inline">|</span>
            <button
              onClick={() => setIsCrmOpen(true)}
              className="flex items-center gap-1 text-stone-400 hover:text-amber-400 transition-colors cursor-pointer"
              title={language === 'kk' ? 'CRM және Аналитика' : 'CRM и Аналитика'}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">CRM</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Bar adhering strictly to Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-amber-900/10 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 px-4 sm:px-6 lg:px-8 py-3.5">
          {/* Zone 1: Single text wordmark in display face */}
          <a href="#" className="flex items-center gap-2.5 text-stone-900 group shrink-0">
            <div className="w-9 h-9 rounded-full bg-amber-700/10 border border-amber-700/30 flex items-center justify-center text-amber-800 font-bold group-hover:bg-amber-700/20 transition-colors">
              <span className="font-serif text-lg">Ш</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl font-bold tracking-tight text-amber-950 group-hover:text-amber-800 transition-colors whitespace-nowrap">
                Атырау Шұбат
              </span>
              <span className="text-[10px] tracking-wider uppercase text-amber-800/80 font-medium -mt-1 hidden sm:block">
                {language === 'kk' ? 'Құлсарыдан тікелей' : 'Прямиком из Кульсары'}
              </span>
            </div>
          </a>

          {/* Zone 2: 4-5 concise single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-stone-700">
            <a
              href="#products"
              className="hover:text-amber-800 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4"
            >
              {language === 'kk' ? 'Өнімдер мен бағалар' : 'Продукция и цены'}
            </a>
            <a
              href="#kulsary"
              className="hover:text-amber-800 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4"
            >
              {language === 'kk' ? 'Құлсары шұбаты' : 'О Кульсары'}
            </a>
            <a
              href="#delivery"
              className="hover:text-amber-800 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4"
            >
              {language === 'kk' ? 'Жеткізу картасы' : 'Карта доставки'}
            </a>
            <a
              href="#market"
              className="hover:text-amber-800 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4"
            >
              {language === 'kk' ? 'Сарайшық базары' : 'Рынок Сарайшык'}
            </a>
            <a
              href="#reviews"
              className="hover:text-amber-800 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4"
            >
              {language === 'kk' ? 'Пікірлер' : 'Отзывы'}
            </a>
          </nav>

          {/* Zone 3: Primary action cluster (Language, Notifications, Cabinet, Cart) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Language Switcher */}
            <div className="flex items-center bg-stone-200/70 p-0.5 rounded-lg border border-stone-300/60 text-xs font-semibold">
              <button
                onClick={() => setLanguage('kk')}
                className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
                  language === 'kk'
                    ? 'bg-amber-800 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="Қазақ тілі"
              >
                ҚАЗ
              </button>
              <button
                onClick={() => setLanguage('ru')}
                className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
                  language === 'ru'
                    ? 'bg-amber-800 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="Русский язык"
              >
                РУС
              </button>
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotificationsDropdown(!showNotificationsDropdown);
                  markNotificationsAsRead();
                }}
                className="p-2 rounded-lg text-stone-700 hover:text-amber-800 hover:bg-stone-200/50 transition-colors relative cursor-pointer"
                title={language === 'kk' ? 'Хабарламалар' : 'Уведомления'}
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-600 ring-2 ring-[#FAF7F2]" />
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotificationsDropdown && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-stone-200 p-3 z-50">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-100 text-xs font-semibold text-stone-800">
                    <span>{language === 'kk' ? 'Хабарламалар' : 'Уведомления'}</span>
                    <button
                      onClick={() => setShowNotificationsDropdown(false)}
                      className="text-stone-400 hover:text-stone-600"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className="text-xs p-2 rounded-lg bg-stone-50 border border-stone-100"
                      >
                        <p className="font-semibold text-stone-900">{n.title}</p>
                        <p className="text-stone-600 mt-0.5">{n.message}</p>
                        <span className="text-[10px] text-stone-400 mt-1 block">
                          {n.timestamp}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Customer Cabinet Button */}
            <button
              onClick={() => setIsCabinetOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200/80 rounded-lg border border-stone-200 transition-colors cursor-pointer"
              title={language === 'kk' ? 'Жеке кабинет және Бонустар' : 'Личный кабинет и Бонусы'}
            >
              <User className="w-4 h-4 text-amber-700" />
              <span className="hidden sm:inline">
                {language === 'kk' ? 'Кабинет' : 'Кабинет'}
              </span>
            </button>

            {/* Shopping Cart Primary CTA */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-amber-800 hover:bg-amber-900 active:scale-98 rounded-lg shadow-sm transition-all cursor-pointer shrink-0"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{language === 'kk' ? 'Себет' : 'Корзина'}</span>
              {cartTotalCount > 0 && (
                <span className="px-1.5 py-0.2 bg-amber-600 text-white rounded-md text-[11px] font-mono tabular-nums">
                  {cartTotalCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
