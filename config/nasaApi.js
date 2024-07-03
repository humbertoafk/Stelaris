const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config(); // Cargar configuración

const apiKey = process.env.NASA_API_KEY;
const baseUrl = 'https://images-api.nasa.gov';

// Buscar imágenes en la API de NASA
const searchImages = async (query) => {
  try {
    const response = await axios.get(`${baseUrl}/search`, {
      params: {
        q: query,
        media_type: 'image',
        page: 1,
        page_size: 1,
      },
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });
    return response.data.collection.items[0]; // Retornar primera imagen
  } catch (error) {
    console.error('Error fetching images from NASA API:', error);
    return null;
  }
};

module.exports = {
  searchImages,
};
