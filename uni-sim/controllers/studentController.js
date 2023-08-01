const axios = require('axios');
const knex = require('knex')(require('../knexfile').development);

exports.getStudents = async (req, res) => {
  try {
    const response = await axios.get('https://randomuser.me/api', {
      params: { results: 1000, inc: 'name' },
    });
    const students = response.data.results.map((student) => ({
      name: `${student.name.first} ${student.name.last}`,
    }));
    await knex('students').insert(students);
    res.json(students);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while fetching students.' });
  }
};
