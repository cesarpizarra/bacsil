import React, { useState, useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
const StudentList = ({ token }) => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  const goBackToDashboard = () => {
    navigate("/");
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/bacsil/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log("API Response:", response.data);

      if (response.status === 200) {
        const studentData = response.data.filter(
          (user) => user.role === "student"
        );
        setStudents(studentData);
        // console.log("studens", studentData);
      }
    } catch (error) {
      console.error("Fetch students error:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [token]);

  const deleteStudent = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/bacsil/delete/${id}`
      );
      console.log(response.data);
    } catch (error) {
      console.error(" error:", error.data);
    }
  };
  return (
    <div className="w-full px-4 py-10 max-w-[1240px] mx-auto">
      <div className="flex items-center gap-4">
        <BiArrowBack
          size={25}
          className="cursor-pointer"
          onClick={goBackToDashboard}
        />
        <h1 className="txt-lg md:text-2xl font-semibold">Student List</h1>
      </div>

      {students.length === 0 ? (
        <p className="py-12 text-center text-red-500"> No List of Students</p>
      ) : (
        <table className="w-full table-auto mt-6">
          <thead className=" text-left bg-gray-500 text-white">
            <tr className="">
              <th className="py-2 px-2">First Name</th>
              <th className="py-2">Middle Name</th>
              <th className="py-2">Last Name</th>
              <th className="py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, i) => (
              <tr key={i}>
                <td className="py-2">{student.firstName}</td>
                <td className="py-2">{student.middleName}</td>
                <td className="py-2">{student.lastName}</td>
                <td className="py-2">{student.lastName}</td>
                <td className="py-2">{student._id}</td>

                <td className="py-2">
                  <button
                    onClick={() => deleteStudent(student._id)}
                    className="bg-red-500 px-3 text-white rounded"
                  >
                    Delete User
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentList;
