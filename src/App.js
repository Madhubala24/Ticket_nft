import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavbarMain from './pages/header';
import TickectCode from './pages/tickects';
import Payment from './pages/payment';
import TransactionHistory from './pages/TransactionHistory';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavbarMain />
        <Routes>
          <Route path="/" element={<TickectCode />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/transaction-history" element={<TransactionHistory />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;