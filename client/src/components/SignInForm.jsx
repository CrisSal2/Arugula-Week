import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../graphql/mutations";

const Login = () => {
  const [login, { data, error }] = useMutation(LOGIN_USER);
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      // Save the token
      localStorage.setItem("auth-token", data.login.token);
      console.log("Login successful, token:", data.login.token);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <button type="submit">Login</button>
      {error && <div>Login failed</div>}
    </form>
  );
};

export default Login;
