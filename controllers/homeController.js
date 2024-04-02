const { Router } = require('express');
const courseService = require('../services/courseService');

const router = Router();

router.get('/', (req, res, next) => {

    if (req.user) {
        courseService.getAll(req.query.search)
            .then(courses => {
                res.render('home', { courses });
            })
            .catch(next)
    } else {
        courseService.getTop(3)
            .then(courses => {
                res.render('home', { courses });
            })
            .catch(next)
    }
});

module.exports = router;