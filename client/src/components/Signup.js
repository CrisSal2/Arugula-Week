import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { SIGNUP_USER } from "../graphql/mutations";

const Signup = () => {
  const [signup, { data, error }] = useMutation(SIGNUP_USER);
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await signup({
        variables: { ...formState },
      });
      // Save the token
      localStorage.setItem("auth-token", data.signup.token); 
      console.log("Signup successful, token:", data.signup.token);
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
        name="username"
        type="text"
        placeholder="Username"
        onChange={handleChange}
      />
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
      <button type="submit">Signup</button>
      {error && <div>Signup failed</div>}
    </form>
  );
};

export default Signup;
