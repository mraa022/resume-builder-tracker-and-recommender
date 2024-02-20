const express = require('express');
const router = express.Router();
const cors = require('cors');
const {addJob,allJobs,jobCategories} = require('../controllers/jobController')

// middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

router.post('/add_job',addJob)
router.get('/all_jobs',allJobs)
router.get('/all_jobcategories',jobCategories)



module.exports = router