import React from "react";

const Services = ({ services, onView, onDelete }) => {
  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-2">Stored Passwords:</h3>
      <ul className="space-y-2">
        {services.map((s, i) => (
          <li key={i} className="flex items-center gap-4 bg-gray-100 p-2 rounded-md shadow-sm">
            <span className="font-medium text-gray-700">{s}</span>
            <button
              onClick={() => onView(s)}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              View CID
            </button>
            <button
              onClick={() => onDelete(s)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Services;
