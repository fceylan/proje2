const axios = require('axios');
const knex = require('knex')(require('../knexfile').development);
const { STUDENTS_API_URL } = require('../utils/costants');

const getStudents = async (req, res) => {
  try {
    const existingStudents = await knex('students').select();

    if (existingStudents.length > 0) {
      res.json(existingStudents);
    } else {
      const response = await axios.get(STUDENTS_API_URL);
      const students = response.data.results.map((result) => ({
        name: `${result.name.first} ${result.name.last}`,
      }));

      await knex('students').insert(students);
      res.json(students);
    }
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
    const insertedStudent = await knex('students').insert(student).returning('*');
    return res.json(insertedStudent[0]);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to add student.' });
  }
};

const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await knex('students').where({ id }).first();

    if (!student) {
      return res.status(404).json({ error: 'Student not found.' });
    }

    return res.json(student);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch student.' });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStudent = await knex('students').where({ id }).del();

    if (!deletedStudent) {
      return res.status(404).json({ error: 'Student not found.' });
    }

    return res.json({ message: 'Student deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete student.' });
  }
};

module.exports = {
  deleteStudent,
  getStudentById,
  addStudent,
  getStudents,
};
