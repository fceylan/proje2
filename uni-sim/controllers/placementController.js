const { knex } = require('../knexfile');

const addPlacement = async (req, res) => {
  try {
    const universities = await knex.raw('SELECT * FROM universities ORDER BY name ASC'); // Üniversiteleri alfabetik olarak sıralıyoruz
    const universityRows = universities.rows;

    const placementPromises = universityRows.map(async (university) => {
      const students = await knex.raw(
        `
        SELECT * FROM students
        WHERE university_id IS NULL
        ORDER BY score DESC
        LIMIT 5
        `,
      );

      const studentRows = students.rows;
      const placementInsertPromises = studentRows.map(async (student) => {
        await knex.raw(
          `
          INSERT INTO placement (student_id, university_id)
          VALUES (?, ?)
          `,
          [student.id, university.id],
        );

        await knex.raw(
          `
          UPDATE students
          SET university_id = ?
          WHERE id = ?
          `,
          [university.id, student.id],
        );
      });

      await Promise.all(placementInsertPromises);
    });

    await Promise.all(placementPromises);

    return res.json({ message: 'Placement process completed successfully.' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to complete placement process.' });
  }
};

module.exports = {
  addPlacement,
};
