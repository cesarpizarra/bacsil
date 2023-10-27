import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Logo from "../assets/logo.jpg";

const LoginForm = ({ onLogin, onRegisterClick }) => {
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
        // Trigger the login callback and pass the selected role
        onLogin(formData.role);
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
        text: "You don't have permission for this role.",
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className=" min-h-screen flex flex-col items-center justify-center px-8 w-full max-w-[1240px] mx-auto">
      <div className="animate__animated animate__backInDown">
        <div className="flex items-center justify-center gap-5 mb-4">
          <img src={Logo} alt="Logo" className="w-16 rounded-full" />
          <h1 className="text-black text-lg md:text-3xl font-medium">
            Bacsil Learning Classroom
          </h1>
        </div>
        <div className="border p-8 rounded shadow-md shadow-gray-400 w-full max-w-xl">
          <h1 className="text-2xl font-bold mb-4 ">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="id" className="block  font-semibold">
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
              <label htmlFor="password" className="block  font-semibold">
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
              <label htmlFor="role" className="block  font-semibold">
                Role:
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2 outline-none "
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-black text-white rounded py-2 px-4 hover-bg-gray-800 w-full"
            >
              Login
            </button>
          </form>
          <p className="text-center text-sm mt-3">
            Not registered?{" "}
            <span
              className="text-red-500 cursor-pointer"
              onClick={onRegisterClick}
            >
              Register here.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
