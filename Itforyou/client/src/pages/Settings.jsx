import React from 'react';


const handleChange = (e) => {
  setFormData({ ...formData, [e.target.id]: e.target.value });

  
};
const Settings = () => {
  return (
    <div className="container mx-auto mt-8 bg-gradient-to-br from-indigo-900 to-green-900 min-h-screen overflow-auto">
      <h1 className="text-3xl font-semibold mb-6">Settings</h1>

    

      {/* Change Password Section */}
      <div className="mt-8 bg-indigo-950 min-h-screen overflow-auto p-6 rounded-lg shadow-md">
        <h2 className="text-xl text-white font-semibold mb-4">Change Password</h2>

        <div className="mb-4">
          <label htmlFor="currentPassword" className="block text-sm text-white	 font-medium ">
            Current Password
          </label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            className="mt-1 p-2 border rounded-md w-full"
            onChange={handleChange}
            placeholder="Enter your current password"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-sm font-medium text-white">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            className="mt-1 p-2 border rounded-md w-full"
            onChange={handleChange}
            placeholder="Enter your new password"
          />
        </div>

        <button
          type="button"
          className=" text-white px-4 py-2 rounded-md   group  flex  items-center h-10 w-15 bg-indigo-900  shadow-xl gap-5  ring-2 ring-offset-2 ring-offset-blue-800 ring-cyan-700  cursor-pointer hover:bg-blue-900 hover:bg-opacity-100 transition"
        >
          Change Password
        </button>
      </div>

    </div>
  );
};

export default Settings;
