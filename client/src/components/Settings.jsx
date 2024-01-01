import React from "react";
import Swal from "sweetalert2";
import { BiLogOut, BiSolidLock } from "react-icons/bi";
import axios from "axios";
const Settings = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");

        setTimeout(() => {
          window.location.href = "/";
        }, 100);
      }
    });
  };
  const handleChangePassword = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Change Password",
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="User ID">' +
        '<input id="swal-input2" class="swal2-input" type="password" placeholder="Current Password">' +
        '<input id="swal-input3" class="swal2-input" type="password" placeholder="New Password">',
      focusConfirm: false,
      preConfirm: () => {
        return {
          userId: document.getElementById("swal-input1").value,
          currentPassword: document.getElementById("swal-input2").value,
          newPassword: document.getElementById("swal-input3").value,
        };
      },
      showCancelButton: true,
      confirmButtonText: "Change Password",
    });

    if (
      formValues &&
      formValues.userId &&
      formValues.currentPassword &&
      formValues.newPassword
    ) {
      // Send a request to change the password
      axios
        .post("http://localhost:3000/bacsil/update-password", formValues)
        .then((response) => {
          // Handle success, e.g., show a success message
          Swal.fire("Password changed successfully", "", "success");
        })
        .catch((error) => {
          // Handle error, e.g., show an error message
          Swal.fire("Password change failed", error.message, "error");
        });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay fixed inset-0 bg-gray-600 opacity-50"></div>
      <div className="modal-container bg-white w-1/2 p-4 rounded shadow-lg z-50">
        <h2 className="text-2xl font-semibold mb-4">Settings</h2>
        <ul className="mb-4">
          <li
            className="cursor-pointer flex items-center gap-3 py-2 border-b hover:bg-gray-200"
            onClick={handleChangePassword}
          >
            <BiSolidLock />
            Change Password
          </li>
          <li
            className="cursor-pointer flex items-center gap-3 py-2 border-b hover:bg-gray-200"
            onClick={handleLogout}
          >
            <BiLogOut /> Logout
          </li>
        </ul>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Settings;
