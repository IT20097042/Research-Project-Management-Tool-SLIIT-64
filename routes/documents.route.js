const express = require('express');
const router = express.Router();

const { uploadDocument, getAllDocuments } = require('../controllers/documents.controller');
const { document } = require('../storage')

router.post('/', document, uploadDocument);
router.get('/', getAllDocuments);

module.exports = router;