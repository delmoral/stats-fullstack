const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// Initializations
const app = express();
const {mongoose} = require('./database');

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));

// Routes
app.use('/api/user', require('./routes/user.routes'));

// Starting
app.listen(app.get('port'), ()=>{
    console.log('Server listening on port: ' + app.get('port'));
})