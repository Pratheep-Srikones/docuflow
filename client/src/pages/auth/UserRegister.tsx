import { useState } from "react";
import { User } from "../../types/types";
import { user_register } from "../../services/auth.services";
import { useNavigate } from "react-router-dom";
import { notifyError, notifySuccess, notifyWarning } from "../../utils/notify";
import { ToastContainer } from "react-toastify";

const UserRegister = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [validNIC, setValidNIC] = useState<boolean>(true);
  const [validEmail, setValidEmail] = useState<boolean>(true);

  const [currUser, setCurrUser] = useState<User>({
    first_name: "",
    last_name: "",
    nic: "",
    phone: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !currUser.first_name ||
      !currUser.last_name ||
      !currUser.phone ||
      !currUser.email ||
      !currUser.password
    ) {
      notifyWarning("Please fill all the fields!");
      return;
    }
    if (!validNIC || !validEmail) {
      notifyWarning("Please enter valid NIC and email address!");
      return;
    }
    user_register(currUser)
      .then((data) => {
        console.log(data);
        notifySuccess("User registered successfully!");
        navigate("/user/auth/login");
      })
      .catch((error) => {
        console.error("Error while registering user:", error);
        notifyError("Error while registering user!");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl flex flex-col md:flex-row">
        {/* Left Section - Form */}
        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center md:text-left">
            User Registration
          </h2>
          <form>
            {/* First Name & Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                  autoComplete="off"
                  value={currUser.first_name}
                  onChange={(e) =>
                    setCurrUser({ ...currUser, first_name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                  autoComplete="off"
                  value={currUser.last_name}
                  onChange={(e) =>
                    setCurrUser({ ...currUser, last_name: e.target.value })
                  }
                />
              </div>
            </div>

            {/* NIC */}
            <div className="mt-4">
              <label className="block text-gray-700 font-medium mb-1">
                NIC Number
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={currUser.nic}
                onChange={(e) => {
                  setValidNIC(
                    e.target.value.length === 10 || e.target.value.length === 12
                  );
                  setCurrUser({ ...currUser, nic: e.target.value });
                }}
                required
                autoComplete="off"
              />
              {!validNIC && (
                <p className="text-red-500 text-sm mt-1">
                  Invalid NIC number. Please enter a valid NIC number.
                </p>
              )}
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                  autoComplete="off"
                  value={currUser.phone}
                  onChange={(e) =>
                    setCurrUser({ ...currUser, phone: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                  autoComplete="off"
                  value={currUser.email}
                  onChange={(e) => {
                    setValidEmail(
                      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(
                        e.target.value
                      )
                    );
                    setCurrUser({ ...currUser, email: e.target.value });
                  }}
                />
                {!validEmail && (
                  <p className="text-red-500 text-sm mt-1">
                    Invalid email address. Please enter a valid email address.
                  </p>
                )}
              </div>
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  autoComplete="off"
                  value={currUser.password}
                  onChange={(e) =>
                    setCurrUser({ ...currUser, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute right-3 top-2.5 text-gray-600 hover:text-gray-900"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Register Button */}
            <button
              onClick={handleRegister}
              type="submit"
              className="w-full bg-blue-500 text-white py-2 mt-6 rounded-lg font-medium shadow-md hover:bg-blue-600 transition"
            >
              Register
            </button>
          </form>
        </div>

        {/* Right Section - Logo (Hidden on Small Screens) */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center bg-blue-100 rounded-xl">
          <img
            src="https://www.freepik.com/search?format=search&last_filter=query&last_value=Svg+Stock+login&query=Svg+Stock+login"
            alt="Logo"
            className="max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserRegister;
