const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to get the site key (optional, but good practice to not hardcode in HTML if possible, 
// though for this simple example we might just put it in HTML or fetch it)
app.get('/config', (req, res) => {
    res.json({ siteKey: process.env.RECAPTCHA_SITE_KEY });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
