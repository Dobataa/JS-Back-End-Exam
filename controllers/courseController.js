const { Router } = require('express');

const router = Router();
const courseService = require('../services/courseService');

router.get('/create', (req, res) => {
    res.render('createCourse');
});

router.post('/create', (req, res) => {
    let { title, description, imageUrl, duration } = req.body;

    courseService.create({title, description, imageUrl, duration})
        .then(course => {
            res.redirect('/');
        })
});

module.exports = router;