import React from "react";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import AddUser from "../components/AddUser";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import HomeBio from "../components/HomeBio";
import MiniBio from "../components/MiniBio";

function Home({user,setUser}) {
 

  return (
    <div className="bg-gray-50">
      <Navbar />
      <div className="pt-12">
        {!user ? (
          <AddUser setUser={setUser} />
        ) : (
          <div className="min-h-screen pt-16 flex flex-col md:flex-row">
            <HomeBio user={user} />
            <MiniBio user={user} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
