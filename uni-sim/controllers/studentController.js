const axios = require('axios');
const knex = require('knex')(require('../knexfile').development);
const { STUDENTS_API_URL } = require('../utils/costants');

const initStudents = async () => {
  try {
    const existingStudents = await knex.raw('SELECT * FROM students');

    if (existingStudents.length === 0) {
      const response = await axios.get(STUDENTS_API_URL);
      const students = response.data.results.map((result) => ({
        first_name: result.name.first,
        last_name: result.name.last,
      }));

      await knex.raw('INSERT INTO students (first_name, last_name) VALUES (:first_name, :last_name)', students);
    }
  } catch (error) {
    console.error('Failed to initialize students:', error);
  }
};

const getStudents = async (req, res) => {
  try {
    const students = await knex.raw('SELECT * FROM students');
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch student data.' });
  }
};

const addStudent = async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    if (!firstName || !lastName) {
      return res.status(400).json({ error: 'First name and last name are required.' });
    }

    const student = { name: `${firstName} ${lastName}` };
    const insertedStudent = await knex.raw('INSERT INTO students (first_name, last_name) VALUES (:first_name, :last_name) RETURNING *', student);
    return res.json(insertedStudent[0]);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to add student.' });
  }
};

const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await knex.raw('SELECT * FROM students WHERE id = ?', [id]);

    if (!student) {
      return res.status(404).json({ error: 'Student not found.' });
    }

    return res.json(student);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch student.' });
  }
};

const deleteAllStudents = async (req, res) => {
  try {
    await knex.raw('DELETE FROM students');
    return res.json({ message: 'All students deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete all students.' });
  }
};

module.exports = {
  initStudents,
  deleteAllStudents,
  getStudentById,
  addStudent,
  getStudents,
};
