const { Router } = require('express');

const router = Router();

const authService = require('../services/authService');

router.get('/register', (req, res) => {
    res.render('register');
})

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

module.exports = router;