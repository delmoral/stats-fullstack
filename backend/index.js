require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// Initializations
const app = express();
const {mongoose} = require('./database');

// Settings
app.set('port', process.env.PORT);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: process.env.ANGULAR_URL}));

// Routes
app.use('/api/user', require('./routes/user.routes'));

// Starting
app.listen(app.get('port'), ()=>{
    console.log('Server listening on port: ' + app.get('port'));
})