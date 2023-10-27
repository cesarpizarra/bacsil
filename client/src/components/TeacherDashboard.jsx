import React, { useState } from "react";
import {
  AiOutlineOrderedList,
  AiOutlineCloudUpload,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import Logo from "../assets/logo.jpg";
const links = [
  {
    id: 1,
    title: "Students",
    link: "/students",
    icon: <AiOutlineOrderedList size={30} />,
  },
  {
    id: 2,
    title: "Upload Modules",
    link: "/upload-modules",
    icon: <AiOutlineCloudUpload size={30} />,
  },
  {
    id: 3,
    title: "Upload Activity",
    link: "/upload-activity",
    icon: <AiOutlineCloudUpload size={30} />,
  },
];
const TeacherDashboard = () => {
  const [nav, setNav] = useState(false);

  const handleClickNav = () => {
    setNav(!nav);
  };
  return (
    <div className="w-full px-4 py-10 max-w-[1240px] mx-auto relative">
      <div className="flex items-center gap-5 ">
        <img src={Logo} alt="Logo" className="w-24 " />
        <h3 className="text-lg md:text-2xl">Bacsil Online Learning </h3>
      </div>
      <h1 className="text-lg font-semibold pt-4 ">Welcome Teacher 1</h1>
      <div className="flex justify-between py-4">
        {/* Left Side */}
        <div className="hidden md:flex bg-slate-900 h-screen w-32">
          <ul className="px-4 py-12 ">
            {links.map((link) => (
              <li
                key={link.id}
                className="py-4 cursor-pointer text-sm text-white"
              >
                {link.icon}

                {link.title}
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Device */}

        {/* Right Side */}
        <div className="bg-gray-400 h-screen w-full p-4">
          <div
            onClick={handleClickNav}
            className="flex md:hidden cursor-pointer"
          >
            {!nav ? <AiOutlineMenu size={25} /> : <AiOutlineClose size={25} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
