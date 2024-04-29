const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./db');
const authRouter = require('./routes/Auth');

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define your routes here
// app.get('/', (req, res) => {
//     res.send('User Service Health Check Passed');
// });

app.get('/check-connection', (req, res) => {
    const isConnected = db.readyState === 1; // 1 indicates connected state
    res.json({ connected: isConnected });
});

app.use('/api', authRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});