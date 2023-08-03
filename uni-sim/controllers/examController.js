const knex = require('knex')(require('../knexfile').development);

const startExam = async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ error: 'Date parameter is required.' });
    }

    const exam = await knex('exams').where({ date }).first();

    if (!exam) {
      return res.status(404).json({ error: 'Exam not found for the given date.' });
    }

    return res.json(exam);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to start the exam.' });
  }
};

module.exports = {
  startExam,
};
