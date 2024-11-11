import React from 'react';
import './ContactList.css';
import { FaUserPlus } from 'react-icons/fa';

const ContactList = ({ contacts, openModal, deleteContact, onContactSelect, selectedContacts, handleTransfer }) => {
    return (
        <div className="contact-list">
            <h2>Contact List</h2>
            {/* Przycisk "Add New Contact" po prawej stronie */}
            <button className="add-contact-btn" onClick={openModal}>
                <FaUserPlus className="add-contact-icon" />
                Add New Contact
            </button>

            {contacts.length === 0 ? (
                <p>No contacts added yet.</p>
            ) : (
                <ul>
                    {contacts.map((contact, index) => (
                        <li key={index} className="contact-item">
                            <input
                                type="checkbox"
                                checked={selectedContacts.includes(contact)}
                                onChange={() => onContactSelect(contact)} // Obsługuje wybór kontaktu
                                className="contact-checkbox"
                            />
                            <strong>{contact.name}</strong> {contact.numberAccount}

                            <button
                                className="delete-contact-btn"
                                onClick={() => deleteContact(index)}
                            >
                                delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {/* Przycisk do wykonania przelewu */}
            {selectedContacts.length > 0 && (
                <button className="transfer-button" onClick={handleTransfer}>
                    Make Transfer
                </button>
            )}
        </div>
    );
};

export default ContactList;
