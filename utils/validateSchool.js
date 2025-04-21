function validateSchoolData(req, res, next) {
  const { name, address, latitude, longitude } = req.body;
  
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim() === '') {
    errors.push('Name is required and must be a non-empty string.');
  }
  if (!address || typeof address !== 'string' || address.trim() === '') {
    errors.push('Address is required and must be a non-empty string.');
  }
  if (typeof latitude !== 'number' || latitude < -90 || latitude > 90) {
    errors.push('Latitude must be a valid number between -90 and 90.');
  }
  if (typeof longitude !== 'number' || longitude < -180 || longitude > 180) {
    errors.push('Longitude must be a valid number between -180 and 180.');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
}

module.exports = validateSchoolData;