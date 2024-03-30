const express = require('express');
const { engine } = require('express-handlebars');
const cookieParser = require('cookie-parser');
const isAuthenticated = require('../middlewares/isAuthenticated');

function setupExpress(app){
    app.engine('.hbs', engine({
        extname: 'hbs'
    }));

    app.set('view engine', 'hbs');
    
    app.use('/static', express.static('public'));

    app.use(express.urlencoded({
        extended: true
    }));

    app.use(cookieParser());

    app.use(isAuthenticated);

}

module.exports = setupExpress;