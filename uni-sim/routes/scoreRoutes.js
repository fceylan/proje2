const express = require('express');
const { assignScore } = require('../controllers/scoreController');

const router = express.Router();

router.post('/assign', assignScore);

module.exports = router;
