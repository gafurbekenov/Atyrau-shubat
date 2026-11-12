import React, { useState } from 'react';
import { X, Phone, Clock, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CONTACT_PHONE_FORMATTED } from '../data/initialData';
import { KazakhOrnament } from './KazakhOrnament';

export const CallbackModal: React.FC = () => {
  const { language, isCallbackOpen, setIsCallbackOpen, addSocialLead } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+7 (702) ');
  const [question, setQuestion] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isCallbackOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || phone.length < 10) return;

    addSocialLead({
      platform: 'call_request',
      handleOrPhone: phone,
      userName: name,
      message: question || 'Сайттан қоңырау сұратты',
      status: 'new',
      productInterest: 'Кері байланыс / Тапсырыс',
      estimatedVolume: '—'
    });

    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsCallbackOpen(false);
    setIsSubmitted(false);
    setName('');
    setQuestion('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
      />

      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-8">
          
          {/* Header */}
          <div className="p-5 bg-gradient-to-r from-amber-900 to-amber-950 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-amber-300" />
              <h3 className="font-display text-base font-bold">
                {language === 'kk' ? 'Кері байланыс сұрау' : 'Заказ обратного звонка'}
              </h3>
            </div>
            <button
              onClick={handleClose}
              className="p-1.5 rounded-lg text-amber-200 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 bg-[#FAF7F2]">
            {isSubmitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-display font-bold text-stone-900 text-lg">
                  {language === 'kk' ? 'Өтінішіңіз қабылданды!' : 'Заявка успешно принята!'}
                </h4>
                <p className="text-xs text-stone-600">
                  {language === 'kk'
                    ? 'Біздің оператор 5-10 минут ішінде көрсетілген нөмірге хабарласады.'
                    : 'Наш менеджер свяжется с вами в течение 5-10 минут.'}
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleClose}
                    className="px-5 py-2 rounded-xl bg-amber-800 text-white text-xs font-bold"
                  >
                    Жақсы
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <p className="text-xs text-stone-600">
                  {language === 'kk'
                    ? 'Телефон нөміріңізді қалдырыңыз, біз сізге қоңырау шалып, өнім мен жеткізуді нақтылаймыз.'
                    : 'Оставьте номер телефона, и мы перезвоним для уточнения деталей заказа.'}
                </p>

                <div>
                  <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                    {language === 'kk' ? 'Сіздің есіміңіз:' : 'Ваше имя:'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Мысалы: Айгүл"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-white text-xs text-stone-900"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                    {language === 'kk' ? 'Телефон нөміріңіз:' : 'Номер телефона:'}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+7 (702) 162-29-75"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-white text-xs text-stone-900 font-mono"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                    {language === 'kk' ? 'Сұрағыңыз немесе қажетті көлем:' : 'Вопрос или желаемый объем:'}
                  </label>
                  <input
                    type="text"
                    placeholder="Мысалы: 5 литр шұбат Нұрсаяға жеткізу"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-white text-xs text-stone-900"
                  />
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-stone-500">
                  <Clock className="w-3.5 h-3.5 text-amber-700" />
                  <span>Жұмыс уақыты: 08:00 - 20:00 (күн сайын)</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  {language === 'kk' ? 'Қоңырау күту' : 'Заказать обратный звонок'}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
