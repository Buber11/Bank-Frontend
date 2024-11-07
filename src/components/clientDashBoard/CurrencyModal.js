import React from 'react';
import './CurrencyModal.css';

const CurrencyModal = ({ isOpen, onClose, handleCurrencyChange, numberAccount }) => {
    if (!isOpen) return null;

    const handleSelectCurrency = (selectedCurrency) => {
        handleCurrencyChange(numberAccount, selectedCurrency); // Przekazujemy numberAccount i wybraną walutę
        onClose(); // Zamykamy modal po wyborze waluty
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Choose Currency</h2>
                <ul>
                    <li onClick={() => handleSelectCurrency('USD')}>USD</li>
                    <li onClick={() => handleSelectCurrency('EUR')}>EUR</li>
                    <li onClick={() => handleSelectCurrency('PLN')}>PLN</li>
                </ul>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default CurrencyModal;