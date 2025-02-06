import { useState } from "react";
import { Staff } from "../../types/types";
import { staff_register } from "../../services/auth.services";
import { notifyError, notifySuccess, notifyWarning } from "../../utils/notify";
import { ToastContainer } from "react-toastify";

interface Errors {
  nic?: string;
  email?: string;
}

const roles = ["administrative", "Manager", "Staff"];
const branches = [
  "Head Office",
  "Branch A",
  "Branch B",
  "8db9c2fc-ef3f-4a09-a54d-53e15c0c7858",
];

const StaffRegister: React.FC = () => {
  const [errors, setErrors] = useState<Errors>({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [securityKeyVisible, setSecurityKeyVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [currStaff, setCurrStaff] = useState<Staff>(Staff());

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !currStaff.first_name ||
      !currStaff.last_name ||
      !currStaff.phone ||
      !currStaff.email ||
      !currStaff.nic ||
      !currStaff.password ||
      !currStaff.security_key ||
      !currStaff.role ||
      !currStaff.job_title ||
      !currStaff.branch_id
    ) {
      notifyWarning("Please fill all fields");
      return;
    }
    if (currStaff.password === currStaff.security_key) {
      notifyWarning("Password and Security Key cannot be the same");
      return;
    }
    try {
      staff_register(currStaff)
        .then((response) => {
          console.log(response);
          notifySuccess("Staff registered successfully");
        })
        .catch((error) => {
          console.error("Error while registering staff:", error);
          notifyError("Error while registering staff");
        });
    } catch (error) {
      console.error("Error while registering staff:", error);
    }
  };

  // Validation function
  const validate = (name: string, value: string) => {
    const newErrors: Errors = { ...errors };

    if (name === "nic") {
      if (!/^\d{9}[VX]$|^\d{12}$/.test(value)) {
        newErrors.nic = "NIC must be 9 digits + V/X or 12 digits";
      } else {
        delete newErrors.nic;
      }
    }

    if (name === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        newErrors.email = "Invalid email format";
      } else {
        delete newErrors.email;
      }
    }

    setErrors(newErrors);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-2xl rounded-lg border border-gray-200 transform transition-all duration-300 hover:shadow-3xl">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Register Staff
      </h2>

      <form className="grid gap-4">
        <div>
          <label className="block font-medium text-gray-700 mb-2">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            autoComplete="off"
            className="w-full border-2 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all"
            value={currStaff.first_name}
            onChange={(e) =>
              setCurrStaff({ ...currStaff, first_name: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            autoComplete="off"
            className="w-full border-2 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all"
            value={currStaff.last_name}
            onChange={(e) =>
              setCurrStaff({ ...currStaff, last_name: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-2">NIC</label>
          <input
            type="text"
            name="nic"
            autoComplete="off"
            className={`w-full border-2 rounded-lg p-3 focus:ring-2 ${
              errors.nic
                ? "border-red-500 focus:ring-red-300"
                : "focus:ring-blue-400 focus:border-blue-500"
            } transition-all`}
            onBlur={(e) => validate(e.target.name, e.target.value)}
            value={currStaff.nic}
            onChange={(e) =>
              setCurrStaff({ ...currStaff, nic: e.target.value })
            }
          />
          {errors.nic && (
            <p className="text-red-500 text-sm mt-2">{errors.nic}</p>
          )}
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-2">Phone</label>
          <input
            type="text"
            name="phone"
            autoComplete="off"
            className="w-full border-2 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all"
            value={currStaff.phone}
            onChange={(e) =>
              setCurrStaff({ ...currStaff, phone: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            autoComplete="off"
            className={`w-full border-2 rounded-lg p-3 focus:ring-2 ${
              errors.email
                ? "border-red-500 focus:ring-red-300"
                : "focus:ring-blue-400 focus:border-blue-500"
            } transition-all`}
            onBlur={(e) => validate(e.target.name, e.target.value)}
            value={currStaff.email}
            onChange={(e) =>
              setCurrStaff({ ...currStaff, email: e.target.value })
            }
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-2">{errors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="relative">
          <label className="block font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              autoComplete="off"
              className="w-full border-2 rounded-lg p-3 pr-12 focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all"
              value={currStaff.password}
              onChange={(e) =>
                setCurrStaff({ ...currStaff, password: e.target.value })
              }
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-500 hover:text-gray-700"
            >
              {passwordVisible ? (
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

        {/* Security Key Field with Tooltip */}
        <div className="relative">
          <label className="block font-medium text-gray-700 mb-2">
            Security Key
          </label>
          <div className="relative">
            <input
              type={securityKeyVisible ? "text" : "password"}
              name="securityKey"
              autoComplete="off"
              className="w-full border-2 rounded-lg p-3 pr-12 focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all"
              value={currStaff.security_key}
              onChange={(e) =>
                setCurrStaff({ ...currStaff, security_key: e.target.value })
              }
            />
            <button
              type="button"
              onClick={() => setSecurityKeyVisible(!securityKeyVisible)}
              className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-500 hover:text-gray-700"
            >
              {securityKeyVisible ? (
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

            {/* Tooltip (?) icon */}
            <span
              className="absolute -right-8 top-3 text-lg cursor-pointer text-gray-500 hover:text-gray-700"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 mr-2 mt-[2px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                />
              </svg>
            </span>

            {/* Tooltip box */}
            {showTooltip && (
              <div className="absolute -right-32 top-10 w-64 bg-gray-800 text-white text-sm p-3 rounded-lg shadow-xl">
                The security key is required for administrative actions.
              </div>
            )}
          </div>
        </div>

        {/* Role Selection */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">Role</label>
          <select
            className="w-full border-2 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all"
            value={currStaff.role}
            onChange={(e) =>
              setCurrStaff({ ...currStaff, role: e.target.value })
            }
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        {/* Branch Selection */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">Branch</label>
          <select
            className="w-full border-2 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all"
            value={currStaff.branch_id}
            onChange={(e) =>
              setCurrStaff({ ...currStaff, branch_id: e.target.value })
            }
          >
            {branches.map((branch) => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Job Title
          </label>
          <input
            type="text"
            name="jobTitle"
            autoComplete="off"
            className="w-full border-2 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all"
            value={currStaff.job_title}
            onChange={(e) =>
              setCurrStaff({ ...currStaff, job_title: e.target.value })
            }
          />
        </div>

        <button
          onClick={handleRegister}
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105"
        >
          Register
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default StaffRegister;
