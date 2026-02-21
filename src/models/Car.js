/**
 * @typedef {Object} CarSpecifications
 * @property {string} motor
 * @property {string} potencia
 * @property {string} aceleracion
 * @property {string} velocidadMax
 */

/**
 * @typedef {Object} Car
 * @property {string} id
 * @property {string} marca
 * @property {string} modelo
 * @property {number} precio
 * @property {string} categoria
 * @property {string} descripcion
 * @property {CarSpecifications} especificaciones
 * @property {string} imagenUrl
 * @property {('disponible'|'reservado'|'vendido')} estado
 */

export const CarSchema = {
    id: "",
    marca: "",
    modelo: "",
    precio: 0,
    categoria: "",
    descripcion: "",
    especificaciones: {
        motor: "",
        potencia: "",
        aceleracion: "",
        velocidadMax: ""
    },
    imagenUrl: "",
    estado: "disponible"
};
