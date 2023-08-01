/* eslint-disable linebreak-style */
exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTable('universities', (table) => {
      table.increments('id').primary();
      table.string('name');
    }),

    knex.schema.createTable('students', (table) => {
      table.increments('id').primary();
      table.string('first_name');
      table.string('last_name');
    }),

    knex.schema.createTable('exams', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.date('date');
    }),

    knex.schema.createTable('scores', (table) => {
      table.increments('id').primary();
      table.integer('student_id').unsigned().references('id').inTable('students');
      table.integer('exam_id').unsigned().references('id').inTable('exams');
      table.integer('score');
    }),

    knex.schema.createTable('placements', (table) => {
      table.increments('id').primary();
      table.integer('student_id').references('id').inTable('students');
      table.integer('university_id').references('id').inTable('universities');
      table.integer('score');
    }),
  ]);
};

exports.down = function (knex) {
  return Promise.all([
    knex.schema.dropTable('placements'),
    knex.schema.dropTable('scores'),
    knex.schema.dropTable('exams'),
    knex.schema.dropTable('students'),
    knex.schema.dropTable('universities'),
  ]);
};
