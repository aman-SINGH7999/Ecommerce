import JWT from 'jsonwebtoken'
import User from '../models/userModel.js'

// protected route token base
const requireSingIn = async (req,res,next)=>{
    try{
        const decode = await JWT.verify(req.headers.authorization,process.env.JWT_SECRET);
        req.user = decode;
        next();
    }catch(err){
        // console.log(err);
        return res.status(501).send({
            success:false,
            message:'Something went Wrong'
        })
    }
}

// admin
const isAdmin = async (req,res,next)=>{
    try{
        const user = await User.findById(req.user._id);
        if(user.role !== 1){
            return res.status(401).send({
                success:false,
                message:'UnAuthorized Access',
            })
        }
        next();
    }catch(err){
        // console.log(err);
        return res.status(501).send({
            success:false,
            message:'Something went Wrong'
        })
    }
}

export {requireSingIn, isAdmin}