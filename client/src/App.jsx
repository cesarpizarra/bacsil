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
import SubjectDetails from "./pages/SubjectDetails";
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

  // Callback to show the registration form
  const showRegistrationForm = () => {
    setShowRegistration(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);
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
                  <StudentDashboard />
                ) : showRegistration ? ( // Show RegistrationForm if showRegistration is true
                  <RegistrationForm onLogin={() => setIsLoggedIn(true)} />
                ) : (
                  <LoginForm
                    onLogin={() => setIsLoggedIn(true)}
                    onRegisterClick={showRegistrationForm}
                  />
                )
              }
            />
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
