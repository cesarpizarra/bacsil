import React, { useState } from "react";
import Axios from "axios";
import LoginForm from "./LoginForm";
import Swal from "sweetalert2";
import Logo from "../assets/logo.jpg";

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
          title: "Registered ",
          text: "Registered Successfuly",
          showConfirmButton: false,
          timer: 1500,
        });

        setFormData({
          userId: "",
          username: "",
          password: "",
          role: "",
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
    <div className="min-h-screen animate__animated animate__bounceInUp flex flex-col items-center justify-center px-8 w-full max-w-[1240px] mx-auto ">
      <div className="flex items-center justify-center gap-5 mb-4">
        <img src={Logo} alt="Logo" className="w-16 rounded-full" />
        <h1 className="text-black text-lg md:text-3xl font-medium">
          Bacsil Learning Classroom
        </h1>
      </div>
      <div className="border p-8 rounded shadow-md shadow-gray-400 w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-4 text-black">Registration</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="userId" className="block text-black font-semibold">
              User ID:
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
          <button
            type="submit"
            className="bg-black text-white rounded py-2 px-4 hover:bg-gray-800 w-full"
          >
            Register
          </button>
        </form>
        <p className="text-center  text-sm mt-3 cursor-pointer">
          Already registered?{" "}
          <span
            className="text-red-500 cursor-pointer"
            onClick={handleToggleLogin}
          >
            Login here.
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;
