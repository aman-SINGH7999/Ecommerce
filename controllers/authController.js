import userModel from '../models/userModel.js';
import orderModel from '../models/orderModel.js';
import JWT from 'jsonwebtoken';
import { hashPassword, comparePassword } from "../helpers/authHelpers.js";


// for REGISTRATION
const registerController = async (req, res)=>{
    // console.log(req.body);
    try{
        const {name, email, password, phone, address, question} = req.body;
        if(!name || !email || !password || !phone || !address || !question){
            return res.status(404).send({
                success:false,
                message:'All fields are Required'
            });
        }

        // existing user 
        const isUserExist = await userModel.findOne({email});
        if(isUserExist){
            return res.status(500).send({
                success:false, 
                message:'Already Register please login'
            });
        }
        // Register User
        const hashedPassword = await hashPassword(password);
        const user = await new userModel({name, email, password : hashedPassword, phone, address, question:question.toLowerCase()}).save();
        
        res.status(200).send({
            success:true,
            message:'User Register Successfully',
            user,
        })

    }catch(err){
        // console.log(err);
        res.status(500).send({
            success:false,
            message:'Error in Registeration',
            err,
        })
    }
}


// for LOGIN
const loginController = async (req, res)=>{
    // console.log("+++++++++",req.body)
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:'All fields are Required'
            });
        }
        const findUser = await userModel.findOne({email});
        // console.log("---------",findUser)
        if(!findUser){
            return res.status(500).send({
                success:false, 
                message:'User Not Register'
            });
        }
        const isCurrect = await comparePassword(password, findUser.password);
        if(!isCurrect){
            return res.status(500).send({
                success:false, 
                message:'Invalid Email or Password',
            });
        }
        // token
        const token = await JWT.sign({_id:findUser._id}, process.env.JWT_SECRET, {expiresIn:'7d'});
        res.status(200).send({
            success:true,
            message:'User Login Successfully',
            user : {
                _id: findUser._id,
                name:findUser.name,
                email:findUser.email,
                phone:findUser.phone,
                address:findUser.address,
                role:findUser.role
            },
            token,
        })
    }catch(err){
        // console.log(err);
        res.status(500).send({
            success:false,
            message:'Error in Login',
            err,
        })
    }
}

// forgot password
const forgotPasswordController = async (req, res)=>{
    try{
        const {email, question, newPassword} = req.body;
        if(!email || !newPassword || !question){
            return res.status(404).send({
                success:false,
                message:'All fields are Required'
            });
        }
        const user = await userModel.findOne({email, question:question.toLowerCase()});
        if(!user){
            return res.status(200).send({
                success:false, 
                message:'Email or Answer are Invalid'
            });
        }
        const hashedPassword = await hashPassword(newPassword);
        const updatedUser = await userModel.findByIdAndUpdate(user._id, {password : hashedPassword});

        res.status(200).send({
            success:true,
            message:'Password Changed Successfully.',
            user:updatedUser,
        })
    }catch(err){
        // console.log(err);
        res.status(500).send({
            success:false,
            message:'Something Went Wrong.',
            err,
        })
    }
}

const updateAddressController = async (req,res)=>{
    try{
        // console.log("------------params---------", req.params);
        // console.log("--------------body-------", req.body.address);
        const user = await userModel.findByIdAndUpdate(req.params.id, {address : req.body.address}, {new:true});
        
        res.status(201).send({
            success:true,
            message:'Address Updated Successfully',
            user,
        })
    }catch(err){
        // console.log(err);
        res.status(500).send({
            success:false,
            message:'Something Went Wrong.',
            err,
        })
    }
}


// orders
const getOrderController = async (req,res)=>{
    try{
        // console.log("All orders---------------------------", req.user._id);
        const orders = await orderModel.find({buyer:req.user._id}).populate("products").populate("buyer");
        res.json(orders);
    }catch(err){
        // console.log(err);
        res.status(500).send({
            success:false,
            message:'Error while getting orders.',
            err,
        })
    }
}

// All Orders
const getAllOrderController = async (req,res)=>{
    try{
        // console.log("All Admin orders---------------------------", req.user._id);
        const orders = await orderModel.find().populate("products").populate("buyer");
        // console.log("orders : " ,orders)
        res.json(orders);
    }catch(err){
        // console.log(err);
        res.status(500).send({
            success:false,
            message:'Error while getting orders.',
            err,
        })
    }
}

// Update orders
const UpdateOrderController = async (req,res)=>{
    try{
        // console.log("Update Admin orders---------------------------", req.user._id);
        const { orderId } = req.params;
        const { status } = req.body;
        const orders = await orderModel.findByIdAndUpdate(orderId, {status}, {new:true});
        res.json(orders);
    }catch(err){
        // console.log(err);
        res.status(500).send({
            success:false,
            message:'Error while Updating orders.',
            err,
        })
    }
}

const GetAllUsers = async (req,res)=>{
    // console.log("get all users--------------------------")
    try{
        const allUsers = await userModel.find({});
        // console.log("allUsers : ",allUsers)
        res.json(allUsers);
    }catch(err){
        // console.log(err);
        res.status(500).send({
            success:false,
            message:'Error while Getting All Users',
            err,
        })
    }
}

const test = (req,res)=>{
    res.send("testing")
}

export {
    registerController, 
    loginController, 
    forgotPasswordController, 
    updateAddressController, 
    getOrderController, 
    getAllOrderController,
    UpdateOrderController, 
    GetAllUsers,
    test}