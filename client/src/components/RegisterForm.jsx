import React, { useState } from "react";
import LoginForm from "./LoginForm";
const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    id: "",
    username: "",
    password: "",
    role: "student",
  });
  const [showLogin, setShowLogin] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleToggleLogin = () => {
    setShowLogin(!showLogin);
  };

  if (showLogin) {
    return <LoginForm onRegisterClick={handleToggleLogin} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-8 w-full max-w-[1240px] mx-auto">
      <div className="border p-8 rounded shadow-lg shadow-gray-700 w-96">
        <h1 className="text-2xl font-bold mb-4 text-white">Registration</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="id" className="block text-white font-semibold  ">
              ID Number:
            </label>
            <input
              type="text"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 outline-none"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-white font-semibold "
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
              className="block text-white font-semibold "
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
            <label htmlFor="role" className="block text-white font-semibold ">
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
            className="bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600"
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
