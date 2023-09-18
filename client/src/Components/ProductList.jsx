import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:8000/user/product-List");

    setProducts(response.data);
  };

  const deleteHandler = async (id) => {
    const response = await axios.delete(
      `http://localhost:8000/user/delete-Product/${id}`
    );
    if (response.data) getProducts();
  };

  const searchHandler = async (e) => {
    const key = e.target.value;
    try {
      if (key) {
        const response = await axios.get(
          `http://localhost:8000/user/search/${key}`
        );
        if (response) setProducts(response.data);
      } else {
        getProducts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="productlist">
      <h1>Producti List</h1>
      <input
        type="text"
        onChange={searchHandler}
        placeholder="Search Items.."
      />
      <ul>
        <li className="row">S. No.</li>
        <li className="row">Name</li>
        <li className="row">Price</li>
        <li className="row">Company</li>
        <li className="row">Operation</li>
      </ul>
      {products.length > 0 ? (
        products.map((item, index) => (
          <ul>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>₹{item.price}</li>
            <li>{item.company}</li>
            <li>
              <button onClick={() => deleteHandler(item._id)}>Delete</button>
              <Link to={`/update/${item._id}`}>Update</Link>
            </li>
          </ul>
        ))
      ) : (
        <h1>No Result Found</h1>
      )}
    </div>
  );
};

export default ProductList;
