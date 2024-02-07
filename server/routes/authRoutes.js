const express = require('express');
const router = express.Router();
const cors = require('cors');
const {test,registerUser,loginUser,getProfile,logOut,addJob,allJobs,addProject,allProjects,projectCategories,jobCategories} = require('../controllers/authController')

// middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)


router.get('/',test)
router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/profile',getProfile)
router.post('/logout',logOut)

// job related routes
router.post('/add_job',addJob)
router.get('/all_jobs',allJobs)
router.get('/all_jobcategories',jobCategories)

//project related routes
router.post('/add_project',addProject)
router.get('/all_projects',allProjects)
router.get('/all_categories',projectCategories)


module.exports = router