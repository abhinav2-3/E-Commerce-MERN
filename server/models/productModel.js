import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  userId: { type: String, required: true },
  category: String,
  company: String,
});

export default mongoose.model("product", productSchema);
