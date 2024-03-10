const express = require('express');
const router = express.Router();
const cors = require('cors');
const {createEducation, allEducation} = require('../controllers/educationController')

// middleware
router.use(
    cors({
        credentials: true,
        origin: 'https://tic-tac-toe-trainer.web.app'

    })
)

router.post('/add_education',createEducation)
router.get('/all_education',allEducation)





module.exports = router