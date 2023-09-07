/* eslint-disable no-await-in-loop */

const knex = require('knex')(require('../knexfile').development);

const addPlacementForAllStudents = async () => {
  try {
    // Tüm üniversiteleri alfabetik olarak sırala ve her birini sırayla al.
    const universities = await knex.raw(`
      SELECT id FROM universities ORDER BY name;
    `);

    for (const university of universities.rows) {
      // Üniversiteye atanmamış ve en yüksek puan alan ilk 5 öğrenciyi al.
      const studentsToPlace = await knex.raw(`
        SELECT id
        FROM students
        WHERE university_id IS NULL
        ORDER BY score DESC
        LIMIT 5;
      `);

      // Öğrencileri bu üniversiteye yerleştir ve university_id'yi güncelle.
      const studentIds = studentsToPlace.rows.map((student) => student.id);
      if (studentIds.length > 0) {
        await knex.raw(`
          UPDATE students
          SET university_id = ${university.id}
          WHERE id IN (${studentIds.join(', ')});
        `);
      }
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
