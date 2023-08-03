const express = require('express');
const {
  getStudents, addStudent, getStudentById, deleteStudent,
} = require('../controllers/studentController');

const router = express.Router();

router.get('/getstudent', getStudents);
router.post('/poststudent', addStudent);
router.get('/getstudent:id', getStudentById);
router.delete('/deletestudent:id', deleteStudent);

module.exports = router;
