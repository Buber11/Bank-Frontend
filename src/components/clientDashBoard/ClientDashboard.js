// src/components/clientDashboard/ClientDashboard.js

import React from 'react';
import './ClientDashboard.css';

const ClientDashboard = () => {
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
          <div className="cards">
            <div className="card">
              <h3>Available Balance</h3>
              <p>$4,567.89</p>
            </div>
          </div>
        </section>

        <section id="transactions" className="section transactions">
          <h2>Transactions</h2>
          <div className="transaction-cards">
            <div className="transaction-card incoming">
              <h3>Incoming Transactions</h3>
              <ul>
                <li>+ $100.00 - Salary</li>
                <li>+ $50.00 - Refund</li>
                <li>+ $20.00 - Cashback</li>
              </ul>
            </div>
            <div className="transaction-card outgoing">
              <h3>Outgoing Transactions</h3>
              <ul>
                <li>- $40.00 - Grocery Store</li>
                <li>- $150.00 - Online Shopping</li>
                <li>- $10.00 - Coffee Shop</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="transfers" className="section">
          <h2>Transfers</h2>
          <div className="transfer-buttons">
            <button className="button">Local Transfer</button>
            <button className="button">International Transfer</button>
            <button className="button">Recurring Transfers</button>
            <button className="button">Phone Transfer</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ClientDashboard;