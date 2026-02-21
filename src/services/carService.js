// src/services/carService.js

/**
 * Mock data initial (migrated from data.jsx)
 */
const initialCars = [
    {
        id: 'lamborghini-urus',
        marca: 'Lamborghini',
        modelo: 'Urus',
        precio: 350000,
        categoria: 'SUV',
        descripcion: 'El Lamborghini Urus es el primer vehículo utilitario superdeportivo del mundo, en el que el alma de un superdeportivo se une a la funcionalidad de un SUV.',
        especificaciones: {
            motor: 'V8 Litros de 4.0',
            potencia: '650 CV',
            aceleracion: '3.6s (0-100 km/h)',
            velocidadMax: '305 km/h'
        },
        images: ['https://images.unsplash.com/photo-1594502184342-2e12f877aa73?q=80&w=1200&auto=format&fit=crop'],
        estado: 'disponible'
    },
    {
        id: 'porsche-911-gt3',
        marca: 'Porsche',
        modelo: '911 GT3',
        precio: 220000,
        categoria: 'Deportivo',
        descripcion: 'Diseñado en colaboración con Porsche Motorsport, el 911 GT3 transfiere la tecnología de competición más pura a un modelo de serie.',
        especificaciones: {
            motor: 'Bóxer de 6 cilindros 4.0',
            potencia: '510 CV',
            aceleracion: '3.4s (0-100 km/h)',
            velocidadMax: '318 km/h'
        },
        images: ['https://images.unsplash.com/photo-1611859328053-3cbc9f9399f4?q=80&w=1200&auto=format&fit=crop'],
        estado: 'disponible'
    },
    {
        id: 'mercedes-amg-g63',
        marca: 'Mercedes-AMG',
        modelo: 'G63',
        precio: 210000,
        categoria: 'SUV',
        descripcion: 'La Clase G de Mercedes-AMG es la base para las prestaciones de conducción, tanto en carretera como fuera de ella.',
        especificaciones: {
            motor: 'V8 Biturbo de 4.0',
            potencia: '585 CV',
            aceleracion: '4.5s (0-100 km/h)',
            velocidadMax: '220 km/h'
        },
        images: ['https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=1200&auto=format&fit=crop'],
        estado: 'disponible'
    },
    {
        id: 'ferrari-f8-tributo',
        marca: 'Ferrari',
        modelo: 'F8 Tributo',
        precio: 280000,
        categoria: 'Supercar',
        descripcion: 'El F8 Tributo es el nuevo deportivo de motor central-trasero que rinde homenaje al motor V8 más potente de la historia de Ferrari.',
        especificaciones: {
            motor: 'V8 de 90° biturbo',
            potencia: '720 CV',
            aceleracion: '2.9s (0-100 km/h)',
            velocidadMax: '340 km/h'
        },
        images: ['https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=1200&auto=format&fit=crop'],
        estado: 'disponible'
    },
    {
        id: 'mercedes-s-class',
        marca: 'Mercedes',
        modelo: 'S-Class',
        precio: 140000,
        categoria: 'Berlina',
        descripcion: 'La Clase S de Mercedes-Benz es la berlina de lujo definitiva, ofreciendo un nivel de confort y tecnología sin precedentes.',
        especificaciones: {
            motor: '6 cilindros en línea',
            potencia: '367 CV',
            aceleracion: '5.1s (0-100 km/h)',
            velocidadMax: '250 km/h'
        },
        images: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1200&auto=format&fit=crop'],
        estado: 'disponible'
    },
    {
        id: 'audi-rs6-avant',
        marca: 'Audi',
        modelo: 'RS6 Avant',
        precio: 160000,
        categoria: 'Deportivo',
        descripcion: 'El Audi RS 6 Avant es mucho más que un deportivo. Combina unas prestaciones impresionantes con una versatilidad extraordinaria.',
        especificaciones: {
            motor: 'V8 TFSI biturbo',
            potencia: '600 CV',
            aceleracion: '3.6s (0-100 km/h)',
            velocidadMax: '250 km/h'
        },
        images: ['https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?q=80&w=1200&auto=format&fit=crop'],
        estado: 'disponible'
    }
];

// Helper to interact with localStorage
const STORAGE_KEY = 'luxor_cars';

const loadFromStorage = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return initialCars;

    try {
        const parsed = JSON.parse(saved);
        // Migration: If data exists but uses old keys, map them to new ones
        return parsed.map(car => {
            // Support legacy imagenUrl or image string
            let images = car.images;
            if (!images || !Array.isArray(images)) {
                const singleImg = car.imagenUrl || car.image || '';
                images = singleImg ? [singleImg] : [];
            }

            return {
                ...car,
                id: car.id || Date.now().toString() + Math.random(),
                marca: car.marca || car.name?.split(' ')[0] || 'Desconocido',
                modelo: car.modelo || car.name?.split(' ').slice(1).join(' ') || 'Modelo',
                precio: car.precio !== undefined ? car.precio : (typeof car.price === 'string' ? parseInt(car.price.replace(/\./g, '').replace('€', '')) : car.price || 0),
                categoria: car.categoria || car.type || 'General',
                images: images,
                descripcion: car.descripcion || car.description || '',
                especificaciones: car.especificaciones || {
                    motor: car.specs?.motor || '',
                    potencia: car.specs?.potencia || '',
                    aceleracion: car.specs?.aceleracion || '',
                    velocidadMax: car.specs?.velocidad || ''
                },
                estado: car.estado || 'disponible'
            };
        });
    } catch (e) {
        console.error("Error parsing storage data:", e);
        return initialCars;
    }
};

const saveToStorage = (data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const carService = {
    /**
     * @returns {Promise<Array>} List of cars
     */
    async getCars() {
        return loadFromStorage();
    },

    /**
     * @param {string} id 
     * @returns {Promise<Object|null>} Car found or null
     */
    async getCarById(id) {
        const cars = loadFromStorage();
        const car = cars.find(c => c.id === id);
        return car ? { ...car } : null;
    },

    /**
     * @param {Object} car 
     * @returns {Promise<Object>} The added car
     */
    async addCar(car) {
        const cars = loadFromStorage();
        const newCar = { ...car, id: car.id || Date.now().toString() };
        cars.push(newCar);
        saveToStorage(cars);
        return newCar;
    },

    /**
     * @param {string} id 
     * @param {Object} updatedData 
     * @returns {Promise<Object|null>} Updated car
     */
    async updateCar(id, updatedData) {
        const cars = loadFromStorage();
        const index = cars.findIndex(c => c.id === id);
        if (index === -1) return null;

        cars[index] = { ...cars[index], ...updatedData };
        saveToStorage(cars);
        return { ...cars[index] };
    },

    /**
     * @param {string} id 
     * @returns {Promise<boolean>} Success status
     */
    async deleteCar(id) {
        const cars = loadFromStorage();
        const initialLength = cars.length;
        const filtered = cars.filter(c => c.id !== id);
        saveToStorage(filtered);
        return filtered.length < initialLength;
    },

    /**
     * Helper to expose direct save functionality if needed,
     * though methods above already persist.
     */
    saveCars(data) {
        saveToStorage(data);
    }
};
