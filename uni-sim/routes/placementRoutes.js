const express = require('express');
const placementController = require('../controllers/placementController');

const router = express.Router();

router.post('/place', placementController.addPlacement);

module.exports = router;
