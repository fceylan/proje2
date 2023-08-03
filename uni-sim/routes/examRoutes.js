const express = require('express');
const { startExam } = require('../controllers/examController');

const router = express.Router();

router.get('/startExam', startExam);

module.exports = router;
