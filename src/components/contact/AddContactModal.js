import React, { useState } from 'react';
import Modal from 'react-modal';
import './AddContactModal.css'

const AddContactModal = ({ isOpen, closeModal, addContact }) => {
    const [name, setName] = useState('');
    const [numberAccount, setNumberAccount] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && numberAccount) {
            addContact({ name,  numberAccount});
            setName('');
            setNumberAccount('');
            closeModal();
        } else {
            alert("Please fill in both fields.");
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            className="modal-content"
            overlayClassName="modal-overlay"
        >
            <h2>Add New Contact</h2>
            <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Account Number</label>
                    <input
                        type="text"
                        value={numberAccount}
                        onChange={(e) => setNumberAccount(e.target.value)}
                        placeholder="Enter account number"
                        required
                    />
                </div>
                <button type="submit">Add Contact</button>
                <button type="button" onClick={closeModal}>Close</button>
            </form>
        </Modal>
    );
};

export default AddContactModal;
