import express from "express";
import { 
    registerController, 
    loginController, 
    forgotPasswordController, 
    updateAddressController, 
    getOrderController,
    getAllOrderController,
    UpdateOrderController,
    GetAllUsers,
    test, 
    } from "../controllers/authController.js";
import { isAdmin, requireSingIn} from '../middlewares/authMiddlewares.js'
// router object
const router = express.Router();

// routing
// register
router.post('/register', registerController);
// login
router.post('/login', loginController);
// forgot password
router.post('/forgotpassword', forgotPasswordController);
// update-address
router.put('/update-address/:id', requireSingIn, updateAddressController);

// test
router.get('/test', requireSingIn, isAdmin, test);

// Protected Route for user
router.get('/user-auth', requireSingIn, (req,res)=>{
    res.status(200).send({ok:true});
})
// Protected Route for Admin
router.get('/admin-auth', requireSingIn, isAdmin, (req,res)=>{
    res.status(200).send({ok:true});
})

// orders
router.get('/orders', requireSingIn, getOrderController);

// All orders
router.get('/all-orders', requireSingIn, isAdmin, getAllOrderController);

// Update orders
router.put('/update-orders/:orderId', requireSingIn, isAdmin, UpdateOrderController);

// GET All USERS
router.get('/all-users', requireSingIn, isAdmin, GetAllUsers);

export default router