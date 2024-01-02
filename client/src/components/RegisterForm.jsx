import React, { useState } from "react";
import Axios from "axios";
import Logo from "../assets/logo.jpg";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    userId: "",
    username: "",
    firstName: "",
    middleName: "",
    lastName: "",
    password: "",
    role: "student",
  });
  const [error, setError] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const resetForm = () => {
    setFormData({
      userId: "",
      username: "",
      firstName: "",
      middleName: "",
      lastName: "",
      password: "",
    });
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.post(
        "http://localhost:3000/bacsil/register",
        formData
      );

      toast.success(response.data.message);
      setError("");
      navigate("/");
      resetForm();
    } catch (error) {
      console.error("An error occurred while registering:", error);
      setError(error.response.data.message);
    }
  };

  return (
    <div className=" min-h-screen animate__animated animate__backInRight flex flex-col items-center justify-center px-8 w-full max-w-[1240px] mx-auto ">
      <div className="flex items-center justify-center gap-5 mb-4">
        <img src={Logo} alt="Logo" className="w-16 rounded-full" />
        <h1 className="text-black text-lg md:text-3xl font-medium">
          Bacsil Learning Classroom
        </h1>
      </div>
      <div className="border p-8 rounded shadow-md shadow-gray-400 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-black">Registration</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-5">
            <div className="mb-4">
              <label
                htmlFor="userId"
                className="block text-black font-semibold"
              >
                LRN Number:
              </label>
              <input
                type="text"
                id="userId"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2 outline-none"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-black font-semibold"
              >
                Username:
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2 outline-none"
              />
            </div>
          </div>
          <div className="flex gap-5">
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
          </div>
          <div className="flex gap-5">
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

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-black font-semibold"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2 outline-none"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block text-black font-semibold">
              Role:
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 outline-none"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>
          {error && (
            <div className="p-2 bg-slate-100 mb-4">
              {error.split(", ").map((errorMessage, index) => (
                <p key={index} className="text-red-500 text-sm py-2">
                  {errorMessage}
                </p>
              ))}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <button
              type="reset"
              className="bg-gray-600 text-white rounded py-2 px-4 hover:bg-gray-800 w-full"
              onClick={resetForm}
            >
              Reset
            </button>
            <button
              type="submit"
              className="bg-black text-white rounded py-2 px-4 hover-bg-gray-800 w-full"
            >
              Register
            </button>
          </div>
        </form>
        <p className="text-center  text-sm mt-3 cursor-pointer">
          Already registered?{" "}
          <Link to="/" className="text-red-500 cursor-pointer">
            Login here.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;
