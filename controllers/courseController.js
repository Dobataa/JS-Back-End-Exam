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
        .catch(err => {
            res.render('createCourse', { error: {message: err.message} });
        });
});

router.get('/:courseId/details', (req, res) => {
    courseService.getOne(req.params.courseId, req.user._id)
        .then(course => {
            res.render('courseDetails', course);
        })
        .catch(err => {
            res.render('courseDetails', { error: {message: err.message} });
        })
});

router.get('/:courseId/enroll', (req, res) => {
    courseService.enrollUser(req.params.courseId, req.user._id)
        .then(() => {
            res.redirect(`/course/${req.params.courseId}/details`);
        })
});

module.exports = router;