const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

// API endpoint to fetch country data
app.get('/api/countries', async (req, res) => {
    try {
        const { name } = req.query;
        const response = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch country data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});