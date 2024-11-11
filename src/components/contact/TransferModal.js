import React, { useState } from 'react';
import './TransferModal.css';

const TransferModal = ({ isOpen, closeModal, handleTransferWithDescription }) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');

    const handleSubmit = () => {
        // Walidacja: Sprawdzamy, czy zarówno opis, jak i kwota zostały podane
        if (description.trim() === '') {
            alert('Please provide a description for the transfer.');
        } else if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            alert('Please provide a valid amount for the transfer.');
        } else {
            handleTransferWithDescription(parseFloat(amount), description); // Przekazujemy również kwotę
        }
    };

    return (
        isOpen && (
            <div className="modal-overlay">
                <div className="modal-content">
                    <h2>Transfer Details</h2>

                    {/* Pole do opisu przelewu */}
                    <textarea
                        placeholder="Enter a description for the transfer"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="transfer-description"
                    />

                    {/* Pole do kwoty przelewu */}
                    <input
                        type="number"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="transfer-amount"
                        min="0.01"
                        step="0.01"
                    />

                    <div className="modal-buttons">
                        <button onClick={closeModal}>Cancel</button>
                        <button onClick={handleSubmit}>Confirm Transfer</button>
                    </div>
                </div>
            </div>
        )
    );
};

export default TransferModal;

