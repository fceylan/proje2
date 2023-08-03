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

module.exports = {
  getStudents,
};
