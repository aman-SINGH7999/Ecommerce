import express from 'express'
import { isAdmin, requireSingIn } from '../middlewares/authMiddlewares.js';
import { 
    createCategoryController, 
    updateCategoryController, 
    getAllCategoryController, 
    singleCategory, 
    deleteCategoryController,
} from '../controllers/categoryController.js';

const router = express.Router();

// routes
router.post('/create-category', requireSingIn, isAdmin, createCategoryController);

router.put('/update-category/:id', requireSingIn, isAdmin, updateCategoryController);

router.get('/getall-category', getAllCategoryController);

router.get('/single-category/:slug', singleCategory);

router.delete('/delete-category/:id', requireSingIn, isAdmin, deleteCategoryController)

export default router;