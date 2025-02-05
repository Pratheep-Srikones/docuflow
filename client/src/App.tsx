import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/Home";
import UserLogIn from "./pages/auth/UserLogIn";
import UserRegister from "./pages/auth/UserRegister";
import StaffLogin from "./pages/auth/StaffLogin";
import StaffRegister from "./pages/auth/StaffRegister";
import UserDashboard from "./pages/dashboard/UserDashboard";
import StaffDashboard from "./pages/dashboard/StaffDashboard";
import AddApplication from "./pages/applications/AddApplication";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="user/auth/login" element={<UserLogIn />} />
      <Route path="user/auth/register" element={<UserRegister />} />
      <Route path="staff/auth/login" element={<StaffLogin />} />
      <Route path="staff/auth/register/u" element={<StaffRegister />} />
      <Route path="user/" element={<UserDashboard />} />
      <Route path="staff/" element={<StaffDashboard />} />
      <Route path="user/application/add" element={<AddApplication />} />
    </Routes>
  );
};

export default App;
