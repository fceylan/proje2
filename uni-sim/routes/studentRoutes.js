const express = require('express');
const {
  getStudents, addStudent, getStudentById, deleteAllStudents,
} = require('../controllers/studentController');

const router = express.Router();
const getStudentsAsync = (req, res) => {
  try {
    return getStudents();
  } catch (error) {
    console.error('getstundetError', error);
    return res.status(500).json({ error: 'Failed to delete all students.' });
  }
};

router.get('/getstudent', getStudentsAsync);
router.post('/poststudent', addStudent);
router.get('/getstudent/:id', getStudentById);
router.delete('/deletestudents', deleteAllStudents);

module.exports = router;
