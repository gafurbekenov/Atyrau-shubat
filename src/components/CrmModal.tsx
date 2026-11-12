import React, { useState } from 'react';
import {
  X,
  BarChart3,
  Users,
  MessageSquare,
  TrendingUp,
  Instagram,
  Phone,
  MessageCircle,
  CheckCircle2,
  Clock,
  Sparkles,
  Search,
  Filter,
  Download,
  DollarSign,
  Package
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SocialLead, Customer } from '../types';
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_LINK,
  TIKTOK_HANDLE,
  TIKTOK_LINK,
  CONTACT_PHONE
} from '../data/initialData';

export const CrmModal: React.FC = () => {
  const {
    language,
    isCrmOpen,
    setIsCrmOpen,
    socialLeads,
    updateLeadStatus,
    customers,
    updateCustomerNotes,
    updateCustomerStatus,
    orders
  } = useApp();

  const [activeTab, setActiveTab] = useState<'leads' | 'customers' | 'analytics'>('leads');
  const [customerFilter, setCustomerFilter] = useState<'all' | 'buyer' | 'interested'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [platformFilter, setPlatformFilter] = useState<'all' | 'instagram' | 'tiktok' | 'whatsapp' | 'call_request'>('all');

  if (!isCrmOpen) return null;

  // Filtered Leads
  const filteredLeads = socialLeads.filter((lead) => {
    if (platformFilter !== 'all' && lead.platform !== platformFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        lead.userName.toLowerCase().includes(q) ||
        lead.handleOrPhone.toLowerCase().includes(q) ||
        lead.message.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Filtered Customers
  const filteredCustomers = customers.filter((cust) => {
    if (customerFilter !== 'all' && cust.status !== customerFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        cust.name.toLowerCase().includes(q) ||
        cust.phone.toLowerCase().includes(q) ||
        (cust.notes && cust.notes.toLowerCase().includes(q))
      );
    }
    return true;
  });

  // Analytics Computations
  const totalRevenue = orders.reduce((acc, o) => acc + (o.paymentStatus === 'paid' ? o.total : 0), 0) + 94280; // plus historical seed
  const totalOrdersCount = orders.length + 13;
  const averageCheck = Math.round(totalRevenue / totalOrdersCount);
  const buyersCount = customers.filter((c) => c.status === 'buyer').length;
  const interestedCount = customers.filter((c) => c.status === 'interested').length;

  const handleOpenLeadWhatsApp = (lead: SocialLead) => {
    const cleanPhone = lead.handleOrPhone.replace(/\D/g, '');
    const phoneToUse = cleanPhone.length >= 10 ? cleanPhone : CONTACT_PHONE;
    const msg = encodeURIComponent(
      `Сәлеметсіз бе, ${lead.userName}! Атырау Шұбаттан жазып тұрмыз. Сіз ${lead.platform} арқылы өтініш қалдырған едіңіз: "${lead.productInterest}". Сарайшық базарынан алып кетесіз бе, әлде үйге жеткізіп берейік пе?`
    );
    window.open(`https://wa.me/${phoneToUse}?text=${msg}`, '_blank');
  };

  const handleExportCSV = () => {
    const headers = 'ID,Аты,Телефон,Мәртебесі,Тапсырыс_саны,Жалпы_сомасы,Дереккөз\n';
    const rows = customers
      .map(
        (c) =>
          `"${c.id}","${c.name}","${c.phone}","${c.status}","${c.ordersCount}","${c.totalSpent}","${c.source}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `shubat_clients_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setIsCrmOpen(false)}
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
      />

      <div className="min-h-full flex items-center justify-center p-3 sm:p-6">
        <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-4 flex flex-col max-h-[92vh]">
          
          {/* Header */}
          <div className="p-5 bg-stone-900 text-white flex flex-wrap items-center justify-between gap-4 border-b border-stone-800">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-lg font-bold">
                    {language === 'kk'
                      ? 'Атырау Шұбат — CRM және Сатылым Аналитикасы'
                      : 'Атырау Шубат — CRM и Аналитика продаж'}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold">
                    Онлайн жүйе
                  </span>
                </div>
                <p className="text-xs text-stone-400 mt-0.5">
                  Инстаграм (@{INSTAGRAM_HANDLE}) · TikTok (@{TIKTOK_HANDLE}) · WhatsApp ({CONTACT_PHONE})
                </p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2">
              <div className="flex p-1 bg-stone-800 rounded-xl text-xs">
                <button
                  type="button"
                  onClick={() => setActiveTab('leads')}
                  className={`py-1.5 px-3 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'leads'
                      ? 'bg-amber-800 text-white shadow-xs'
                      : 'text-stone-300 hover:text-white'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Өтініштер (Лиды)</span>
                  <span className="px-1.5 py-0.2 bg-stone-900/80 rounded text-[10px]">
                    {socialLeads.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('customers')}
                  className={`py-1.5 px-3 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'customers'
                      ? 'bg-amber-800 text-white shadow-xs'
                      : 'text-stone-300 hover:text-white'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Клиенттер базасы</span>
                  <span className="px-1.5 py-0.2 bg-stone-900/80 rounded text-[10px]">
                    {customers.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('analytics')}
                  className={`py-1.5 px-3 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'analytics'
                      ? 'bg-amber-800 text-white shadow-xs'
                      : 'text-stone-300 hover:text-white'
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Аналитика</span>
                </button>
              </div>

              <button
                onClick={() => setIsCrmOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tab 1: Social Media Leads (Instagram, TikTok, WhatsApp, Callbacks) */}
          {activeTab === 'leads' && (
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#FAF7F2]">
              {/* Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-stone-200">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-stone-500 mr-1">Дереккөз:</span>
                  <button
                    onClick={() => setPlatformFilter('all')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                      platformFilter === 'all'
                        ? 'bg-stone-900 text-white'
                        : 'bg-stone-100 text-stone-700'
                    }`}
                  >
                    Барлығы
                  </button>
                  <button
                    onClick={() => setPlatformFilter('instagram')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1 ${
                      platformFilter === 'instagram'
                        ? 'bg-pink-600 text-white'
                        : 'bg-pink-50 text-pink-700 border border-pink-200'
                    }`}
                  >
                    <Instagram className="w-3 h-3" />
                    <span>Instagram (@{INSTAGRAM_HANDLE})</span>
                  </button>
                  <button
                    onClick={() => setPlatformFilter('tiktok')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1 ${
                      platformFilter === 'tiktok'
                        ? 'bg-stone-900 text-white'
                        : 'bg-stone-100 text-stone-800'
                    }`}
                  >
                    <span>TikTok (@{TIKTOK_HANDLE})</span>
                  </button>
                  <button
                    onClick={() => setPlatformFilter('whatsapp')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1 ${
                      platformFilter === 'whatsapp'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    }`}
                  >
                    <MessageCircle className="w-3 h-3" />
                    <span>WhatsApp</span>
                  </button>
                  <button
                    onClick={() => setPlatformFilter('call_request')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1 ${
                      platformFilter === 'call_request'
                        ? 'bg-amber-800 text-white'
                        : 'bg-amber-50 text-amber-800'
                    }`}
                  >
                    <Phone className="w-3 h-3" />
                    <span>Қоңырау сұранысы</span>
                  </button>
                </div>

                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    placeholder="Іздеу (есім, нөмір)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 pr-3 py-1.5 rounded-lg border border-stone-200 text-xs w-48 bg-stone-50"
                  />
                </div>
              </div>

              {/* Leads Cards Grid */}
              <div className="space-y-3">
                {filteredLeads.map((lead) => {
                  const statusColors = {
                    new: 'bg-blue-100 text-blue-800 border-blue-200',
                    contacted: 'bg-amber-100 text-amber-800 border-amber-200',
                    ordered: 'bg-emerald-100 text-emerald-800 border-emerald-200',
                    closed: 'bg-stone-100 text-stone-600 border-stone-200'
                  }[lead.status];

                  return (
                    <div
                      key={lead.id}
                      className="p-4 bg-white rounded-xl border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              lead.platform === 'instagram'
                                ? 'bg-pink-100 text-pink-700'
                                : lead.platform === 'tiktok'
                                ? 'bg-stone-900 text-white'
                                : lead.platform === 'whatsapp'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {lead.platform}
                          </span>
                          <span className="font-bold text-xs text-stone-900">{lead.userName}</span>
                          <span className="text-[11px] font-mono text-stone-500">
                            {lead.handleOrPhone}
                          </span>
                          <span className="text-[10px] text-stone-400">· {lead.timestamp}</span>
                        </div>

                        <p className="text-xs text-stone-800 bg-stone-50 p-2 rounded-lg border border-stone-100">
                          "{lead.message}"
                        </p>

                        <div className="flex items-center gap-3 text-[11px] text-stone-500">
                          <span>
                            Сұранысы: <strong className="text-amber-900">{lead.productInterest}</strong>
                          </span>
                          {lead.estimatedVolume && (
                            <span>Көлемі: <strong className="text-stone-800">{lead.estimatedVolume}</strong></span>
                          )}
                        </div>
                      </div>

                      {/* Status Selector & WhatsApp Quick Action */}
                      <div className="flex sm:flex-col items-end gap-2 shrink-0">
                        <select
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value as SocialLead['status'])}
                          className={`text-xs font-bold py-1 px-2.5 rounded-lg border cursor-pointer ${statusColors}`}
                        >
                          <option value="new">Жаңа өтініш</option>
                          <option value="contacted">Байланыс орнатылды</option>
                          <option value="ordered">Тапсырыс берді ✅</option>
                          <option value="closed">Аяқталды</option>
                        </select>

                        <button
                          type="button"
                          onClick={() => handleOpenLeadWhatsApp(lead)}
                          className="py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp-пен жазу</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 2: Customer Base (Купившие, Заинтересованные) */}
          {activeTab === 'customers' && (
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#FAF7F2]">
              {/* Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-stone-200">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCustomerFilter('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                      customerFilter === 'all'
                        ? 'bg-stone-900 text-white'
                        : 'bg-stone-100 text-stone-700'
                    }`}
                  >
                    Барлығы ({customers.length})
                  </button>
                  <button
                    onClick={() => setCustomerFilter('buyer')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer flex items-center gap-1.5 ${
                      customerFilter === 'buyer'
                        ? 'bg-emerald-700 text-white'
                        : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    }`}
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Сатып алғандар ({buyersCount})</span>
                  </button>
                  <button
                    onClick={() => setCustomerFilter('interested')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer flex items-center gap-1.5 ${
                      customerFilter === 'interested'
                        ? 'bg-amber-800 text-white'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}
                  >
                    <Clock className="w-3 h-3" />
                    <span>Қызығушылар ({interestedCount})</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      placeholder="Клиентті іздеу..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8 pr-3 py-1.5 rounded-lg border border-stone-200 text-xs w-44 bg-stone-50"
                    />
                  </div>

                  <button
                    onClick={handleExportCSV}
                    className="p-1.5 px-3 rounded-lg border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
                    title="CSV жүктеу"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Экспорт</span>
                  </button>
                </div>
              </div>

              {/* Customers Table */}
              <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 text-stone-500 border-b border-stone-200 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Клиент</th>
                      <th className="py-3 px-4">Телефон / Дереккөз</th>
                      <th className="py-3 px-4">Мәртебе</th>
                      <th className="py-3 px-4">Сатып алулар</th>
                      <th className="py-3 px-4">Сүйікті өнімі</th>
                      <th className="py-3 px-4">Ескертпе (CRM)</th>
                      <th className="py-3 px-4 text-right">Әрекет</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredCustomers.map((c) => (
                      <tr key={c.id} className="hover:bg-stone-50/80 transition-colors">
                        <td className="py-3 px-4 font-bold text-stone-900">
                          {c.name}
                          <div className="text-[10px] text-stone-400 font-normal">
                            Тіркелді: {c.firstSeen}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-mono text-stone-800">{c.phone}</span>
                          <span className="block text-[10px] text-amber-800 font-semibold uppercase">
                            {c.source}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              c.status === 'buyer'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {c.status === 'buyer' ? 'Сатып алды' : 'Қызығушы'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-mono tabular-nums font-bold text-stone-900">
                            {c.totalSpent.toLocaleString()} ₸
                          </span>
                          <span className="text-[10px] text-stone-400 block">
                            {c.ordersCount} тапсырыс
                          </span>
                        </td>
                        <td className="py-3 px-4 text-stone-700">
                          {c.favoriteProduct || 'Құлсары шұбаты'}
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="text"
                            defaultValue={c.notes || ''}
                            onBlur={(e) => updateCustomerNotes(c.id, e.target.value)}
                            placeholder="Ескертпе қосу..."
                            className="p-1 rounded border border-stone-200 text-[11px] w-full bg-stone-50 hover:bg-white focus:bg-white"
                          />
                        </td>
                        <td className="py-3 px-4 text-right">
                          <a
                            href={`https://wa.me/${c.phone.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                            title="WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 3: Sales & Demand Analytics */}
          {activeTab === 'analytics' && (
            <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-[#FAF7F2]">
              {/* KPI Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-xs">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                    Жалпы түсім
                  </span>
                  <div className="font-display font-black text-2xl text-stone-900 mt-1 font-mono tabular-nums">
                    {totalRevenue.toLocaleString()} ₸
                  </div>
                  <span className="text-[10px] text-emerald-600 font-semibold mt-0.5 block">
                    ↑ 18% алдыңғы аптадан
                  </span>
                </div>

                <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-xs">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                    Орташа чек (AOV)
                  </span>
                  <div className="font-display font-black text-2xl text-stone-900 mt-1 font-mono tabular-nums">
                    {averageCheck.toLocaleString()} ₸
                  </div>
                  <span className="text-[10px] text-stone-400 mt-0.5 block">
                    ~2.5 литр орташа тапсырыс
                  </span>
                </div>

                <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-xs">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                    Сатылған көлем
                  </span>
                  <div className="font-display font-black text-2xl text-amber-900 mt-1 font-mono tabular-nums">
                    285 Лиcubic / л
                  </div>
                  <span className="text-[10px] text-stone-500 mt-0.5 block">
                    Құлсарыдан жеткізілген
                  </span>
                </div>

                <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-xs">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                    Клиенттер базасы
                  </span>
                  <div className="font-display font-black text-2xl text-stone-900 mt-1 font-mono tabular-nums">
                    {customers.length} адам
                  </div>
                  <span className="text-[10px] text-emerald-600 mt-0.5 block">
                    {buyersCount} тұрақты сатып алушы
                  </span>
                </div>
              </div>

              {/* Demand breakdown: Shubat vs Camel Milk & Volumes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Split */}
                <div className="p-5 bg-white rounded-xl border border-stone-200 shadow-xs space-y-4">
                  <h4 className="font-display font-bold text-stone-900 text-sm">
                    Өнімдер бойынша сұраныс үлесі
                  </h4>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span>Құлсары Шұбаты (ферменттелген)</span>
                        <span className="text-amber-900">76% (216 литр)</span>
                      </div>
                      <div className="w-full bg-stone-100 rounded-full h-2.5">
                        <div className="bg-amber-800 h-2.5 rounded-full w-[76%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span>Балғын Түйе сүті (парное)</span>
                        <span className="text-amber-900">24% (69 литр)</span>
                      </div>
                      <div className="w-full bg-stone-100 rounded-full h-2.5">
                        <div className="bg-amber-600 h-2.5 rounded-full w-[24%]" />
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-stone-500 pt-2 border-t border-stone-100">
                    💡 <strong>Қорытынды:</strong> Шұбатқа сұраныс 3 есе жоғары. Түйе сүті көбінесе балалар мен денсаулық емдеу мақсатында тапсырыс беріледі.
                  </p>
                </div>

                {/* Demand by Volume: 1L, 1.5L, 2L, 5L */}
                <div className="p-5 bg-white rounded-xl border border-stone-200 shadow-xs space-y-4">
                  <h4 className="font-display font-bold text-stone-900 text-sm">
                    Литраж бойынша сұраныс бағамы
                  </h4>

                  <div className="space-y-2.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span>1.5 литр (2 300 ₸) — Ең танымал</span>
                      <span className="font-mono font-bold text-stone-900">42%</span>
                    </div>
                    <div className="w-full bg-stone-100 rounded-full h-2">
                      <div className="bg-emerald-600 h-2 rounded-full w-[42%]" />
                    </div>

                    <div className="flex items-center justify-between">
                      <span>5 литр (7 500 ₸) — Той, қонақ күту</span>
                      <span className="font-mono font-bold text-stone-900">28%</span>
                    </div>
                    <div className="w-full bg-stone-100 rounded-full h-2">
                      <div className="bg-amber-700 h-2 rounded-full w-[28%]" />
                    </div>

                    <div className="flex items-center justify-between">
                      <span>2 литр (3 080 ₸)</span>
                      <span className="font-mono font-bold text-stone-900">18%</span>
                    </div>
                    <div className="w-full bg-stone-100 rounded-full h-2">
                      <div className="bg-stone-500 h-2 rounded-full w-[18%]" />
                    </div>

                    <div className="flex items-center justify-between">
                      <span>1 литр (1 560 ₸)</span>
                      <span className="font-mono font-bold text-stone-900">12%</span>
                    </div>
                    <div className="w-full bg-stone-100 rounded-full h-2">
                      <div className="bg-stone-400 h-2 rounded-full w-[12%]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Channels Conversion */}
              <div className="p-5 bg-white rounded-xl border border-stone-200 shadow-xs">
                <h4 className="font-display font-bold text-stone-900 text-sm mb-3">
                  Әлеуметтік желілердің тиімділігі
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-3 bg-pink-50/60 rounded-xl border border-pink-100">
                    <span className="font-bold text-pink-700 block">Instagram (@{INSTAGRAM_HANDLE})</span>
                    <p className="text-xl font-mono font-bold text-stone-900 mt-1">48 өтініш</p>
                    <span className="text-[10px] text-stone-500">Конверсия: 62% тапсырысқа</span>
                  </div>

                  <div className="p-3 bg-stone-100 rounded-xl border border-stone-200">
                    <span className="font-bold text-stone-900 block">TikTok (@{TIKTOK_HANDLE})</span>
                    <p className="text-xl font-mono font-bold text-stone-900 mt-1">34 өтініш</p>
                    <span className="text-[10px] text-stone-500">Вирустық видеолар арқылы</span>
                  </div>

                  <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
                    <span className="font-bold text-emerald-800 block">WhatsApp ({CONTACT_PHONE})</span>
                    <p className="text-xl font-mono font-bold text-stone-900 mt-1">86 қайталау</p>
                    <span className="text-[10px] text-stone-500">Тұрақты клиенттер каналы</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
            <span>Атырау Шұбат басқару орталығы</span>
            <button
              onClick={() => setIsCrmOpen(false)}
              className="px-5 py-2 rounded-xl bg-stone-900 text-white font-bold"
            >
              Жабу
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
