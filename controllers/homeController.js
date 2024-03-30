const { Router } = require('express');
const courseService = require('../services/courseService');

const router = Router();

router.get('/', (req, res, next) => {
    courseService.getAll()
        .then(courses => {
            res.render('home', { courses });
        })
        .catch(next)
});

module.exports = router;