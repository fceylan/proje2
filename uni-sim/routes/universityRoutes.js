const express = require('express');
const {
  getUniversities, getUniversityById, addUniversity, deleteUniversity,
} = require('../controllers/universityController');

const router = express.Router();

router.get('/getuni', getUniversities);
router.post('/postuni', addUniversity);
router.get('/getuni:id', getUniversityById);
router.delete('/deleteuni:id', deleteUniversity);

module.exports = router;
