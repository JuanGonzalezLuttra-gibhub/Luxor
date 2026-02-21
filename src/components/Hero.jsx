import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, Quote, Mail } from 'lucide-react'
import doblecoche from "../Recursos/doblecoche.png"

const Hero = () => {
    return (
        <section className="hero" style={{
            height: '100vh',
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            background: 'var(--color-black)'
        }}>
            {/* Cinematic Background Layer */}
            <div style={{
                position: 'absolute',
                inset: 0,
                zIndex: 0,
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${doblecoche})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    opacity: 0.3,
                    transform: 'none',
                    filter: 'none'
                }} />
                {/* Overlay & Gradients */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%), linear-gradient(to bottom, transparent 0%, var(--color-black) 100%)',
                    zIndex: 1
                }} />
            </div>

            <div className="container" style={{ padding: '4rem 0', position: 'relative', zIndex: 2 }}>
                <div className="hero-content" style={{ maxWidth: '800px' }}>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', fontWeight: 800, marginBottom: '2.5rem', lineHeight: 1.1 }}
                    >
                        Conduce el <span className="silver-text">Lujo</span><br />
                        Vive la <span className="silver-text">Exclusividad</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        style={{ fontSize: '1.25rem', color: 'var(--color-gray)', marginBottom: '3.5rem', maxWidth: '600px', lineHeight: 1.6 }}
                    >
                        Acceso ilimitado a los vehículos más aspiracionales del mundo. Venta y alquiler de alto standing.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}
                    >
                        <motion.a
                            href="https://wa.me/34727762434"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary"
                            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1.25rem 2.5rem' }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Consultar por WhatsApp
                        </motion.a>
                    </motion.div>
                </div>
            </div>

            {/* Decorative Silver Line */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, var(--color-silver), transparent)'
            }} />
        </section>
    )
}

export default Hero
