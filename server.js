const express = require('express');
const path = require('path');
const config = require('./config/settings');

const app = express();
const PORT = process.env.PORT || 3000;

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('index', { 
        config,
        pageTitle: `${config.personal.name} | ${config.personal.title}`
    });
});

// API route for config (optional, if client-side JS needs it)
app.get('/api/config', (req, res) => {
    res.json(config);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app; // For Vercel