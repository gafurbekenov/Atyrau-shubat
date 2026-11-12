export type Language = 'kk' | 'ru';

export type ProductVolume = '1' | '1.5' | '2' | '5';

export interface VolumePrice {
  volume: ProductVolume;
  liters: number;
  label: string;
  price: number;
}

export interface Product {
  id: string;
  nameKk: string;
  nameRu: string;
  category: 'shubat' | 'milk';
  descriptionKk: string;
  descriptionRu: string;
  image: string;
  originKk: string;
  originRu: string;
  volumes: VolumePrice[];
  benefitsKk: string[];
  benefitsRu: string[];
  isPopular?: boolean;
}

export interface CartItem {
  productId: string;
  productName: string;
  volume: ProductVolume;
  liters: number;
  price: number;
  quantity: number;
  image: string;
}

export type OrderType = 'delivery' | 'pickup';

export type OrderStatus = 'new' | 'confirmed' | 'in_transit' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  type: OrderType;
  deliveryZone?: string;
  deliveryAddress?: string;
  deliveryFee: number;
  items: CartItem[];
  subtotal: number;
  bonusDiscount: number;
  total: number;
  status: OrderStatus;
  paymentMethod: 'kaspi_qr' | 'card' | 'cash';
  paymentStatus: 'paid' | 'pending';
  source: 'website' | 'whatsapp' | 'instagram' | 'tiktok' | 'phone';
  notes?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  totalSpent: number;
  ordersCount: number;
  loyaltyPoints: number;
  tier: 'Дәмхана досы' | 'VIP Қонақ' | 'Құрметті тұтынушы';
  status: 'buyer' | 'interested' | 'lead';
  firstSeen: string;
  lastOrderDate?: string;
  source: 'website' | 'instagram' | 'tiktok' | 'whatsapp' | 'market';
  favoriteProduct?: string;
  notes?: string;
}

export interface Review {
  id: string;
  name: string;
  city: string;
  rating: number;
  date: string;
  productName: string;
  textKk: string;
  textRu: string;
  verifiedBuyer: boolean;
  avatarLetter: string;
}

export interface SocialLead {
  id: string;
  platform: 'instagram' | 'tiktok' | 'whatsapp' | 'call_request';
  handleOrPhone: string;
  userName: string;
  message: string;
  timestamp: string;
  status: 'new' | 'contacted' | 'ordered' | 'closed';
  productInterest: string;
  estimatedVolume?: string;
}

export interface DeliveryZone {
  id: string;
  nameKk: string;
  nameRu: string;
  price: number;
  estimatedTime: string;
  districts: string[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'order' | 'promo' | 'bonus';
  read: boolean;
}
