import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { GrUserSettings } from "react-icons/gr";
import Settings from "./Settings";
import Logo from "../assets/logo.jpg";

const StudentDashboard = () => {
  const classes = [
    { id: 1, title: "Math Class", description: "Learn math fundamentals." },
    {
      id: 2,
      title: "Science Class",
      description: "Explore the wonders of science.",
    },
    { id: 3, title: "History Class", description: "Discover the past." },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full p-6 max-w-[1240px] mx-auto relative">
      <div className="flex items-center  gap-5 py-8">
        <img src={Logo} alt="Logo" className="w-20" />
        <h1 className="text-xl md:text-3xl font-semibold">
          Bacsil Online Classroom
        </h1>
      </div>
      {classes.map((cls) => (
        <div
          key={cls.id}
          className="bg-white rounded-md py-10 px-12 mb-4 shadow-md border sm:flex justify-between"
        >
          <div>
            <h2 className="text-xl font-semibold mb-2">{cls.title}</h2>
            <p className="text-gray-600">{cls.description}</p>
          </div>

          <div className="cursor-pointer mt-5">
            <Link to={`/subject/${cls.id}`}>
              <BsFillPersonVcardFill
                size={25}
                title={`Open your work from ${cls.title}`}
              />
            </Link>
          </div>
        </div>
      ))}

      <div className="absolute bottom-[-3rem] right-0 px-6 cursor-pointer ">
        <GrUserSettings size={25} title="User Settings " onClick={openModal} />
      </div>

      <Settings isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default StudentDashboard;
