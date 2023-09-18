import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) navigate("/");
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = {
      name,
      email,
      password,
    };

    try {
      let response = await axios.post(
        "http://localhost:8000/user/signup",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response) navigate("/");
      else console.error("Signup failed");

      localStorage.setItem("user", JSON.stringify(response));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div id="signup">
      <h1>Register Here !!</h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignUp;
