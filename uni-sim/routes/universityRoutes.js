const express = require('express');
const {
  getUniversities, getUniversityById, addUniversity, deleteUniversity,
  deleteAllUniversities, initUniversities,
} = require('../controllers/universityController');

const router = express.Router();

router.get('/inituni', initUniversities);
router.get('/getuni', getUniversities);
router.post('/postuni', addUniversity);
router.get('/getuni/:id', getUniversityById);
router.delete('/deleteuni/:id', deleteUniversity);
router.delete('/deleteuni', deleteAllUniversities);

module.exports = router;
