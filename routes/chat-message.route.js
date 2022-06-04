const express = require('express');
const { add, getAllChatGroupsForSupervisor, getAllMessagesUsingGroupId } = require('../controllers/chat-message.controller');
const router = express.Router();

const authenticationMiddleware = require("../middlewares/auth.middleware");

router.post('/add', authenticationMiddleware, add);
router.get('/getAllChatGroupsForSupervisor', authenticationMiddleware, getAllChatGroupsForSupervisor);
router.get('/getAllMessagesUsingGroupId/:project', authenticationMiddleware, getAllMessagesUsingGroupId);

module.exports = router;