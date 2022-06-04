const express = require('express');
const router = express.Router();

const { allocatePanelMember } = require('../controllers/allocate-panel.controller');

router.post('/', allocatePanelMember);

module.exports = router;