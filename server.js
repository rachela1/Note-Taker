const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT ?? 3001;
const app = express();
//const db = require('./db/db.json');
const { v4: uuidv4 } = require('uuid');


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/notes', (req, res) => {
    return res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('api/notes', (req, res) => {
    const newNote = fs.writeFileSync('./db/db.json', 'utf8')
    const notes = JSON.parse(newNote);
    return res.json(notes);
});

app.post('api/notes', (req, res) => {
    const newNote = fs.writeFileSync('./db/db.json', 'utf8')
    const notes = JSON.parse(newNote);
    notes.push({...req.body, id: uuidv4()});
    const data = JSON.stringify(notes);
    fs.writeFileSync('./db/db.json', data)
    return res.json('success');
});


app.get('*', (req, res) => {
    return res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, ()=> {
    console.log(`Application is running @http://localhost:${PORT}`);
});