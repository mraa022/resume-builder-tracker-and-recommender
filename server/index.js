const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const {mongoose} = require('mongoose')
const cookieParser = require('cookie-parser')


const app = express()

// db connection
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("database connected"))
.catch((err)=>{
    console.log('Database not connected', err)
});



// middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))


// routes
app.use('/auth',require('./routes/authRoutes'))
app.use('/education',require('./routes/educationRoutes'))
app.use('/job',require('./routes/jobRoutes'))
app.use('/project',require('./routes/projectRoutes'))
app.use('/resume',require('./routes/resumeRoutes'))






const port = 8000
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})