const express = require('express');
const { getUniversities } = require('../controllers/universityController');

const router = express.Router();

router.get('/getuni', getUniversities);

module.exports = router;
