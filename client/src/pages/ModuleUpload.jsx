import React, { useState } from "react";
import { MdOutlineLibraryBooks } from "react-icons/md";
import Background from "../assets/books.jpg";
import axios from "axios";
import Swal from "sweetalert2";
import ProgressLoader from "../components/ProgressLoader"; // Import your ProgressLoader component
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";

const ModuleUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState("science");
  const [uploading, setUploading] = useState(false);

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

      // Show the ProgressLoader
      setUploading(true);

      // Send a POST request to the server
      axios
        .post("http://localhost:3000/upload/file", formData)
        .then((response) => {
          setTimeout(() => {
            // Hide the ProgressLoader
            setUploading(false);

            // Show success message
            Swal.fire({
              icon: "success",
              title: "Module upload success",
              showConfirmButton: false,
              timer: 1500,
            });
          }, 4000);
        })
        .catch((error) => {
          // Hide the ProgressLoader
          setUploading(false);

          console.error("File upload failed:", error);
          Swal.fire({
            icon: "error",
            title: "Upload Failed",
            text: "File upload failed",
            showConfirmButton: true,
          });
        });
    } else {
      // Show an error message
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
      className="w-full flex-col p-4 flex items-center justify-center h-screen text-white"
    >
      <div className="max-w-md mx-auto">
        <Link to="/teacher">
          <div className="flex items-center pb-20">
            <BiArrowBack size={25} className="cursor-pointer" />
            <p>Back</p>
          </div>
        </Link>
        <div className="flex items-center gap-4 mb-5">
          <MdOutlineLibraryBooks size={30} />
          <h1 className="text-lg md:text-2xl font-semibold drop-shadow-lg">
            Upload Module
          </h1>
        </div>
        <div className="mb-4">
          <label htmlFor="subjects" className="block font-semibold">
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
        <div className="bg-white p-12 shadow-lg rounded text-black">
          <label className="block text-lg font-bold mb-2  ">
            Choose a file to upload module:
          </label>
          <input
            type="file"
            accept=".pdf, .doc, .docx"
            onChange={handleFileSelect}
            className="border border-gray-300 rounded p-2 w-full cursor-pointer"
          />

          <div className="mt-4">
            {uploading ? (
              <ProgressLoader />
            ) : selectedFile ? (
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
