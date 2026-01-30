const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Mock flight data (replace with real API)
const flights = [
    { id: 'UAL123', airline: 'UA', flight: '123', departure: '2024-01-30T10:00:00Z' },
    { id: 'DAL456', airline: 'DL', flight: '456', departure: '2024-01-30T14:30:00Z' }
];

// Get flight info
app.get('/api/flights/:id', (req, res) => {
    const flight = flights.find(f => f.id === req.params.id);
    if (!flight) return res.status(404).json({ error: 'Flight not found' });
    res.json(flight);
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'flight-betting-backend' });
});

const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
    console.log(`Flight betting backend running on port ${PORT}`);
});