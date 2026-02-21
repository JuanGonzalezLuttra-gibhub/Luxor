import React from 'react'
import { motion } from 'framer-motion'
import { Phone, Send } from 'lucide-react'

const ContactForm = () => {
    return (
        <section className="section" id="contact">
            <div className="container">
                <div style={{
                    maxWidth: '1000px',
                    margin: '0 auto',
                    background: 'var(--color-anthracite)',
                    padding: '4rem',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid rgba(192, 192, 192, 0.2)',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '4rem'
                }}>
                    <div>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Solicita tu <span className="silver-text">Acceso VIP</span></h2>
                        <p style={{ color: 'var(--color-gray)', marginBottom: '2rem' }}>
                            Nuestro equipo de expertos contactará contigo de forma inmediata para personalizar tu experiencia.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <Phone className="silver-text" size={20} />
                                <span>+34 600 000 000</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <Send className="silver-text" size={20} />
                                <span>info@luxorauto.com</span>
                            </div>
                        </div>
                    </div>

                    <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <input type="text" placeholder="Nombre" style={inputStyle} />
                            <input type="email" placeholder="Email" style={inputStyle} />
                        </div>
                        <input type="tel" placeholder="Teléfono" style={inputStyle} />
                        <textarea placeholder="¿En qué vehículo estás interesado?" rows="4" style={inputStyle}></textarea>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <motion.button
                                type="button"
                                className="btn-primary"
                                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <Phone size={18} /> Agendar Llamada
                            </motion.button>
                            <motion.button
                                type="button"
                                className="btn-secondary"
                                style={{ flex: 1 }}
                                whileHover={{ scale: 1.02 }}
                            >
                                Enviar Mensaje
                            </motion.button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

const inputStyle = {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.1)',
    padding: '1rem',
    borderRadius: '4px',
    color: 'white',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.3s ease'
}

export default ContactForm
