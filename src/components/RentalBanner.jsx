import React from 'react'
import { motion } from 'framer-motion'

const RentalBanner = () => {
    return (
        <section className="section" style={{ background: 'var(--color-anthracite)' }}>
            <div className="container">
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '3rem',
                    padding: '4rem',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid rgba(192, 192, 192, 0.1)',
                    background: 'linear-gradient(135deg, var(--color-anthracite) 0%, #1a1a1a 100%)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    {/* Subtle silver light effect */}
                    <div style={{ position: 'absolute', top: '-50%', right: '-10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(192, 192, 192, 0.05) 0%, transparent 70%)' }}></div>

                    <div style={{ flex: '1', minWidth: '300px' }}>
                        <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Alquiler <span className="silver-text">Premium</span></h2>
                        <p style={{ fontSize: '1.25rem', color: 'var(--color-gray)', marginBottom: '2rem' }}>
                            "Alquila experiencias que marcan. Confort + potencia para cada ocasión."
                        </p>
                        <motion.button
                            className="btn-primary"
                            style={{ padding: '1.25rem 3rem', fontSize: '1rem' }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Reservar ahora
                        </motion.button>
                    </div>

                    <div style={{ flex: '1', minWidth: '300px' }}>
                        <motion.img
                            src="https://images.unsplash.com/photo-1617469165786-8007eda3caa7?q=80&w=1200&auto=format&fit=crop"
                            alt="Luxury Interior"
                            style={{ width: '100%', borderRadius: '8px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', border: '1px solid var(--color-silver)' }}
                            initial={{ scale: 1.1, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1 }}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default RentalBanner
