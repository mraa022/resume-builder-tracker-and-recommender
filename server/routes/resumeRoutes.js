const express = require('express');
const router = express.Router();
const cors = require('cors');
const {createResume,resumeCategory,resumesList} = require('../controllers/resumeController')

// middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

router.post('/create_resume',createResume)
router.get('/all_resume_categories',resumeCategory)
router.get('/all_resumes',resumesList)
module.exports = router