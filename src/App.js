import React, { useState, useEffect } from 'react';
import { Modal, } from 'antd';
import LotteryNumbers from './LotteryNumbers.js';
import LotteryNumbersReview from './LotteryNumbersReview.js';
import './style.css';

function App() {
  const [key, setKey] = useState('');
  const [error, setError] = useState(false);
  const [showLotteryNumbers, setShowLotteryNumbers] = useState(true);
  const [showLotteryNumbersReview, setShowLotteryNumbersReview] = useState(false);

  
  const handlePlayClick = () => {
      setShowLotteryNumbers(true);
      setShowLotteryNumbersReview(false);
  }


  const handleKeyChange = event => {
    setKey(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (key !== 'jhonesmihermano') {
      setError(true);
    } else {
      setError(false);
      setShowLotteryNumbers(false);
      setShowLotteryNumbersReview(true);
    }
  };

  return (
    <div className="bg-gray-200 flex flex-col">
      <div className="bg-gray-800 p-2">
        <button className="text-white p-2"  onClick={handlePlayClick}>Jugar</button>
        <button className="text-white p-2" onClick={() => setError(true)}>Ver Tickets</button>
        {error && (
          <form onSubmit={handleSubmit}>
            <input type="password" value={key} onChange={handleKeyChange} placeholder="Ingrese clave" />
            <button className="text-white p-2" type="submit">Enviar</button>
            {error && <p>Clave incorrecta</p>}
          </form>
        )}
      </div>
      <div className="p-2">
        {showLotteryNumbers && <LotteryNumbers />}
        {showLotteryNumbersReview && <LotteryNumbersReview />}
      </div>
    </div>
  );
}

export default App;