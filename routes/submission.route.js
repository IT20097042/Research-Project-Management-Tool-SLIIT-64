const express = require('express');
const {
    evaluateSubmission,
    getAllSubmissionsForSupervisor,
    getAllSubmissionsForPanel
} = require('../controllers/submission.controller');
const router = express.Router();

const authenticationMiddleware = require("../middlewares/auth.middleware");

router.post('/evaluateSubmission', authenticationMiddleware, evaluateSubmission);
router.get('/getAllSubmissionsForSupervisor', authenticationMiddleware, getAllSubmissionsForSupervisor);
router.get('/getAllSubmissionsForPanel', authenticationMiddleware, getAllSubmissionsForPanel);

module.exports = router;