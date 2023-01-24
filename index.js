require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const mongoString = 'mongodb+srv://testUser:test123@cluster0.0i9nsok.mongodb.net/FarmlyTest?retryWrites=true&w=majority' ;
const routes = require('./routes/routes');

mongoose.connect(mongoString);
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const app = express();
app.use(express.json());
app.use('/api', routes)

app.listen(2000, () => {
    console.log(`Server Started at ${2000}`)
})

module.exports = app;