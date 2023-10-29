import React, { useState } from "react";
import { MdOutlineLibraryBooks } from "react-icons/md";
import Background from "../assets/books.jpg";
import axios from "axios";
import Swal from "sweetalert2";
const ModuleUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState("science");

  // Function to handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  // Function to handle subject selection
  const handleSubjectSelect = (event) => {
    setSelectedSubject(event.target.value);
  };

  // Function to handle file upload
  const handleFileUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("subject", selectedSubject);

      // Send a POST request to the server
      axios
        .post("http://localhost:3000/upload/file", formData)
        .then((response) => {
          // console.log("File uploaded successfully");

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((error) => {
          console.error("File upload failed:", error);
          Swal.fire({
            icon: "error",
            title: "Upload Failed",
            text: "File upload failed",
            showConfirmButton: true,
          });
        });
    } else {
      // console.log("No file selected.");
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Please select a file",
        showConfirmButton: true,
      });
    }
  };

  return (
    <div
      style={{ backgroundImage: `url(${Background})`, backgroundSize: "cover" }}
      className="w-full flex-col p-4 flex items-cente justify-center h-screen text-white"
    >
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-4 mb-5">
          <MdOutlineLibraryBooks size={30} />
          <h1 className="text-lg md:text-2xl font-semibold ">Upload Module</h1>
        </div>
        <div className="mb-4">
          <label htmlFor="subjects" className="block  font-semibold">
            Subjects:
          </label>
          <select
            onChange={handleSubjectSelect}
            id="subjects"
            name="subjects"
            className="w-full border border-gray-300 rounded p-2 outline-none text-black cursor-pointer"
          >
            <option value="science">Science</option>
            <option value="math">Math</option>
            <option value="history">History</option>
          </select>
        </div>
        <div className="bg-purple-500 p-12 shadow-lg rounded ">
          <label className="block  text-sm font-bold mb-2">
            Choose a file to upload module:
          </label>
          <input
            type="file"
            accept=".pdf, .doc, .docx" // Define accepted file types
            onChange={handleFileSelect}
            className="border border-gray-300 rounded p-2 w-full cursor-pointer "
          />

          <div className="mt-4">
            {selectedFile ? (
              <div>
                <p className="text-white">Selected file: {selectedFile.name}</p>
                <button
                  onClick={handleFileUpload}
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-700"
                >
                  Upload
                </button>
              </div>
            ) : (
              <p className="text-gray-400">No file selected</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleUpload;
