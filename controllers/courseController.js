const { Router } = require('express');

const router = Router();
const courseService = require('../services/courseService');

router.get('/create', (req, res) => {
    res.render('createCourse');
});

router.post('/create', (req, res) => {
    let { title, description, imageUrl, duration } = req.body;
    let userId = req.user._id;

    courseService.create({title, description, imageUrl, duration}, userId)
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

router.get('/:courseId/edit', (req, res) => {
    courseService.getOne(req.params.courseId, req.user._id)
        .then(course => {
            res.render('editCourse', course);
        })
});

router.post('/:courseId/edit', (req, res) => {
    let { title, description, imageUrl, duration } = req.body;
    let courseData = {
        title,
        description,
        imageUrl,
        duration
    }

    courseService.updateOne(req.params.courseId, courseData)
        .then(() => {
            res.redirect(`/course/${req.params.courseId}/details`);
        })
});

router.get('/:courseId/delete', (req, res) => {
    courseService.deleteOne(req.params.courseId)
        .then(() => {
            res.redirect('/');
        })
});

module.exports = router;