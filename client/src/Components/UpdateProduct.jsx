import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/user/product/${id}`
      );
      setName(response.data.name);
      setPrice(response.data.price);
      setCategory(response.data.category);
      setCompany(response.data.company);
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const productData = { name, price, category, company };
    try {
      const response = await axios.put(
        `http://localhost:8000/user/update/${id}`,
        productData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data) {
        alert("Product Updated Successully");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div id="signup">
      <h1>Update Products</h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Enter Product Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          name="price"
          value={price}
          placeholder="Enter Product Price"
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="text"
          name="category"
          value={category}
          placeholder="Enter Product category"
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="text"
          name="company"
          value={company}
          placeholder="Enter Product company"
          onChange={(e) => setCompany(e.target.value)}
        />

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
