import React from 'react'

function AddLink() {
  return (
    <div className="p-8 rounded-3xl md:rounded-2xl bg-white flex flex-col items-center">
        <div className="w-full max-w-md flex flex-col gap-3 mb-6">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="url"
            placeholder="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="p-2 border rounded"
          />
          <button
            onClick={handleAddOrEdit}
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {editingLink ? "Update Link" : "Add Link"}
          </button>
        </div>

        {/* Links list */}
        <div className="w-full max-w-md flex flex-col gap-2">
          {links.length === 0 ? (
            <p className="text-gray-600 text-center">No links added yet.</p>
          ) : (
            links.map((link) => (
              <div
                key={link._id}
                className="flex justify-between items-center bg-white p-3 rounded shadow"
              >
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600"
                >
                  {link.title}
                </a>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(link)}
                    className="text-yellow-500 font-bold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(link._id)}
                    className="text-red-500 font-bold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
  )
}

export default AddLink