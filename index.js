const express = require('express');
const axios = require('axios');
const FormData = require('form-data');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Health check route
app.get('/', (req, res) => {
    res.send('Snaperase Backend is running...');
});

// Image processing route
app.post('/process-image', async (req, res) => {
    const { image_url, is_premium } = req.body;

    if (!image_url) {
        return res.status(400).json({ success: false, message: "Image URL is required" });
    }

    try {
        // This is a placeholder for the background removal logic
        // For production, you can integrate services like remove.bg or local AI models
        const processedImage = image_url; 

        res.json({
            success: true,
            processed_image: processedImage,
            watermark: is_premium === true ? false : true,
            quality: is_premium === true ? "1K" : "Standard"
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Error during image processing",
            error: error.message 
        });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

