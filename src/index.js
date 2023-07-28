const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// connect mongoose DB
mongoose
    .connect('mongodb://localhost:27017')
    .then(() => {
        console.log('connection successfully!');
    })
    .catch((e) => {
        console.log('connection error', e);
    });

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log('Server is running at port ' + port);
});
