import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: String,
    detail: String,
    quantity1: String,
    quantity2: String,
    quantity3: String,
    quantity4: String,
    quantity5: String,
    price1: Number,
    price2: Number,
    price3: Number,
    price4: Number,
    price5: Number,
    img: String,
    stock: Number,
    category: String
})

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema)

export default Product;