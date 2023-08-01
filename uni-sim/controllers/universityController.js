const axios = require('axios');
const knex = require('knex')(require('../knexfile').development);
const { UNIVERCITIES_API_URL } = require('../utils/costants');

const getUniversities = async (req, res) => {
  try {
    console.log('get uni starts');

    const response = await axios.get(UNIVERCITIES_API_URL, {
      params: { country: 'turkey' },
    });

    const universities = response.data.map((university) => ({
      name: university.name,
      country: university.country,
    }));

    await knex('universities').insert(universities);
    res.json(universities);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while fetching universities.' });
  }
};

// const writeuni = async () => {};

module.exports = { getUniversities };
