const express = require('express');
const axios = require('axios');
const cors = require('cors');
const FormData = require('form-data');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const REMOVE_BG_API_KEY = 'Aq7XeszJtMZdmZJ1WCLLwYpb';

app.post('/remove-bg', async (req, res) => {
    try {
        const { image } = req.body; // Base64 image
        const formData = new FormData();
        formData.append('size', 'auto');
        formData.append('image_file_b64', image);

        const response = await axios.post('https://api.remove.bg/v1.0/removebg', formData, {
            headers: {
                ...formData.getHeaders(),
                'X-Api-Key': REMOVE_BG_API_KEY,
            },
            responseType: 'arraybuffer',
        });

        const base64Image = Buffer.from(response.data, 'binary').toString('base64');
        res.json({ image: base64Image });
    } catch (error) {
        console.error('Error removing background:', error.message);
        res.status(500).json({ error: 'Failed to remove background' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

