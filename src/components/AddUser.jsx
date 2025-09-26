import React, { useState } from "react";
import axios from "axios";

const AddUser = ({ setUser }) => {
  const [formData, setFormData] = useState({
    username: "",
    displayName: "",
    bio: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!formData.username) {
      setMessage({ type: "error", text: "Username is required" });
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/profiles`,
        formData
      );
      setMessage({ type: "success", text: "User created successfully!" });
      setFormData({ username: "", displayName: "", bio: "" });
      setUser(res.data);
    } catch (err) {
      const errorText = err.response?.data?.error || "Something went wrong";
      setMessage({ type: "error", text: errorText });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-16">

    <div className="max-w-md mx-auto p-6  bg-white rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Profile</h2>
      {message && (
        <div
          className={`mb-4 px-4 py-2 rounded ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Username *</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
            placeholder="e.g. johndoe"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
            placeholder="e.g. John Doe"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
            placeholder="Short bio..."
            rows={3}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add User"}
        </button>
      </form>
    </div>
    </div>
  );
};

export default AddUser;
