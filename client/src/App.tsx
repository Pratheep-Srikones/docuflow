import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/Home";
import UserLogIn from "./pages/auth/UserLogIn";
import UserRegister from "./pages/auth/UserRegister";
import StaffLogin from "./pages/auth/StaffLogin";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="user/auth/login" element={<UserLogIn />} />
      <Route path="user/auth/register" element={<UserRegister />} />
      <Route path="staff/auth/login" element={<StaffLogin />} />
    </Routes>
  );
};

export default App;
