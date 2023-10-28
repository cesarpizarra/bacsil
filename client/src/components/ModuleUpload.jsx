import React, { useState } from "react";
import { MdOutlineLibraryBooks } from "react-icons/md";
import Background from "../assets/books.jpg";
const ModuleUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  // Function to handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  // Function to handle file upload
  const handleFileUpload = () => {
    if (selectedFile) {
      // Perform file upload logic here, e.g., send the file to a server.
      // You can use libraries like axios for this purpose.
      console.log("Uploading file:", selectedFile);
    } else {
      console.log("No file selected.");
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
        <div className="bg-purple-600 p-12 shadow-lg rounded ">
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
