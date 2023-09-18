import Product from "../models/productModel.js";

export const addProduct = async (req, res) => {
  const { name, price, category, userId, company } = req.body;
  try {
    const product = await Product.create({
      name,
      price,
      category,
      userId,
      company,
    });
    return res.send(product);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const productList = async (req, res) => {
  const products = await Product.find();
  if (products.length > 0) res.send(products);
  else res.send({ message: "No Products found" });
};

export const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.send({ message: "Unable to Delete" });

    return res.send({ message: "Product Deleted", product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    if (!product) return res.send({ message: "Product Not Found" });
    else return res.send(product);
  } catch (error) {
    rs;
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  const { name, price, category, company } = req.body;
  const id = req.params.id;

  try {
    const product = await Product.findByIdAndUpdate(id, {
      name,
      price,
      category,
      company,
    });
    if (!product) return res.send({ message: "Product Not Found" });
    return res.send(product);
  } catch (error) {
    console.log(error);
    return res.send("Internal Server Eroor");
  }
};

export const searchProduct = async (req, res) => {
  const key = req.params.key;
  try {
    const result = await Product.find({
      $or: [
        { name: { $regex: key } },
        { company: { $regex: key } },
        { category: { $regex: key } },
      ],
    });
    return res.send(result);
  } catch (error) {
    return res.send({ message: "Internal Server Error" });
  }
};
