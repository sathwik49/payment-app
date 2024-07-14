const jwt = require('jsonwebtoken');
const { User } = require('../model/User');

const userAuthMiddleware =async(req,res,next)=>{
    const authHeader = req.headers['Authorization'] || req.headers['authorization'];
    if(!authHeader || !authHeader.startsWith("Bearer "))
        return res.status(411).json({msg:"No token provided in headers"});
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token,process.env.jwtpassword);
        if(decoded.userId){
            const user = await User.findOne({"_id":decoded.userId});
            if(!user)
                return res.status(401).json({msg:"No user found.Sign-Up first or Check Token"});
            req.userId = decoded.userId;
           next();
        }else{
            return res.status(401).json({msg:"Not authorized to access this route"});
        }
    } catch (error) {
        res.status(411).json({error:error.message});
    }
}

module.exports={
    userAuthMiddleware
}