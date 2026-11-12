import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  CartItem,
  Order,
  Customer,
  SocialLead,
  Review,
  NotificationItem,
  OrderStatus
} from '../types';
import {
  PRODUCTS,
  INITIAL_REVIEWS,
  INITIAL_CUSTOMERS,
  INITIAL_SOCIAL_LEADS
} from '../data/initialData';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  updateQuantity: (productId: string, volume: string, delta: number) => void;
  removeFromCart: (productId: string, volume: string) => void;
  clearCart: () => void;
  cartTotalCount: number;
  cartSubtotal: number;
  
  // Orders
  orders: Order[];
  createOrder: (orderData: Partial<Order>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  activeOrderForTracking: Order | null;
  setActiveOrderForTracking: (order: Order | null) => void;

  // Customers & Leads
  customers: Customer[];
  updateCustomerNotes: (customerId: string, notes: string) => void;
  updateCustomerStatus: (customerId: string, status: Customer['status']) => void;
  socialLeads: SocialLead[];
  addSocialLead: (lead: Omit<SocialLead, 'id' | 'timestamp'>) => void;
  updateLeadStatus: (leadId: string, status: SocialLead['status']) => void;

  // Reviews
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;

  // Current User / Loyalty
  currentUser: {
    name: string;
    phone: string;
    address: string;
    loyaltyPoints: number;
    tier: string;
  };
  addLoyaltyPoints: (points: number) => void;
  spendLoyaltyPoints: (points: number) => void;

  // Notifications
  notifications: NotificationItem[];
  unreadNotificationsCount: number;
  markNotificationsAsRead: () => void;
  sendNotification: (title: string, message: string, type?: NotificationItem['type']) => void;
  activeToast: NotificationItem | null;
  dismissToast: () => void;

  // Modals & Drawers
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCabinetOpen: boolean;
  setIsCabinetOpen: (open: boolean) => void;
  isCrmOpen: boolean;
  setIsCrmOpen: (open: boolean) => void;
  isCallbackOpen: boolean;
  setIsCallbackOpen: (open: boolean) => void;
  isTrackingOpen: boolean;
  setIsTrackingOpen: (open: boolean) => void;
  isReviewModalOpen: boolean;
  setIsReviewModalOpen: (open: boolean) => void;
  pendingPaymentOrder: Order | null;
  setPendingPaymentOrder: (order: Order | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('kk');
  
  // Cart state with local storage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('shubat_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('shubat_orders');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    // Seed initial orders for demonstration
    return [
      {
        id: 'ord-1024',
        orderNumber: '№ 1024',
        createdAt: '2026-11-12 11:20',
        customerName: 'Еркін Нұрғалиев',
        customerPhone: '+7 (702) 162-29-75',
        type: 'delivery',
        deliveryZone: 'Орталық / Авангард',
        deliveryAddress: 'мкр. Авангард 2, дом 18, кв. 45',
        deliveryFee: 500,
        items: [
          {
            productId: 'shubat-kulsary',
            productName: 'Табиғи Құлсары Шұбаты',
            volume: '2',
            liters: 2,
            price: 3080,
            quantity: 2,
            image: '/src/assets/images/product_shubat_bottle_1794479576261.jpg'
          },
          {
            productId: 'camel-milk-fresh',
            productName: 'Балғын Сауылған Түйе Сүті',
            volume: '1',
            liters: 1,
            price: 1560,
            quantity: 1,
            image: '/src/assets/images/product_camel_milk_1794479576516.jpg'
          }
        ],
        subtotal: 7720,
        bonusDiscount: 500,
        total: 7720,
        status: 'in_transit',
        paymentMethod: 'kaspi_qr',
        paymentStatus: 'paid',
        source: 'website',
        notes: 'Мұздай салқын күйінде жеткізілсін'
      },
      {
        id: 'ord-1021',
        orderNumber: '№ 1021',
        createdAt: '2026-11-10 14:45',
        customerName: 'Еркін Нұрғалиев',
        customerPhone: '+7 (702) 162-29-75',
        type: 'pickup',
        deliveryFee: 0,
        items: [
          {
            productId: 'shubat-kulsary',
            productName: 'Табиғи Құлсары Шұбаты',
            volume: '5',
            liters: 5,
            price: 7500,
            quantity: 1,
            image: '/src/assets/images/product_shubat_bottle_1794479576261.jpg'
          }
        ],
        subtotal: 7500,
        bonusDiscount: 0,
        total: 7500,
        status: 'delivered',
        paymentMethod: 'kaspi_qr',
        paymentStatus: 'paid',
        source: 'whatsapp'
      }
    ];
  });

  const [activeOrderForTracking, setActiveOrderForTracking] = useState<Order | null>(null);
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [socialLeads, setSocialLeads] = useState<SocialLead[]>(INITIAL_SOCIAL_LEADS);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);

  // Current customer profile
  const [currentUser, setCurrentUser] = useState({
    name: 'Еркін Нұрғалиев',
    phone: '+7 (702) 162-29-75',
    address: 'мкр. Авангард 2, дом 18, кв. 45',
    loyaltyPoints: 1450,
    tier: 'VIP Қонақ'
  });

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'Жаңа сауылған шубат партиясы келді! 🥛',
      message: 'Бүгін таңертең Құлсарыдан жаңа балғын шұбат пен түйе сүті Сарайшық базарына жеткізілді.',
      timestamp: '15 минут бұрын',
      type: 'promo',
      read: false
    },
    {
      id: 'notif-2',
      title: 'Тапсырыс №1024 курьерге берілді 🚚',
      message: 'Курьер сіздің мекенжайыңызға қарай жолға шықты. Жеткізу уақыты: ~25 минут.',
      timestamp: '35 минут бұрын',
      type: 'order',
      read: false
    },
    {
      id: 'notif-3',
      title: '+400 бонус сыйлыққа берілді! ✨',
      message: 'Адал тұтынушы ретінде сіздің шотыңызға кэшбэк бонустары аударылды.',
      timestamp: 'Кеше',
      type: 'bonus',
      read: true
    }
  ]);

  const [activeToast, setActiveToast] = useState<NotificationItem | null>(null);

  // Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCabinetOpen, setIsCabinetOpen] = useState(false);
  const [isCrmOpen, setIsCrmOpen] = useState(false);
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [pendingPaymentOrder, setPendingPaymentOrder] = useState<Order | null>(null);

  // Save cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('shubat_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Save orders to local storage
  useEffect(() => {
    try {
      localStorage.setItem('shubat_orders', JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  const addToCart = (item: Omit<CartItem, 'quantity'>, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find(
        (i) => i.productId === item.productId && i.volume === item.volume
      );
      if (existing) {
        return prev.map((i) =>
          i.productId === item.productId && i.volume === item.volume
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { ...item, quantity }];
    });

    sendNotification(
      language === 'kk' ? 'Себетке қосылды' : 'Добавлено в корзину',
      `${item.productName} (${item.volume} л) - ${quantity} дана`,
      'order'
    );
  };

  const updateQuantity = (productId: string, volume: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.productId === productId && item.volume === volume) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (productId: string, volume: string) => {
    setCart((prev) =>
      prev.filter((i) => !(i.productId === productId && i.volume === volume))
    );
  };

  const clearCart = () => setCart([]);

  const cartTotalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const createOrder = (orderData: Partial<Order>): Order => {
    const newOrderNumber = `№ ${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: newOrderNumber,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      customerName: orderData.customerName || currentUser.name,
      customerPhone: orderData.customerPhone || currentUser.phone,
      type: orderData.type || 'delivery',
      deliveryZone: orderData.deliveryZone,
      deliveryAddress: orderData.deliveryAddress || currentUser.address,
      deliveryFee: orderData.deliveryFee || 0,
      items: orderData.items || [...cart],
      subtotal: orderData.subtotal || cartSubtotal,
      bonusDiscount: orderData.bonusDiscount || 0,
      total: orderData.total || (cartSubtotal + (orderData.deliveryFee || 0) - (orderData.bonusDiscount || 0)),
      status: 'new',
      paymentMethod: orderData.paymentMethod || 'kaspi_qr',
      paymentStatus: orderData.paymentStatus || 'pending',
      source: orderData.source || 'website',
      notes: orderData.notes
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();

    // Reward 5% cashback in loyalty points
    const cashbackEarned = Math.round(newOrder.total * 0.05);
    addLoyaltyPoints(cashbackEarned);

    sendNotification(
      language === 'kk' ? 'Тапсырыс қабылданды!' : 'Заказ успешно принят!',
      language === 'kk'
        ? `${newOrderNumber} рәсімделді. Сізге +${cashbackEarned} бонус берілді!`
        : `${newOrderNumber} оформлен. Вам начислено +${cashbackEarned} бонусов!`,
      'order'
    );

    // Update customer in CRM or register as buyer
    setCustomers((prev) => {
      const found = prev.find((c) => c.phone.replace(/\D/g, '') === newOrder.customerPhone.replace(/\D/g, ''));
      if (found) {
        return prev.map((c) =>
          c.id === found.id
            ? {
                ...c,
                totalSpent: c.totalSpent + newOrder.total,
                ordersCount: c.ordersCount + 1,
                lastOrderDate: new Date().toISOString().split('T')[0],
                status: 'buyer' as const
              }
            : c
        );
      } else {
        const newCustomer: Customer = {
          id: `cust-${Date.now()}`,
          name: newOrder.customerName,
          phone: newOrder.customerPhone,
          address: newOrder.deliveryAddress,
          totalSpent: newOrder.total,
          ordersCount: 1,
          loyaltyPoints: cashbackEarned,
          tier: 'Дәмхана досы',
          status: 'buyer',
          firstSeen: new Date().toISOString().split('T')[0],
          lastOrderDate: new Date().toISOString().split('T')[0],
          source: 'website'
        };
        return [newCustomer, ...prev];
      }
    });

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          const updated = { ...order, status };
          if (activeOrderForTracking?.id === orderId) {
            setActiveOrderForTracking(updated);
          }
          return updated;
        }
        return order;
      })
    );

    const statusMap: Record<OrderStatus, string> = {
      new: 'Жаңадан қабылданды',
      confirmed: 'Расталды және дайындалуда',
      in_transit: 'Курьер жолға шықты 🚚',
      delivered: 'Сәтті жеткізілді ✅',
      cancelled: 'Тапсырыс тоқтатылды'
    };

    sendNotification(
      'Тапсырыс мәртебесі жаңарды',
      `Тапсырыс күйі: ${statusMap[status]}`,
      'order'
    );
  };

  const updateCustomerNotes = (customerId: string, notes: string) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === customerId ? { ...c, notes } : c))
    );
  };

  const updateCustomerStatus = (customerId: string, status: Customer['status']) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === customerId ? { ...c, status } : c))
    );
  };

  const addSocialLead = (lead: Omit<SocialLead, 'id' | 'timestamp'>) => {
    const newLead: SocialLead = {
      ...lead,
      id: `lead-${Date.now()}`,
      timestamp: 'Бүгін, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setSocialLeads((prev) => [newLead, ...prev]);

    // Also register in customers as interested
    setCustomers((prev) => [
      {
        id: `cust-${Date.now()}`,
        name: lead.userName,
        phone: lead.handleOrPhone,
        totalSpent: 0,
        ordersCount: 0,
        loyaltyPoints: 300,
        tier: 'Дәмхана досы',
        status: 'interested',
        firstSeen: new Date().toISOString().split('T')[0],
        source: lead.platform === 'call_request' ? 'website' : lead.platform,
        favoriteProduct: lead.productInterest,
        notes: `Өтініш: ${lead.message}`
      },
      ...prev
    ]);

    sendNotification(
      'Жаңа өтініш тіркелді 📥',
      `${lead.userName} (${lead.platform}): ${lead.productInterest}`,
      'promo'
    );
  };

  const updateLeadStatus = (leadId: string, status: SocialLead['status']) => {
    setSocialLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status } : l))
    );
  };

  const addReview = (review: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...review,
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString(language === 'kk' ? 'kk-KZ' : 'ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    };
    setReviews((prev) => [newReview, ...prev]);
    sendNotification(
      language === 'kk' ? 'Пікіріңізге рақмет!' : 'Спасибо за ваш отзыв!',
      language === 'kk' ? 'Сіздің пікіріңіз сайтта жарияланды' : 'Ваш отзыв опубликован на сайте',
      'bonus'
    );
  };

  const addLoyaltyPoints = (points: number) => {
    setCurrentUser((prev) => ({
      ...prev,
      loyaltyPoints: prev.loyaltyPoints + points
    }));
  };

  const spendLoyaltyPoints = (points: number) => {
    setCurrentUser((prev) => ({
      ...prev,
      loyaltyPoints: Math.max(0, prev.loyaltyPoints - points)
    }));
  };

  const sendNotification = (
    title: string,
    message: string,
    type: NotificationItem['type'] = 'order'
  ) => {
    const item: NotificationItem = {
      id: `notif-${Date.now()}`,
      title,
      message,
      timestamp: 'Дәл қазір',
      type,
      read: false
    };
    setNotifications((prev) => [item, ...prev]);
    setActiveToast(item);
    setTimeout(() => {
      setActiveToast((current) => (current?.id === item.id ? null : current));
    }, 4500);
  };

  const markNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const dismissToast = () => setActiveToast(null);

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartTotalCount,
        cartSubtotal,
        orders,
        createOrder,
        updateOrderStatus,
        activeOrderForTracking,
        setActiveOrderForTracking,
        customers,
        updateCustomerNotes,
        updateCustomerStatus,
        socialLeads,
        addSocialLead,
        updateLeadStatus,
        reviews,
        addReview,
        currentUser,
        addLoyaltyPoints,
        spendLoyaltyPoints,
        notifications,
        unreadNotificationsCount,
        markNotificationsAsRead,
        sendNotification,
        activeToast,
        dismissToast,
        isCartOpen,
        setIsCartOpen,
        isCabinetOpen,
        setIsCabinetOpen,
        isCrmOpen,
        setIsCrmOpen,
        isCallbackOpen,
        setIsCallbackOpen,
        isTrackingOpen,
        setIsTrackingOpen,
        isReviewModalOpen,
        setIsReviewModalOpen,
        pendingPaymentOrder,
        setPendingPaymentOrder
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
