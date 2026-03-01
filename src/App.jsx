import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CarDetailPage from './pages/CarDetailPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import WhatsAppFloating from './components/WhatsAppFloating';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebase';

function App() {
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setAuthLoading(false);
        });
        return () => unsubscribe();
    }, []);

    if (authLoading) {
        return <div style={{ background: 'var(--color-black)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>Cargando...</div>;
    }

    return (
        <div className="app-wrapper">
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/car/:id" element={<CarDetailPage />} />
                <Route path="/admin" element={user ? <AdminPage /> : <LoginPage />} />
            </Routes>
            <Footer />
            <WhatsAppFloating />
        </div>
    );
}

export default App;
