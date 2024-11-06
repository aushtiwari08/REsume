import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ResumeForm from './pages/ResumeForm';
import Payment from './pages/Payment';
import Preview from './pages/Preview';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create" element={<ResumeForm />} />
            <Route path="/preview" element={<Preview />} />
            <Route path="/payment" element={<Payment />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;