import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaInstagram, FaWhatsapp, FaGithub, FaHashtag } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

const iconMap = {
  WhatsApp: <FaWhatsapp className="text-green-600" />,
  Instagram: <FaInstagram className="text-pink-600" />,
  GitHub: <FaGithub className="text-gray-800" />,
  Threads: <FaHashtag className="text-purple-600" />,
  Website: <FontAwesomeIcon icon={faLink} />,
};

function HomeBio({ user }) {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/links");
      setLinks(res.data);
    } catch (err) {
      console.error("Error fetching links:", err);
    }
  };

  return (
    <>
      <div className="mt-3 p-6 md:px-12 md:flex-1 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold">{user.displayName}</h2>
        {user.bio && <p className="text-gray-600 mb-2">{user.bio}</p>}
        <p className="text-gray-500">@{user.username}</p>

        {/* Links Section */}
        {links.length > 0 && (
          <div className="mt-10 flex flex-col gap-2">
            {links.map((link) => (
              <a
                key={link._id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gray-100 p-2 rounded-4xl hover:bg-gray-200 transition"
              >
                <span className="text-2xl">{iconMap[link.icon]}</span>
                <span className="font-medium">{link.title}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default HomeBio;
