import { useState, useEffect } from 'react';
import ContactList from './ContactList';
import AddContactModal from './AddContactModal';
import TransferModal from './TransferModal';
import './ContactPage.css';
import axios from 'axios';
import {useCurrentAccount} from "./CurrentAccountContext";

const ContactPage = () => {
    const [contacts, setContacts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
    const { currentAccount} = useCurrentAccount();

    const fetchContacts = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/v1/contacts`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                setContacts(response.data);
            } else {
                // Handle non-200 responses if necessary
            }
        } catch (error) {
            console.error('Error fetching contacts:', error);
            alert('An error occurred while fetching contacts.');
        }
    };

    const addContact = async (contact) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/v1/contacts`,
                JSON.stringify(contact),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                setContacts([...contacts, contact]);
                alert('The contact was successfully added to the server.');
            } else {
                alert('Failed to add the contact. Please try again.');
            }
        } catch (error) {
            console.error('Error adding contact:', error);
            alert('An error occurred while adding the contact.');
        }
    };

    const handleContactSelection = (contact) => {
        setSelectedContacts((prevState) => {
            if (prevState.includes(contact)) {
                // Deselect contact
                return prevState.filter((c) => c !== contact);
            } else {
                // Select contact
                return [...prevState, contact];
            }
        });
    };

    const handleTransfer = () => {
        if (selectedContacts.length === 0) {
            alert('Please select at least one contact for the transfer.');
            return;
        }

        setIsTransferModalOpen(true);
    };

    const handleTransferWithDescription = async (amount, description) => {
        try {
            console.log("des" + description);
            console.log("amou" + amount)
            const accountNumbers = selectedContacts.map(contact => contact.numberAccount);
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/v1/transactions-group`,
                {
                    hostAccountNumber: currentAccount.accountNumber,
                    payeeAccountNumber: accountNumbers,
                    description: description,
                    amount: amount,
                    transactionType: "TRANSFER",
                    currency: currentAccount.currency,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );

            if (response.status === 204) {
                alert('Transfer completed successfully!');
                setSelectedContacts([]); // Clear selected contacts after transfer
            } else {
                alert('Failed to complete the transfer. Please try again.');
            }

            setIsTransferModalOpen(false); // Zamknij modal po zakończeniu przelewu
        } catch (error) {
            console.error('Error processing transfer:', error);
            alert('An error occurred while processing the transfer.');
            setIsTransferModalOpen(false);
        }
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        fetchContacts();
    }, []);

    return (
        <div className="contact-page">
            <div className="contact-list-container">
                <ContactList
                    contacts={contacts}
                    openModal={openModal}
                    deleteContact={() => {}} // Implement delete contact logic if needed
                    onContactSelect={handleContactSelection} // Pass the contact selection handler
                    selectedContacts={selectedContacts} // Provide selected contacts state
                    handleTransfer={handleTransfer} // Pass handleTransfer to ContactList
                />
            </div>

            <AddContactModal
                isOpen={isModalOpen}
                closeModal={closeModal}
                addContact={addContact}
            />

            {/* TransferModal component */}
            <TransferModal
                isOpen={isTransferModalOpen}
                closeModal={() => setIsTransferModalOpen(false)}
                handleTransferWithDescription={handleTransferWithDescription}
            />
        </div>
    );
};

export default ContactPage;
