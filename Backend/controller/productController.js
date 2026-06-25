import uploadOnCloudinary from "../config/cloudinary.js";
import productModel from './../model/productModel.js';
export const addProduct = async (req, res) => {
   try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;
          const image1 = req.files?.image1?.[0] ? await uploadOnCloudinary(req.files.image1[0].path) : null;
        const image2 = req.files?.image2?.[0] ? await uploadOnCloudinary(req.files.image2[0].path) : null;
        const image3 = req.files?.image3?.[0] ? await uploadOnCloudinary(req.files.image3[0].path) : null;
        const image4 = req.files?.image4?.[0] ? await uploadOnCloudinary(req.files.image4[0].path) : null;

        if (!image1) {
            return res.status(400).json({ success: false, message: "At least Image 1 is required" });
        }
        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: JSON.parse(sizes), 
            bestseller: bestseller === "true" ? true : false,
            image1: image1,
            image2: image2 || image1, 
            image3: image3 || image1, 
            image4: image4 || image1,
            date: Date.now()
        };

        const product = await productModel.create(productData)

        res.status(201).json({ success: true, message: "Product Added Successfully", product });


   } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const listProduct= async(req,res)=>{
    try {
        const product =await productModel.find({})
        res.status(201).json({ success: true, message: "Product List", product });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const removeProduct= async(req,res)=>{
    try {
        let {id}=req.params;
        const product =await productModel.findByIdAndDelete(id)
        res.status(201).json({ success: true, message: "Product List", product });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
}