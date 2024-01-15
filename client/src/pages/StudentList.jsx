import React, { useState, useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";

import axios from "axios";
import Swal from "sweetalert2";
const StudentList = () => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/bacsil/users`);

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
  }, []);

  const deleteStudent = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:3000/bacsil/delete/${id}`);
        // console.log(response.data);

        Swal.fire({
          title: "Deleted!",
          text: "The student has been deleted.",
          icon: "success",
        });

        fetchStudents();
      }
    } catch (error) {
      console.error("Error:", error.data);
      Swal.fire({
        title: "Error!",
        text: "An error occurred while deleting the student.",
        icon: "error",
      });
    }
  };
  return (
    <div className="w-full py-10 overflow-x-auto">
      <div className="flex items-center gap-4 px-5">
        <Link to="/teacher">
          <BiArrowBack size={25} className="cursor-pointer" />
        </Link>
        <h1 className="txt-lg md:text-2xl font-semibold">Student List</h1>
      </div>

      {students.length === 0 ? (
        <p className="py-12 text-center text-red-500"> No List of Students</p>
      ) : (
        <table className="w-full table-auto mt-6 whitespace-nowrap ">
          <thead className=" text-center text-white bg-slate-400">
            <tr>
              <th className="py-2">LRN Number</th>
              <th className="py-2 px-12">First Name</th>
              <th className="py-2">Middle Name</th>
              <th className="py-2 px-12">Last Name</th>
              <th className="py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, i) => (
              <tr
                key={i}
                className={`text-center ${
                  i % 2 === 0 ? "bg-slate-50" : "bg-slate-100"
                }`}
              >
                <td
                  className={`py-2 ${
                    i % 2 === 0 ? "bg-slate-50" : "bg-slate-100"
                  }`}
                >
                  {student.userId}
                </td>
                <td
                  className={`py-2 px-12 ${
                    i % 2 === 0 ? "bg-slate-50" : "bg-slate-100"
                  }`}
                >
                  {student.firstName}
                </td>
                <td
                  className={`py-2 ${
                    i % 2 === 0 ? "bg-slate-50" : "bg-slate-100"
                  }`}
                >
                  {student.middleName}
                </td>
                <td
                  className={`py-2 px-12 ${
                    i % 2 === 0 ? "bg-slate-50" : "bg-slate-100"
                  }`}
                >
                  {student.lastName}
                </td>
                <td
                  className={`py-2 flex justify-center gap-4 ${
                    i % 2 === 0 ? "bg-slate-50" : "bg-slate-100"
                  }`}
                >
                  <Link
                    to={`/update-user/${student._id}`}
                    className="bg-blue-600 px-3 py-2  text-white rounded"
                  >
                    Update User
                  </Link>
                  <button
                    onClick={() => deleteStudent(student._id)}
                    className="bg-red-600 px-3 py-2  text-white rounded"
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
