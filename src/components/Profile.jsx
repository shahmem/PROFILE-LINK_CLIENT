import React from "react";

function Profile() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
        <div className="flex flex-col items-center mb-8">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="w-24 h-24 rounded-full mb-4 border-2 border-gray-300"
          />
          <h1 className="text-2xl font-bold text-gray-800 mb-1">John Doe</h1>
          <p className="text-gray-600 text-center">
            Web Developer | Tech Enthusiast
          </p>
        </div>
        <div className="w-full max-w-xs flex flex-col gap-4">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-center font-medium transition duration-200"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-400 hover:bg-blue-500 text-white py-3 rounded-lg text-center font-medium transition duration-200"
          >
            LinkedIn
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-300 hover:bg-blue-400 text-white py-3 rounded-lg text-center font-medium transition duration-200"
          >
            Twitter
          </a>
          <a
            href="mailto:example@mail.com"
            className="bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-lg text-center font-medium transition duration-200"
          >
            Contact Me
          </a>
        </div>
      </div>
    </>
  );
}

export default Profile;
