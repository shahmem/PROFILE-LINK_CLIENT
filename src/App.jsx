import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddBio from "./components/AddBio";
import Home from "./pages/Home";
import Dashboard from "./components/Dashboard";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/profiles`);
        setUser(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AddBio />} />
        <Route path="/home" element={<Home user={user} setUser={setUser} />} />
        <Route path="/dashboard" element={<Dashboard  />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
