const express = require('express');
const router = express.Router();
const { addSchool, listSchools } = require('../controllers/schoolController');
const validateSchoolData = require('../utils/validateSchool');

router.post('/addSchool',validateSchoolData, addSchool);
router.get('/listSchools', listSchools);
module.exports = router;
