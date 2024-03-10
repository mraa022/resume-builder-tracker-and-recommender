const User = require('../models/user');

const {hashPassword, comparePasswords} = require('../helpers/auth')
const jwt = require('jsonwebtoken');
const registerUser = async(req,res)=>{
    try {
        const {name,email,password,phone,linkedIn} = req.body
        if(!name){
            return res.json({
                error: 'name is required'
            })
        };

        if(!password || password.length<6){
            return res.json({
                error: 'password is required and should be at least 6 char long'
            })
        };

        const exist = await User.findOne({email});
        if (exist){
            return res.json({
                error: "Email already in use"
            })
        };
        

        // create user 
        const hashedPassword = await hashPassword(password)
        const user = await User.create({
            password: hashedPassword,
            name:name,
            email:email,
            phone:phone,
            linkedIn:linkedIn
            
        })
        return res.json(user)
    } catch (error) {
        console.log(error)
    }
}


const loginUser = async(req,res)=>{
    
    try{
        const {email,password} = req.body
        // check if user exists 
        const user = await User.findOne({email})
        if (!user){
            return res.json({
                error: 'No user found'
            })  
        }
        // check password match
        const match = await comparePasswords(password,user.password)
        if (match){

            jwt.sign(
                { email: user.email, id: user._id, name: user.name },
                process.env.JWT_SECRET,
                {}, // Options object (you can include your options here)
                (err, token) => {
                  if (err) {
                    console.log(err);
                    // Handle the error here if needed
                  } else {
                    res.cookie('token', token,{ httpOnly: true,secure: true,sameSite: 'none'}).status(200).json({
                      success: true,
                      user,
                    });
                    res.send()
                  }
                }
              );
        }
        else{
            console.log('wrong password')
            return res.json({
                error: "passwords don't match"
            })
        }
        
    }
    catch(err){
        console.log(err)

    }
}

const getProfile = (req,res)=>{
    const {token} = req.cookies
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,{},(err,user)=>{
            if(err) throw err;
            res.json(user)
        })
    }
    else{
        res.json(null)
    }
}
const logOut = (req,res)=>{
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 5 * 1000),
        httpOnly: true,
        secure: true,sameSite: 'none'
    });
    res.status(200).json({ success: true, message: 'User logged out successfully' })
    
}


module.exports={
    registerUser,
    loginUser,
    getProfile,
    logOut
}