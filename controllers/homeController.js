const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.render('guest-home');
});

module.exports = router;