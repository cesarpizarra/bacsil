import React from "react";
import { useNavigate } from "react-router-dom";
import { BiBookBookmark, BiArrowBack } from "react-icons/bi";
import { RiTodoLine } from "react-icons/ri";

const SubjectDetails = () => {
  const navigate = useNavigate();

  const goBackToDashboard = () => {
    navigate("/");
  };

  const modules = ["Module 1", "Module 2", "Module 3"];
  const activities = ["Activity 1", "Activity 2", "Activity 3"];

  return (
    <div className="w-full p-6 max-w-[1240px] mx-auto">
      <div className="mt-12">
        <div className="flex items-center gap-5">
          <BiArrowBack
            size={25}
            className="cursor-pointer"
            onClick={goBackToDashboard}
          />
          <h2 className="text-xl font-semibold">Modules:</h2>
        </div>
        <ul className="mt-4">
          {modules.map((module, i) => (
            <li
              key={i}
              className="flex justify-between border-b-2 py-2 cursor-pointer hover:bg-gray-200"
            >
              {module}
              <span>
                <BiBookBookmark size={25} className="text-gray-500" />
              </span>
            </li>
          ))}
        </ul>
        <h2 className="text-xl font-semibold mt-4">Activities:</h2>
        <ul>
          {activities.map((act, i) => (
            <li
              key={i}
              className="flex justify-between border-b-2 py-2 cursor-pointer hover-bg-gray-200"
            >
              {act}
              <span>
                <RiTodoLine size={25} className="text-gray-500" />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SubjectDetails;
