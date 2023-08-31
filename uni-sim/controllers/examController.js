const { knex } = require('../knexfile');
const { getStudents } = require('./studentController');
const { addPlacementForAllStudents } = require('./placementController');

const assignRandomScore = () => Math.floor(Math.random() * 501);

// stundetleri çekip 0-500 değer atıyor.
const startExam = async (req, res) => {
  try {
    const students = await getStudents();

    const examDate = new Date();

    if (students.length === 0) {
      return res.status(400).json({ error: 'No students found.' });
    }

    const scores = students.map((student) => ({
      student_id: student.id,
      score: assignRandomScore(),
    }));

    const insertedExam = await knex('exams').insert({ date: examDate });

    if (insertedExam.length === 0) {
      return res.status(500).json({ error: 'Failed to start exam.' });
    }

    await knex('scores').insert(scores);
    await addPlacementForAllStudents();

    return res.json({ message: 'Exam started and scores assigned.' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to start exam and assign scores.' });
  }
};

module.exports = {
  startExam,
};
