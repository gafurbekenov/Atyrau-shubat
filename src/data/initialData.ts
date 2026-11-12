import { Product, Review, Customer, SocialLead, DeliveryZone, VolumePrice } from '../types';

export const CONTACT_PHONE = '87021622975';
export const CONTACT_PHONE_FORMATTED = '+7 (702) 162-29-75';
export const WHATSAPP_LINK = 'https://wa.me/77021622975';
export const INSTAGRAM_HANDLE = 'atyrau.shubat.06';
export const INSTAGRAM_LINK = 'https://instagram.com/atyrau.shubat.06';
export const TIKTOK_HANDLE = 'atyrau.shubat';
export const TIKTOK_LINK = 'https://tiktok.com/@atyrau.shubat';
export const MARKET_ADDRESS = 'г. Атырау, рынок Сарайшық, ул. Мәденов 1 а/1';
export const MARKET_ADDRESS_KK = 'Атырау қаласы, Сарайшық базары, Мәденов к-сі 1 а/1';
export const SUPPLY_ORIGIN = 'г. Құлсары (Жылыой ауданы)';

export const COMMON_VOLUMES: VolumePrice[] = [
  { volume: '1', liters: 1, label: '1 л', price: 1560 },
  { volume: '1.5', liters: 1.5, label: '1.5 л', price: 2300 },
  { volume: '2', liters: 2, label: '2 л', price: 3080 },
  { volume: '5', liters: 5, label: '5 л', price: 7500 },
];

export const PRODUCTS: Product[] = [
  {
    id: 'shubat-kulsary',
    nameKk: 'Табиғи Құлсары Шұбаты',
    nameRu: 'Натуральный Шұбат из Кульсары',
    category: 'shubat',
    descriptionKk: 'Құлсарының құнарлы кең даласында жайылған таза түйе сүтінен ашытылған, қалың қаймақты көбігі бар, ерекше дәмімен танымал нағыз ұлттық сусын. 100% табиғи, қоспасыз.',
    descriptionRu: 'Легендарный натуральный шубат из экологически чистых степей Кульсары. Густая бархатистая пена, неповторимый насыщенный вкус с приятной кислинкой. Богат витаминами C, B, кальцием и природными пребиотиками.',
    image: '/src/assets/images/product_shubat_bottle_1794479576261.jpg',
    originKk: 'Құлсары қ., Атырау облысы',
    originRu: 'г. Кульсары, Атырауская область',
    volumes: COMMON_VOLUMES,
    benefitsKk: [
      'Иммунитетті күшейтеді және ағзаны тазартады',
      'Ас қорыту жүйесін реттейді (табиғи пробиотиктер)',
      'С дәрумені сиыр сүтіне қарағанда 3 есе көп',
      'Күнделікті балғын партия тікелей Құлсарыдан'
    ],
    benefitsRu: [
      'Укрепляет иммунитет и естественные силы организма',
      'Улучшает работу ЖКТ за счет живых полезных культур',
      'В 3 раза больше витамина C, чем в коровьем молоке',
      'Ежедневная свежая поставка из степей Кульсары'
    ],
    isPopular: true
  },
  {
    id: 'camel-milk-fresh',
    nameKk: 'Балғын Сауылған Түйе Сүті',
    nameRu: 'Свежее Верблюжье Молоко',
    category: 'milk',
    descriptionKk: 'Таңертең сауылған таза верблюжье молоко. Тәттірек, жұмсақ кремді дәмі бар. Ешқандай қыздырусыз немесе консервантсыз, ең құнарлы дәрумендері толық сақталған.',
    descriptionRu: 'Натуральное парное верблюжье молоко утреннего удоя. Нежный, слегка сладковатый мягкий вкус. Идеально усваивается, подходит при непереносимости лактозы, гипоаллергенный эликсир здоровья.',
    image: '/src/assets/images/product_camel_milk_1794479576516.jpg',
    originKk: 'Құлсары қ., Атырау облысы',
    originRu: 'г. Кульсары, Атырауская область',
    volumes: COMMON_VOLUMES,
    benefitsKk: [
      'Қант диабеті мен қан қысымын қалыпқа келтіреді',
      'Лактозаға сезімтал жандарға жеңіл қорытылады',
      'Балалар мен қарт адамдарға таптырмас ем',
      'Құрамында табиғи инсулин тәрізді ақуыздар бар'
    ],
    benefitsRu: [
      'Содержит инсулиноподобные белки для поддержки баланса сахара',
      'Легко усваивается людьми с чувствительностью к лактозе',
      'Природный кладезь микроэлементов: железо, цинк, калий',
      'Утренний свежий надой, прямая бережная транспортировка'
    ],
    isPopular: false
  }
];

