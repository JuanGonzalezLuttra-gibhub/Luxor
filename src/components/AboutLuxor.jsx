import React from 'react';
import { motion } from 'framer-motion';
import techocochesverde from "../Recursos/techocochesverde.png"

const AboutLuxor = () => {
    return (
        <section className="section" style={{
            background: 'var(--color-black)',
            padding: '8rem 0',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Cinematic Background Layer */}
            <div style={{
                position: 'absolute',
                inset: 0,
                zIndex: 0
            }}>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${techocochesverde})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.1,
                    transform: 'scale(1.05)',
                    filter: 'grayscale(1) contrast(1.2)'
                }} />
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, var(--color-black) 0%, transparent 15%, transparent 85%, var(--color-black) 100%), radial-gradient(circle at center, transparent 0%, var(--color-black) 90%)',
                    zIndex: 1
                }} />
            </div>

            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        style={{ fontSize: '3rem', marginBottom: '2rem' }}
                    >
                        Sobre <span className="silver-text">Luxor</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        viewport={{ once: true }}
                        style={{
                            fontSize: '1.25rem',
                            lineHeight: 1.8,
                            color: 'var(--color-gray)',
                            marginBottom: '3rem'
                        }}
                    >
                        Descubre el lujo y el estilo sobre ruedas con Luxor Car Rental SL.
                        Especialistas en alquiler y venta de vehículos de alta gama, ubicados en Madrid y disponibles en toda España.
                        Cada vehículo representa exclusividad, potencia y una experiencia única de conducción.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        viewport={{ once: true }}
                    >
                        <motion.a
                            href="https://wa.me/34727762434"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{ padding: '1.25rem 3rem', display: 'inline-block' }}
                        >
                            Consultar por WhatsApp
                        </motion.a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutLuxor;
