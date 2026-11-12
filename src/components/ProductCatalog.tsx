import React, { useState } from 'react';
import { ShoppingBag, MessageCircle, Phone, Check, Sparkles, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PRODUCTS, CONTACT_PHONE, WHATSAPP_LINK } from '../data/initialData';
import { Product, ProductVolume } from '../types';
import { KazakhOrnament } from './KazakhOrnament';

export const ProductCatalog: React.FC = () => {
  const { language, addToCart, setIsCartOpen } = useApp();

  // Selected volume state for each product
  const [selectedVolumes, setSelectedVolumes] = useState<Record<string, ProductVolume>>({
    'shubat-kulsary': '2',
    'camel-milk-fresh': '1.5'
  });

  // Quantity counter state for each product
  const [quantities, setQuantities] = useState<Record<string, number>>({
    'shubat-kulsary': 1,
    'camel-milk-fresh': 1
  });

  const handleVolumeChange = (productId: string, volume: ProductVolume) => {
    setSelectedVolumes((prev) => ({ ...prev, [productId]: volume }));
  };

  const handleQuantityChange = (productId: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[productId] || 1;
      const next = Math.max(1, current + delta);
      return { ...prev, [productId]: next };
    });
  };

  const handleAddToCart = (product: Product) => {
    const volumeKey = selectedVolumes[product.id] || '1';
    const volumeObj = product.volumes.find((v) => v.volume === volumeKey) || product.volumes[0];
    const qty = quantities[product.id] || 1;

    addToCart(
      {
        productId: product.id,
        productName: language === 'kk' ? product.nameKk : product.nameRu,
        volume: volumeObj.volume,
        liters: volumeObj.liters,
        price: volumeObj.price,
        image: product.image
      },
      qty
    );
  };

  const handleDirectWhatsApp = (product: Product) => {
    const volumeKey = selectedVolumes[product.id] || '1';
    const volumeObj = product.volumes.find((v) => v.volume === volumeKey) || product.volumes[0];
    const qty = quantities[product.id] || 1;
    const name = language === 'kk' ? product.nameKk : product.nameRu;
    const total = volumeObj.price * qty;

    const message = encodeURIComponent(
      `Сәлеметсіз бе! Мен "${name}" өніміне тапсырыс бергім келеді:\n- Көлемі: ${volumeObj.label}\n- Саны: ${qty} дана\n- Жалпы сомасы: ${total} ₸\n\nЖеткізу немесе Сарайшық базарынан алып кету шарттарын нақтылап берсеңіз.`
    );
    window.open(`${WHATSAPP_LINK}?text=${message}`, '_blank');
  };

  return (
    <section id="products" className="py-16 sm:py-20 bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <KazakhOrnament size={24} color="#92400E" className="mx-auto mb-2" />
          <div className="flex items-center justify-center gap-2 text-xs font-bold tracking-wider uppercase text-amber-800">
            <span>{language === 'kk' ? 'Табиғи өнімдер' : 'Натуральная продукция'}</span>
            <span>·</span>
            <span>{language === 'kk' ? 'Құлсары қаласынан' : 'Прямо из г. Кульсары'}</span>
          </div>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            {language === 'kk' ? 'Шұбат пен Түйе Сүті' : 'Шубат и Верблюжье Молоко'}
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            {language === 'kk'
              ? 'Әр құтыда — таза дала дәмі, жоғары майлылық пен емдік қасиет. Кез келген литражды таңдап, үйге жеткізуге немесе Сарайшық базарынан алып кетуге тапсырыс беріңіз.'
              : 'В каждой бутылке — живой вкус степи, целебные свойства и бархатная текстура. Выберите подходящий объем для дома или большого семейного дастархана.'}
          </p>
          <KazakhOrnament type="divider" className="mt-3 mb-8" />
        </div>

        {/* 2 Flagship Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {PRODUCTS.map((product) => {
            const currentVol = selectedVolumes[product.id] || '1';
            const currentVolumeObj =
              product.volumes.find((v) => v.volume === currentVol) || product.volumes[0];
            const currentQty = quantities[product.id] || 1;
            const totalPrice = currentVolumeObj.price * currentQty;

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-stone-200/80 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Product Card Top: Image + Badges */}
                <div className="relative bg-stone-100 h-64 sm:h-72 overflow-hidden">
                  <img
                    src={product.image}
                    alt={language === 'kk' ? product.nameKk : product.nameRu}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-103"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent pointer-events-none" />

                  {/* Clean unboxed metadata at top */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs">
                    <span className="px-3 py-1 rounded-md bg-stone-900/70 backdrop-blur-md text-amber-300 font-medium">
                      {language === 'kk' ? product.originKk : product.originRu}
                    </span>
                    {product.isPopular && (
                      <span className="px-3 py-1 rounded-md bg-amber-800 text-white font-bold tracking-wide">
                        {language === 'kk' ? 'Елдің таңдауы ★' : 'Выбор покупателей ★'}
                      </span>
                    )}
                  </div>

                  {/* Title overlay in image for immediate focus */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-display text-2xl font-bold">
                      {language === 'kk' ? product.nameKk : product.nameRu}
                    </h3>
                  </div>
                </div>

                {/* Product Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Description */}
                    <p className="text-stone-600 text-sm leading-relaxed mb-4">
                      {language === 'kk' ? product.descriptionKk : product.descriptionRu}
                    </p>

                    {/* Key Health Benefits */}
                    <div className="mb-6 space-y-2 bg-stone-50 p-4 rounded-xl border border-stone-100">
                      <p className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-1">
                        {language === 'kk' ? 'Шипалық қасиеттері:' : 'Полезные свойства:'}
                      </p>
                      {(language === 'kk' ? product.benefitsKk : product.benefitsRu).map(
                        (benefit, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                            <Check className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </div>
                        )
                      )}
                    </div>

                    {/* Volume Selection Grid (1L, 1.5L, 2L, 5L) */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between text-xs font-semibold text-stone-700 mb-2">
                        <span>{language === 'kk' ? 'Көлемін таңдаңыз:' : 'Выберите литраж:'}</span>
                        <span className="text-amber-800">
                          {language === 'kk' ? 'Құлсарыдан жеткізу' : 'Доставка из Кульсары'}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {product.volumes.map((vol) => {
                          const isSelected = currentVol === vol.volume;
                          return (
                            <button
                              key={vol.volume}
                              type="button"
                              onClick={() => handleVolumeChange(product.id, vol.volume)}
                              className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-amber-900 text-white border-amber-900 shadow-sm'
                                  : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-800'
                              }`}
                            >
                              <div className="text-xs font-bold">{vol.label}</div>
                              <div
                                className={`text-xs font-mono tabular-nums mt-0.5 ${
                                  isSelected ? 'text-amber-200' : 'text-stone-500'
                                }`}
                              >
                                {vol.price.toLocaleString()} ₸
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom: Price, Quantity, Cart CTA & WhatsApp */}
                  <div className="pt-4 border-t border-stone-100">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-xs text-stone-500 block">
                          {language === 'kk' ? 'Жалпы сомасы:' : 'Итоговая стоимость:'}
                        </span>
                        <div className="font-display text-2xl font-black text-stone-900">
                          <span className="font-mono tabular-nums">{totalPrice.toLocaleString()}</span>{' '}
                          <span className="text-amber-800 text-lg">₸</span>
                        </div>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-stone-300 rounded-lg bg-stone-50">
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(product.id, -1)}
                          className="w-9 h-9 flex items-center justify-center text-stone-700 hover:text-stone-950 hover:bg-stone-200 text-base font-bold transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="w-9 text-center font-mono font-bold text-sm text-stone-900 tabular-nums">
                          {currentQty}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(product.id, 1)}
                          className="w-9 h-9 flex items-center justify-center text-stone-700 hover:text-stone-950 hover:bg-stone-200 text-base font-bold transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Dual Action Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => handleAddToCart(product)}
                        className="py-3 px-4 rounded-xl bg-amber-800 hover:bg-amber-900 active:scale-98 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>{language === 'kk' ? 'Себетке салу' : 'В корзину'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDirectWhatsApp(product)}
                        className="py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:scale-98 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>WhatsApp тапсырыс</span>
                      </button>
                    </div>

                    <p className="text-[11px] text-stone-500 text-center mt-3">
                      {language === 'kk'
                        ? `Немесе телефонмен: ${CONTACT_PHONE} арқылы тапсырыс беріңіз`
                        : `Или звоните для быстрого заказа: ${CONTACT_PHONE}`}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing Summary Table for Transparency */}
        <div className="mt-12 bg-white rounded-2xl border border-stone-200/80 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-stone-100">
            <div>
              <h3 className="font-display text-xl font-bold text-stone-900">
                {language === 'kk'
                  ? 'Ресми баға кестесі (Шұбат және Түйе сүті)'
                  : 'Официальный прайс-лист (Шубат и Верблюжье молоко)'}
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                {language === 'kk'
                  ? 'Екі өнімнің де бағасы бірдей. Құлсарыдан тікелей келеді, делдалсыз баға.'
                  : 'Цены на шубат и верблюжье молоко едины. Прямые поставки от производителя без наценок.'}
              </p>
            </div>
            <a
              href={`tel:${CONTACT_PHONE}`}
              className="inline-flex items-center gap-2 text-xs font-bold text-amber-800 hover:text-amber-900"
            >
              <Phone className="w-4 h-4" />
              <span>{language === 'kk' ? 'Көтерме бағаға хабарласу' : 'Узнать оптовые цены'}</span>
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-100 text-center">
              <span className="text-xs text-stone-500 block uppercase tracking-wider">Көлемі 1 Лиcubic / 1 л</span>
              <p className="font-display font-black text-2xl text-stone-900 mt-1 font-mono tabular-nums">
                1 560 ₸
              </p>
              <span className="text-[11px] text-stone-500 mt-1 block">Күнделікті тұтынуға</span>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-100 text-center">
              <span className="text-xs text-stone-500 block uppercase tracking-wider">Көлемі 1.5 Литр</span>
              <p className="font-display font-black text-2xl text-stone-900 mt-1 font-mono tabular-nums">
                2 300 ₸
              </p>
              <span className="text-[11px] text-stone-500 mt-1 block">Ең сұранысқа ие көлем</span>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-100 text-center">
              <span className="text-xs text-stone-500 block uppercase tracking-wider">Көлемі 2 Литр</span>
              <p className="font-display font-black text-2xl text-stone-900 mt-1 font-mono tabular-nums">
                3 080 ₸
              </p>
              <span className="text-[11px] text-stone-500 mt-1 block">Шағын отбасыға арналған</span>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-center">
              <span className="text-xs text-amber-800 font-bold block uppercase tracking-wider">
                Көлемі 5 Литр (Құты)
              </span>
              <p className="font-display font-black text-2xl text-amber-950 mt-1 font-mono tabular-nums">
                7 500 ₸
              </p>
              <span className="text-[11px] text-amber-800/80 mt-1 block">Қонақ күту мен той-жиынға</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
