import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { BiBookBookmark, BiArrowBack } from "react-icons/bi";
import { AiFillFilePpt, AiOutlineFilePdf } from "react-icons/ai";
import { SiGoogledocs } from "react-icons/si";
import { FiDownload } from "react-icons/fi";
import axios from "axios";
import { saveAs } from "file-saver";

const SubjectDetails = () => {
  const [modules, setModules] = useState([]);
  const [activities, setActivities] = useState([]);

  const location = useLocation();
  const subjectTitle = location.state.subject;

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await axios.get(
          `https://bacsil.onrender.com/files/subject/${subjectTitle}`
        );
        setModules(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    };
    fetchModules();
  }, []);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get(
          `https://bacsil.onrender.com/activity/activities/${subjectTitle}`
        );
        setActivities(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    };
    fetchActivities();
  }, []);
  const downloadFile = (fileId, filename) => {
    axios
      .get(`https://bacsil.onrender.com/files/download/${fileId}`, {
        responseType: "blob", // This ensures the response is treated as a binary blob
      })
      .then((response) => {
        const suggestedFilename = filename || "downloadedFile";

        // Save the file using FileSaver.js
        saveAs(new Blob([response.data]), suggestedFilename);
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
      });
  };

  return (
    <div className="w-full p-6 max-w-[1240px] mx-auto">
      <div className="mt-12">
        <div className="flex items-center gap-5">
          <Link to="/student">
            <BiArrowBack size={25} className="cursor-pointer" />
          </Link>
          <h2 className="text-xl font-semibold">Modules:</h2>
        </div>

        {modules.length === 0 ? (
          <p className="text-red-500 text-md text-center mt-44">
            No Modules uploaded
          </p>
        ) : (
          <ul className="mt-4">
            {modules.map((module, i) => (
              <li
                key={i}
                className="flex justify-between border-b-2 py-2 cursor-pointer hover:bg-gray-200"
              >
                <span>{module.filename}</span>
                <div className="flex items-center gap-3">
                  <span>
                    <FiDownload
                      size={25}
                      title="Download File"
                      onClick={() => downloadFile(module._id, module.filename)}
                    />
                  </span>
                  <span>
                    {module.contentType === "application/pdf" ? (
                      <AiOutlineFilePdf size={25} className="text-gray-500" />
                    ) : module.contentType ===
                      "application/vnd.openxmlformats-officedocument.presentationml.presentation" ? (
                      <AiFillFilePpt size={25} className="text-gray-500" />
                    ) : module.contentType === "application/msword" ? (
                      <SiGoogledocs size={25} className="text-gray-500" />
                    ) : (
                      <BiBookBookmark size={25} className="text-gray-500" />
                    )}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}

        <h2 className="text-xl font-semibold mt-4">Activities:</h2>
        <div className="mt-4 ">
          {activities.length === 0 ? (
            <p className="text-red-500 text-md text-center ">
              No Activities uploaded
            </p>
          ) : (
            <div>
              {activities.map((activity, i) => (
                <div
                  key={i}
                  className=" p-12 rounded shadow-md border mb-4 hover:bg-gray-200"
                >
                  <p className="text-sm md:text-xl font-semibold text-gray-700">
                    {activity.name}
                  </p>
                  <a href={activity.url} className="text-blue-500">
                    <p
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {activity.url}
                    </p>
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubjectDetails;