export const DELIVERY_ZONES: DeliveryZone[] = [
  {
    id: 'center',
    nameKk: 'Орталық / Авангард / Привокзальный',
    nameRu: 'Центр / Авангард / Привокзальный',
    price: 500,
    estimatedTime: '30-45 мин',
    districts: ['Сәтпаев', 'Азаттық', 'Авангард 1-4', 'Вокзал', 'Жилгородок']
  },
  {
    id: 'nursaya',
    nameKk: 'Нұрсая / Самал / Алмагүл / Балықшы',
    nameRu: 'Нурсая / Самал / Алмагуль / Балыкши',
    price: 700,
    estimatedTime: '40-60 мин',
    districts: ['Нұрсая м/а', 'Самал', 'Алмагүл', 'Балықшы', 'Мұнайшы']
  },
  {
    id: 'suburbs',
    nameKk: 'Жұмыскер / Томарлы / Геолог / Береке',
    nameRu: 'Жумыскер / Томарлы / Геолог / Береке',
    price: 900,
    estimatedTime: '50-75 мин',
    districts: ['Жұмыскер', 'Томарлы', 'Геолог', 'Береке', 'Көктем']
  },
  {
    id: 'far',
    nameKk: 'Қала маңы / Еркінқала / Дамба / Ақжар',
    nameRu: 'Пригород / Еркинкала / Дамба / Акжар',
    price: 1200,
    estimatedTime: '60-90 мин',
    districts: ['Еркінқала', 'Дамба', 'Ақжар', 'Ракуша', 'Тасқала']
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Айгүл Серікқызы',
    city: 'Атырау (Авангард)',
    rating: 5,
    date: '10 қараша 2026',
    productName: 'Табиғи Құлсары Шұбаты (5 л)',
    textKk: 'Құлсарының шұбатына ештеңе жетпейді! Әкемнің денсаулығы үшін үнемі 5 литрден аламыз. Дәмі керемет, көбігі тамаша, нағыз баяғы ауылдың дәмі. Курьер Мәденовтен тез әкеп берді. Рақмет сіздерге!',
    textRu: 'Ничто не сравнится с кульсаринским шубатом! Для здоровья папы берем сразу по 5 литров. Вкус невероятный, пена густая, настоящий вкус степи. Доставили очень быстро!',
    verifiedBuyer: true,
    avatarLetter: 'А'
  },
  {
    id: 'rev-2',
    name: 'Нұрлан Бауыржанұлы',
    city: 'Атырау (Нұрсая)',
    rating: 5,
    date: '8 қараша 2026',
    productName: 'Верблюжье молоко (2 л)',
    textKk: 'Балаларға верблюжье молоко алып көрдік. Өте тәтті әрі жеңіл ішіледі, сиыр сүтіне қарағанда әлдеқайда майлы әрі пайдалы. Сарайшық базарынан өзім алып кеттім, сатушы кісі өте сыпайы екен.',
    textRu: 'Взяли верблюжье молоко для детей. Очень сладкое и мягкое на вкус, намного полезнее обычного молока. Забрал самовывозом на Сарайшыке, очень вежливое обслуживание.',
    verifiedBuyer: true,
    avatarLetter: 'Н'
  },
  {
    id: 'rev-3',
    name: 'Қайрат Жұмағалиев',
    city: 'Атырау (Орталық)',
    rating: 5,
    date: '5 қараша 2026',
    productName: 'Табиғи Құлсары Шұбаты (1.5 л)',
    textKk: 'WhatsApp арқылы тапсырыс бердім, 35 минутта үйге жеткізді. Мұздай әрі балғын күйінде келді. Kaspi QR арқылы төлеу өте ыңғайлы болды. Енді тек сіздерден аламын!',
    textRu: 'Заказал через WhatsApp, привезли за 35 минут. Холодный, свежий, прямо как надо. Оплатил через Kaspi QR без проблем. Теперь только у вас будем заказывать!',
    verifiedBuyer: true,
    avatarLetter: 'Қ'
  },
  {
    id: 'rev-4',
    name: 'Динара М.',
    city: 'Атырау (Самал)',
    rating: 5,
    date: '2 қараша 2026',
    productName: 'Шұбат және Түйе сүті',
    textKk: 'Қонақ күтуге арнайы алдыртқан едік. Қонақтарымыз шұбаттың дәміне таңғалды, қаймағы қалың екен. Құлсарыдан әкелінгені бірден білінеді.',
    textRu: 'Заказывали к приему гостей. Все гости были в восторге от насыщенного вкуса. Сразу чувствуется, что привезено напрямую из Кульсары.',
    verifiedBuyer: true,
    avatarLetter: 'Д'
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust-1',
    name: 'Айгүл Серікқызы',
    phone: '+7 (775) 345-21-90',
    address: 'мкр. Авангард 3, дом 14, кв 22',
    totalSpent: 45000,
    ordersCount: 6,
    loyaltyPoints: 1250,
    tier: 'VIP Қонақ',
    status: 'buyer',
    firstSeen: '2026-09-12',
    lastOrderDate: '2026-11-10',
    source: 'instagram',
    favoriteProduct: 'Шұбат 5 л',
    notes: 'Тұрақты клиент, әрдайым жұма күндері алады'
  },
  {
    id: 'cust-2',
    name: 'Нұрлан Бауыржанұлы',
    phone: '+7 (701) 980-44-12',
    address: 'мкр. Нұрсая, ул. Молдагулова 8',
    totalSpent: 18480,
    ordersCount: 3,
    loyaltyPoints: 500,
    tier: 'Дәмхана досы',
    status: 'buyer',
    firstSeen: '2026-10-01',
    lastOrderDate: '2026-11-08',
    source: 'whatsapp',
    favoriteProduct: 'Түйе сүті 2 л',
    notes: 'Балаларына сүт алады'
  },
  {
    id: 'cust-3',
    name: 'Болат Құдайберген',
    phone: '+7 (702) 554-11-77',
    address: 'ул. Азаттық 71',
    totalSpent: 30800,
    ordersCount: 4,
    loyaltyPoints: 920,
    tier: 'Құрметті тұтынушы',
    status: 'buyer',
    firstSeen: '2026-10-15',
    lastOrderDate: '2026-11-05',
    source: 'tiktok',
    favoriteProduct: 'Шұбат 2 л',
    notes: 'Сарайшық базарынан жиі өзі әкетеді'
  },
  {
    id: 'cust-4',
    name: 'Гүлнәр Өтегенова',
    phone: '+7 (708) 612-99-33',
    totalSpent: 0,
    ordersCount: 0,
    loyaltyPoints: 300,
    tier: 'Дәмхана досы',
    status: 'interested',
    firstSeen: '2026-11-11',
    source: 'instagram',
    favoriteProduct: 'Шұбат 1.5 л',
    notes: 'Инстаграмнан бағасын және жеткізу уақытын сұрады'
  },
  {
    id: 'cust-5',
    name: 'Ерлан Сағынбаев',
    phone: '+7 (777) 120-80-45',
    totalSpent: 0,
    ordersCount: 0,
    loyaltyPoints: 300,
    tier: 'Дәмхана досы',
    status: 'interested',
    firstSeen: '2026-11-12',
    source: 'tiktok',
    favoriteProduct: 'Түйе сүті 5 л',
    notes: 'ТикТок видеосы астына емдік қасиеті туралы пікір қалдырды'
  }
];

