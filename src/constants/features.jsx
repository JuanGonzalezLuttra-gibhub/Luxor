import React from 'react';
import { Truck, ShieldCheck, UserCheck, Globe } from 'lucide-react';

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
];
