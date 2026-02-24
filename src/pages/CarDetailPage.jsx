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

    // Normalización de imágenes: soporta array de objetos {url} o array de strings
    const images = (car.imagenes || car.images || [car.imagenUrl]).map(img =>
        typeof img === 'string' ? img : (img?.url || '')
    ).filter(url => url !== '');

    // Fallback estructural para especificaciones
    const specs = car.especificaciones || {};

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="page-detail"
            style={{ background: 'var(--color-black)', minHeight: '100vh', padding: '6rem 1.5rem' }}
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

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'start' }}>
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

                        <div style={{ marginBottom: '2.5rem' }}>
                            {(car.tipoOperacion === 'venta' || car.tipoOperacion === 'ambos' || !car.tipoOperacion) && (
                                <div style={{ fontSize: '2rem', fontWeight: 800 }}>
                                    Precio venta: <span className="silver-text">{(car.precioVenta || car.precio || 0).toLocaleString()}€</span>
                                </div>
                            )}
                            {(car.tipoOperacion === 'alquiler' || car.tipoOperacion === 'ambos' || !car.tipoOperacion) && (
                                <div style={{ marginTop: car.tipoOperacion === 'ambos' ? '1rem' : '0' }}>
                                    <h3 style={{ fontSize: '1.25rem', color: 'var(--color-silver)', marginBottom: '0.5rem', fontWeight: 700 }}>Alquiler:</h3>
                                    <p style={{ color: 'var(--color-gray)', fontSize: '1.125rem' }}>Tarifa personalizada según duración y temporada.</p>
                                </div>
                            )}
                        </div>

                        <p style={{ color: 'var(--color-gray)', fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '3rem' }}>
                            {car.descripcion}
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '4rem' }}>
                            <div style={specItem}>
                                <label style={specLabel}>Motor</label>
                                <div style={specValue}>{specs.motor || '-'}</div>
                            </div>
                            <div style={specItem}>
                                <label style={specLabel}>Potencia</label>
                                <div style={specValue}>{specs.potencia || '-'}</div>
                            </div>
                            <div style={specItem}>
                                <label style={specLabel}>0-100 km/h</label>
                                <div style={specValue}>{specs.aceleracion || '-'}</div>
                            </div>
                            <div style={specItem}>
                                <label style={specLabel}>V. Máxima</label>
                                <div style={specValue}>{specs.velocidadMax || '-'}</div>
                            </div>
                        </div>

                        <motion.a
                            href={`https://wa.me/34727762434?text=${encodeURIComponent(`Hola estoy interesado en el ${car.marca} ${car.modelo}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary btn-sheen"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.96 }}
                            transition={{ type: 'tween', duration: 0.12 }}
                            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', padding: '1.5rem' }}
                        >
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style={{ flexShrink: 0 }}>
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.89 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.412.001 12.048c0 2.123.554 4.197 1.604 6.037L0 24l6.105-1.602a11.834 11.834 0 005.942 1.601h.006c6.635 0 12.044-5.415 12.048-12.051a11.82 11.82 0 00-3.526-8.51z" />
                            </svg>
                            Consultar disponibilidad
                        </motion.a>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default CarDetailPage
