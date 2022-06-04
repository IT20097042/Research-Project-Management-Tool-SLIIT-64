const express = require('express');
const router = express.Router();

const { getUsers, getPanelMembers, deleteUser, getUserByID, edit_user } = require('../controllers/users.controller');

router.get('/', getUsers);
router.get('/:id', getUserByID);
router.put('/', edit_user);
router.get('/panel-members', getPanelMembers);
router.delete('/:id', deleteUser);

module.exports = router;