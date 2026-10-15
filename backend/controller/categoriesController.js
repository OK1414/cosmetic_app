import Category  from "../models/category.model.js";



export const category = async (req, res) => {
    try {
    const {name, description} = req.body;
    const categories = await Category.create({
        name,
        description
    });
    
    res.json({
      is_successful: true,
      message: "Category added successfully",
      data: categories  
    });
}catch(error){
    console.log(error);
}
}


export const getCategory = async (req, res) => {
    try {
        const categories = await Category.find({});
       res.json({
        is_successful : true,
        data : categories,
       });
    }catch(error){
        console.log(error);

        res.json({
            is_successful : false,
            data : [],
            message : error.message
        })
    }
}

export const updateCategory = async (req,res) => {
    try{ 
        const id = req.params.id;
        const {name,description} =req.body;
        const categories = await Category.findByIdAndUpdate(
            {
            _id : id,

        },
        {
            name,
            description
        }
    )
    res.json({
        is_successful: true,
        message: "Category updated successfully",
        data: categories
    });
    }catch(error){
        console.log(error);
        res.json({
            is_successful: false,
            message: error.message
        });
    }
}


export const deleteCategory = async (req,res) => {
    try{
        const id = req.params.id;  
        const categories = await Category.findByIdAndDelete(id);
        res.json({
            is_successful: true,
            message: "Category deleted successfully",
            data: categories
        });
    }catch(error){
        console.log(error);
        res.json({
            is_successful: false,
            message: error.message
        });
    }
}