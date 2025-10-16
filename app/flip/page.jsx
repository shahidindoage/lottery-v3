'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function FlipPage() {
  const [cards, setCards] = useState([]);
  const [hasFlippedOnce, setHasFlippedOnce] = useState(false);
  const [popupText, setPopupText] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [lang, setLang] = useState('en');

  const router = useRouter();

 const translations = {
  en: {
    title: 'Flip Card Game',
    tryAgain: 'Try Again',
    youWon: 'You won',
    close: 'Close',
    logout: 'Logout',
    prizes: {
      AC: 'AC',
      TV: 'TV',
      Mobile: 'Mobile',
      Laptop: 'Laptop',
      Headphones: 'Headphones',
      TRY: 'Try Again'
    }
  },
  ru: {
    title: 'Игра Переверни Карту',
    tryAgain: 'Попробуйте снова',
    youWon: 'Вы выиграли',
    close: 'Закрыть',
    logout: 'Выйти',
    prizes: {
      AC: 'Кондиционер',
      TV: 'Телевизор',
      Mobile: 'Мобильный',
      Laptop: 'Ноутбук',
      Headphones: 'Наушники',
      TRY: 'Попробуйте снова'
    }
  }
};

  const t = translations[lang];

  const originalCardData = [
  'AC', 'TV', 'Mobile', 'Laptop', 'Headphones',
  'TRY', 'TRY', 'AC', 'TV', 'Mobile'
];

  const shuffleArray = (array) => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  useEffect(() => {
    resetGame();
  }, [lang]);

  const handleFlip = (index) => {
    if (hasFlippedOnce) return;

    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);
    setHasFlippedOnce(true);

   setTimeout(() => {
  const cardKey = newCards[index].text;
  if (cardKey === 'TRY') {
    setPopupText(`😢 ${t.prizes[cardKey]}!`);
  } else {
    setPopupText(`🎉 ${t.youWon}: ${t.prizes[cardKey]}!`);
  }
  setShowPopup(true);
}, 1000);

  };

  const closePopup = () => {
    setShowPopup(false);
    resetGame();
  };

  const resetGame = () => {
    const shuffled = shuffleArray(originalCardData).map(text => ({
      text,
      flipped: false
    }));
    setCards(shuffled);
    setHasFlippedOnce(false);
  };

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    router.replace('/');
  };

  return (
    <div className="flip-wrapper">
      {/* Logout Button */}
      <button className="logout-btn1" onClick={handleLogout}>{t.logout}</button>

      {/* Language Toggle */}
      <div className="lang-toggle1">
        <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
        <button className={lang === 'ru' ? 'active' : ''} onClick={() => setLang('ru')}>RU</button>
      </div>

      <h1 className='flip-title'>{t.title}</h1>

      <div className="card-container1">
        {cards.map((card, idx) => (
          <div key={idx} className={`card1 ${card.flipped ? 'flipped' : ''}`} onClick={() => handleFlip(idx)}>
            <div className="front"><span>?</span></div>
            <div className="back">{card.flipped ? (t.prizes[card.text] || card.text) : ''}</div>
          </div>
        ))}
      </div>

      {showPopup && (
        <div className="popup1">
          <div className="popup-content1">
            <p>{popupText}</p>
            <button onClick={closePopup}>{t.close}</button>
          </div>
        </div>
      )}

     
    </div>
  );
}
