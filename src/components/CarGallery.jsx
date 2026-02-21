import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
const CarGallery = ({ cars }) => {
    return (
        <section className="section" id="catalogo">
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        style={{ fontSize: '3rem', marginBottom: '1rem' }}
                    >
                        Colección <span className="silver-text">Exclusiva</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        viewport={{ once: true }}
                        style={{ color: 'var(--color-gray)', maxWidth: '600px', margin: '0 auto' }}
                    >
                        Una selección meticulosa de los vehículos más potentes y refinados del mercado actual.
                    </motion.p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                    gap: '2rem'
                }}>
                    {cars.map((car, index) => (
                        <motion.div
                            key={car.id}
                            className="premium-card group"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{
                                y: -10,
                                scale: 1.03,
                                boxShadow: "0 20px 40px rgba(0,0,0,0.8)"
                            }}
                            style={{ transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', cursor: 'pointer' }}
                        >
                            <Link to={`/car/${car.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div style={{ height: '250px', overflow: 'hidden', position: 'relative' }}>
                                    <motion.img
                                        src={
                                            car.imagenes?.find(img => img.portada)?.url ||
                                            car.imagenes?.[0]?.url ||
                                            car.images?.[0] ||
                                            car.imagenUrl
                                        }
                                        alt={`${car.marca} ${car.modelo}`}
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.6 }}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                                <div style={{ padding: '1.5rem' }}>
                                    <span style={{ color: 'var(--color-silver)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                        {car.categoria}
                                    </span>
                                    <h3 style={{ margin: '0.5rem 0', fontSize: '1.5rem' }}>{car.marca} {car.modelo}</h3>
                                    <p style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                                        Desde <span className="silver-text">{(car.precio || 0).toLocaleString()}€</span>
                                    </p>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        color: 'var(--color-silver)',
                                        fontSize: '0.9rem',
                                        fontWeight: 700,
                                        textTransform: 'uppercase',
                                        marginTop: '1rem'
                                    }}>
                                        Ver detalles <ArrowRight size={16} />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default CarGallery
