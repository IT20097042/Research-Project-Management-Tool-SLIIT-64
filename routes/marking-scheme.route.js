const express = require('express');
const router = express.Router();

const { createMarkingScheme } = require('../controllers/marking-scheme.controller');

router.post('/', createMarkingScheme);

module.exports = router;