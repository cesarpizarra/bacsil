import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
const UpdateUser = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.put(
          `https://bacsil.onrender.com/bacsil/update/${id}`
        );

        if (response.status === 200) {
          const userData = response.data;
          setFormData(userData);
        }
      } catch (error) {
        console.error("Fetch user error:", error);
      }
    };
    fetchUser();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `https://bacsil.onrender.com/bacsil/update/${id}`,
        formData
      );
      navigate("/student-list");
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="border p-8 rounded shadow-md shadow-gray-400 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-black">Update User</h1>
        <form onSubmit={handleUpdate}>
          <div className="flex flex-col gap-5">
            <div className="mb-4">
              <label
                htmlFor="firstName"
                className="block text-black font-semibold"
              >
                First Name:
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2 outline-none"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="middleName"
                className="block text-black font-semibold"
              >
                Middle Name:
              </label>
              <input
                type="text"
                id="middleName"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2 outline-none"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="lastName"
                className="block text-black font-semibold"
              >
                Last Name:
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-black text-white rounded py-2 px-4 hover-bg-gray-800 w-full"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
