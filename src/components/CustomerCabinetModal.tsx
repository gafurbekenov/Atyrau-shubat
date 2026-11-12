import React, { useState } from 'react';
import { X, User, Award, Clock, Package, Navigation, Bell, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { KazakhOrnament } from './KazakhOrnament';
import { Order } from '../types';

export const CustomerCabinetModal: React.FC = () => {
  const {
    language,
    isCabinetOpen,
    setIsCabinetOpen,
    currentUser,
    orders,
    setActiveOrderForTracking,
    setIsTrackingOpen,
    sendNotification,
    addToCart
  } = useApp();

  const [pushEnabled, setPushEnabled] = useState(true);

  if (!isCabinetOpen) return null;

  const handleTrack = (order: Order) => {
    setActiveOrderForTracking(order);
    setIsCabinetOpen(false);
    setIsTrackingOpen(true);
  };

  const handleReorder = (order: Order) => {
    order.items.forEach((item) => {
      addToCart({
        productId: item.productId,
        productName: item.productName,
        volume: item.volume,
        liters: item.liters,
        price: item.price,
        image: item.image
      }, item.quantity);
    });
    setIsCabinetOpen(false);
  };

  const togglePush = () => {
    const next = !pushEnabled;
    setPushEnabled(next);
    if (next) {
      sendNotification(
        'Push-хабарламалар қосылды 🔔',
        'Енді сіз тапсырыс күйі мен Құлсарыдан келген жаңа партиялар туралы бірден біліп отырасыз!',
        'promo'
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setIsCabinetOpen(false)}
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
      />

      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-8">
          
          {/* Header */}
          <div className="p-5 sm:p-6 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-950 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-700/50 border border-amber-500/30 flex items-center justify-center font-bold text-lg font-serif">
                {currentUser.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-xl font-bold">{currentUser.name}</h3>
                  <span className="px-2 py-0.5 rounded-full bg-amber-600/60 text-[10px] text-amber-200 font-bold border border-amber-400/30">
                    {currentUser.tier}
                  </span>
                </div>
                <p className="text-xs text-amber-200 font-mono mt-0.5">{currentUser.phone}</p>
              </div>
            </div>

            <button
              onClick={() => setIsCabinetOpen(false)}
              className="p-1.5 rounded-lg text-amber-200 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto bg-[#FAF7F2]">
            
            {/* Loyalty Card Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-800 to-stone-900 text-white shadow-md relative overflow-hidden">
              <KazakhOrnament
                size={80}
                color="#FBBF24"
                className="absolute -right-4 -bottom-4 opacity-15 pointer-events-none"
              />
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-xs uppercase tracking-widest text-amber-300 font-bold">
                    {language === 'kk' ? 'Адалдық жүйесі' : 'Программа лояльности'}
                  </span>
                </div>
                <span className="text-xs text-stone-300">Кэшбэк: 5%</span>
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <span className="text-xs text-stone-300 block">
                    {language === 'kk' ? 'Жинақталған бонустар:' : 'Накопленные бонусы:'}
                  </span>
                  <div className="font-display text-3xl font-black text-amber-300 font-mono tabular-nums">
                    {currentUser.loyaltyPoints}{' '}
                    <span className="text-lg font-normal text-white">₸</span>
                  </div>
                </div>

                <div className="text-right text-xs text-stone-300">
                  <p>1 бонус = 1 теңге</p>
                  <p className="text-[10px] text-amber-400 mt-0.5">Келесі тапсырыста шегеріледі</p>
                </div>
              </div>
            </div>

            {/* Push Notifications Settings */}
            <div className="p-4 bg-white rounded-xl border border-stone-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-100 text-amber-800">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-900">
                    {language === 'kk' ? 'Push-уведомлениелер' : 'Push-уведомления'}
                  </p>
                  <p className="text-[11px] text-stone-500">
                    Тапсырыс күйі және Құлсарыдан жаңа привоз хабарлары
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={togglePush}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  pushEnabled
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-stone-200 text-stone-700'
                }`}
              >
                {pushEnabled ? 'Қосулы (Вкл)' : 'Өшірулі (Выкл)'}
              </button>
            </div>

            {/* Orders History */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-display font-bold text-stone-900 text-base">
                  {language === 'kk' ? 'Тапсырыстар тарихы' : 'История покупок'}
                </h4>
                <span className="text-xs text-stone-500">{orders.length} тапсырыс</span>
              </div>

              {orders.length === 0 ? (
                <div className="p-8 text-center bg-white rounded-xl border border-stone-200">
                  <Package className="w-8 h-8 text-stone-400 mx-auto mb-2" />
                  <p className="text-xs text-stone-600">Әзірге жасалған тапсырыстар жоқ</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((order) => {
                    const statusConfig = {
                      new: { label: 'Жаңа өтініш', color: 'bg-blue-100 text-blue-800 border-blue-200' },
                      confirmed: { label: 'Дайындалуда', color: 'bg-amber-100 text-amber-800 border-amber-200' },
                      in_transit: { label: 'Курьер жолда 🚚', color: 'bg-purple-100 text-purple-800 border-purple-200' },
                      delivered: { label: 'Жеткізілді ✅', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
                      cancelled: { label: 'Тоқтатылды', color: 'bg-red-100 text-red-800 border-red-200' }
                    }[order.status];

                    return (
                      <div
                        key={order.id}
                        className="p-4 bg-white rounded-xl border border-stone-200 shadow-xs space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-stone-900 font-mono">
                              {order.orderNumber}
                            </span>
                            <span className="text-[11px] text-stone-400">· {order.createdAt}</span>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded-md text-[11px] font-bold border ${statusConfig.color}`}
                          >
                            {statusConfig.label}
                          </span>
                        </div>

                        {/* Items in order */}
                        <div className="text-xs text-stone-600 space-y-1 bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                          {order.items.map((i, idx) => (
                            <div key={idx} className="flex justify-between">
                              <span>
                                {i.productName} ({i.volume} л) x {i.quantity}
                              </span>
                              <span className="font-mono tabular-nums font-semibold">
                                {i.price * i.quantity} ₸
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Order Footer with Total & Actions */}
                        <div className="flex items-center justify-between pt-1 text-xs">
                          <div>
                            <span className="text-stone-500">Барлығы: </span>
                            <span className="font-bold text-stone-900 font-mono tabular-nums">
                              {order.total.toLocaleString()} ₸
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleTrack(order)}
                              className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <Navigation className="w-3.5 h-3.5 text-amber-800" />
                              <span>Қадағалау</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleReorder(order)}
                              className="px-3 py-1.5 rounded-lg bg-amber-800 hover:bg-amber-900 text-white font-semibold text-xs transition-colors cursor-pointer"
                            >
                              Қайталау
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>

          <div className="p-4 bg-white border-t border-stone-200 flex justify-end">
            <button
              onClick={() => setIsCabinetOpen(false)}
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
