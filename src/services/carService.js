// src/services/carService.js
import { db } from './firebase';
import {
    collection,
    getDocs,
    getDoc,
    doc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    orderBy
} from 'firebase/firestore';

const COLLECTION_NAME = 'cars';

export const carService = {
    /**
     * @returns {Promise<Array>} List of cars from Firestore
     */
    async getCars() {
        try {
            const carsCol = collection(db, COLLECTION_NAME);
            const q = query(carsCol, orderBy('marca', 'asc'));
            const carSnapshot = await getDocs(q);
            return carSnapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }));
        } catch (error) {
            console.error("Error fetching cars:", error);
            return [];
        }
    },

    /**
     * @param {string} id 
     * @returns {Promise<Object|null>} Car found or null
     */
    async getCarById(id) {
        try {
            const docRef = doc(db, COLLECTION_NAME, id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return { ...docSnap.data(), id: docSnap.id };
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error fetching car by id:", error);
            return null;
        }
    },

    /**
     * @param {Object} carData 
     * @returns {Promise<Object>} The created car
     */
    async createCar(carData) {
        try {
            const carsCol = collection(db, COLLECTION_NAME);
            const docRef = await addDoc(carsCol, {
                ...carData,
                createdAt: new Date().toISOString()
            });
            return { ...carData, id: docRef.id };
        } catch (error) {
            console.error("Error creating car:", error);
            throw error;
        }
    },

    /**
     * Alias for createCar to maintain compatibility if used elsewhere as addCar
     */
    async addCar(carData) {
        return this.createCar(carData);
    },

    /**
     * @param {string} id 
     * @param {Object} updatedData 
     * @returns {Promise<Object|null>} Updated car
     */
    async updateCar(id, updatedData) {
        try {
            const docRef = doc(db, COLLECTION_NAME, id);
            await updateDoc(docRef, updatedData);
            return { ...updatedData, id };
        } catch (error) {
            console.error("Error updating car:", error);
            throw error;
        }
    },

    /**
     * @param {string} id 
     * @returns {Promise<boolean>} Success status
     */
    async deleteCar(id) {
        try {
            const docRef = doc(db, COLLECTION_NAME, id);
            await deleteDoc(docRef);
            return true;
        } catch (error) {
            console.error("Error deleting car:", error);
            return false;
        }
    }
};
