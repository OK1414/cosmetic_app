import Product from  "../models/product.model.js";


export const product = async (req, res) => {
    try {
    const {name, description,price, categoryId} = req.body;
    const products = await Product.create({
        name,
        description,
        price,
        category : categoryId
    });
    
    res.json({
      is_successful: true,
      message: "Product added successfully",
      data: products  
    });
}catch(error){
    console.log(error);
}
}


export const getProduct = async (req, res) => {
    try {
        const products = await Product.find({});
       res.json({
        is_successful : true,
        data : products,
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

export const updateProduct = async (req,res) => {
    try{ 
        const id = req.params.id;
        const {name,description,price,categoryId} =req.body;
        const products = await Product.findByIdAndUpdate(
            {
            _id : id,

        },
        {
            name,
            description,
            price,
            categoryId
        }
    )
    res.json({
        is_successful: true,
        message: "Product updated successfully",
        data: products
    });
    }catch(error){
        console.log(error);
        res.json({
            is_successful: false,
            message: error.message
        });
    }
}


export const deleteProduct = async (req,res) => {
    try{
        const id = req.params.id;  
        const products = await Product.findByIdAndDelete(id);
        res.json({
            is_successful: true,
            message: "Product deleted successfully",
            data: products
        });
    }catch(error){
        console.log(error);
        res.json({
            is_successful: false,
            message: error.message
        });
    }
}