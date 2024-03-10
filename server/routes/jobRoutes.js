const express = require('express');
const router = express.Router();
const cors = require('cors');
const {addJob,allJobs,jobCategories} = require('../controllers/jobController')

// middleware
router.use(
    cors({
        credentials: true,
        origin: 'https://resume-builder-and-recommeder.web.app'

    })
)

router.post('/add_job',addJob)
router.get('/all_jobs',allJobs)
router.get('/all_jobcategories',jobCategories)



module.exports = router