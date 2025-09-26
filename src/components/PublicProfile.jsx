import React, { useEffect, useState } from "react";
import axios from "axios";

const PublicProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/users/${userId}`).then((res) => {
      setUser(res.data.user);
      setLinks(res.data.links);
    });
  }, [userId]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <img src={user.profileImage} alt={user.name} className="w-24 h-24 rounded-full mb-4" />
      <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
      <p className="text-gray-600 mb-6 text-center">{user.bio}hello</p>

      <div className="flex flex-col w-full max-w-xs gap-3">
        {links.map((link) => (
          <a
            key={link._id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-center font-medium transition duration-200"
          >
            {link.title}
          </a>
        ))}
      </div>
    </div>
  );
};

export default PublicProfile;
