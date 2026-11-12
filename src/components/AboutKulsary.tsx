import React from 'react';
import { Award, ShieldCheck, Heart, Droplets, Sun, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { KazakhOrnament } from './KazakhOrnament';
import { SUPPLY_ORIGIN } from '../data/initialData';

export const AboutKulsary: React.FC = () => {
  const { language } = useApp();

  return (
    <section id="kulsary" className="py-16 sm:py-20 bg-[#F4EFE6] border-y border-amber-900/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Image with Nomad Steppe Camels */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white/80 group">
              <img
                src="/src/assets/images/craft_kulsary_camels_1794479576391.jpg"
                alt="Верблюдица с верблюжонком на рассвете в степях Кульсары"
                className="w-full h-80 sm:h-96 lg:h-[450px] object-cover transition-transform duration-700 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-stone-900/20 to-transparent pointer-events-none" />

              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-xs uppercase tracking-widest text-amber-300 font-bold block mb-1">
                  {SUPPLY_ORIGIN}
                </span>
                <p className="font-display text-xl font-bold">
                  {language === 'kk' ? 'Еркін жайылған түйелер' : 'Вольный выпас верблюдов'}
                </p>
                <p className="text-xs text-stone-200 mt-1">
                  {language === 'kk'
                    ? 'Құлсарының жусанды, құнарлы дала шөптерімен қоректенгендіктен сүті ерекше майлы әрі тәтті.'
                    : 'Степное разнотравье и полынь придают молоку и шубату неповторимый насыщенный вкус.'}
                </p>
              </div>
            </div>

            {/* Floating Authenticity Badge */}
            <div className="absolute -bottom-5 -right-3 sm:right-6 bg-amber-900 text-white p-4 rounded-xl shadow-lg border border-amber-700 flex items-center gap-3">
              <KazakhOrnament size={28} color="#FEF3C7" />
              <div>
                <p className="font-display font-bold text-sm">100% Табиғи құрам</p>
                <p className="text-[11px] text-amber-200">Су қосылмаған, таза сауын</p>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Pillars */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 mb-2">
              <KazakhOrnament size={16} color="#92400E" />
              <span className="text-xs font-bold tracking-wider uppercase text-amber-800">
                {language === 'kk' ? 'Дәстүр мен Денсаулық' : 'Традиции и здоровье'}
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
              {language === 'kk'
                ? 'Неліктен Құлсарының шұбаты ерекше бағаланады?'
                : 'Почему именно кульсаринский шубат так любят в Атырау?'}
            </h2>

            <p className="mt-4 text-stone-700 text-sm sm:text-base leading-relaxed">
              {language === 'kk'
                ? 'Құлсары даласының климаты мен топырағы ерекше. Түйелер жабайы емдік шөптермен, жусанмен, изенмен қоректенеді. Соның арқасында сауылған сүт пен ашытылған шұбаттың көбігі қалың, құрамы минералдарға бай әрі басқа ешбір аймақтың өніміне ұқсамайтын дәмге ие болады.'
                : 'Степи Кульсары богаты целебными степными травами, полынью и солончаковой флорой. Верблюды пасутся в естественных природных условиях. Шубат получается густым, с шелковистой натуральной пеной и непревзойденным ароматом, знакомым с детства каждому жителю Атырау.'}
            </p>

            {/* 3 Pillars */}
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/80 border border-stone-200">
                <div className="p-2 rounded-lg bg-amber-100 text-amber-800 shrink-0 mt-0.5">
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-stone-900 text-sm">
                    {language === 'kk' ? 'Күн сайынғы балғын тасымал' : 'Ежедневный свежий привоз'}
                  </h4>
                  <p className="text-xs text-stone-600 mt-0.5">
                    {language === 'kk'
                      ? 'Таңғы сауыннан кейін арнайы салқындатылған ыдыстармен Атыраудағы Сарайшық базарына тікелей жеткізіледі.'
                      : 'После утренней дойки продукция бережно охлаждается и сразу доставляется в Атырау.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/80 border border-stone-200">
                <div className="p-2 rounded-lg bg-amber-100 text-amber-800 shrink-0 mt-0.5">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-stone-900 text-sm">
                    {language === 'kk' ? 'Шипалы құрамы мен дәрумендері' : 'Природный источник здоровья'}
                  </h4>
                  <p className="text-xs text-stone-600 mt-0.5">
                    {language === 'kk'
                      ? 'Құрамында иммунитетті нығайтатын иммуноглобулиндер, темір, мырыш және пайдалы тірі сүт қышқылы бактериялары бар.'
                      : 'Шубат богат витаминами C и B, природными пробиотиками, нормализует сахар и очищает организм.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/80 border border-stone-200">
                <div className="p-2 rounded-lg bg-amber-100 text-amber-800 shrink-0 mt-0.5">
                  <Droplets className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-stone-900 text-sm">
                    {language === 'kk' ? '100% Таза өнім, химиясыз' : 'Чистый продукт без добавок'}
                  </h4>
                  <p className="text-xs text-stone-600 mt-0.5">
                    {language === 'kk'
                      ? 'Ешқандай су, консервант немесе дәм күшейткіштер қосылмайды. Тек табиғи түйе сүті мен ашытқы.'
                      : 'Без добавления воды, стабилизаторов или порошков. Только цельное верблюжье молоко и закваска.'}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
