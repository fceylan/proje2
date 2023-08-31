const { knex } = require('../knexfile');
const { getStudents } = require('./studentController');

const getRandomScore = () => Math.floor(Math.random() * 501);

const assignScores = async () => {
  try {
    const students = await getStudents();

    if (students.length === 0) {
      throw new Error('No students found.');
    }

    const scores = [];
    students.forEach(async (student) => {
      const score = getRandomScore();

      const query = knex.raw(
        'INSERT INTO scores (student_id, score) VALUES (?, ?) RETURNING *',
        [student.id, score],
      );

      const insertedScore = await query;

      scores.push(insertedScore.rows[0]);
    });

    return scores;
  } catch (error) {
    throw new Error('Failed to assign scores.');
  }
};

module.exports = {
  assignScores,
};
