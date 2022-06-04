const express = require('express');
const router = express.Router();

const { getSubmissionTypes, addSubmissionType } = require('../controllers/submission-types.controller');

router.get('/', getSubmissionTypes);
router.post('/', addSubmissionType);

module.exports = router;