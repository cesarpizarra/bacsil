import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegisterForm";
import "animate.css";
import "transition-style";

import StudentDashboard from "./components/StudentDashboard";
import TeacherDashboard from "./components/TeacherDashboard";
import SubjectDetails from "./pages/SubjectDetails";
import StudentList from "./pages/StudentList";
import ModuleUpload from "./pages/ModuleUpload";
import ActivityUpload from "./pages/ActivityUpload";
import { Toaster } from "react-hot-toast";
import UpdateUser from "./pages/UpdateUser";
const Loader = () => {
  return (
    <div>
      <div className="loader">
        <div className="justify-content-center jimu-primary-loading"></div>
      </div>
    </div>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Toaster position="top-center" toastOptions={{ duration: 2000 }} />

          <Router>
            <Routes>
              <Route path="/" element={<LoginForm />} />
              <Route path="/register" element={<RegistrationForm />} />
              <Route path="/student" element={<StudentDashboard />} />
              <Route path="/teacher" element={<TeacherDashboard />} />
              <Route path="/student-list" element={<StudentList />} />
              <Route path="/subject/:id" element={<SubjectDetails />} />
              <Route path="/upload-module" element={<ModuleUpload />} />
              <Route path="/upload-activity" element={<ActivityUpload />} />
              <Route path="/update-user/:id" element={<UpdateUser />} />
            </Routes>
          </Router>
        </div>
      )}
    </>
  );
};

export default App;
