const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./db');
const authRouter = require('./routes/auth-routes');

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/check-connection', (req, res) => {
    const isConnected = db.readyState === 1; // 1 indicates connected state
    res.json({ connected: isConnected });
});

app.post('/returnName', (req, res) => {
    const username = req.body.user;
    const name = `"${username}"`;
    console.log(name);
    res.json({ username: username });
});

app.use('/auth', authRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});