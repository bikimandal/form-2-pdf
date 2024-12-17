import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUpload } from "react-icons/fi";
import {
  FaUserAlt,
  FaPhoneAlt,
  FaRegFileImage,
  FaRegAddressBook,
} from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai"; // Cross button icon

const Form: React.FC = () => {
  const [name, setName] = useState("");
  const [className, setClassName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !className || !rollNumber || !contactNumber) {
      setError("Please fill out all fields.");
      return;
    }

    const formData = {
      name,
      className,
      rollNumber,
      contactNumber,
      profilePicture,
    };

    navigate("/output", { state: { data: formData } });
  };

  const removeProfilePicture = () => {
    setProfilePicture(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center p-4">
      <div className="max-w-xl w-full mx-auto p-8 bg-white rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-500 ease-in-out">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          User Information Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="text-lg mb-2 text-gray-700 flex items-center space-x-2">
              <FaUserAlt className="text-gray-600" />
              <span>Name</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-700 placeholder-gray-500"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Class */}
          <div>
            <label className="text-lg mb-2 text-gray-700 flex items-center space-x-2">
              <FaRegAddressBook className="text-gray-600" />
              <span>Class</span>
            </label>
            <input
              type="text"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-700 placeholder-gray-500"
              placeholder="Enter your class"
              required
            />
          </div>

          {/* Roll Number */}
          <div>
            <label className="text-lg mb-2 text-gray-700 flex items-center space-x-2">
              <FaRegAddressBook className="text-gray-600" />
              <span>Roll Number</span>
            </label>
            <input
              type="text"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-700 placeholder-gray-500"
              placeholder="Enter your roll number"
              required
            />
          </div>

          {/* Contact Number */}
          <div>
            <label className="text-lg mb-2 text-gray-700 flex items-center space-x-2">
              <FaPhoneAlt className="text-gray-600" />
              <span>Contact Number</span>
            </label>
            <input
              type="text"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-700 placeholder-gray-500"
              placeholder="Enter your contact number"
              required
            />
          </div>

          {/* Profile Picture */}
          <div>
            <label className="text-lg mb-2 text-gray-700 flex items-center space-x-2">
              <FaRegFileImage className="text-gray-600" />
              <span>Profile Picture</span>
            </label>
            <input
              type="file"
              id="fileInput"
              onChange={(e) => setProfilePicture(e.target.files?.[0] || null)}
              className="hidden"
              accept="image/*"
            />
            <label
              htmlFor="fileInput"
              className="cursor-pointer flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <FiUpload className="w-5 h-5" />
              Upload Profile Picture
            </label>

            {/* Uploaded Image Preview with Remove Option */}
            {profilePicture && (
              <div className="relative mt-4 inline-block group">
                <img
                  src={URL.createObjectURL(profilePicture)}
                  alt="Profile Preview"
                  className="w-32 h-32 object-cover rounded-full border-2 border-gray-300 transition-transform transform hover:scale-105"
                />
                {/* Remove Button */}
                <button
                  type="button"
                  onClick={removeProfilePicture}
                  className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full transform scale-75 group-hover:scale-100 transition-transform duration-300"
                >
                  <AiOutlineCloseCircle className="w-6 h-6" />
                </button>
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded-md shadow-md hover:from-teal-500 hover:to-blue-600 transition-all"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
