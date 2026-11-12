import React, { useState } from 'react';
import { X, Trash2, Truck, Store, MessageCircle, CreditCard, QrCode, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DELIVERY_ZONES, MARKET_ADDRESS_KK, MARKET_ADDRESS, WHATSAPP_LINK } from '../data/initialData';
import { KazakhOrnament } from './KazakhOrnament';

export const CartDrawer: React.FC = () => {
  const {
    language,
    isCartOpen,
    setIsCartOpen,
    cart,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    createOrder,
    currentUser,
    spendLoyaltyPoints,
    setPendingPaymentOrder,
    setIsTrackingOpen,
    setActiveOrderForTracking
  } = useApp();

  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [selectedZoneId, setSelectedZoneId] = useState<string>('center');
  const [deliveryAddress, setDeliveryAddress] = useState<string>(currentUser.address || '');
  const [customerName, setCustomerName] = useState<string>(currentUser.name || '');
  const [customerPhone, setCustomerPhone] = useState<string>(currentUser.phone || '');
  const [orderNotes, setOrderNotes] = useState<string>('');
  const [useBonuses, setUseBonuses] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<'kaspi_qr' | 'card' | 'cash'>('kaspi_qr');

  if (!isCartOpen) return null;

  const currentZone = DELIVERY_ZONES.find((z) => z.id === selectedZoneId) || DELIVERY_ZONES[0];
  const deliveryFee = deliveryType === 'delivery' ? (cartSubtotal >= 15000 ? 0 : currentZone.price) : 0;
  
  // Calculate max bonuses applicable (up to 30% of cart or user balance)
  const maxBonusDiscount = Math.min(currentUser.loyaltyPoints, Math.floor(cartSubtotal * 0.3));
  const appliedBonusDiscount = useBonuses ? maxBonusDiscount : 0;
  const finalTotal = Math.max(0, cartSubtotal + deliveryFee - appliedBonusDiscount);

  const handleCheckoutKaspiOrCard = () => {
    if (cart.length === 0) return;

    if (!customerName.trim() || !customerPhone.trim()) {
      alert(language === 'kk' ? 'Аты-жөніңіз бен телефон нөміріңізді жазыңыз' : 'Пожалуйста, укажите имя и номер телефона');
      return;
    }

    if (deliveryType === 'delivery' && !deliveryAddress.trim()) {
      alert(language === 'kk' ? 'Жеткізу мекенжайын көрсетіңіз' : 'Пожалуйста, укажите адрес доставки');
      return;
    }

    if (useBonuses && appliedBonusDiscount > 0) {
      spendLoyaltyPoints(appliedBonusDiscount);
    }

    const newOrder = createOrder({
      customerName,
      customerPhone,
      type: deliveryType,
      deliveryZone: deliveryType === 'delivery' ? currentZone.nameKk : undefined,
      deliveryAddress: deliveryType === 'delivery' ? deliveryAddress : MARKET_ADDRESS,
      deliveryFee,
      items: [...cart],
      subtotal: cartSubtotal,
      bonusDiscount: appliedBonusDiscount,
      total: finalTotal,
      paymentMethod,
      paymentStatus: paymentMethod === 'cash' ? 'pending' : 'pending',
      notes: orderNotes
    });

    setIsCartOpen(false);

    if (paymentMethod === 'kaspi_qr' || paymentMethod === 'card') {
      setPendingPaymentOrder(newOrder);
    } else {
      setActiveOrderForTracking(newOrder);
      setIsTrackingOpen(true);
    }
  };

  const handleCheckoutViaWhatsApp = () => {
    if (cart.length === 0) return;

    const itemsText = cart
      .map((i) => `• ${i.productName} (${i.volume} л) x ${i.quantity} дана = ${i.price * i.quantity} ₸`)
      .join('\n');

    const methodText =
      paymentMethod === 'kaspi_qr'
        ? 'Kaspi QR / Pay'
        : paymentMethod === 'card'
        ? 'Банк картасы'
        : 'Қолма-қол';

    const message = encodeURIComponent(
      `Сәлеметсіз бе! Мен Атырау Шұбат сайтынан тапсырыс бергім келеді:\n\n` +
      `👤 Тұтынушы: ${customerName || 'Атырау тұрғыны'}\n` +
      `📞 Телефон: ${customerPhone || '+7 702 162 29 75'}\n` +
      `📦 Алу түрі: ${deliveryType === 'delivery' ? `Үйге жеткізу (${currentZone.nameKk})` : 'Сарайшық базарынан алып кету'}\n` +
      (deliveryType === 'delivery' ? `📍 Мекенжай: ${deliveryAddress}\n` : `📍 Сарайшық базары, Мәденов 1 а/1\n`) +
      `\n🛍️ Тапсырыс құрамы:\n${itemsText}\n\n` +
      `Тауарлар сомасы: ${cartSubtotal} ₸\n` +
      (deliveryFee > 0 ? `Жеткізу: ${deliveryFee} ₸\n` : `Жеткізу: ТЕГІН\n`) +
      (appliedBonusDiscount > 0 ? `Бонус шегерім: -${appliedBonusDiscount} ₸\n` : '') +
      `Барлығы төлеуге: ${finalTotal} ₸\n` +
      `💳 Төлем тәсілі: ${methodText}\n` +
      (orderNotes ? `📝 Ескерту: ${orderNotes}\n` : '') +
      `\nӨтінішті қабылдауыңызды сұраймын!`
    );

    window.open(`${WHATSAPP_LINK}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] shadow-2xl flex flex-col justify-between border-l border-amber-900/15">
          
          {/* Header */}
          <div className="p-5 border-b border-stone-200 bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <KazakhOrnament size={18} color="#92400E" />
              <h2 className="font-display text-lg font-bold text-stone-900">
                {language === 'kk' ? 'Сіздің себетіңіз' : 'Ваша корзина'}
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <KazakhOrnament type="camel" size={48} className="mx-auto text-amber-800/40 mb-3" />
                <p className="font-display text-lg font-semibold text-stone-800">
                  {language === 'kk' ? 'Себет әзірге бос' : 'Корзина пока пуста'}
                </p>
                <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                  {language === 'kk'
                    ? 'Құлсарының балғын шұбаты немесе түйе сүтінен керекті көлемді таңдаңыз.'
                    : 'Выберите натуральный шубат или верблюжье молоко из каталога.'}
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 px-5 py-2.5 rounded-xl bg-amber-800 text-white font-bold text-xs"
                >
                  {language === 'kk' ? 'Каталогқа өту' : 'Перейти в каталог'}
                </button>
              </div>
            ) : (
              <>
                {/* Items List */}
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    {language === 'kk' ? 'Таңдалған өнімдер:' : 'Товары в заказе:'}
                  </span>
                  {cart.map((item) => (
                    <div
                      key={`${item.productId}-${item.volume}`}
                      className="p-3 bg-white rounded-xl border border-stone-200 flex items-center justify-between gap-3 shadow-xs"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.productName}
                          className="w-12 h-12 rounded-lg object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <p className="font-bold text-xs text-stone-900 leading-tight">
                            {item.productName}
                          </p>
                          <p className="text-[11px] text-stone-500">
                            Көлемі: <span className="font-semibold text-amber-900">{item.volume} л</span> ·{' '}
                            <span className="font-mono tabular-nums">{item.price} ₸/құты</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Stepper */}
                        <div className="flex items-center border border-stone-200 rounded-md bg-stone-50">
                          <button
                            onClick={() => updateQuantity(item.productId, item.volume, -1)}
                            className="w-6 h-6 flex items-center justify-center text-xs font-bold text-stone-600 hover:text-stone-900"
                          >
                            −
                          </button>
                          <span className="w-6 text-center text-xs font-mono font-bold text-stone-900 tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.volume, 1)}
                            className="w-6 h-6 flex items-center justify-center text-xs font-bold text-stone-600 hover:text-stone-900"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.productId, item.volume)}
                          className="p-1 text-stone-400 hover:text-red-600 transition-colors"
                          title="Жою"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Type Option */}
                <div className="space-y-3 pt-4 border-t border-stone-200">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-600">
                    {language === 'kk' ? 'Алу тәсілі:' : 'Способ получения:'}
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDeliveryType('delivery')}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                        deliveryType === 'delivery'
                          ? 'bg-amber-900 text-white border-amber-900 shadow-xs'
                          : 'bg-white text-stone-700 border-stone-200'
                      }`}
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>{language === 'kk' ? 'Үйге жеткізу' : 'Доставка на дом'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryType('pickup')}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                        deliveryType === 'pickup'
                          ? 'bg-amber-900 text-white border-amber-900 shadow-xs'
                          : 'bg-white text-stone-700 border-stone-200'
                      }`}
                    >
                      <Store className="w-3.5 h-3.5" />
                      <span>{language === 'kk' ? 'Сарайшық (Тегін)' : 'Сарайшык (0 ₸)'}</span>
                    </button>
                  </div>

                  {deliveryType === 'delivery' ? (
                    <div className="space-y-2 mt-2">
                      <label className="text-[11px] font-semibold text-stone-600 block">
                        {language === 'kk' ? 'Атырау ауданы (жеткізу ақысы):' : 'Район доставки:'}
                      </label>
                      <select
                        value={selectedZoneId}
                        onChange={(e) => setSelectedZoneId(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-stone-300 bg-white text-xs text-stone-900 focus:outline-amber-800"
                      >
                        {DELIVERY_ZONES.map((zone) => (
                          <option key={zone.id} value={zone.id}>
                            {zone.nameKk} — {zone.price} ₸ ({zone.estimatedTime})
                          </option>
                        ))}
                      </select>

                      <input
                        type="text"
                        placeholder="Көшесі, үй нөмірі, пәтер..."
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-stone-300 bg-white text-xs text-stone-900 focus:outline-amber-800 mt-2"
                      />
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                      <p className="font-bold">Мекенжай: Сарайшық базары, Мәденов 1 а/1</p>
                      <p className="text-[11px] text-stone-600 mt-0.5">
                        Күнделікті 08:00 - 20:00 дейін сатушыдан тікелей алып кете аласыз.
                      </p>
                    </div>
                  )}
                </div>

                {/* Customer Info Form */}
                <div className="space-y-2 pt-4 border-t border-stone-200">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-600">
                    {language === 'kk' ? 'Байланыс деректері:' : 'Контактные данные:'}
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Аты-жөніңіз"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="p-2 rounded-lg border border-stone-300 bg-white text-xs text-stone-900"
                    />
                    <input
                      type="tel"
                      placeholder="+7 702 162 29 75"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="p-2 rounded-lg border border-stone-300 bg-white text-xs text-stone-900"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Ескерту (мысалы: мұздай салқын күйінде, қоңырау шалыңыз)"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    className="w-full p-2 rounded-lg border border-stone-300 bg-white text-xs text-stone-900"
                  />
                </div>

                {/* Loyalty Bonus Points Switch */}
                {currentUser.loyaltyPoints > 0 && (
                  <div className="p-3 bg-white rounded-xl border border-amber-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <div>
                        <p className="text-xs font-bold text-stone-900">
                          {language === 'kk' ? 'Бонустарды шегеру' : 'Списать бонусы'}
                        </p>
                        <p className="text-[10px] text-stone-500">
                          Қолжетімді: {currentUser.loyaltyPoints} ₸ (макс. {maxBonusDiscount} ₸)
                        </p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={useBonuses}
                        onChange={(e) => setUseBonuses(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-800"></div>
                    </label>
                  </div>
                )}

                {/* Payment Method Selector */}
                <div className="space-y-2 pt-4 border-t border-stone-200">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-600">
                    {language === 'kk' ? 'Төлем түрі:' : 'Способ оплаты:'}
                  </span>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('kaspi_qr')}
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                        paymentMethod === 'kaspi_qr'
                          ? 'border-red-600 bg-red-50 text-red-900 font-bold'
                          : 'border-stone-200 bg-white text-stone-700'
                      }`}
                    >
                      <QrCode className="w-4 h-4 mx-auto mb-1 text-red-600" />
                      <span>Kaspi QR</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'border-amber-800 bg-amber-50 text-amber-900 font-bold'
                          : 'border-stone-200 bg-white text-stone-700'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 mx-auto mb-1 text-amber-800" />
                      <span>{language === 'kk' ? 'Банк карта' : 'Карта'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cash')}
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                        paymentMethod === 'cash'
                          ? 'border-stone-800 bg-stone-100 text-stone-900 font-bold'
                          : 'border-stone-200 bg-white text-stone-700'
                      }`}
                    >
                      <Store className="w-4 h-4 mx-auto mb-1 text-stone-700" />
                      <span>{language === 'kk' ? 'Қолма-қол' : 'При получении'}</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer Summary & Action Buttons */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-white space-y-3">
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>{language === 'kk' ? 'Өнімдер құны:' : 'Товары:'}</span>
                  <span className="font-mono tabular-nums text-stone-900 font-semibold">
                    {cartSubtotal.toLocaleString()} ₸
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>{language === 'kk' ? 'Жеткізу:' : 'Доставка:'}</span>
                  <span className="font-mono tabular-nums text-stone-900 font-semibold">
                    {deliveryFee === 0 ? 'ТЕГІН (0 ₸)' : `${deliveryFee} ₸`}
                  </span>
                </div>
                {appliedBonusDiscount > 0 && (
                  <div className="flex justify-between text-amber-800">
                    <span>{language === 'kk' ? 'Бонус жеңілдік:' : 'Скидка бонусами:'}</span>
                    <span className="font-mono tabular-nums font-bold">
                      -{appliedBonusDiscount} ₸
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-100">
                  <span>{language === 'kk' ? 'Барлығы төлеуге:' : 'Итого к оплате:'}</span>
                  <span className="font-mono tabular-nums text-lg text-amber-950">
                    {finalTotal.toLocaleString()} ₸
                  </span>
                </div>
              </div>

              {/* Checkout Buttons */}
              <div className="grid grid-cols-1 gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleCheckoutKaspiOrCard}
                  className="w-full py-3 px-4 rounded-xl bg-amber-800 hover:bg-amber-900 active:scale-98 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <span>{language === 'kk' ? 'Тапсырысты растау' : 'Оформить заказ'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleCheckoutViaWhatsApp}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:scale-98 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp арқылы жіберу</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
