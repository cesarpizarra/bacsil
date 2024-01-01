import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineOrderedList, AiOutlineCloudUpload } from "react-icons/ai";
import Logo from "../assets/logo.jpg";
import Settings from "./Settings";
import { GrUserSettings } from "react-icons/gr";
import Students from "../assets/students.jpg";
import Tasks from "../assets/tasks.jpg";
import Books from "../assets/books.jpg";
import axios from "axios";
const items = [
  {
    id: 1,
    title: "List of Students",
    path: "/students",
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
const TeacherDashboard = ({ userId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    // Fetch user information when the component mounts
    if (userId) {
      axios
        .get(`http://localhost:3000/bacsil/info/${userId}`)
        .then((response) => {
          const { firstName, middleName, lastName } = response.data;
          const fullName = `${firstName} ${middleName} ${lastName}`;
          setFullName(fullName);
        })
        .catch((error) => {
          console.error("Error fetching user information:", error);
        });
    } else {
      console.log("User Not Logged In");
    }
  }, [userId]);

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
      <div className="flex items-center gap-5 ">
        <img src={Logo} alt="Logo" className="w-24 " />
        <h3 className="text-lg md:text-2xl">Bacsil Online Learning </h3>
      </div>
      <h1 className="text-lg font-semibold py-4 ">Welcome {fullName}</h1>

      <div className="w-full  shadow-md rounded-lg relative">
        <div className="grid md:grid-cols-2 p-12 gap-10 ">
          {items.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div
                style={{
                  backgroundImage: `url(${item.background})`,
                  backgroundSize: "cover",
                  transform:
                    hoveredItem === item.id ? "scale(1.1)" : "scale(1)",
                  transition: "transform 0.3s ease",
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
