import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";
import Swal from "sweetalert2";
import Background from "../assets/tasks.jpg";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

const ActivityForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    subject: null,
  });

  const subjects = [
    { value: "math", label: "Math" },
    { value: "science", label: "Science" },
    { value: "history", label: "History" },
  ];

  const handleChange = (selectedOption) => {
    setFormData({ ...formData, subject: selectedOption.value });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://bacsil.onrender.com/activity/upload",
        formData
      );
      if (response.status === 200) {
        Swal.fire("Success", "Activity uploaded successfully", "success");
      }
      setFormData({
        name: "",
        url: "",
        subject: "",
      });
    } catch (error) {
      Swal.fire("Error", "Error uploading the activity", "error");
    }
  };

  return (
    <div
      style={{ backgroundImage: `url(${Background})`, backgroundSize: "cover" }}
      className="flex flex-col items-center justify-center h-screen px-4 w-full"
    >
      <div className="w-full max-w-xl mx-auto bg-white p-8 shadow-md rounded-md">
        <Link to="/teacher">
          <div className="flex items-center pb-12">
            <BiArrowBack size={25} className="cursor-pointer" />
            <p>Back</p>
          </div>
        </Link>
        <h1 className="text-md md:text-2xl font-bold mb-4">Upload Activity</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded w-full outline-none"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="url"
              className="block text-sm font-medium text-gray-700"
            >
              URL
            </label>
            <input
              type="text"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded w-full outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Subject
            </label>
            <Select
              value={formData.value}
              onChange={handleChange}
              options={subjects}
              isSearchable={true}
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Upload Activity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActivityForm;
