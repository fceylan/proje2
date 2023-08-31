const { knex } = require('../knexfile');
// const { getStudentScores } = require('./studentController');
// const { getUniversities } = require('./universityController');

const processUniversity = async (university) => {
  try {
    const studentsForUniversityQuery = `
      SELECT id
      FROM students
      WHERE university_id IS NULL
      ORDER BY score DESC
      LIMIT 5;
    `;
    const studentsForUniversity = await knex.raw(studentsForUniversityQuery);

    const studentIds = studentsForUniversity.rows.map((student) => student.id).join(',');

    if (studentIds) {
      const updateStudentsQuery = `
        UPDATE students
        SET university_id = ?
        WHERE id IN (${studentIds});
      `;
      await knex.raw(updateStudentsQuery, [university.id]);
    }
  } catch (error) {
    console.error('Error processing university:', error);
  }
};

const addPlacement = async () => {
  try {
    const sortUniversitiesQuery = `
      SELECT id
      FROM universities
      ORDER BY name ASC;
    `;
    const sortedUniversities = await knex.raw(sortUniversitiesQuery);

    const processPromises = sortedUniversities.rows.map(async (university) => {
      await processUniversity(university);
    });

    await Promise.all(processPromises);

    return 'Placement completed successfully.';
  } catch (error) {
    throw new Error('Failed to add placements.');
  }
};

const getStudentPlacements = async () => {
  try {
    const query = `
      SELECT students.first_name, students.last_name, universities.name AS university_name, scores.score
      FROM students
      LEFT JOIN scores ON students.id = scores.student_id
      LEFT JOIN universities ON students.university_id = universities.id;
    `;
    const result = await knex.raw(query);

    const placements = result.rows.map((row) => ({
      firstName: row.first_name,
      lastName: row.last_name,
      universityName: row.university_name,
      score: row.score,
    }));

    placements.forEach((placement) => {
      console.log(`${placement.firstName} ${placement.lastName} - ${placement.universityName}: ${placement.score}`);
    });
  } catch (error) {
    console.error('Error fetching student placements:', error);
  }
};

module.exports = {
  getStudentPlacements,
  addPlacement,
};
