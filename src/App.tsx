/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { AboutKulsary } from './components/AboutKulsary';
import { DeliveryCalculator } from './components/DeliveryCalculator';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CustomerCabinetModal } from './components/CustomerCabinetModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { PaymentModal } from './components/PaymentModal';
import { CallbackModal } from './components/CallbackModal';
import { ReviewModal } from './components/ReviewModal';
import { CrmModal } from './components/CrmModal';
import { PushNotificationToast } from './components/PushNotificationToast';
import { ShoppingBag, MessageCircle, Phone } from 'lucide-react';
import { CONTACT_PHONE, WHATSAPP_LINK } from './data/initialData';

const MainLayout: React.FC = () => {
  const { cartTotalCount, setIsCartOpen, language } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-stone-900 selection:bg-amber-200 selection:text-amber-900 pb-16 md:pb-0">
      <Header />
      
      <main className="flex-1">
        <Hero />
        <ProductCatalog />
        <AboutKulsary />
        <DeliveryCalculator />
        <ReviewsSection />
      </main>

      <Footer />

      {/* Floating / Sticky Mobile Bottom Action Bar (under 15% mobile sticky cap) */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 p-2.5 px-4 flex md:hidden items-center justify-between gap-3 shadow-lg">
        <a
          href={`tel:${CONTACT_PHONE}`}
          className="flex-1 py-2 px-3 rounded-xl bg-stone-100 text-stone-900 text-xs font-bold flex items-center justify-center gap-1.5 border border-stone-200"
        >
          <Phone className="w-3.5 h-3.5 text-amber-800" />
          <span>87021622975</span>
        </a>

        <a
          href={`${WHATSAPP_LINK}?text=Сәлеметсіз бе! Мен Құлсары шұбатына тапсырыс бергім келеді.`}
          target="_blank"
          rel="noreferrer"
          className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={() => setIsCartOpen(true)}
          className="py-2 px-3.5 rounded-xl bg-amber-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs relative"
        >
          <ShoppingBag className="w-4 h-4" />
          {cartTotalCount > 0 && (
            <span className="w-4 h-4 bg-amber-600 rounded-full text-[10px] flex items-center justify-center font-mono">
              {cartTotalCount}
            </span>
          )}
        </button>
      </div>

      {/* All Drawers and Modals */}
      <CartDrawer />
      <CustomerCabinetModal />
      <OrderTrackingModal />
      <PaymentModal />
      <CallbackModal />
      <ReviewModal />
      <CrmModal />
      <PushNotificationToast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
