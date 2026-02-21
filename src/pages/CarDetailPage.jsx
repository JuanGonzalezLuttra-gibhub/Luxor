import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { carService } from '../services/carService';

const specItem = {
    borderBottom: '1px solid var(--color-dark-gray)',
    paddingBottom: '1rem'
};

const specLabel = {
    display: 'block',
    fontSize: '0.75rem',
    color: 'var(--color-gray)',
    textTransform: 'uppercase',
    marginBottom: '0.25rem',
    fontWeight: 700
};

const specValue = {
    fontSize: '1.25rem',
    fontWeight: 700
};

const CarDetailPage = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchCar = async () => {
            try {
                const data = await carService.getCarById(id);
                setCar(data);
            } catch (error) {
                console.error("Error fetching car details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCar();
    }, [id]);

    if (loading) return <div style={{ minHeight: '100vh', background: 'var(--color-black)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cargando detalles...</div>;
    if (!car) return <div style={{ minHeight: '100vh', background: 'var(--color-black)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Coche no encontrado</div>;

    const images = car.imagenes?.map(img => img.url) || car.images || [car.imagenUrl];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="page-detail"
            style={{ background: 'var(--color-black)', minHeight: '100vh', padding: '8rem 0' }}
        >
            <div className="container">
                <Link
                    to="/"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: 'var(--color-silver)',
                        textDecoration: 'none',
                        marginBottom: '3rem',
                        fontWeight: 600
                    }}
                >
                    <ArrowLeft size={18} /> Volver al catálogo
                </Link>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
                    {/* Left: Image Gallery */}
                    <div>
                        <div style={{
                            borderRadius: '24px',
                            overflow: 'hidden',
                            aspectRatio: '16/10',
                            border: '1px solid var(--color-dark-gray)',
                            background: 'var(--color-anthracite)',
                            marginBottom: '1.5rem'
                        }}>
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={activeImage}
                                    src={images[activeImage]}
                                    alt={`${car.marca} ${car.modelo}`}
                                    initial={{ opacity: 0, scale: 1.05 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4 }}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </AnimatePresence>
                        </div>

                        {/* Thumbnails */}
                        {images.length > 1 && (
                            <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(idx)}
                                        style={{
                                            width: '100px',
                                            height: '65px',
                                            flexShrink: 0,
                                            borderRadius: '12px',
                                            overflow: 'hidden',
                                            border: activeImage === idx ? '2px solid var(--color-silver)' : '1px solid var(--color-dark-gray)',
                                            padding: 0,
                                            background: 'none',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: activeImage === idx ? 1 : 0.5 }} />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Info */}
                    <div>
                        <span style={{ color: 'var(--color-silver)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.875rem' }}>
                            {car.categoria}
                        </span>
                        <h1 style={{ fontSize: '4rem', margin: '1rem 0', fontWeight: 800 }}>{car.marca} <span className="silver-text">{car.modelo}</span></h1>

                        <div style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2.5rem' }}>
                            Desde <span className="silver-text">{(car.precio || 0).toLocaleString()}€</span>
                        </div>

                        <p style={{ color: 'var(--color-gray)', fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '3rem' }}>
                            {car.descripcion}
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '4rem' }}>
                            <div style={specItem}>
                                <label style={specLabel}>Motor</label>
                                <div style={specValue}>{car.especificaciones.motor}</div>
                            </div>
                            <div style={specItem}>
                                <label style={specLabel}>Potencia</label>
                                <div style={specValue}>{car.especificaciones.potencia}</div>
                            </div>
                            <div style={specItem}>
                                <label style={specLabel}>0-100 km/h</label>
                                <div style={specValue}>{car.especificaciones.aceleracion}</div>
                            </div>
                            <div style={specItem}>
                                <label style={specLabel}>V. Máxima</label>
                                <div style={specValue}>{car.especificaciones.velocidadMax}</div>
                            </div>
                        </div>

                        <a
                            href={`https://wa.me/34727762434?text=${encodeURIComponent(`Hola estoy interesado en el ${car.marca} ${car.modelo}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary"
                            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', padding: '1.5rem' }}
                        >
                            Consultar disponibilidad por WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default CarDetailPage
