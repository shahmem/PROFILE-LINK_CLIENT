import React from "react";
import { useNavigate } from 'react-router-dom'; 

function AddBio() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
        <button onClick={()=>{navigate('/home')}} className="px-6 py-3 text-lg font-semibold text-indigo-700 bg-white rounded-2xl shadow-md hover:bg-indigo-50 transition">
          Add bio +
        </button>
      </div>
    </div>
  );
}

export default AddBio;
