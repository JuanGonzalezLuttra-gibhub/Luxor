import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';
import { motion } from 'framer-motion';
import logo from "../Recursos/LuxorLogo.png";

const Footer = () => {
    return (
        <footer id="contacto" style={{
            padding: '6rem 0 4rem',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            background: 'var(--color-black)'
        }}>
            <div className="container" style={{ textAlign: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ marginBottom: '4rem' }}
                >
                    <Link to="/" style={{ display: "inline-block", marginBottom: "2rem" }}>
                        <img
                            src={logo}
                            alt="Luxor Car Rental Logo"
                            style={{
                                height: "120px",
                                width: "auto",
                                objectFit: "contain",
                                filter: "drop-shadow(0 0 20px rgba(192, 192, 192, 0.2))"
                            }}
                        />
                    </Link>
                    <div style={{ color: 'var(--color-silver)', fontSize: '1.25rem', fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                        Luxor Car Rental SL
                    </div>
                    <div style={{ color: 'var(--color-gray)', fontSize: '1rem', letterSpacing: '0.1em' }}>
                        Madrid, España
                    </div>
                </motion.div>

                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '6rem',
                    flexWrap: 'wrap',
                    marginBottom: '4rem',
                    borderTop: '1px solid rgba(255,255,255,0.05)',
                    paddingTop: '4rem'
                }}>
                    <div>
                        <h4 style={{ fontSize: '0.875rem', marginBottom: '1.5rem', color: 'var(--color-white)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Navegación</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem', color: 'var(--color-gray)' }}>
                            <li><a href="#catalogo" className="hover-silver">Catálogo</a></li>
                            <li><a href="#contacto" className="hover-silver">Contacto</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '0.875rem', marginBottom: '1.5rem', color: 'var(--color-white)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Siguenos</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <a href="https://www.instagram.com/luxor.auto/" target="_blank" rel="noopener noreferrer" className="silver-text" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                                <Instagram size={20} /> @luxor.auto
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '0.875rem', marginBottom: '1.5rem', color: 'var(--color-white)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Contacto Directo</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <a href="https://wa.me/34727762434" target="_blank" rel="noopener noreferrer" className="silver-text" style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                                WhatsApp
                            </a>
                            <span style={{ color: 'var(--color-gray)', fontSize: '0.9rem' }}>T: +34 727 76 24 34</span>
                        </div>
                    </div>
                </div>

                <div style={{
                    paddingTop: '3rem',
                    borderTop: '1px solid rgba(255,255,255,0.05)',
                    display: 'flex',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    color: 'rgba(255,255,255,0.3)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em'
                }}>
                    <p>© 2026 Luxor Car Rental SL · Venta y Alquiler de Alto Standing</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
