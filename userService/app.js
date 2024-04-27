const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./config/db');
const userRouter = require('./routes/user.routes');

const app = express();
const port = 5001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define your routes here
// app.get('/', (req, res) => {
//     res.send('User Service Health Check Passed');
// });

// app.use('/api', userRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});