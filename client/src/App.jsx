import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [isloading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState("student");

  // Callback to show the registration form
  const showRegistrationForm = () => {
    setShowRegistration(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  // Callback to set the user's role when they log in
  const setUserRoleOnLogin = (role) => {
    setUserRole(role);
    setIsLoggedIn(true);
  };

  return (
    <div>
      {isloading ? (
        <Loader />
      ) : (
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  userRole === "student" ? (
                    <StudentDashboard />
                  ) : userRole === "teacher" ? (
                    <TeacherDashboard />
                  ) : (
                    <Navigate to="/" />
                  )
                ) : showRegistration ? (
                  <RegistrationForm onLogin={setUserRoleOnLogin} />
                ) : (
                  <LoginForm
                    onLogin={setUserRoleOnLogin}
                    onRegisterClick={showRegistrationForm}
                  />
                )
              }
            />
            <Route path="/students" element={<StudentList />} />
            <Route path="/upload-module" element={<ModuleUpload />} />
            <Route path="/upload-activity" element={<ActivityUpload />} />

            <Route
              path="/subject/:id"
              element={isLoggedIn ? <SubjectDetails /> : <Navigate to="/" />}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      )}
    </div>
  );
};

export default App;
