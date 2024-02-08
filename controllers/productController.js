import Product from '../models/productModel.js'
import slugify from 'slugify';
import Category from '../models/categoryModel.js'
 
const createProductController = async (req,res)=>{
    // console.log("----hiiiii----")
    try{
        const {name, slug, description, price, category, quantity, photo, shipping } = req.body;
        if(!name || !description || !price || !category || !quantity || !photo){
            return res.status(500).send({
                success : false,
                message : "All Fields Are Required."
            })
        }

        const product = await new Product({
            name,
            slug : slugify(name),
            description,
            price,
            category,
            quantity,
            photo,
        }).save();

        res.status(201).send({
            success : true,
            message : "Product Created Successfully",
            product,
        })

    }catch(err){
        // console.log(err);
        res.status(500).send({
            success : false,
            message : "Error While Creating Product.",
            err,
        })
    }
}

const deleteProductController = async (req,res)=>{
    try{
        const product = await Product.findByIdAndDelete(req.params.id);
        res.status(200).send({
            success : true,
            message : "Product Is Deleted Successfully",
            product
        })
    }catch(err){
        // console.log(err);
        res.status(500).send({
            success : false,
            message : "Error While Deleting Product.",
            err,
        })
    }
}

const updateProductController = async (req,res)=>{
    // console.log("-----------hi-----------------hi----------------hi-----------", req.body)
    try{
        const {name, slug, description, price, category, quantity, photo, shipping } = req.body;
        if(!name || !description || !price || !category || !quantity || !photo){
            return res.status(500).send({
                success : false,
                message : "All Fields Are Required."
            })
        }

        const product = await Product.findByIdAndUpdate(req.params.id,{
            name,
            slug : slugify(name),
            description,
            price,
            category,
            quantity,
            photo,
        }, {new:true});

        res.status(201).send({
            success : true,
            message : "Product Updated Successfully",
            product,
        })

    }catch(err){
        // console.log(err);
        res.status(500).send({
            success : false,
            message : "Error While Updating Product.",
            err,
        })
    }
}

// get all products
const getAllProductsController = async (req,res)=>{
    try{
        const allProducts = await Product.find({}).populate('category').limit(20).sort({createdAt:-1});
        res.status(200).send({
            success : true,
            message : "Get All products",
            totalCount : allProducts.length,
            allProducts
        })
    }catch(err){
        // console.log(err);
        res.status(500).send({
            success : false,
            message : "Error While Getting Product.",
            err,
        })
    }
}

const getProductController = async (req,res)=>{
    try{
        // console.log("------------------------------------------------------")
        const product = await Product.findOne({slug:req.params.slug}).populate('category');
        res.status(200).send({
            success : true,
            message : "Get product",
            product
        })
    }catch(err){
        // console.log(err);
        res.status(500).send({
            success : false,
            message : "Error While Get a Product.",
            err,
        })
    }
}

const filterProductController = async (req,res)=>{
    // console.log("------------Params : ---------------------------",req.params)
    try{
        const {checked, radio} = req.body;
        let args = {}
        if(checked.length > 0) args.category = checked;
        if(radio.length) args.price = {$gte: radio[0], $lte: radio[1]};
        const products = await Product.find(args);
        res.status(200).send({
            success:true,
            products,
        })
    }catch(err){
        // console.log(err);
        res.status(500).send({
            success : false,
            message : "Error While Filtring Product",
            err,
        })
    }
}

// Count Product
const productCountController = async (req, res)=>{
    try{
        const total = await Product.find({}).estimatedDocumentCount();
        res.status(200).send({
            success:true,
            total,
        })
    }catch(err){
        // console.log(err);
        res.status(500).send({
            success : false,
            message : "Error While Count Product",
            err,
        })
    }
}

// product List Controller
const productListController = async (req, res)=>{
    try{
        const perPage = 6;
        const page = req.params.page ? req.params.page : 1
        const products = await Product.find({}).skip((page-1) * perPage).limit(perPage).sort({createdAt:-1});
        res.status(200).send({
            success:true,
            products,
        })
    }catch(err){
        // console.log(err);
        res.status(500).send({
            success : false,
            message : "Error in Per-Page",
            err,
        })
    }
}

const searchProductController = async (req, res)=>{
    try{
        const {keyword} = req.params;
        const results = await Product.find({
            $or : [
                {name : {$regex: keyword, $options: "i"}},
                {description : {$regex: keyword, $options: "i"}}
            ]
        })
        res.json(results);
    }catch(err){
        // console.log(err);
        res.status(500).send({
            success : false,
            message : "Error in Per-Page",
            err,
        })
    }
}

const relatedProductController = async (req,res)=>{
    try{
        const {pid, cid} = req.params;
        const products = await Product.find({
            category: cid,
            _id: {$ne:pid},
        }).limit(3).populate("category");
        res.status(200).send({
            success: true,
            products,
        })
    }catch(err){
        // console.log(err);
        res.status(500).send({
            success : false,
            message : "Error while getting related product",
            err,
        })
    }
}
const productCategoryController = async (req, res)=>{
    try{
        const category = await Category.findOne({slug:req.params.slug});
        const products = await Product.find({category}).populate("category");
        res.status(200).send({
            success: true,
            category,
            products,
        })
    }catch(err){
        // console.log(err);
        res.status(500).send({
            success : false,
            message : "Error while getting product by category",
            err,
        })
    }
}

export {
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
}