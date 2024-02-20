const express = require('express');
const router = express.Router();
const cors = require('cors');
const {createResume} = require('../controllers/resumeController')

// middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

router.post('/create_resume',createResume)



module.exports = router