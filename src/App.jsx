import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CarDetailPage from './pages/CarDetailPage';
import AdminPage from './pages/AdminPage';
import WhatsAppFloating from './components/WhatsAppFloating';

function App() {
    return (
        <div className="app-wrapper">
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/car/:id" element={<CarDetailPage />} />
                <Route path="/admin" element={<AdminPage />} />
            </Routes>
            <Footer />
            <WhatsAppFloating />
        </div>
    );
}

export default App;
