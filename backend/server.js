const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const USERS_FILE = './users.json';
const NOTES_FILE = './notes.json';

if (!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, '{}');
if (!fs.existsSync(NOTES_FILE)) fs.writeFileSync(NOTES_FILE, '{}');

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const users = JSON.parse(fs.readFileSync(USERS_FILE));
    if (users[username] && users[username] === password) {
        res.json({ success: true });
    } else {
        res.json({ success: false, message: 'Usuário ou senha incorretos.' });
    }
});

app.post('/api/register', (req, res) => {
    const { username, password } = req.body;
    const users = JSON.parse(fs.readFileSync(USERS_FILE));
    if (users[username]) {
        res.json({ success: false, message: 'Usuário já existe.' });
    } else {
        users[username] = password;
        fs.writeFileSync(USERS_FILE, JSON.stringify(users));
        res.json({ success: true });
    }
});

app.post('/api/notes/save', (req, res) => {
    const { username, notes } = req.body;
    const allNotes = JSON.parse(fs.readFileSync(NOTES_FILE));
    allNotes[username] = notes;
    fs.writeFileSync(NOTES_FILE, JSON.stringify(allNotes));
    res.json({ success: true });
});

app.get('/api/notes/load/:username', (req, res) => {
    const username = req.params.username;
    const allNotes = JSON.parse(fs.readFileSync(NOTES_FILE));
    res.json({ notes: allNotes[username] || '' });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
