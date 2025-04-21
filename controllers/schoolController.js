const db = require('../config/db');
const validateSchoolData = require('../utils/validateSchool');

exports.addSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;
    console.log("name: ", name);

    const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    const [result] = await db.query(query, [name, address, latitude, longitude]);

    res.status(201).json({
      message: 'School added successfully',
      schoolId: result.insertId,
    });
  } catch (err) {
    console.error('Add School Error:', err);
    res.status(500).json({ error: 'Failed to add school' });
  }
};

exports.listSchools = async (req, res) => {
  try {
    const { lat, lng } = req.query;
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);

    if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({ error: 'Valid latitude and longitude are required as query parameters.' });
    }

    const query = `
      SELECT *,
        (6371 * acos(
          cos(radians(?)) * 
          cos(radians(latitude)) * 
          cos(radians(longitude) - radians(?)) + 
          sin(radians(?)) * 
          sin(radians(latitude))
        )) AS distance
      FROM schools
      ORDER BY distance ASC
    `;

    const [results] = await db.query(query, [latitude, longitude, latitude]);
    res.json(results);
  } catch (err) {
    console.error('List Schools Error:', err);
    res.status(500).json({ error: 'Failed to fetch schools' });
  }
};
