import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import CarGallery from '../components/CarGallery';
import AboutLuxor from '../components/AboutLuxor';
import { carService } from '../services/carService';

function HomePage() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const data = await carService.getCars();
                setCars(data);
            } catch (error) {
                console.error("Error fetching cars:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCars();
    }, []);

    if (loading) return <div className="loading">Cargando Luxor...</div>;

    return (
        <main className="home-page">
            <Hero />
            <CarGallery cars={cars} />
            <AboutLuxor />
        </main>
    );
}

export default HomePage;
