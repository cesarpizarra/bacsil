import React from "react";
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
  return (
    <div>
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />

      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/student-list" element={<StudentList />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
