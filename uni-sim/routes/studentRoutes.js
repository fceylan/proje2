const express = require('express');
const studentController = require('../controllers/studentController');

const router = express.Router();

router.get('/getstudent', studentController.getStudents);

module.exports = router;
