import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket, faCircleUser, faLink } from "@fortawesome/free-solid-svg-icons";
import { FiMoreVertical } from "react-icons/fi";
import { FaInstagram, FaWhatsapp, FaGithub, FaHashtag, FaShareAlt } from "react-icons/fa";

const iconMap = {
  WhatsApp: <FaWhatsapp className="text-green-600" />,
  Instagram: <FaInstagram className="text-pink-600" />,
  GitHub: <FaGithub className="text-gray-800" />,
  Threads: <FaHashtag className="text-purple-600" />,
  Website: <FontAwesomeIcon icon={faLink} />,
};

const Dashboard = ({ user }) => {
  const [links, setLinks] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [editingLink, setEditingLink] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [showAddBox, setShowAddBox] = useState(false);
  const [selectedType, setSelectedType] = useState(null);

  const dropdownRefs = useRef({});
  const addBoxRef = useRef(null);

  useEffect(() => {
    fetchLinks();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showAddBox && addBoxRef.current && !addBoxRef.current.contains(event.target)) {
        setShowAddBox(false);
        setSelectedType(null);
        setTitle("");
        setUrl("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showAddBox]);

  const fetchLinks = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/links`);
      setLinks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddOrEdit = async () => {
    try {
      let finalTitle = selectedType;
      let finalUrl = url.trim();

      if (!finalUrl && selectedType !== "Website") {
        alert("Input cannot be empty!");
        return;
      }

      if (selectedType === "WhatsApp") {
        const numberOnly = finalUrl.replace(/\D/g, "");
        if (!numberOnly) {
          alert("Please enter a valid WhatsApp number");
          return;
        }
        finalUrl = `https://wa.me/${numberOnly}`;
      } else if (["Instagram", "GitHub", "Threads"].includes(selectedType)) {
        const usernameRegex = /^[a-zA-Z0-9._]+$/;
        if (!usernameRegex.test(finalUrl)) {
          alert("Please enter a valid username (letters, numbers, ., _ only)");
          return;
        }
        if (selectedType === "Instagram") finalUrl = `https://www.instagram.com/${finalUrl}/`;
        if (selectedType === "GitHub") finalUrl = `https://github.com/${finalUrl}`;
        if (selectedType === "Threads") finalUrl = `https://www.threads.net/@${finalUrl}`;
      } else if (selectedType === "Website") {
        if (!title.trim()) {
          alert("Please enter a title for the website");
          return;
        }
        try {
          new URL(finalUrl);
        } catch (e) {
          alert("Please enter a valid website URL (https://...)");
          return;
        }
        finalTitle = title.trim();
      }

      const icon = selectedType;

      if (editingLink) {
        await axios.put(`${import.meta.env.VITE_API_URL}/api/links/${editingLink._id}`, {
          title: finalTitle,
          url: finalUrl,
          icon,
        });
        setEditingLink(null);
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/links`, {
          title: finalTitle,
          url: finalUrl,
          icon,
        });
      }

      setTitle("");
      setUrl("");
      setSelectedType(null);
      setShowAddBox(false);
      fetchLinks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (link) => {
    setEditingLink(link);
    setUrl(link.url);
    setTitle(link.title);
    setSelectedType(link.icon);
    setShowAddBox(true);
    setOpenMenuId(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/links/${id}`);
      fetchLinks();
      setOpenMenuId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleShare = () => {
    const profileLink = window.location.href; 
    if (navigator.share) {
      navigator.share({
        title: `${user.displayName}'s Profile`,
        url: profileLink,
      });
    } else {
      
      navigator.clipboard.writeText(profileLink);
      alert("Profile link copied to clipboard!");
    }
  };

  return (
    <div className="relative py-6">
      <div className="p-5 flex flex-col items-center">
         <button
        className="absolute ml-56 h-9 w-9 flex items-center gap-2 bg-gray-300 text-white p-2 rounded-full shadow hover:bg-gray-400 transition"
        onClick={handleShare}
      >
       <FontAwesomeIcon icon={faArrowUpFromBracket} />
      </button>
        <div className="text-4xl">
          <FontAwesomeIcon className="opacity-45" icon={faCircleUser} size="2xl" />
        </div>
        <div>
          <p className="text-lg font-semibold">{user.displayName}</p>
          <p className="text-gray-500">@{user.username}</p>
        </div>
      </div>

      <div className="p-5 flex justify-center">
        <button
          onClick={() => {
            setShowAddBox(!showAddBox);
            setSelectedType(null);
            setTitle("");
            setUrl("");
          }}
          className="p-2 rounded-4xl text-center border border-gray-400 w-60 font-semibold hover:bg-gray-100 transition"
        >
          Add Link <span className="text-xl">+</span>
        </button>
      </div>

      {showAddBox && (
        <div ref={addBoxRef} className="w-full max-w-md mx-auto bg-gray-50 p-4 rounded-lg shadow">
          {!selectedType ? (
            <>
              <p className="text-lg font-semibold mb-3 text-center">Choose a Link Type</p>
              <div className="grid grid-cols-2 gap-3">
                {["WhatsApp", "Instagram", "GitHub", "Threads"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center gap-2 font-medium"
                  >
                    {iconMap[type]} {type}
                  </button>
                ))}
                <button
                  onClick={() => setSelectedType("Website")}
                  className="col-span-2 p-3 bg-blue-100 hover:bg-blue-200 rounded-lg flex items-center justify-center gap-2 font-medium"
                >
                  {iconMap["Website"]} Website
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-3">
              <p className="text-lg font-semibold text-center">Add {selectedType} Link</p>

              {(selectedType === "WhatsApp" ||
                selectedType === "Instagram" ||
                selectedType === "GitHub" ||
                selectedType === "Threads") && (
                <input
                  type={selectedType === "WhatsApp" ? "tel" : "text"}
                  placeholder={
                    selectedType === "WhatsApp"
                      ? "Enter WhatsApp number with country code"
                      : "Enter username"
                  }
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="p-2 border border-gray-400 placeholder:text-sm rounded-4xl"
                />
              )}

              {selectedType === "Website" && (
                <>
                  <input
                    type="text"
                    placeholder="Enter link title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="p-2 border border-gray-400 placeholder:text-sm rounded-4xl"
                  />
                  <input
                    type="url"
                    placeholder="Enter website URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="p-2 border border-gray-400 placeholder:text-sm rounded-4xl"
                  />
                </>
              )}

              <button
                onClick={handleAddOrEdit}
                className="bg-blue-500 text-white py-2 rounded-4xl hover:bg-blue-600 transition"
              >
                {editingLink ? "Update Link" : "Add Link"}
              </button>
            </div>
          )}
        </div>
      )}

      <div className="p-4 rounded-3xl bg-white flex flex-col items-center mt-4">
        <div className="w-full max-w-md flex flex-col gap-2">
          {links.length === 0 ? (
            <p className="text-gray-600 text-center">No links added yet.</p>
          ) : (
            links.map((link) => (
              <div
                key={link._id}
                className="flex justify-between items-center bg-emerald-100 p-2 rounded-4xl shadow relative"
              >
                <div className="text-2xl">{iconMap[link.icon]}</div>
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-black font-medium">
                  {link.title}
                </a>

                <div className="relative" ref={(el) => (dropdownRefs.current[link._id] = el)}>
                  <button
                    onClick={() => setOpenMenuId(openMenuId === link._id ? null : link._id)}
                    className="p-2 rounded-full hover:bg-emerald-200"
                  >
                    <FiMoreVertical className="text-xl" />
                  </button>

                  {openMenuId === link._id && (
                    <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      <button
                        onClick={() => handleEdit(link)}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(link._id)}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
