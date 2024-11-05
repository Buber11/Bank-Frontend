import './ClientDashboard.css';
import React, { useEffect, useState } from 'react';
import FinancialChart from "../financialChart/FinancialChart";

const ClientDashboard = () => {
  const [accounts, setAccounts] = useState([]);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [error, setError] = useState(null);
  const [transactionsIn, setTransactionsIn] = useState([]);
  const [transactionsOut, setTransactionsOut] = useState([]);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferData, setTransferData] = useState({
    amount: '',
    payeeAccount: '',
    description: '',
  });

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
    };

    try {
      const response = await fetch('https://localhost:8443/api/v1/transactions', {
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

  const openTransferModal = () => setShowTransferModal(true);
  const closeTransferModal = () => setShowTransferModal(false);

  // Fetch all accounts using async/await
  const fetchAccounts = async () => {
    try {
      const response = await fetch('https://localhost:8443/api/v1/accounts', {
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
      console.log("Fetched accounts:", data); // Log fetched accounts
      setAccounts(data);
      if (data.length > 0) {
        setCurrentAccount(data[0]); // Set the first account as the current one
      }
    } catch (error) {
      console.error('Error fetching accounts:', error);
      setError(error.message);
    }
  };

  // Fetch transactions using async/await
  const fetchTransactions = async (link) => {
    try {
      // Remove 'sortBy' from the link if present
      const cleanLink = link.split('{')[0]; // Removes everything after '{'
      console.log("Fetching transactions from:", cleanLink); // Log the clean link

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
      console.log("Fetched transaction data:", data); // Log fetched transaction data

      // Check if transactionsIn or transactionsOut exist
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

  useEffect(() => {
    fetchAccounts(); // Call fetchAccounts on component mount
  }, []);

  return (
      <div className="dashboard">
        <aside className="sidebar">
          <h2>PeoplePay</h2>
          <ul className="menu">
            <li><a href="#overview">Overview</a></li>
            <li><a href="#transfers">Transfers</a></li>
            <li><a href="#transactions">Transactions</a></li>
            <li><a href="#settings">Settings</a></li>
            <li><a href="#support">Support</a></li>
          </ul>
        </aside>

        <main className="content">
          <header className="header">
            <h1>Client Dashboard</h1>
            <button className="logout">Logout</button>
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
                        <h4>Account Type</h4>
                        <p>{currentAccount.accountType}</p>
                      </div>
                      <div>
                        <h4>Available Balance</h4>
                        <p>${currentAccount.balance}</p>
                      </div>
                    </div>

                    <div className="account-buttons">
                      <button onClick={openTransferModal}>New Transfer</button>
                      <button onClick={() => fetchTransactions(currentAccount.links[1].href)}>Incoming</button>
                      <button onClick={() => fetchTransactions(currentAccount.links[2].href)}>Outgoing</button>
                    </div>
                  </div>
                </div>
            )}
          </section>

          <section id="transactions" className="section transactions">
            <h2>Transactions</h2>
            <div className="transaction-cards">
              <div className="transaction-card incoming">
                <h3>Incoming Transactions</h3>
                <ul>
                  {Array.isArray(transactionsIn) && transactionsIn.length > 0 ? (
                      transactionsIn.map((transaction, index) => (
                          <li key={index}>
                            + ${transaction.amount} - {transaction.description}
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
                <h3>Outgoing Transactions</h3>
                <ul>
                  {Array.isArray(transactionsOut) && transactionsOut.length > 0 ? (
                      transactionsOut.map((transaction, index) => (
                          <li key={index}>
                            - ${transaction.amount} - {transaction.description}
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

          <section id="chart" className="section chart">
            <h2>Financial Chart</h2>
              <FinancialChart transactionsIn={transactionsIn} transactionsOut={transactionsOut}/>
          </section>

        </main>

        {/* Modal for New Transfer */}
        {showTransferModal && (
            <div className="modal-overlay">
              <div className="modal">
              <button className="close-button" onClick={closeTransferModal}>X</button>
                <h2>New Transfer</h2>
                <form className="transfer-form" onSubmit={handleTransferSubmit}>
                  <label>
                    Payee Account Number
                    <input type="text" name="payeeAccount" value={transferData.payeeAccount} onChange={handleInputChange} required />
                  </label>
                  <label>
                    Amount
                    <input type="number" name="amount" value={transferData.amount} onChange={handleInputChange} required />
                  </label>
                  <label>
                    Description
                    <input type="text" name="description" value={transferData.description} onChange={handleInputChange} />
                  </label>
                  <button type="submit" className="submit-button">Send Transfer</button>
                </form>
              </div>
            </div>
        )}
      </div>
  );
};

export default ClientDashboard;
