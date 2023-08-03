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

module.exports = {
  getUniversities,
};
// const writeuni = async () => {};
