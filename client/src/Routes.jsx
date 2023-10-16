import { Route, Routes } from "react-router-dom";
import RegistrationForm from "./components/RegisterForm";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/register" element={<RegistrationForm />} />
    </Routes>
  );
};
export default AppRoutes;
