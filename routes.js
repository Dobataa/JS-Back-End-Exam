const { Router } = require('express');

const router = Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const courseController = require('./controllers/courseController');
const isAuth = require('./middlewares/isAuthorized');

router.use('/', homeController);
router.use('/auth', authController);
router.use('/course', courseController);

module.exports = router;