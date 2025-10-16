'use client';
import { useEffect, useState } from 'react';

export default function ThankYouPage() {
  const [lang, setLang] = useState('en');
  const [customerId, setCustomerId] = useState('');

  // Generate 6-digit random ID on mount
  useEffect(() => {
    const generateId = () => {
      return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
    };
    setCustomerId(generateId());
  }, []);

  const t = translations[lang];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      fontFamily: "'Poppins', sans-serif",
      padding: 20,
    }}>
      {/* Language Toggle */}
      <div className="lang-toggle" style={{ marginBottom: 20 }}>
        <button
          onClick={() => setLang('en')}
          style={{ background: lang==='en'?'#f5c400':'transparent', color: lang==='en'?'#000':'#fff', marginRight: 8 }}
        >
          EN
        </button>
        <button
          onClick={() => setLang('ru')}
          style={{ background: lang==='ru'?'#f5c400':'transparent', color: lang==='ru'?'#000':'#fff' }}
        >
          RU
        </button>
      </div>

      <h1 style={{ fontSize: '2.2rem', color: '#ffd700', marginBottom: 10 }}>🎉 {t.thankYou}</h1>
      <p style={{ fontSize: '1rem', color: '#ccc', maxWidth: 500 }}>{t.success}</p>

      {customerId && (
        <p style={{ marginTop: 20, fontSize: '1.2rem', color: '#f5c400' }}>
          {t.customerId}: <strong>{customerId}</strong>
        </p>
      )}
    </div>
  );
}

const translations = {
  en: {
    thankYou: 'Thank You for Registering!',
    success: 'Your entry has been successfully submitted. Winners will be announced soon!',
    customerId: 'Your Customer ID',
  },
  ru: {
    thankYou: 'Спасибо за регистрацию!',
    success: 'Ваша заявка успешно отправлена. Победители будут объявлены в ближайшее время!',
    customerId: 'Ваш идентификатор клиента',
  },
};
