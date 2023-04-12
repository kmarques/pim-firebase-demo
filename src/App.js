import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import SecurityLayout from "./layout/SecurityLayout";
import PrivateLayout from "./layout/PrivateLayout";
import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";
import HomePage from "./views/HomePage";
import { auth } from "./config/firebaseConfig";
import { useState } from "react";
import Logout from "./views/Logout";

function App() {
  const [user, setUser] = useState(null);
  onAuthStateChanged(auth, (user) => setUser(user || false));

  if (user === null) return <div>Loading...</div>;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/security" element={<SecurityLayout user={user} />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        <Route path="/" element={<PrivateLayout user={user} />}>
          <Route path="logout" element={<Logout />} />
          <Route path="" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
