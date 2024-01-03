import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineOrderedList, AiOutlineCloudUpload } from "react-icons/ai";
import Logo from "../assets/logo.jpg";
import Settings from "./Settings";
import { GrUserSettings } from "react-icons/gr";
import Students from "../assets/students.jpg";
import Tasks from "../assets/tasks.jpg";
import Books from "../assets/books.jpg";

const items = [
  {
    id: 1,
    title: "List of Students",
    path: "/student-list",
    icon: <AiOutlineOrderedList size={35} />,
    background: Students,
  },
  {
    id: 2,
    title: "Upload Modules",
    path: "/upload-module",
    icon: <AiOutlineCloudUpload size={35} />,
    background: Books,
  },
  {
    id: 3,
    title: "Upload Activity",
    path: "/upload-activity",
    icon: <AiOutlineCloudUpload size={35} />,
    background: Tasks,
  },
];
const TeacherDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    // Fetch user details from local storage
    const credentials = localStorage.getItem("credentials");

    if (credentials) {
      const { firstName: storedFirstName } = JSON.parse(credentials);
      setFirstName(storedFirstName);
    }
  }, []);

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="w-full px-4 py-10 max-w-[1240px] mx-auto ">
      <div className="flex flex-col gap-5 ">
        <div className="flex items-center gap-5">
          <img src={Logo} alt="Logo" className="w-20" />
          <h1 className="text-xl md:text-3xl font-semibold">
            Bacsil Classroom
          </h1>
        </div>
        <p className="py-4 text-2xl">Welcome {firstName}!</p>
      </div>

      <div className="w-full  shadow-md rounded-lg relative">
        <div className="grid md:grid-cols-2 p-12 gap-10 ">
          {items.map((item) => (
            <Link key={item.id} to={item.path}>
              <div
                style={{
                  backgroundImage: `url(${item.background})`,
                  backgroundSize: "cover",
                }}
                className="text-white cursor-pointer rounded  p-24 flex flex-col gap-5 items-center justify-center"
              >
                {item.icon}
                <p className="text-md md:text-xl font-semibold ">
                  {item.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="absolute right-0 bottom-[10px] px-6 cursor-pointer ">
          <GrUserSettings
            size={25}
            title="User Settings "
            onClick={openModal}
          />
        </div>
      </div>

      <Settings isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default TeacherDashboard;
