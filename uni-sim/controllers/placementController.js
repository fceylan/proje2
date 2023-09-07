/* eslint-disable no-await-in-loop */
const knex = require('knex')(require('../knexfile').development);

const addPlacementForAllStudents = async () => {
  try {
    const universitiesQuery = `
      SELECT id FROM universities ORDER BY name;
    `;
    const universities = await knex.raw(universitiesQuery);

    for (const university of universities.rows) {
      const studentsToPlaceQuery = `
        SELECT id
        FROM universities
        WHERE university_id IS NULL
        ORDER BY score DESC
        LIMIT 5;
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
    console.error('Error:', error);
    throw new Error('Failed to add placements.');
  }
};

module.exports = {
  addPlacementForAllStudents,
};
