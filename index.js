const express = require('express');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const sharp = require('sharp');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

// Replace with your actual Remove.bg API Key
const REMOVE_BG_API_KEY = 'YOUR_API_KEY_HERE';

app.post('/process-image', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).send('No image uploaded.');

        const isPremium = req.body.isPremium === 'true';

        // 1. Remove Background
        const formData = new FormData();
        formData.append('image_file', req.file.buffer, req.file.originalname);
        formData.append('size', 'auto');

        const response = await axios.post('https://api.remove.bg/v1.0/removebg', formData, {
            headers: {
                ...formData.getHeaders(),
                'X-Api-Key': REMOVE_BG_API_KEY,
            },
            responseType: 'arraybuffer',
        });

        let imageProcessor = sharp(response.data);

        // 2. 4K AI Enhancement Logic for Premium Users
        if (isPremium) {
            imageProcessor = imageProcessor
                .resize(3840, null, { 
                    withoutEnlargement: false,
                    fit: 'inside'
                })
                .sharpen({ 
                    sigma: 1.5,
                    m1: 0.5,
                    m2: 10
                })
                .modulate({
                    brightness: 1.05,
                    saturation: 1.1
                });
        } else {
            // Standard Resolution for Free Users
            imageProcessor = imageProcessor.resize(1280);
        }

        const finalBuffer = await imageProcessor.toBuffer();
        
        res.set('Content-Type', 'image/png');
        res.send(finalBuffer);

    } catch (error) {
        console.error("Processing Error:", error);
        res.status(500).send('Image processing failed.');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
