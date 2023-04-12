import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../config/firebaseConfig";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [error, setError] = useState(null);
  const handleLogin = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");
    signInWithEmailAndPassword(auth, email, password).catch((error) => {
      setError(error.message);
    });
  };
  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).catch((error) => {
      setError(error.message);
    });
  };
  return (
    <div>
      <h1>LoginPage</h1>
      <form onSubmit={handleLogin}>
        <input name="email" />
        <input name="password" />
        <input type="submit" value="Login" />
      </form>
      <button onClick={handleGoogleLogin}>Login with Google</button>
      <Link to="/security/register">Register</Link>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}
