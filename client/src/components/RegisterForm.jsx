import React, { useState } from "react";
import Axios from "axios"; // Make sure you have Axios installed
import LoginForm from "./LoginForm";
import Swal from "sweetalert2";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    userId: "",
    username: "",
    password: "",
    role: "student", // Default role
  });

  const [showLogin, setShowLogin] = useState(false);

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
      // Check if grade and section are selected
      if (!formData) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Please select a grade and section",
          showConfirmButton: true,
        });
        return;
      }
      const response = await Axios.post(
        "http://localhost:3000/bacsil/auth/register",
        formData
      );

      if (response.status === 201) {
        // Registration was successful
        console.log("User registered successfully!");

        Swal.fire({
          icon: "success",
          title: "Registered Successfuly",
          text: "Welcome back!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Registration Failed",
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.error("An error occurred while registering:", error);
      Swal.fire({
        icon: "error",
        title: "Register Failed",
        text: "Account already exists",
        showConfirmButton: true,
      });
    }
  };

  const handleToggleLogin = () => {
    setShowLogin(!showLogin);
  };

  if (showLogin) {
    return <LoginForm onRegisterClick={handleToggleLogin} />;
  }

  return (
    <div className="min-h-screen animate__animated animate__bounceInUp flex items-center justify-center px-8 w-full max-w-[1240px] mx-auto ">
      <div className="border p-8 rounded shadow-lg shadow-gray-700 w-96">
        <h1 className="text-2xl font-bold mb-4 text-white">Registration</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="userId" className="block text-white font-semibold">
              Custom User ID:
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
              className="block text-white font-semibold"
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
            className="bg-blue-500 text-white rounded py-2 px-4 hover-bg-blue-600"
          >
            Register
          </button>
        </form>
        <p className="text-center text-white text-sm mt-3 cursor-pointer">
          Already registered?{" "}
          <span className="text-blue-500" onClick={handleToggleLogin}>
            Login here.
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;
