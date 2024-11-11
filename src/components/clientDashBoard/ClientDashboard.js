import './ClientDashboard.css';
import React, { useEffect, useState } from 'react';
import FinancialChart from "../financialChart/FinancialChart";
import Modal from 'react-modal';
import CurrencyModal from './CurrencyModal';
import {Link} from "react-router-dom";
import { useAuth } from '../../AuthContext';
import { useCurrentAccount } from '../contact/CurrentAccountContext';
import { FaUserPlus, FaSignOutAlt, FaCalculator, FaEnvelope, FaMoneyBillAlt, FaExchangeAlt, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

const ClientDashboard = () => {
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState(null);
  const [transactionsIn, setTransactionsIn] = useState([]);
  const [transactionsOut, setTransactionsOut] = useState([]);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const { isLoggedIn, role, logout } = useAuth();
  const { currentAccount, setCurrentAccount } = useCurrentAccount();


  const [transferData, setTransferData] = useState({
    amount: '',
    payeeAccount: '',
    currency: '',
    description: '',
  });

  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    countryOfOrigin: '',
    phoneNumber: '',
    pesel: '',
    sex: '',
  });

  const openEditUserModal = () => setShowEditUserModal(true);
  const closeEditUserModal = () => setShowEditUserModal(false);


  const fetchUserData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        console.error("Error fetching user data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const navigate = useNavigate();
  const handleDeactivate = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/auth/deactivate`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.status === 204) {
        navigate("/")
        logout()
      } else {
        console.error("Error deactivating account:", response.statusText);
      }
    } catch (error) {
      console.error("Error deactivating account:", error);
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransferData((prevData) => ({ ...prevData, [name]: value }));
  };


  const handleTransferSubmit = async (e) => {
    e.preventDefault();

    const transactionRequest = {
      hostAccountNumber: currentAccount.accountNumber,
      amount: parseFloat(transferData.amount),
      payeeAccountNumber: transferData.payeeAccount,
      description: transferData.description,
      transactionType: "TRANSFER",
      currency: transferData.currency,
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionRequest),
        credentials: 'include',
      });

      if (response.ok) {
        console.log("Transfer successful!");
        closeTransferModal();
        fetchAccounts();
        setTransferData({ payeeAccount: '', amount: '', description: '' });
      } else {
        console.error("Transfer failed!");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  // Open transfer modal
  const openTransferModal = () => setShowTransferModal(true);
  const closeTransferModal = () => setShowTransferModal(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openCurrencyModal = () => {
    setIsModalOpen(true);
  };

  const closeCurrencyModal = () => {
    setIsModalOpen(false);
  };

  // Fetch all accounts
  const fetchAccounts = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/accounts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched accounts:", data);
      setAccounts(data);
      if (data.length > 0) {
        setCurrentAccount(data[0]);
      }
    } catch (error) {
      console.error('Error fetching accounts:', error);
      setError(error.message);
    }
  };

  // Fetch transactions
  const fetchTransactions = async (link) => {
    try {
      const cleanLink = link.split('{')[0];
      console.log("Fetching transactions from:", cleanLink);

      const response = await fetch(cleanLink, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched transaction data:", data);

      if (link.includes('in')) {
        setTransactionsIn(data.content);
      }
      if (link.includes('out')) {
        setTransactionsOut(data.content);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  // Handle user data change
  const handleUserDataChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle saving updated user data
  const handleSaveUserData = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/user`, {
        method: 'PUT', // Assuming PUT request for updating user data
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        credentials: 'include',
      });

      if (response.ok) {
        console.log("User data updated successfully");
        closeEditUserModal();
        fetchUserData();
      } else {
        console.error("Failed to update user data:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleCurrencyChange = async (numberAccount, selectedCurrency) => {
    let url = `${process.env.REACT_APP_API_URL}/api/v1/accounts/${numberAccount}/currency?cur=${selectedCurrency}`;

    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',  // Dodaj ciasteczka jeśli są wymagane
      });

      if (response.ok) {
        fetchAccounts(); // Po udanej zmianie waluty załaduj ponownie konta
      } else {
        const errorText = await response.text(); // Zbierz pełny tekst błędu
        console.error("Failed to update currency:", errorText);
      }
    } catch (error) {
      console.error("Error updating currency:", error);
    }
  };

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // useEffect to fetch accounts and user data
  useEffect(() => {
    fetchAccounts();
    fetchUserData();
  }, []);

  return (
      <div className="dashboard">

          <button className="hamburger" onClick={toggleSidebar}>
            <FaBars/>
          </button>

          <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
            <h2>Liberty Bank</h2>
            <ul className="menu">
              {/* Sidebar links */}
              <li><a onClick={openEditUserModal}><FaUserPlus/> My Account</a></li>
              <li><Link to="/contact-us"><FaEnvelope/> Contact with us</Link></li>
              <li><Link to={"/currency-calculator"}><FaCalculator/> Calculator</Link></li>
              {role === "COMPANY" && (
                  <li><Link to={"/contact"}><FaMoneyBillAlt/> Your Contacts</Link></li>
              )}
              <li><Link onClick={logout} to="/"><FaSignOutAlt/> Logout</Link></li>
            </ul>
          </aside>

          <main className="content">
            <header className="header">
              <h1>Client Dashboard</h1>
              <button onClick={handleDeactivate} className="deactivate">
                <FaExchangeAlt/> Deactivate Account
              </button>
            </header>

            <section id="overview" className="section overview">
              <h2>Account Overview</h2>
              {currentAccount && (
                  <div className="cards">
                    <div className="card">
                      <div className="card-details">
                        <div>
                          <h4>Account Number</h4>
                          <p>{currentAccount.accountNumber}</p>
                        </div>
                        <div>
                          <h4>Available Balance</h4>
                          <p>${currentAccount.balance} {currentAccount.currency}</p>
                        </div>
                        <div>
                          <h4>Account Type</h4>
                          <p>{currentAccount.accountType}</p>
                        </div>
                      </div>

                      <div className="account-buttons">
                        <button onClick={openTransferModal}><FaArrowUp/> New Transfer</button>
                        <button onClick={() => fetchTransactions(currentAccount.links[1].href)}><FaArrowDown/> Incoming
                        </button>
                        <button onClick={() => fetchTransactions(currentAccount.links[2].href)}><FaArrowUp/> Outgoing
                        </button>
                        <button onClick={openCurrencyModal}><FaCalculator/> Currency</button>
                      </div>
                    </div>
                  </div>
              )}
            </section>

            <section id="transactions" className="section transactions">
              <h2>Transactions</h2>
              <div className="transaction-cards">
                <div className="transaction-card incoming">
                  <h3><FaArrowDown/> Incoming Transactions</h3>
                  <ul>
                    {Array.isArray(transactionsIn) && transactionsIn.length > 0 ? (
                        transactionsIn.map((transaction, index) => (
                            <li key={index}>
                              <h4>{transaction.hostAccountNumber}</h4>
                              + {transaction.amount + " " + transaction.currency} - {transaction.description}
                              <br/>
                              <small>Date: {new Date(transaction.transactionDate).toLocaleString()}</small>
                            </li>
                        ))
                    ) : (
                        <li>No incoming transactions available.</li>
                    )}
                  </ul>
                </div>
                <div className="transaction-card outgoing">
                  <h3><FaArrowUp/> Outgoing Transactions</h3>
                  <ul>
                    {Array.isArray(transactionsOut) && transactionsOut.length > 0 ? (
                        transactionsOut.map((transaction, index) => (
                            <li key={index}>
                              <h4>{transaction.payeeAccountNumber}</h4>
                              - {transaction.amount + " " + transaction.currency} - {transaction.description}
                              <br/>
                              <small>Date: {new Date(transaction.transactionDate).toLocaleString()}</small>
                            </li>
                        ))
                    ) : (
                        <li>No outgoing transactions available.</li>
                    )}
                  </ul>
                </div>
              </div>
            </section>

            <Modal isOpen={showEditUserModal} onRequestClose={closeEditUserModal} className="modal-content"
                   overlayClassName="modal-overlay">
              <h2 className="user-modal-title">Edit User Information</h2>
              <form onSubmit={handleSaveUserData}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        value={userData.username}
                        onChange={handleUserDataChange}
                        required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleUserDataChange}
                        required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={userData.firstName}
                        onChange={handleUserDataChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={userData.lastName}
                        onChange={handleUserDataChange}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Country of Origin</label>
                    <input
                        type="text"
                        name="countryOfOrigin"
                        value={userData.countryOfOrigin}
                        onChange={handleUserDataChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={userData.phoneNumber}
                        onChange={handleUserDataChange}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>PESEL</label>
                    <input
                        type="text"
                        name="pesel"
                        value={userData.pesel}
                        onChange={handleUserDataChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Sex</label>
                    <select
                        name="sex"
                        value={userData.sex}
                        onChange={handleUserDataChange}
                    >
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
                </div>
                <div className="modal-buttons">
                  <button type="button" onClick={closeEditUserModal}>Cancel</button>
                  <button type="submit">Save Changes</button>
                </div>
              </form>
            </Modal>


            <section id="chart" className="section chart">
              <h2>Financial Chart</h2>
              <FinancialChart transactionsIn={transactionsIn} transactionsOut={transactionsOut}/>
            </section>
          </main>

          {currentAccount && (
              <CurrencyModal
                  isOpen={isModalOpen}
                  onClose={closeCurrencyModal}
                  handleCurrencyChange={handleCurrencyChange}
                  numberAccount={currentAccount.accountNumber}
              />
          )}

          {/* Modal for New Transfer */}
          {showTransferModal && (
              <div className="modal-overlay">
                <div className="modal">
                  <button className="close-button" onClick={closeTransferModal}>X</button>
                  <h2><FaMoneyBillAlt/> New Transfer</h2>
                  <form className="transfer-form" onSubmit={handleTransferSubmit}>
                    <label>
                      Payee Account Number
                      <input
                          type="text"
                          name="payeeAccount"
                          value={transferData.payeeAccount}
                          onChange={handleInputChange}
                          required
                      />
                    </label>
                    <label>
                      Amount
                      <input
                          type="number"
                          name="amount"
                          value={transferData.amount}
                          onChange={handleInputChange}
                          required
                      />
                    </label>
                    <label>
                      Description
                      <input
                          type="text"
                          name="description"
                          value={transferData.description}
                          onChange={handleInputChange}
                      />
                    </label>
                    <button type="submit" className="submit-button"><FaMoneyBillAlt/> Send Transfer</button>
                  </form>
                </div>
              </div>
          )}
        </div>
        );
        };

        export default ClientDashboard;
