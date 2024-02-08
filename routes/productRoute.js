import express from 'express'
import { isAdmin, requireSingIn } from '../middlewares/authMiddlewares.js';

// for sending file data
// import formidable from 'express-formidable'
// formidable(),

import { 
    createProductController,
    getAllProductsController,
    deleteProductController,
    updateProductController,
    getProductController,
    filterProductController,
    productCountController,
    productListController,
    searchProductController,
    relatedProductController,
    productCategoryController,
 } from '../controllers/productController.js';

const router = express.Router();

router.post('/create-product', requireSingIn, isAdmin, createProductController);
router.delete('/delete-product/:id', requireSingIn, isAdmin, deleteProductController);
router.put('/update-product/:id', requireSingIn, isAdmin, updateProductController);

router.get('/getall-products', getAllProductsController);
router.get('/get-product/:slug', getProductController);

router.post('/filter-product', filterProductController);
router.get('/count-product', productCountController);
router.get('/product-list/:page', productListController);
router.get('/search-product/:keyword', searchProductController);
router.get('/related-product/:pid/:cid', relatedProductController);
router.get('/product-by-category/:slug', productCategoryController);

export default router;