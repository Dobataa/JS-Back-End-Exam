const { COOKIE_NAME, SECRET } = require('../config/config');
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    let token = req.cookies[COOKIE_NAME];

    if (!token) {
        return res.redirect('/auth/login');
    }

    jwt.verify(token, SECRET, function(err, decoded){
        if (err) {
            return res.redirect('/auth/login');

            next();
        }
    });
};