/* eslint-disable no-await-in-loop */
const { knex } = require('../knexfile');
// const { getStudentScores } = require('./studentController');
// const { getUniversities } = require('./universityController');

const addPlacementForAllStudents = async () => {
  try {
    const studentsPerUniversity = 5;

    const universitiesQuery = `
      SELECT id FROM universities ORDER BY name;
    `;
    const universities = await knex.raw(universitiesQuery);

    for (const university of universities.rows) {
      const studentsToPlaceQuery = `
        SELECT id
        FROM students
        WHERE university_id IS NULL
        ORDER BY score DESC
        LIMIT ${studentsPerUniversity};
      `;
      const studentsToPlace = await knex.raw(studentsToPlaceQuery);

      const studentIds = studentsToPlace.rows.map((student) => student.id);

      const updateStudentsQuery = `
        UPDATE students
        SET university_id = ${university.id}
        WHERE id IN (${studentIds.join(', ')});
      `;
      await knex.raw(updateStudentsQuery);
    }

    return 'Placement completed successfully.';
  } catch (error) {
    throw new Error('Failed to add placements.');
  }
};

// Tüm öğrencileri yerleştir
addPlacementForAllStudents();

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
  addPlacementForAllStudents,
  getStudentPlacements,
};
