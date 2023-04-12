import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../config/firebaseConfig";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [error, setError] = useState(null);
  const handleRegister = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");
    createUserWithEmailAndPassword(auth, email, password).catch((error) => {
      setError(error.message);
    });
  };
  return (
    <div>
      <h1>RegisterPage</h1>
      <form onSubmit={handleRegister}>
        <input name="email" />
        <input name="password" />
        <input type="submit" value="Register" />
      </form>
      <Link to="/security/login">Login</Link>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}
