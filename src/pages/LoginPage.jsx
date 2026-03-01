import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/admin');
        } catch (err) {
            setError('Credenciales incorrectas o error de conexión.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            background: 'var(--color-black)',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
        }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    background: 'var(--color-anthracite)',
                    padding: '3rem',
                    borderRadius: '24px',
                    border: '1px solid var(--color-dark-gray)',
                    width: '100%',
                    maxWidth: '400px',
                    textAlign: 'center'
                }}
            >
                <div style={{ marginBottom: '2rem' }}>
                    {/* Placeholder for Logo, since no specific logo image was provided, just text or simple icon */}
                    <h2 style={{ fontSize: '2rem', margin: 0 }}>LUXOR</h2>
                </div>

                <h1 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: 'var(--color-silver)' }}>
                    Acceso Administración
                </h1>

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'left' }}>
                        <label style={{ fontSize: '0.75rem', color: 'var(--color-gray)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid var(--color-dark-gray)',
                                padding: '1rem',
                                color: 'white',
                                borderRadius: '8px',
                                outline: 'none',
                                transition: 'border-color 0.3s',
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'var(--color-silver)'}
                            onBlur={(e) => e.target.style.borderColor = 'var(--color-dark-gray)'}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'left' }}>
                        <label style={{ fontSize: '0.75rem', color: 'var(--color-gray)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid var(--color-dark-gray)',
                                padding: '1rem',
                                color: 'white',
                                borderRadius: '8px',
                                outline: 'none',
                                transition: 'border-color 0.3s',
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'var(--color-silver)'}
                            onBlur={(e) => e.target.style.borderColor = 'var(--color-dark-gray)'}
                        />
                    </div>

                    {error && (
                        <div style={{ color: '#ff4444', fontSize: '0.875rem' }}>
                            {error}
                        </div>
                    )}

                    <motion.button
                        type="submit"
                        disabled={loading}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            background: 'linear-gradient(135deg, #c0c0c0 0%, #a0a0a0 100%)',
                            color: 'black',
                            border: 'none',
                            padding: '1rem',
                            borderRadius: '8px',
                            fontWeight: 'bold',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            marginTop: '1rem',
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? 'Accediendo...' : 'Entrar'}
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default LoginPage;
