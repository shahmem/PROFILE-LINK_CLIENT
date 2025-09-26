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
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/profiles/user`);
        setUser(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AddBio />} />
        <Route path="/home" element={<Home user={user} setUser={setUser} />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
