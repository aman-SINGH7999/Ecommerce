import slugify from 'slugify';
import Category from '../models/categoryModel.js'

const createCategoryController = async (req,res)=>{
    try{
        const {name} = req.body
        if(!name){
            return res.status(500).send({
                success : false,
                message : "Please Provied The Name",
            })
        }
        const existingCategory = await Category.findOne({name});
        if(existingCategory){
            return res.status(500).send({
                success : false,
                message : "Category Is Already Exisits",
            })
        }
        const category = await new Category({name, slug:slugify(name)}).save();

        res.status(201).send({
            success : true,
            message : "New Category Created.",
            category
        })

    }catch(ree){
        // console.log(err);
        return res.status(500).send({
            success : false,
            message : "Something Went wrong",
            err,
        })
    }
}

const updateCategoryController = async (req,res)=>{
    try{
        const {name} = req.body;
        const {id} = req.params;
        const updatedCategory = await Category.findByIdAndUpdate(id, {name, slug:slugify(name)}, {new:true});
        res.status(200).send({
            success : true,
            message : "Category Updated Successfully",
            category : updatedCategory
        })
    }catch(err){
        // console.log(err);
        return res.status(500).send({
            success : false,
            message : "Something Went wrong",
            err,
        })
    }
}

const getAllCategoryController = async (req, res)=>{
    try{
        const allCategory = await Category.find({});
        res.status(200).send({
            success : true,
            message : "All Category",
            allCategory,
        }) 
    }catch(err){
        // console.log(err);
        return res.status(500).send({
            success : false,
            message : "Something Went wrong",
            err,
        })
    }
}

const singleCategory = async (req, res)=>{
    try{
        const allCategory = await Category.findOne({slug : req.params.slug});
        res.status(200).send({
            success : true,
            message : "All Category",
            allCategory,
        }) 
    }catch(err){
        // console.log(err);
        return res.status(500).send({
            success : false,
            message : "Something Went wrong",
            err,
        })
    }
}

const deleteCategoryController = async (req, res)=>{
    try{
        const deletedCategory = await Category.findByIdAndDelete({_id : req.params.id});
        res.status(200).send({
            success : true,
            message : "Category Deleted Successfully.",
            deletedCategory
        })
    }catch(err){
        // console.log(err);
        return res.status(500).send({
            success : false,
            message : "Something Went wrong",
            err,
        })
    }
}

export {
    createCategoryController, 
    updateCategoryController, 
    getAllCategoryController, 
    singleCategory, 
    deleteCategoryController
}