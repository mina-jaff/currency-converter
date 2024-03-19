import React, { useState, useEffect } from 'react';

function CurrencyConverter() {
  const [amount, setAmount] = useState(1); // Default amount
  const [fromCurrency, setFromCurrency] = useState('EUR'); // Default from currency
  const [toCurrency, setToCurrency] = useState('USD'); // Default to currency
  const [exchangeRate, setExchangeRate] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const data = await response.json();
        const rate = data.rates[toCurrency];
        setExchangeRate(rate);
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
      }
    };

    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    if (result === null) {
      setAmount(0);
    }
  }, [result]);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleFromCurrencyChange = (event) => {
    setFromCurrency(event.target.value);
  };

  const handleToCurrencyChange = (event) => {
    setToCurrency(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const convertedAmount = amount * exchangeRate;
    setResult(convertedAmount);
  };

  const handleDelete = () => {
    setResult(null);
  };

  return (
    <div>
      <form className="row-container" onSubmit={handleSubmit}>
        <div className="form-item">
          <label>
            Amount
            <input type="number" value={amount} onChange={handleAmountChange} />
          </label>
        </div>
        <div className="form-item">
          <label>
            From
            <select value={fromCurrency} onChange={handleFromCurrencyChange}>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
              <option value="JPY">JPY</option>
            </select>
          </label>
        </div>
        <div className="form-item">
          <label>
            To
            <select value={toCurrency} onChange={handleToCurrencyChange}>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="JPY">JPY</option>
            </select>
          </label>
        </div>
        <button className="generic-btn" type="submit">Convert</button>
      </form>
      {result && (
        <>
        <div className="row-container">
          <p className="result" data-testid="result">{amount} {fromCurrency} = {result} {toCurrency}</p>
        </div>
        <button 
            className="delete-btn"
            onClick={handleDelete}
        >←</button>
        </>
      )}
    </div>
  );
}

export default CurrencyConverter;
