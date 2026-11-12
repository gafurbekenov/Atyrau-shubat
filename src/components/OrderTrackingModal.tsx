import React from 'react';
import { X, Navigation, CheckCircle2, Clock, Phone, MapPin, Truck, Store } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CONTACT_PHONE, CONTACT_PHONE_FORMATTED } from '../data/initialData';
import { KazakhOrnament } from './KazakhOrnament';

export const OrderTrackingModal: React.FC = () => {
  const {
    language,
    isTrackingOpen,
    setIsTrackingOpen,
    activeOrderForTracking,
    orders
  } = useApp();

  if (!isTrackingOpen) return null;

  const currentOrder = activeOrderForTracking || orders[0];

  const steps = [
    {
      id: 'step-1',
      title: language === 'kk' ? 'Тапсырыс қабылданды' : 'Заказ принят',
      desc: language === 'kk' ? 'Мәліметтер тексерілді' : 'Детали проверены',
      done: true
    },
    {
      id: 'step-2',
      title: language === 'kk' ? 'Салқындатылып дайындалуда' : 'Охлаждается и фасуется',
      desc: language === 'kk' ? 'Құлсары партиясынан құтыға құйылды' : 'Разливается из свежей партии',
      done: currentOrder?.status !== 'new'
    },
    {
      id: 'step-3',
      title: language === 'kk' ? 'Курьер жолда' : 'Курьер в пути',
      desc: language === 'kk' ? 'Термо-сөмкеде мекенжайға бара жатыр' : 'Едет по Атырау в термосумке',
      done: currentOrder?.status === 'in_transit' || currentOrder?.status === 'delivered'
    },
    {
      id: 'step-4',
      title: language === 'kk' ? 'Сәтті жеткізілді' : 'Доставлен покупателю',
      desc: language === 'kk' ? 'Ас болсын!' : 'Приятного аппетита!',
      done: currentOrder?.status === 'delivered'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setIsTrackingOpen(false)}
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
      />

      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-8">
          
          {/* Header */}
          <div className="p-5 bg-stone-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-amber-600/30 text-amber-400">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display text-base font-bold">
                  {language === 'kk' ? 'Тапсырысты қадағалау' : 'Отслеживание доставки'}
                </h3>
                <p className="text-xs text-stone-300 font-mono">
                  {currentOrder ? currentOrder.orderNumber : '№ 1024'} · {currentOrder?.createdAt}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsTrackingOpen(false)}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6 bg-[#FAF7F2]">
            
            {/* Live Map Preview Simulation */}
            <div className="relative w-full h-44 rounded-xl overflow-hidden bg-[#E7DEC8] border border-stone-300">
              <svg viewBox="0 0 500 200" className="w-full h-full">
                <rect width="500" height="200" fill="#F4EFE6" />
                {/* River */}
                <path
                  d="M 280 0 Q 230 70 260 140 T 240 200"
                  fill="none"
                  stroke="#99C2DD"
                  strokeWidth="20"
                />
                <line x1="80" y1="100" x2="420" y2="100" stroke="#E2D7C5" strokeWidth="2" />
                <line x1="200" y1="30" x2="350" y2="170" stroke="#E2D7C5" strokeWidth="2" strokeDasharray="4 4" />

                {/* Route Path from Market to Delivery Destination */}
                <path
                  d="M 190 85 L 250 85 L 290 120 L 360 120"
                  fill="none"
                  stroke="#D97706"
                  strokeWidth="4"
                  strokeDasharray="6 4"
                />

                {/* Market Pin */}
                <circle cx="190" cy="85" r="7" fill="#B45309" stroke="#FFF" strokeWidth="2" />
                <text x="140" y="70" fontSize="10" fill="#78350F" fontWeight="bold">Сарайшық базары</text>

                {/* Destination Pin */}
                <circle cx="360" cy="120" r="7" fill="#1E293B" stroke="#FFF" strokeWidth="2" />
                <text x="320" y="145" fontSize="10" fill="#1E293B" fontWeight="bold">Сіздің үйіңіз</text>

                {/* Courier Moving Pin */}
                <g transform="translate(275, 105)">
                  <circle cx="0" cy="0" r="10" fill="#10B981" fillOpacity="0.4" />
                  <circle cx="0" cy="0" r="6" fill="#059669" stroke="#FFF" strokeWidth="1.5" />
                </g>
              </svg>

              {/* Status Pill */}
              <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-md px-3 py-1 rounded-md text-[11px] font-bold text-stone-800 shadow-xs flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>
                  {currentOrder?.status === 'delivered'
                    ? 'Жеткізілді'
                    : 'Курьер жолда: ~15-20 минут қалды'}
                </span>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="space-y-4">
              {steps.map((step, idx) => (
                <div key={step.id} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        step.done
                          ? 'bg-emerald-600 text-white'
                          : 'bg-stone-200 text-stone-500'
                      }`}
                    >
                      {step.done ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>
                    {idx < steps.length - 1 && (
                      <div
                        className={`w-0.5 h-8 my-1 ${
                          step.done ? 'bg-emerald-600' : 'bg-stone-200'
                        }`}
                      />
                    )}
                  </div>

                  <div className="pt-0.5">
                    <p
                      className={`text-xs font-bold ${
                        step.done ? 'text-stone-900' : 'text-stone-400'
                      }`}
                    >
                      {step.title}
                    </p>
                    <p className="text-[11px] text-stone-500">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Delivery Details Card */}
            <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-2 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Мекенжай:</span>
                <span className="font-semibold text-stone-900 text-right max-w-xs">
                  {currentOrder?.deliveryAddress || 'Атырау қаласы'}
                </span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Алушы:</span>
                <span className="font-semibold text-stone-900">
                  {currentOrder?.customerName || 'Тұтынушы'} ({currentOrder?.customerPhone})
                </span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Төлем сомасы:</span>
                <span className="font-mono font-bold text-amber-900 tabular-nums">
                  {currentOrder ? currentOrder.total.toLocaleString() : '7 720'} ₸
                </span>
              </div>
            </div>

            {/* Direct Contact Button */}
            <div className="flex gap-2">
              <a
                href={`tel:${CONTACT_PHONE}`}
                className="flex-1 py-2.5 px-4 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{CONTACT_PHONE_FORMATTED} қоңырау шалу</span>
              </a>
            </div>

          </div>

          <div className="p-4 bg-white border-t border-stone-200 flex justify-end">
            <button
              onClick={() => setIsTrackingOpen(false)}
              className="px-5 py-2 rounded-xl bg-stone-900 text-white text-xs font-bold"
            >
              Жабу
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
