const { Router } = require('express');

const router = Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');

router.use('/', homeController);
router.use('/auth', authController);

module.exports = router;