import React, { useState, useEffect } from "react";
import Background from "./assets/bg.jpg";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegisterForm";
import "animate.css";
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
  const [showRegistration, setShowRegistration] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toggleRegister = () => {
    setShowRegistration(!showRegistration);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  }, []);
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="h-screen w-full relative">
          <div
            className="absolute inset-0"
            style={{
              filter: "brightness(0.5)",
            }}
          >
            <div
              style={{
                backgroundImage: `url(${Background})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: "100%",
              }}
            ></div>
          </div>
          <div className="relative z-10 min-h-screen flex items-center justify-center w-full overflow-hidden">
            {showRegistration ? (
              <RegistrationForm />
            ) : (
              <LoginForm onRegisterClick={toggleRegister} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
