import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit, Save, X, ArrowLeft, Image as ImageIcon, LayoutDashboard, Wrench, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import { carService } from '../services/carService';
import { uploadImage } from '../services/cloudinaryService';

const AdminPage = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        id: '',
        marca: '',
        modelo: '',
        precio: '',
        imagenes: [], // Estructura: [{ url: string, portada: boolean }]
        categoria: 'SUV',
        descripcion: '',
        especificaciones: { motor: '', potencia: '', aceleracion: '', velocidadMax: '' },
        estado: 'disponible'
    });

    const CATEGORIES = ['SUV', 'Deportivo', 'Supercar', 'Berlina', 'Coupé'];

    const fetchCars = async () => {
        setLoading(true);
        const data = await carService.getCars();
        setCars(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchCars();
    }, []);

    const handleEdit = (car) => {
        // Asegurar que el formato de imágenes sea el correcto para el estado
        const formattedCar = {
            ...car,
            imagenes: car.imagenes || (car.images ? car.images.map((url, i) => ({ url, portada: i === 0 })) : [])
        };
        setFormData(formattedCar);
        setEditingId(car.id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este vehículo?')) {
            await carService.deleteCar(id);
            fetchCars();
        }
    };

    const handleFileChange = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        setUploading(true);
        try {
            const uploadPromises = files.map(file => uploadImage(file));
            const uploadedUrls = await Promise.all(uploadPromises);

            const newImages = uploadedUrls.map((url, index) => ({
                url,
                portada: formData.imagenes.length === 0 && index === 0 // Solo el primero si la galería estaba vacía
            }));

            // Si la galería estaba vacía, el primer subido debe ser portada
            if (formData.imagenes.length === 0 && newImages.length > 0) {
                newImages[0].portada = true;
            }

            setFormData(prev => ({
                ...prev,
                imagenes: [...prev.imagenes, ...newImages]
            }));
        } catch (error) {
            alert("Error al subir imágenes");
        } finally {
            setUploading(false);
        }
    };

    const removeImage = (index) => {
        setFormData(prev => {
            const newImagenes = prev.imagenes.filter((_, i) => i !== index);
            // Si eliminamos la portada, asignar una nueva si quedan imágenes
            if (prev.imagenes[index]?.portada && newImagenes.length > 0) {
                newImagenes[0].portada = true;
            }
            return {
                ...prev,
                imagenes: newImagenes
            };
        });
    };

    const handleSave = async (e) => {
        e.preventDefault();

        const cleanPrice = typeof formData.precio === 'string'
            ? parseInt(formData.precio.replace(/\./g, '').replace('€', ''))
            : formData.precio;

        const updatedCar = {
            ...formData,
            precio: cleanPrice || 0
        };

        if (editingId && editingId !== 'new') {
            await carService.updateCar(editingId, updatedCar);
        } else {
            await carService.addCar(updatedCar);
        }

        resetForm();
        fetchCars();
    };

    const resetForm = () => {
        setFormData({
            id: '',
            marca: '',
            modelo: '',
            precio: '',
            imagenes: [],
            categoria: 'SUV',
            descripcion: '',
            especificaciones: { motor: '', potencia: '', aceleracion: '', velocidadMax: '' },
            estado: 'disponible'
        });
        setEditingId(null);
        setUploading(false);
    };

    if (loading) return <div style={{ color: 'white', textAlign: 'center', padding: '10rem' }}>Cargando Inventario...</div>;

    return (
        <div style={{ background: 'var(--color-black)', minHeight: '100vh', padding: '8rem 0' }}>
            <div className="container">
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
                    <div>
                        <Link to="/" style={{ color: 'var(--color-silver)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                            <ArrowLeft size={18} /> Volver a la Web
                        </Link>
                        <h1 style={{ fontSize: '3rem' }}>Gestión de <span className="silver-text">Inventario</span></h1>
                    </div>
                    <button
                        onClick={() => setEditingId('new')}
                        className="btn-primary"
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        <Plus size={20} /> Añadir Vehículo
                    </button>
                </div>

                {/* Inventory List */}
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    {cars.map(car => (
                        <div key={car.id} style={{
                            background: 'var(--color-anthracite)',
                            padding: '1.5rem 2rem',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '2rem',
                            border: '1px solid var(--color-dark-gray)'
                        }}>
                            <img src={car.imagenes?.[0]?.url || car.images?.[0] || car.imagenUrl} alt="" style={{ width: '100px', height: '60px', borderRadius: '4px', objectFit: 'cover' }} />
                            <div style={{ flex: 1 }}>
                                <h3 style={{ margin: 0 }}>{car.marca} {car.modelo}</h3>
                                <span className="silver-text" style={{ fontSize: '0.875rem' }}>{(car.precio || 0).toLocaleString()}€ | {car.categoria}</span>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button onClick={() => handleEdit(car)} className="btn-secondary" style={{ padding: '0.5rem 1rem' }}><Edit size={16} /></button>
                                <button onClick={() => handleDelete(car.id)} style={{ color: '#ff4444', padding: '0.5rem' }}><Trash2 size={20} /></button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* MODAL EDITOR */}
                <AnimatePresence>
                    {editingId !== null && (
                        <div style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 1000,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '2rem'
                        }}>
                            {/* Overlay */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={resetForm}
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'rgba(0,0,0,0.85)',
                                    backdropFilter: 'blur(8px)'
                                }}
                            />

                            {/* Modal Content */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                                style={{
                                    position: 'relative',
                                    background: 'var(--color-anthracite)',
                                    width: '100%',
                                    maxWidth: '900px',
                                    maxHeight: '85vh',
                                    overflowY: 'auto',
                                    borderRadius: '24px',
                                    border: '1px solid var(--color-dark-gray)',
                                    boxShadow: '0 30px 60px rgba(0,0,0,0.5)'
                                }}
                            >
                                <div style={{ padding: '3rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                                        <h2 style={{ fontSize: '2rem' }}>
                                            {editingId === 'new' ? 'Añadir ' : 'Editar '}
                                            <span className="silver-text">Vehículo</span>
                                        </h2>
                                        <button onClick={resetForm} style={{ color: 'var(--color-gray)' }}>
                                            <X size={24} />
                                        </button>
                                    </div>

                                    <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>

                                        {/* SECTION 1: BASIC INFO */}
                                        <section>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', color: 'var(--color-silver)' }}>
                                                <LayoutDashboard size={20} />
                                                <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Información Básica</h3>
                                            </div>
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                                                <div style={inputGroup}>
                                                    <label style={labelStyle}>Marca</label>
                                                    <input required style={inputStyle} value={formData.marca} onChange={e => setFormData({ ...formData, marca: e.target.value })} placeholder="Ej: Lamborghini" />
                                                </div>
                                                <div style={inputGroup}>
                                                    <label style={labelStyle}>Modelo</label>
                                                    <input required style={inputStyle} value={formData.modelo} onChange={e => setFormData({ ...formData, modelo: e.target.value })} placeholder="Ej: Urus" />
                                                </div>
                                                <div style={inputGroup}>
                                                    <label style={labelStyle}>Precio (€)</label>
                                                    <input required style={inputStyle} value={formData.precio} onChange={e => setFormData({ ...formData, precio: e.target.value })} placeholder="Ej: 350000" />
                                                </div>
                                                <div style={inputGroup}>
                                                    <label style={labelStyle}>Categoría</label>
                                                    <select
                                                        style={inputStyle}
                                                        value={formData.categoria}
                                                        onChange={e => setFormData({ ...formData, categoria: e.target.value })}
                                                    >
                                                        {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                                    </select>
                                                </div>
                                                <div style={{ ...inputGroup, gridColumn: 'span 2' }}>
                                                    <label style={labelStyle}>Descripción</label>
                                                    <textarea required style={{ ...inputStyle, minHeight: '120px' }} value={formData.descripcion} onChange={e => setFormData({ ...formData, descripcion: e.target.value })} />
                                                </div>
                                            </div>
                                        </section>

                                        {/* SECTION 2: SPECS */}
                                        <section>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', color: 'var(--color-silver)' }}>
                                                <Wrench size={20} />
                                                <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Especificaciones Técnicas</h3>
                                            </div>
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                                                <div style={inputGroup}>
                                                    <label style={labelStyle}>Motor</label>
                                                    <input style={inputStyle} value={formData.especificaciones.motor} onChange={e => setFormData({ ...formData, especificaciones: { ...formData.especificaciones, motor: e.target.value } })} />
                                                </div>
                                                <div style={inputGroup}>
                                                    <label style={labelStyle}>Potencia</label>
                                                    <input style={inputStyle} value={formData.especificaciones.potencia} onChange={e => setFormData({ ...formData, especificaciones: { ...formData.especificaciones, potencia: e.target.value } })} />
                                                </div>
                                                <div style={inputGroup}>
                                                    <label style={labelStyle}>Aceleración</label>
                                                    <input style={inputStyle} value={formData.especificaciones.aceleracion} onChange={e => setFormData({ ...formData, especificaciones: { ...formData.especificaciones, aceleracion: e.target.value } })} />
                                                </div>
                                                <div style={inputGroup}>
                                                    <label style={labelStyle}>Velocidad Máx</label>
                                                    <input style={inputStyle} value={formData.especificaciones.velocidadMax} onChange={e => setFormData({ ...formData, especificaciones: { ...formData.especificaciones, velocidadMax: e.target.value } })} />
                                                </div>
                                            </div>
                                        </section>

                                        {/* SECTION 3: GALLERY */}
                                        <section>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', color: 'var(--color-silver)' }}>
                                                <Camera size={20} />
                                                <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Galería de Imágenes</h3>
                                            </div>

                                            <div style={{ marginBottom: '2rem' }}>
                                                <label
                                                    style={{
                                                        ...inputStyle,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        gap: '1rem',
                                                        cursor: 'pointer',
                                                        border: '2px dashed var(--color-dark-gray)',
                                                        padding: '2rem'
                                                    }}
                                                >
                                                    {uploading ? (
                                                        <span>Subiendo imágenes...</span>
                                                    ) : (
                                                        <>
                                                            <ImageIcon size={24} />
                                                            <span>Seleccionar o arrastrar imágenes</span>
                                                        </>
                                                    )}
                                                    <input
                                                        type="file"
                                                        multiple
                                                        accept="image/*"
                                                        onChange={handleFileChange}
                                                        style={{ display: 'none' }}
                                                        disabled={uploading}
                                                    />
                                                </label>
                                            </div>

                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1.5rem' }}>
                                                {formData.imagenes.map((img, idx) => (
                                                    <div key={idx} style={{
                                                        position: 'relative',
                                                        borderRadius: '12px',
                                                        overflow: 'hidden',
                                                        aspectRatio: '16/10',
                                                        border: img.portada ? '2px solid var(--color-silver)' : '1px solid var(--color-dark-gray)'
                                                    }}>
                                                        <img src={img.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                        <div style={{
                                                            position: 'absolute',
                                                            bottom: 0, insetInline: 0,
                                                            background: img.portada ? 'var(--color-silver)' : 'rgba(0,0,0,0.6)',
                                                            padding: '0.4rem',
                                                            fontSize: '0.65rem',
                                                            textAlign: 'center',
                                                            color: img.portada ? 'black' : 'white',
                                                            fontWeight: img.portada ? 700 : 400
                                                        }}>
                                                            {img.portada ? 'PORTADA' : `Imagen ${idx + 1}`}
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeImage(idx)}
                                                            style={{ position: 'absolute', top: '5px', right: '5px', background: 'rgba(255,0,0,0.7)', color: 'white', borderRadius: '50%', padding: '4px' }}
                                                        >
                                                            <X size={12} />
                                                        </button>
                                                        {!img.portada && (
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    const newImgs = formData.imagenes.map((im, i) => ({ ...im, portada: i === idx }));
                                                                    setFormData({ ...formData, imagenes: newImgs });
                                                                }}
                                                                style={{ position: 'absolute', top: '5px', left: '5px', background: 'rgba(255,255,255,0.2)', color: 'white', borderRadius: '4px', padding: '2px 5px', fontSize: '0.5rem' }}
                                                            >
                                                                Set Portada
                                                            </button>
                                                        )}
                                                    </div>
                                                ))}
                                                {formData.imagenes.length === 0 && !uploading && (
                                                    <div style={{ gridColumn: '1/-1', padding: '3rem', border: '2px dashed var(--color-dark-gray)', borderRadius: '12px', textAlign: 'center', color: 'var(--color-gray)' }}>
                                                        No hay imágenes añadidas. La primera será la portada.
                                                    </div>
                                                )}
                                            </div>
                                        </section>

                                        {/* ACTIONS */}
                                        <div style={{ display: 'flex', gap: '1.5rem', paddingTop: '2rem', borderTop: '1px solid var(--color-dark-gray)' }}>
                                            <button type="submit" className="btn-primary" style={{ flex: 1, padding: '1.25rem' }}>
                                                <Save size={20} style={{ marginRight: '0.5rem' }} /> Guardar Vehículo
                                            </button>
                                            <button type="button" onClick={resetForm} className="btn-secondary" style={{ flex: 1 }}>
                                                Cancelar
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

const inputGroup = { display: 'flex', flexDirection: 'column', gap: '0.75rem' };
const labelStyle = { fontSize: '0.75rem', color: 'var(--color-gray)', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 700 };
const inputStyle = {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid var(--color-dark-gray)',
    padding: '1.2rem',
    color: 'white',
    borderRadius: '12px',
    outline: 'none',
    fontSize: '1rem',
    transition: 'border-color 0.3s ease',
    ':focus': { borderColor: 'var(--color-silver)' }
};

export default AdminPage;
