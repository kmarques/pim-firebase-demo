import { signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../config/firebaseConfig";

export default function Logout() {
  useEffect(() => {
    signOut(auth);
  }, []);
  return <div>Logout</div>;
}
