const { knex } = require('../knexfile');

const getRandomScore = () => Math.floor(Math.random() * 501);

const assignScore = async (req, res) => {
  try {
    const { studentId, examId } = req.body;

    if (!studentId || !examId) {
      return res.status(400).json({ error: 'Student ID and exam ID are required.' });
    }

    const student = await knex.raw('SELECT * FROM students WHERE id = ?', [studentId]);
    const exam = await knex.raw('SELECT * FROM exams WHERE id = ?', [examId]);

    if (!student.rows[0] || !exam.rows[0]) {
      return res.status(404).json({ error: 'Student or exam not found.' });
    }

    const score = getRandomScore();

    const insertedScore = await knex.raw(
      'INSERT INTO scores (student_id, exam_id, score) VALUES (?, ?, ?) RETURNING *',
      [studentId, examId, score],
    );

    return res.json(insertedScore.rows[0]);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to assign score.' });
  }
};

module.exports = {
  assignScore,
};
