const axios = require('axios');
const knex = require('knex')(require('../knexfile').development);
const { UNIVERCITIES_API_URL } = require('../utils/costants');

const getUniversities = async (req, res) => {
  try {
    const existingUniversities = await knex('universities').select();

    if (existingUniversities.length > 0) {
      res.json(existingUniversities);
    } else {
      const response = await axios.get(UNIVERCITIES_API_URL);
      const universities = response.data;
      await knex('universities').insert(universities);
      res.json(universities);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch university data.' });
  }
};

const addUniversity = async (req, res) => {
  try {
    const { name, country } = req.body;
    if (!name || !country) {
      return res.status(400).json({ error: 'Name and country are required.' });
    }

    const university = { name, country };
    const insertedUniversity = await knex('universities').insert(university).returning('*');

    return res.json(insertedUniversity[0]);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to add university.' });
  }
};

const getUniversityById = async (req, res) => {
  try {
    const { id } = req.params;
    const university = await knex('universities').where({ id }).first();

    if (!university) {
      return res.status(404).json({ error: 'University not found.' });
    }

    return res.json(university); // return anahtar kelimesini ekledik
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch university.' });
  }
};

const deleteUniversity = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUniversity = await knex('universities').where({ id }).del();

    if (!deletedUniversity) {
      return res.status(404).json({ error: 'University not found.' });
    }

    return res.json({ message: 'University deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete university.' });
  }
};

module.exports = {
  deleteUniversity,
  getUniversityById,
  getUniversities,
  addUniversity,
};
