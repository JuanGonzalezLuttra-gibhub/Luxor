import { Truck, ShieldCheck, UserCheck, Globe } from 'lucide-react'

export const cars = [
    {
        id: 'lamborghini-urus',
        name: 'Lamborghini Urus',
        price: '350.000€',
        image: 'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?q=80&w=1200&auto=format&fit=crop',
        type: 'SUV Sport',
        description: 'El Lamborghini Urus es el primer vehículo utilitario superdeportivo del mundo, en el que el alma de un superdeportivo se une a la funcionalidad de un SUV.',
        specs: {
            motor: 'V8 Litros de 4.0',
            potencia: '650 CV',
            aceleracion: '3.6s (0-100 km/h)',
            velocidad: '305 km/h'
        }
    },
    {
        id: 'porsche-911-gt3',
        name: 'Porsche 911 GT3',
        price: '220.000€',
        image: 'https://images.unsplash.com/photo-1611859328053-3cbc9f9399f4?q=80&w=1200&auto=format&fit=crop',
        type: 'Sport',
        description: 'Diseñado en colaboración con Porsche Motorsport, el 911 GT3 transfiere la tecnología de competición más pura a un modelo de serie.',
        specs: {
            motor: 'Bóxer de 6 cilindros 4.0',
            potencia: '510 CV',
            aceleracion: '3.4s (0-100 km/h)',
            velocidad: '318 km/h'
        }
    },
    {
        id: 'mercedes-amg-g63',
        name: 'Mercedes-AMG G63',
        price: '210.000€',
        image: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=1200&auto=format&fit=crop',
        type: 'SUV Luxury',
        description: 'La Clase G de Mercedes-AMG es la base para las prestaciones de conducción, tanto en carretera como fuera de ella.',
        specs: {
            motor: 'V8 Biturbo de 4.0',
            potencia: '585 CV',
            aceleracion: '4.5s (0-100 km/h)',
            velocidad: '220 km/h'
        }
    },
    {
        id: 'ferrari-f8-tributo',
        name: 'Ferrari F8 Tributo',
        price: '280.000€',
        image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=1200&auto=format&fit=crop',
        type: 'Supercar',
        description: 'El F8 Tributo es el nuevo deportivo de motor central-trasero que rinde homenaje al motor V8 más potente de la historia de Ferrari.',
        specs: {
            motor: 'V8 de 90° biturbo',
            potencia: '720 CV',
            aceleracion: '2.9s (0-100 km/h)',
            velocidad: '340 km/h'
        }
    },
    {
        id: 'mercedes-s-class',
        name: 'Mercedes S-Class',
        price: '140.000€',
        image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1200&auto=format&fit=crop',
        type: 'Executive',
        description: 'La Clase S de Mercedes-Benz es la berlina de lujo definitiva, ofreciendo un nivel de confort y tecnología sin precedentes.',
        specs: {
            motor: '6 cilindros en línea',
            potencia: '367 CV',
            aceleracion: '5.1s (0-100 km/h)',
            velocidad: '250 km/h'
        }
    },
    {
        id: 'audi-rs6-avant',
        name: 'Audi RS6 Avant',
        price: '160.000€',
        image: 'https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?q=80&w=1200&auto=format&fit=crop',
        type: 'Performance',
        description: 'El Audi RS 6 Avant es mucho más que un deportivo. Combina unas prestaciones impresionantes con una versatilidad extraordinaria.',
        specs: {
            motor: 'V8 TFSI biturbo',
            potencia: '600 CV',
            aceleracion: '3.6s (0-100 km/h)',
            velocidad: '250 km/h'
        }
    }
]

export const features = [
    {
        icon: <Truck size={40} />,
        title: 'Entrega Personalizada',
        description: 'Llevamos el vehículo de tus sueños directamente a tu puerta, en cualquier punto de la península.'
    },
    {
        icon: <ShieldCheck size={40} />,
        title: 'Coches Certificados',
        description: 'Cada unidad pasa por un riguroso proceso de inspección y certificación de 150 puntos.'
    },
    {
        icon: <UserCheck size={40} />,
        title: 'Atención Exclusiva',
        description: 'Asesoramiento VIP dedicado para garantizar que cada detalle supere tus expectativas.'
    },
    {
        icon: <Globe size={40} />,
        title: 'Servicio Nacional',
        description: 'Presencia y soporte técnico especializado en toda España para tu total tranquilidad.'
    }
]
