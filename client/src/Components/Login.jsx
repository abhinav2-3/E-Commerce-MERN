import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) navigate("/");
  });

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/user/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.name);
      if (response.data) {
        navigate("/");
        localStorage.setItem("user", JSON.stringify(response.data));
      } else {
        alert("Incorrect email or password. Please try again.");
        console.error("Login failed: Incorrect email or password.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div id="signup">
      <h1>Login Here !!</h1>
      <form onSubmit={loginHandler}>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          placeholder="Enter Your Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
