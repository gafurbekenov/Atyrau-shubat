import React, { useState } from 'react';
import { X, QrCode, CreditCard, CheckCircle2, ShieldCheck, ArrowRight, Lock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CONTACT_PHONE_FORMATTED } from '../data/initialData';

export const PaymentModal: React.FC = () => {
  const {
    language,
    pendingPaymentOrder,
    setPendingPaymentOrder,
    updateOrderStatus,
    setActiveOrderForTracking,
    setIsTrackingOpen,
    sendNotification
  } = useApp();

  const [paymentType, setPaymentType] = useState<'kaspi' | 'card'>('kaspi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Card fields
  const [cardNumber, setCardNumber] = useState('4400 1234 5678 9012');
  const [expiry, setExpiry] = useState('12/28');
  const [cvc, setCvc] = useState('890');
  const [holder, setHolder] = useState('YERKIN NURGALIYEV');

  if (!pendingPaymentOrder) return null;

  const handleConfirmPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      pendingPaymentOrder.paymentStatus = 'paid';
      updateOrderStatus(pendingPaymentOrder.id, 'confirmed');

      sendNotification(
        'Төлем сәтті расталды! 💳',
        `${pendingPaymentOrder.total.toLocaleString()} ₸ сомасы қабылданды. Тапсырыс дайындалуда.`,
        'order'
      );
    }, 1200);
  };

  const handleFinish = () => {
    const order = pendingPaymentOrder;
    setPendingPaymentOrder(null);
    setIsSuccess(false);
    setActiveOrderForTracking(order);
    setIsTrackingOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => !isProcessing && setPendingPaymentOrder(null)}
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
      />

      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-8">
          
          {/* Header */}
          <div className="p-5 bg-stone-900 text-white flex items-center justify-between">
            <div>
              <h3 className="font-display text-base font-bold">
                {language === 'kk' ? 'Тапсырысты төлеу' : 'Оплата заказа'}
              </h3>
              <p className="text-xs text-stone-300 font-mono">
                {pendingPaymentOrder.orderNumber} · {pendingPaymentOrder.total.toLocaleString()} ₸
              </p>
            </div>

            <button
              onClick={() => setPendingPaymentOrder(null)}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6 bg-[#FAF7F2]">
            {isSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <h4 className="font-display text-xl font-bold text-stone-900">
                    {language === 'kk' ? 'Төлем сәтті өтті!' : 'Оплата успешно завершена!'}
                  </h4>
                  <p className="text-xs text-stone-600 mt-1">
                    {language === 'kk'
                      ? 'Рақмет! Сіздің тапсырысыңыз дайындалуға жіберілді.'
                      : 'Спасибо! Ваш заказ принят в работу и готовится к выдаче/доставке.'}
                  </p>
                </div>

                <div className="p-4 bg-white rounded-xl border border-stone-200 text-xs text-stone-700 text-left space-y-1">
                  <div className="flex justify-between">
                    <span>Тапсырыс нөмірі:</span>
                    <span className="font-bold">{pendingPaymentOrder.orderNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Төленген сома:</span>
                    <span className="font-mono font-bold text-emerald-800">
                      {pendingPaymentOrder.total.toLocaleString()} ₸
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Төлем тәсілі:</span>
                    <span>{paymentType === 'kaspi' ? 'Kaspi QR' : 'Банк картасы'}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleFinish}
                  className="w-full py-3 px-4 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold transition-all shadow-sm"
                >
                  {language === 'kk' ? 'Тапсырысты бақылау ➔' : 'Отследить статус заказа ➔'}
                </button>
              </div>
            ) : (
              <>
                {/* Method selector tabs */}
                <div className="flex p-1 bg-stone-100 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setPaymentType('kaspi')}
                    className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      paymentType === 'kaspi'
                        ? 'bg-red-600 text-white shadow-xs'
                        : 'text-stone-700 hover:text-stone-900'
                    }`}
                  >
                    <QrCode className="w-4 h-4" />
                    <span>Kaspi QR / Pay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentType('card')}
                    className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      paymentType === 'card'
                        ? 'bg-amber-800 text-white shadow-xs'
                        : 'text-stone-700 hover:text-stone-900'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Банк картасы</span>
                  </button>
                </div>

                {paymentType === 'kaspi' ? (
                  <div className="space-y-4 text-center">
                    <div className="p-5 bg-white rounded-2xl border-2 border-red-200 inline-block shadow-sm">
                      {/* Stylized SVG Kaspi QR Code */}
                      <svg
                        width="160"
                        height="160"
                        viewBox="0 0 100 100"
                        className="mx-auto"
                        fill="currentColor"
                      >
                        {/* 3 Corner squares */}
                        <rect x="5" y="5" width="26" height="26" rx="4" fill="#F14635" />
                        <rect x="9" y="9" width="18" height="18" rx="2" fill="#FFF" />
                        <rect x="13" y="13" width="10" height="10" rx="1" fill="#F14635" />

                        <rect x="69" y="5" width="26" height="26" rx="4" fill="#F14635" />
                        <rect x="73" y="9" width="18" height="18" rx="2" fill="#FFF" />
                        <rect x="77" y="13" width="10" height="10" rx="1" fill="#F14635" />

                        <rect x="5" y="69" width="26" height="26" rx="4" fill="#F14635" />
                        <rect x="9" y="73" width="18" height="18" rx="2" fill="#FFF" />
                        <rect x="13" y="77" width="10" height="10" rx="1" fill="#F14635" />

                        {/* Data dots */}
                        <rect x="36" y="8" width="6" height="6" fill="#1C1917" />
                        <rect x="46" y="16" width="8" height="6" fill="#1C1917" />
                        <rect x="56" y="8" width="6" height="6" fill="#1C1917" />
                        <rect x="36" y="24" width="8" height="8" fill="#1C1917" />
                        
                        <rect x="12" y="38" width="6" height="8" fill="#1C1917" />
                        <rect x="22" y="44" width="8" height="6" fill="#1C1917" />
                        <rect x="36" y="38" width="28" height="28" rx="3" fill="#F14635" />
                        <text x="50" y="57" fontSize="11" fill="#FFF" fontWeight="bold" textAnchor="middle">
                          KASPI
                        </text>
                        <rect x="70" y="38" width="10" height="6" fill="#1C1917" />
                        <rect x="84" y="46" width="6" height="10" fill="#1C1917" />

                        <rect x="36" y="72" width="6" height="8" fill="#1C1917" />
                        <rect x="48" y="76" width="10" height="6" fill="#1C1917" />
                        <rect x="64" y="70" width="8" height="8" fill="#1C1917" />
                        <rect x="78" y="78" width="12" height="12" fill="#1C1917" />
                      </svg>

                      <p className="text-xs font-bold text-red-600 mt-2">
                        Kaspi қосымшасымен сканерлеңіз
                      </p>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-stone-200 text-xs text-stone-700 text-left space-y-1">
                      <p className="font-semibold text-stone-900">
                        Немесе Kaspi бойынша нөмірге аудару:
                      </p>
                      <div className="flex items-center justify-between font-mono">
                        <span className="text-amber-950 font-bold text-sm">{CONTACT_PHONE_FORMATTED}</span>
                        <span className="text-stone-500">(Атырау Шұбат)</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                        Карта нөмірі:
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-stone-300 bg-white font-mono text-xs text-stone-900"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                          Мерзімі (MM/YY):
                        </label>
                        <input
                          type="text"
                          value={expiry}
                          onChange={(e) => setExpiry(e.target.value)}
                          className="w-full p-2.5 rounded-xl border border-stone-300 bg-white font-mono text-xs text-stone-900"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                          CVC / CVV:
                        </label>
                        <input
                          type="password"
                          value={cvc}
                          onChange={(e) => setCvc(e.target.value)}
                          className="w-full p-2.5 rounded-xl border border-stone-300 bg-white font-mono text-xs text-stone-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                        Иесінің аты:
                      </label>
                      <input
                        type="text"
                        value={holder}
                        onChange={(e) => setHolder(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-stone-300 bg-white text-xs text-stone-900 uppercase font-mono"
                      />
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] text-stone-500 pt-1">
                      <Lock className="w-3.5 h-3.5 text-emerald-600" />
                      <span>256-bit SSL қауіпсіз төлем хаттамасы</span>
                    </div>
                  </div>
                )}

                {/* Confirm Payment CTA */}
                <button
                  type="button"
                  onClick={handleConfirmPayment}
                  disabled={isProcessing}
                  className="w-full py-3.5 px-4 rounded-xl bg-amber-800 hover:bg-amber-900 active:scale-98 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span>Төлем тексерілуде...</span>
                  ) : (
                    <span>
                      {pendingPaymentOrder.total.toLocaleString()} ₸ төлемді растау
                    </span>
                  )}
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
