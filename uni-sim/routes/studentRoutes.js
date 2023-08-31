const express = require('express');
const {
  getStudents, addStudent, getStudentById, deleteAllStudents,
} = require('../controllers/studentController');

const router = express.Router();

router.get('/getstudent', getStudents);
router.post('/poststudent', addStudent);
router.get('/getstudent/:id', getStudentById);
router.delete('/deletestudents', deleteAllStudents);

module.exports = router;
