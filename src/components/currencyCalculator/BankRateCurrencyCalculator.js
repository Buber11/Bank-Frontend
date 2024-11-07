import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BankRateCurrencyCalculator = () => {
    const [usdRate, setUsdRate] = useState(null);
    const [eurRate, setEurRate] = useState(null);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [amount, setAmount] = useState(0);
    const [result, setResult] = useState(null);
    const [conversionInfo, setConversionInfo] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10)); // Data w formacie 'YYYY-MM-DD'

    const fetchRates = async (date) => {
        try {
            // Pobieranie kursów dla wybranej daty
            const usdResponse = await axios.get(`https://localhost:8443/api/currency/USD/${date}`, {
                withCredentials: true,
            });
            const eurResponse = await axios.get(`https://localhost:8443/api/currency/EUR/${date}`, {
                withCredentials: true,
            });

            setUsdRate(usdResponse.data);
            setEurRate(eurResponse.data);
        } catch (error) {
            console.error('Error fetching currency rates:', error);
        }
    };

    // Wywołanie funkcji pobierającej dane, gdy zmieni się data
    useEffect(() => {
        fetchRates(selectedDate);
    }, [selectedDate]);

    const handleCurrencyChange = (e) => {
        setToCurrency(e.target.value);
        setResult(null);
    };

    const handleDateChange = (e) => {
        const date = e.target.value;
        setSelectedDate(date); // Zmieniamy datę, co automatycznie wywoła `fetchRates`
    };

    const handleCalculate = () => {
        if (!usdRate || !eurRate) {
            alert('Currency rates not available.');
            return;
        }

        let fromRate, toRate;

        if (fromCurrency === 'USD') {
            fromRate = usdRate.rates[0].bid;
        } else if (fromCurrency === 'EUR') {
            fromRate = eurRate.rates[0].bid;
        } else if (fromCurrency === 'PLN') {
            fromRate = 1;
        }

        if (toCurrency === 'USD') {
            toRate = usdRate.rates[0].ask;
        } else if (toCurrency === 'EUR') {
            toRate = eurRate.rates[0].ask;
        } else if (toCurrency === 'PLN') {
            toRate = 1;
        }

        const convertedAmount = (amount * fromRate) / toRate;
        setResult(convertedAmount.toFixed(2));

        setConversionInfo(
            `The calculated amount includes the buying and selling costs of currencies. ` +
            `It is not a market exchange, but a bank exchange rate.`
        );
    };

    return (
        <div className="currency-calculator">

            <h2>Bank Rate Currency Converter</h2>

            <div className="form-group">
                <label>Date:</label>
                <input
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange} // Aktualizuje datę i automatycznie pobiera nowe dane
                />
            </div>
            <div className="form-group">
                <label>Amount:</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                />
            </div>

            <div className="form-group">
                <label>From Currency:</label>
                <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="PLN">PLN</option>
                </select>
            </div>

            <div className="form-group">
                <label>To Currency:</label>
                <select value={toCurrency} onChange={handleCurrencyChange}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="PLN">PLN</option>
                </select>
            </div>

            <button onClick={handleCalculate} className="calculate-button">Calculate</button>

            {result && (
                <div className="result">
                    <h3>Converted Amount: {result} {toCurrency}</h3>
                    <p>{conversionInfo}</p>
                </div>
            )}
        </div>
    );
};


export default BankRateCurrencyCalculator;
