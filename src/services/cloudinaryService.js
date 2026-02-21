// src/services/cloudinaryService.js

const CLOUD_NAME = "davb5azmk";
const UPLOAD_PRESET = "luxor_unsigned";

/**
 * Sube una imagen a Cloudinary usando el preset unsigned
 * @param {File} file - El archivo de imagen a subir
 * @returns {Promise<string>} - La URL segura de la imagen subida
 */
export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            {
                method: "POST",
                body: formData,
            }
        );

        if (!response.ok) {
            throw new Error("Error al subir imagen a Cloudinary");
        }

        const data = await response.json();
        return data.secure_url;
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        throw error;
    }
};
