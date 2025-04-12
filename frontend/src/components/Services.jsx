import React from "react";

const Services = ({ services, onView, onDelete }) => {
  if (!services || services.length === 0) {
    return (
      <div className="mt-6 bg-gray-50 rounded-lg p-6 text-center text-gray-500 border border-gray-200">
        <p>No passwords stored yet. Add your first password above.</p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-3 text-gray-800 flex items-center">
        <span className="mr-2">🔑</span> Stored Passwords
      </h3>
      <ul className="divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
        {services.map((service, index) => (
          <li key={index} className="flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition duration-150">
            <span className="font-medium text-gray-700">{service}</span>
            <div className="flex space-x-2">
              <button
                onClick={() => onView(service)}
                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition duration-150 text-sm flex items-center"
              >
                <span className="mr-1">👁️</span> View
              </button>
              <button
                onClick={() => onDelete(service)}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-150 text-sm flex items-center"
              >
                <span className="mr-1">🗑️</span> Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Services;