export const INITIAL_SOCIAL_LEADS: SocialLead[] = [
  {
    id: 'lead-1',
    platform: 'instagram',
    handleOrPhone: '@altyn_atyrau',
    userName: 'Алтынзер',
    message: 'Сәлеметсіз бе! Бүгін кешке Самалға 2 л шубат пен 1.5 л верблюжье молоко жеткізуге бола ма? Бағасы қанша шығады?',
    timestamp: 'Бүгін, 10:15',
    status: 'new',
    productInterest: 'Шұбат 2 л + Сүт 1.5 л',
    estimatedVolume: '3.5 л'
  },
  {
    id: 'lead-2',
    platform: 'tiktok',
    handleOrPhone: '@atyrau_dostary',
    userName: 'Марат',
    message: 'Сарайшық базарында нақты қай жерінде тұрсыздар? Сағат 19:00-ге дейін ашық па? 5 литр алып кетемін',
    timestamp: 'Бүгін, 09:40',
    status: 'contacted',
    productInterest: 'Шұбат 5 л (самовывоз)',
    estimatedVolume: '5 л'
  },
  {
    id: 'lead-3',
    platform: 'whatsapp',
    handleOrPhone: '+7 (775) 441-22-10',
    userName: 'Бақытгүл апа',
    message: 'Ассалаумағалейкум балам. Құлсарыдан жаңа келген шұбат бар ма? Ертеңгі құдалыққа 10 литр керек еді',
    timestamp: 'Кеше, 18:30',
    status: 'ordered',
    productInterest: 'Шұбат 5 л х 2',
    estimatedVolume: '10 л'
  },
  {
    id: 'lead-4',
    platform: 'call_request',
    handleOrPhone: '+7 (705) 888-91-23',
    userName: 'Дәулет',
    message: 'Сайттан жедел қоңырау сұратты: "Жеткізу ақысын анықтау қажет"',
    timestamp: 'Кеше, 16:10',
    status: 'closed',
    productInterest: 'Консультация',
    estimatedVolume: '—'
  }
];
