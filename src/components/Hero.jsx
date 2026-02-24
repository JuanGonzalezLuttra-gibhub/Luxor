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

            <div className="container" style={{ padding: '6rem 1.5rem', position: 'relative', zIndex: 2 }}>
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
                            className="btn-primary btn-sheen"
                            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1.25rem 2.5rem' }}
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            transition={{ type: 'tween', duration: 0.12 }}
                        >
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style={{ flexShrink: 0 }}>
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.89 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.412.001 12.048c0 2.123.554 4.197 1.604 6.037L0 24l6.105-1.602a11.834 11.834 0 005.942 1.601h.006c6.635 0 12.044-5.415 12.048-12.051a11.82 11.82 0 00-3.526-8.51z" />
                            </svg>
                            Consultar disponibilidad
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
