import React from "react";
import { useParams } from "react-router-dom";
import { BiBookBookmark } from "react-icons/bi";
import { RiTodoLine } from "react-icons/ri";

const SubjectDetails = () => {
  // Use the useParams hook to access route parameters
  const { id } = useParams();

  // Dummy data for modules and activities (replace with actual data)
  const modules = ["Module 1", "Module 2", "Module 3"];
  const activities = ["Activity 1", "Activity 2", "Activity 3"];

  return (
    <div className="w-full p-6">
      <div className="mt-12">
        <h2 className="text-xl font-semibold">Modules:</h2>
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
              className="flex justify-between border-b-2 py-2 cursor-pointer hover:bg-gray-200"
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
