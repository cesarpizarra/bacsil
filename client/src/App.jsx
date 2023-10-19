// App.jsx
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginForm from "./components/LoginForm";
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

  return (
    <Router>
      <div>
        {isLoggedIn ? (
          <StudentDashboard />
        ) : (
          <LoginForm onLogin={() => setIsLoggedIn(true)} />
        )}
      </div>

      <Routes>
        <Route
          path="/subject/:id"
          element={isLoggedIn ? <SubjectDetails /> : <Navigate to="/" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
