
const Education =  require('../models/education');

const jwt = require('jsonwebtoken');

const createEducation = async(req,res)=>{
    const {token} = req.cookies
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,{},async(err,user)=>{
            const userEmail = user.email
            if(err) throw err;
            const {degree,school,city,country,startDate,endDate} = req.body;
            const education = await Education.create({
                userEmail: userEmail,
                degree:degree,
                school:school,
                city:city,
                country:country,
                startDate:startDate,
                endDate:endDate
            })
            res.json(education) 
        })
        
    }
    else{
        res.json(null)
    }
}

const allEducation = async(req,res)=>{
    const {token} = req.cookies
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,{},async(err,user)=>{
            if(err) throw err;
            
               
            const all_education = await Education.find({userEmail:user.email})
            res.json(all_education)
            
        
            
        })
        
    }
    else{
        res.json(null)
    }

}



module.exports={
    createEducation,
    allEducation
}