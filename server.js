const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT ?? 3001;
const app = express();

app.use(express.static('public'));


app.get('/notes', (req, res) => {
    return res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('*', (req, res) => {
    return res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('api/notes', (req, res) => {
    fs.readFile('.db/db.json', (err, data) => {
        if (err) throw err;
        let dbData = JSON.parse(data);
        res.json(dbData)
    })
});

app.listen(PORT, ()=> {
    console.log(`Application is running @http://localhost:${PORT}`);
});