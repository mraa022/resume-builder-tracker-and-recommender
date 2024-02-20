const express = require('express');
const router = express.Router();
const cors = require('cors');
const {addProject,allProjects,projectCategories} = require('../controllers/projectController')

// middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

router.post('/add_project',addProject)
router.get('/all_projects',allProjects)
router.get('/all_categories',projectCategories)



module.exports = router