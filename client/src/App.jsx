import React, { useState } from "react";
import Background from "./assets/bg.jpg";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegisterForm";

const App = () => {
  const [showRegistration, setShowRegistration] = useState(false);

  const toggleRegister = () => {
    setShowRegistration(!showRegistration);
  };

  return (
    <div className="h-screen w-full relative">
      <div>
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
        <div className="relative z-10 min-h-screen flex items-center justify-center w-full">
          {showRegistration ? (
            <RegistrationForm />
          ) : (
            <LoginForm onRegisterClick={toggleRegister} />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
