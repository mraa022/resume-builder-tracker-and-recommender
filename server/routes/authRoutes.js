const express = require('express');
const router = express.Router();
const cors = require('cors');
const {registerUser,loginUser,getProfile,logOut} = require('../controllers/authController')

// middleware
router.use(
    cors({
        credentials: true,
        origin: 'https://resume-ccdf1.web.app'

    })
)

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/profile',getProfile)
router.post('/logout',logOut)



module.exports = router