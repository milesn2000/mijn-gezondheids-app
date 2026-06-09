// Stap 1: Express inladen
const express = require('express');
const app     = express();
const PORT    = 3000;
// Stap 2: Een route maken
app.use(express.static('public'));

// Stap 3: Server starten
app.listen(PORT, () => 
{
    console.log(`✅ Server draait op http://localhost:${PORT}`);
});
