import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }

    const userId = JSON.parse(localStorage.getItem("user"))._id;
    const productData = { name, price, category, userId, company };
    try {
      const response = await axios.post(
        "http://localhost:8000/user/add-Product",
        productData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      if (data) alert(`${data.name} is Added Successfully`);
    } catch (error) {
      alert("Error while adding Product");
    }
  };

  return (
    <div id="signup">
      <h1>Add Products</h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Enter Product Name"
          onChange={(e) => setName(e.target.value)}
        />
        {error && !name && <span>Enter valid name</span>}
        <input
          type="text"
          name="price"
          value={price}
          placeholder="Enter Product Price"
          onChange={(e) => setPrice(e.target.value)}
        />
        {error && !price && <span>Enter valid price</span>}
        <input
          type="text"
          name="category"
          value={category}
          placeholder="Enter Product category"
          onChange={(e) => setCategory(e.target.value)}
        />
        {error && !category && <span>Enter valid category</span>}
        <input
          type="text"
          name="company"
          value={company}
          placeholder="Enter Product company"
          onChange={(e) => setCompany(e.target.value)}
        />
        {error && !company && <span>Enter valid company</span>}
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
