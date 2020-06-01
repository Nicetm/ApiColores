const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');

// Settings
app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
//app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

// Midleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

// Routes
app.use(require('./routes/index'));

// Static
app.use(express.static(path.join(__dirname, 'public')));

// 404 handler
app.use((req, res, next) => {
    res.status(404).send('404 not found');
});

module.exports = app;