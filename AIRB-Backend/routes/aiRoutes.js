const { generateExperience } = require('../controllers/aiController');
const express = require('express');
const router = express.Router();

router.post('/generate-experience', generateExperience);

module.exports = router;
