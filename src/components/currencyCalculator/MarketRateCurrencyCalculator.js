import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MarketRateCurrencyCalculator = () => {
    const [rates, setRates] = useState({});
    const [fromCurrency, setFromCurrency] = useState('PLN');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [amount, setAmount] = useState(0);
    const [result, setResult] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));

    const fetchRates = async (date) => {
        try {
            const currencies = ['USD', 'EUR', 'GBP', 'CHF', 'AUD', 'JPY', 'CAD', 'NOK', 'SEK', 'DKK']; // Example of additional currencies
            const promises = currencies.map(currency =>
                axios.get(`https://api.nbp.pl/api/exchangerates/rates/A/${currency}/${date}/`, {
                    headers: { 'Accept': 'application/json' }
                })
            );

            const responses = await Promise.all(promises);
            const newRates = responses.reduce((acc, response) => {
                acc[response.data.code] = response.data.rates[0].mid;
                return acc;
            }, {});
            newRates['PLN'] = 1;
            setRates(newRates);
        } catch (error) {
            console.error('Error fetching currency rates from NBP:', error);
        }
    };

    useEffect(() => {
        fetchRates(selectedDate);
    }, [selectedDate]);

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleCalculate = () => {
        if (!rates[fromCurrency] || !rates[toCurrency]) {
            alert('Currency rates not available.');
            return;
        }

        const fromRate = rates[fromCurrency];
        const toRate = rates[toCurrency];

        const convertedAmount = (amount * fromRate) / toRate;
        setResult(convertedAmount.toFixed(2));
    };

    return (
        <div className="currency-calculator">
            <h2>Market Rate Currency Converter</h2>
            <div className="form-group">
                <label>Date:</label>
                <input
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
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
                    {Object.keys(rates).map(currency => (
                        <option key={currency} value={currency}>{currency}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>To Currency:</label>
                <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                    {Object.keys(rates).map(currency => (
                        <option key={currency} value={currency}>{currency}</option>
                    ))}
                </select>
            </div>

            <button onClick={handleCalculate} className="calculate-button">Calculate</button>

            {result && (
                <div className="result">
                    <h3>Converted Amount: {result} {toCurrency}</h3>
                </div>
            )}
        </div>
    );
};

export default MarketRateCurrencyCalculator;
