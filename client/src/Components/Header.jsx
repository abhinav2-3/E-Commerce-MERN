import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.clear();
    navigate("/signup");
  };
  return (
    <header>
      <div>
        <h1>Swiggy.</h1>
      </div>
      {auth ? (
        <ul>
          <li>
            <Link to={"/"}>Products</Link>
          </li>
          <li>
            <Link to={"/add"}>Add Products</Link>
          </li>
          <li>
            <Link to={"/update"}>Update Products</Link>
          </li>
          <li>
            <Link onClick={logoutHandler} to={"/signup"}>
              Logout({JSON.parse(auth).name})
            </Link>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to={"/signup"}>Sign UP</Link>
          </li>
          <li>
            <Link to={"/login"}>Login</Link>
          </li>
        </ul>
      )}
    </header>
  );
};

export default Header;
