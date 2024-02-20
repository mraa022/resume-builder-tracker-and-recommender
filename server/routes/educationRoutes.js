const express = require('express');
const router = express.Router();
const cors = require('cors');
const {createEducation, allEducation} = require('../controllers/educationController')

// middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

router.post('/add_education',createEducation)
router.get('/all_education',allEducation)





module.exports = router