import React from "react";
import { Link } from "react-router-dom";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { GrUserSettings } from "react-icons/gr";

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

  return (
    <div className="w-full p-6 max-w-[1240px] mx-auto relative">
      <h1 className="text-xl md:text-3xl font-semibold mb-4">
        Bacsil Classroom
      </h1>
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
        <GrUserSettings size={25} title="User Settings " />
      </div>
    </div>
  );
};

export default StudentDashboard;
