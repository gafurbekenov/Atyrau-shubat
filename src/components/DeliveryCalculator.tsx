import React, { useState } from 'react';
import { MapPin, Truck, Store, Clock, Navigation, CheckCircle2, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DELIVERY_ZONES, MARKET_ADDRESS_KK, MARKET_ADDRESS, CONTACT_PHONE } from '../data/initialData';
import { KazakhOrnament } from './KazakhOrnament';

export const DeliveryCalculator: React.FC = () => {
  const { language, setIsTrackingOpen, orders, setActiveOrderForTracking } = useApp();

  const [selectedMode, setSelectedMode] = useState<'delivery' | 'pickup'>('delivery');
  const [selectedZoneId, setSelectedZoneId] = useState<string>('center');
  const [customAddress, setCustomAddress] = useState<string>('мкр. Авангард 2, дом 18');

  const currentZone = DELIVERY_ZONES.find((z) => z.id === selectedZoneId) || DELIVERY_ZONES[0];

  const handleTrackRecentOrder = () => {
    if (orders.length > 0) {
      setActiveOrderForTracking(orders[0]);
      setIsTrackingOpen(true);
    } else {
      setIsTrackingOpen(true);
    }
  };

  return (
    <section id="delivery" className="py-16 sm:py-20 bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <KazakhOrnament size={24} color="#92400E" className="mx-auto mb-2" />
          <div className="flex items-center justify-center gap-2 text-xs font-bold tracking-wider uppercase text-amber-800">
            <span>{language === 'kk' ? 'Ыңғайлы алу жолдары' : 'Способы получения'}</span>
            <span>·</span>
            <span>{language === 'kk' ? 'Атырау қаласы' : 'Город Атырау'}</span>
          </div>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            {language === 'kk'
              ? 'Жеткізу картасы және Сарайшық базары'
              : 'Интерактивная карта доставки и Рынок Сарайшык'}
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            {language === 'kk'
              ? 'Өзіңіз келіп Сарайшық базарынан (Мәденов 1 а/1) тегін алып кетіңіз немесе үйіңізге дейін термо-сөмкемен салқын күйінде жеткізіп береміз (500 ₸ бастап).'
              : 'Забирайте бесплатно на рынке Сарайшык (ул. Маденов 1 а/1) или закажите доставку на дом в термосумках с сохранением идеальной температуры (от 500 ₸).'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Mode Switcher & Zone Calculator */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
            
            {/* Delivery Mode Tabs */}
            <div className="flex p-1 bg-stone-100 rounded-xl mb-6">
              <button
                type="button"
                onClick={() => setSelectedMode('delivery')}
                className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  selectedMode === 'delivery'
                    ? 'bg-amber-800 text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                <Truck className="w-4 h-4" />
                <span>{language === 'kk' ? 'Үйге жеткізу' : 'Доставка на дом'}</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMode('pickup')}
                className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  selectedMode === 'pickup'
                    ? 'bg-amber-800 text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                <Store className="w-4 h-4" />
                <span>{language === 'kk' ? 'Сарайшықтан алып кету' : 'Самовывоз (Сарайшык)'}</span>
              </button>
            </div>

            {selectedMode === 'delivery' ? (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block mb-2">
                    {language === 'kk' ? 'Атырау ауданын таңдаңыз:' : 'Выберите район г. Атырау:'}
                  </label>
                  
                  <div className="space-y-2">
                    {DELIVERY_ZONES.map((zone) => {
                      const isSelected = selectedZoneId === zone.id;
                      return (
                        <div
                          key={zone.id}
                          onClick={() => setSelectedZoneId(zone.id)}
                          className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                            isSelected
                              ? 'border-amber-800 bg-amber-50/60 shadow-xs'
                              : 'border-stone-200 hover:border-stone-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-xs sm:text-sm text-stone-900">
                              {language === 'kk' ? zone.nameKk : zone.nameRu}
                            </span>
                            <span className="font-mono font-bold text-amber-900 tabular-nums text-sm">
                              {zone.price} ₸
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[11px] text-stone-500 mt-1">
                            <span>Уақыты: ~{zone.estimatedTime}</span>
                            <span>{zone.districts.slice(0, 3).join(', ')}...</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100 bg-stone-50 p-4 rounded-xl">
                  <div className="flex items-center justify-between text-xs text-stone-700 mb-1">
                    <span>{language === 'kk' ? 'Таңдалған аймақ:' : 'Выбранная зона:'}</span>
                    <span className="font-bold text-stone-900">
                      {language === 'kk' ? currentZone.nameKk : currentZone.nameRu}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-stone-700 mb-1">
                    <span>{language === 'kk' ? 'Жеткізу құны:' : 'Стоимость доставки:'}</span>
                    <span className="font-mono font-bold text-amber-800 text-sm tabular-nums">
                      {currentZone.price} ₸
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-stone-700">
                    <span>{language === 'kk' ? 'Болжамды уақыт:' : 'Ориентировочное время:'}</span>
                    <span className="text-stone-900 font-medium">{currentZone.estimatedTime}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleTrackRecentOrder}
                  className="w-full py-3 px-4 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-800 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Navigation className="w-4 h-4 text-amber-800" />
                  <span>{language === 'kk' ? 'Тапсырыс күйін қадағалау' : 'Отследить текущий заказ'}</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
                  <div className="flex items-start gap-3">
                    <Store className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm">
                        {language === 'kk' ? 'Сарайшық базары (Тегін)' : 'Рынок Сарайшык (Бесплатно)'}
                      </h4>
                      <p className="text-xs text-stone-700 mt-1">
                        {language === 'kk' ? MARKET_ADDRESS_KK : MARKET_ADDRESS}
                      </p>
                      <p className="text-xs text-amber-900 font-semibold mt-1">
                        Жұмыс уақыты: Күн сайын 08:00 – 20:00
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-stone-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Өнім әрқашан салқындатқышта дайын тұрады</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Дәмін татып көруге (дегустация) мүмкіндік бар</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Kaspi QR немесе қолма-қол төлем</span>
                  </div>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600">
                  <p className="font-semibold text-stone-800 mb-1">
                    {language === 'kk' ? 'Келмес бұрын қоңырау шалыңыз:' : 'Звоните перед приездом:'}
                  </p>
                  <a
                    href={`tel:${CONTACT_PHONE}`}
                    className="text-amber-800 font-bold font-mono text-sm hover:underline"
                  >
                    +7 (702) 162-29-75
                  </a>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Сізге керекті көлемді алдын ала дайындап қоямыз.
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Interactive Map of Atyrau with Pins, River, and Market Marker */}
          <div id="market" className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-800" />
                <span className="font-display font-bold text-stone-900 text-sm sm:text-base">
                  {language === 'kk' ? 'Атырау қаласының картасы' : 'Схема г. Атырау'}
                </span>
              </div>
              <span className="text-xs text-stone-500 font-mono">
                {selectedMode === 'pickup' ? 'Сарайшық базары' : `Зона: ${currentZone.price} ₸`}
              </span>
            </div>

            {/* Custom Interactive Stylized Vector Map of Atyrau */}
            <div className="relative w-full h-80 sm:h-96 rounded-xl overflow-hidden bg-[#EAE5DC] border border-stone-300">
              
              {/* Ural (Жайық) River Path curving through Atyrau */}
              <svg
                viewBox="0 0 600 400"
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background Land */}
                <rect width="600" height="400" fill="#F4EFE6" />

                {/* Suburb Zones boundaries */}
                <circle cx="300" cy="200" r="180" fill="#E8DEC8" fillOpacity="0.3" stroke="#D1C3A5" strokeDasharray="4 4" />
                <circle cx="300" cy="200" r="110" fill="#DFD2B7" fillOpacity="0.4" stroke="#C4B493" strokeDasharray="4 4" />
                <circle cx="300" cy="200" r="60" fill="#D7C5A3" fillOpacity="0.4" stroke="#B8A47E" strokeDasharray="4 4" />

                {/* Ural River S-curve */}
                <path
                  d="M 330 0 C 310 80, 260 120, 280 180 C 300 240, 360 270, 340 330 C 320 370, 310 400, 310 400"
                  fill="none"
                  stroke="#99C2DD"
                  strokeWidth="24"
                  strokeLinecap="round"
                />
                <path
                  d="M 330 0 C 310 80, 260 120, 280 180 C 300 240, 360 270, 340 330 C 320 370, 310 400, 310 400"
                  fill="none"
                  stroke="#B5D6EB"
                  strokeWidth="12"
                  strokeLinecap="round"
                />

                {/* Bridges over Ural River */}
                <line x1="260" y1="160" x2="300" y2="160" stroke="#78716C" strokeWidth="4" />
                <line x1="285" y1="230" x2="335" y2="230" stroke="#78716C" strokeWidth="4" />

                {/* Road network grid lines */}
                <line x1="80" y1="200" x2="520" y2="200" stroke="#E2D7C5" strokeWidth="2.5" />
                <line x1="300" y1="50" x2="300" y2="350" stroke="#E2D7C5" strokeWidth="2.5" />
                <line x1="160" y1="100" x2="440" y2="300" stroke="#E2D7C5" strokeWidth="1.5" strokeDasharray="6 4" />

                {/* District Labels */}
                <text x="210" y="145" fontSize="11" fill="#78716C" fontWeight="bold">Авангард</text>
                <text x="240" y="210" fontSize="11" fill="#78716C" fontWeight="bold">Орталық</text>
                <text x="370" y="160" fontSize="11" fill="#78716C" fontWeight="bold">Нұрсая</text>
                <text x="360" y="250" fontSize="11" fill="#78716C" fontWeight="bold">Самал</text>
                <text x="270" y="320" fontSize="11" fill="#78716C" fontWeight="bold">Балықшы</text>
                <text x="440" y="120" fontSize="10" fill="#A8A29E">Томарлы</text>
                <text x="140" y="280" fontSize="10" fill="#A8A29E">Жұмыскер</text>

                {/* Ural River Label */}
                <text x="340" y="70" fontSize="10" fill="#60A5FA" fontStyle="italic" fontWeight="600">
                  Жайық өзені (Урал)
                </text>

                {/* Delivery Zone Highlight based on active selection */}
                {selectedZoneId === 'center' && (
                  <circle cx="270" cy="180" r="50" fill="#92400E" fillOpacity="0.15" stroke="#92400E" strokeWidth="2" />
                )}
                {selectedZoneId === 'nursaya' && (
                  <circle cx="380" cy="180" r="60" fill="#92400E" fillOpacity="0.15" stroke="#92400E" strokeWidth="2" />
                )}
                {selectedZoneId === 'suburbs' && (
                  <circle cx="160" cy="270" r="55" fill="#92400E" fillOpacity="0.15" stroke="#92400E" strokeWidth="2" />
                )}
                {selectedZoneId === 'far' && (
                  <circle cx="460" cy="110" r="50" fill="#92400E" fillOpacity="0.15" stroke="#92400E" strokeWidth="2" />
                )}

                {/* Primary Hub: Market Sarayshyq Pin */}
                <g transform="translate(250, 175)">
                  {/* Glowing pulse ring */}
                  <circle cx="0" cy="0" r="16" fill="#D97706" fillOpacity="0.3" />
                  <circle cx="0" cy="0" r="8" fill="#B45309" stroke="#FFFFFF" strokeWidth="2" />
                </g>

                {/* Delivery destination Pin if in delivery mode */}
                {selectedMode === 'delivery' && (
                  <g
                    transform={
                      selectedZoneId === 'center'
                        ? 'translate(220, 150)'
                        : selectedZoneId === 'nursaya'
                        ? 'translate(390, 160)'
                        : selectedZoneId === 'suburbs'
                        ? 'translate(170, 260)'
                        : 'translate(450, 120)'
                    }
                  >
                    <path
                      d="M 0 0 C -6 -12 -12 -18 0 -30 C 12 -18 6 -12 0 0"
                      fill="#1E293B"
                    />
                    <circle cx="0" cy="-20" r="4" fill="#FFFFFF" />
                  </g>
                )}
              </svg>

              {/* Overlay Marker Card: Market Saraishyk */}
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md rounded-xl p-3 border border-stone-200 shadow-md max-w-xs text-xs">
                <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-0.5">
                  <Store className="w-3.5 h-3.5 text-amber-700" />
                  <span>Сарайшық базары (Мәденов 1 а/1)</span>
                </div>
                <p className="text-[11px] text-stone-600">
                  Құлсарының шубаты мен түйе сүті осында сатылады.
                </p>
                <div className="mt-1 flex items-center justify-between text-[10px] text-stone-500 pt-1 border-t border-stone-100">
                  <span>08:00 - 20:00 күн сайын</span>
                  <span className="font-mono font-bold text-amber-950">+7 702 162 29 75</span>
                </div>
              </div>

              {/* Bottom Legend */}
              <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md rounded-lg p-2 border border-stone-200 shadow-xs text-[10px] text-stone-700 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-700 inline-block" />
                  <span>Сарайшық базары (нүкте)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-stone-900 inline-block" />
                  <span>Жеткізу нүктесі</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-600">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-800" />
                <span>Жеткізу уақыты: 30-60 минут ішінде термо-сөмкемен</span>
              </span>
              <span className="font-semibold text-amber-900">
                15 000 ₸ жоғары тапсырысқа жеткізу ТЕГІН!
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
