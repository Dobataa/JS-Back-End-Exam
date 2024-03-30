const { Router } = require('express');

const router = Router();

const authService = require('../services/authService');
const { COOKIE_NAME } = require('../config/config');

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res, next) => {
    const { username, password, rePassword } = req.body;

    if (password != rePassword) {
        return res.render('register', { error: { message: 'Passwords should match' } });
    }

    authService.register(username, password)
        .then(user => {
            console.log(user);
            res.redirect('/auth/login');
        })
        .catch(error => {
            return res.render('register', { error: {message: error.message} });
        });
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    authService.login(username, password)
        .then(token => {
            res.cookie(COOKIE_NAME, token, {httpOnly: true});
            res.redirect('/');
        })
        .catch(err => {
            res.render('login', err);
        });
});

router.get('/logout', (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.redirect('/');
});

module.exports = router;