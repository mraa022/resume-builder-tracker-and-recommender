const express = require('express');
const router = express.Router();
const cors = require('cors');
const {createResume,resumeCategory,resumesList,resumePreview,recommendResume,sortedRecommendedResumes} = require('../controllers/resumeController')

// middleware
router.use(
    cors({
        credentials: true,
        origin: 'https://tic-tac-toe-trainer.web.app'

    })
)

router.post('/create_resume',createResume)
router.get('/all_resume_categories',resumeCategory)
router.get('/all_resumes',resumesList)
router.get('/resumeHtml',resumePreview)
router.post('/recommend_resume',recommendResume)
router.post('/recommended_resumes',sortedRecommendedResumes)
module.exports = router