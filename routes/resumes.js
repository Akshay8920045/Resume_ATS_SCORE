const express = require('express');
const { analyzeResume } = require('../controllers/resumeController');
const { upload, handleUploadError } = require('../config/upload');

const router = express.Router();

router.post('/analyze', upload.single('resume'), handleUploadError, analyzeResume);

module.exports = router;
