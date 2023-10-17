import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const LoginForm = ({ onRegisterClick }) => {
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    role: "student",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/bacsil/auth/login",
        formData
      );

      if (response.status === 200) {
        // Login was successful
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Welcome back!",
          showConfirmButton: false,
          timer: 1500,
        });
        const { token } = response.data;

        // Store the token in local storage
        localStorage.setItem("token", token);

        // Set the loggedIn state to true
        setLoggedIn(true);
      } else {
        // Handle login failure
        console.error("Login failed:", response.data.message);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: response.data.message,
          showConfirmButton: true,
        });
      }
    } catch (error) {
      // Handle error
      console.error("An error occurred while logging in:", error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "An error occurred while logging in",
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="min-h-screen animate__animated animate__backInDown flex items-center justify-center px-8 w-full max-w-[1240px] mx-auto">
      <div className="border p-8 rounded shadow-lg shadow-gray-700 w-96">
        <h1 className="text-2xl font-bold mb-4 text-white">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="id" className="block text-white font-semibold">
              ID Number:
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
              htmlFor="password"
              className="block text-white font-semibold"
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
          <div className="mb-4">
            <label htmlFor="role" className="block text-white font-semibold">
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
          <button
            type="submit"
            className="bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600 w-full"
          >
            Login
          </button>
        </form>
        <p className="text-center text-white text-sm mt-3">
          Not registered?{" "}
          <span
            className="text-green-500 cursor-pointer"
            onClick={onRegisterClick}
          >
            Register here.
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
