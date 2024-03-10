const express = require('express');
const router = express.Router();
const cors = require('cors');
const {createApplication, getApplications} = require('../controllers/applicationController')

// middleware
router.use(
    cors({
        credentials: true,
        origin: 'https://resume-builder-and-recom-6ace8.web.app'

    })
)

router.post('/create_application',createApplication)
router.get('/get_applications/:id',getApplications)
module.exports = router