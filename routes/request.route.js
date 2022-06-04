const express = require('express');
const { 
    add, 
    getAllTopicsForSupervisor,
    getAllTopicsForPanel,
    evaluateRequest
} = require('../controllers/request.controller');
const router = express.Router();

const authenticationMiddleware = require("../middlewares/auth.middleware");

router.post('/add', authenticationMiddleware, add);
router.get('/getAllTopicsForSupervisor', authenticationMiddleware, getAllTopicsForSupervisor);
router.get('/getAllTopicsForPanel', authenticationMiddleware, getAllTopicsForPanel);
router.post('/evaluateRequest', authenticationMiddleware, evaluateRequest);

module.exports = router;