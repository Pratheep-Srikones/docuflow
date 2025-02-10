import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  get_applications_by_applicant,
  get_applications_count,
} from "../../services/application.services";
import { Application } from "../../types/types";
import { notifyError, notifySuccess, notifyWarning } from "../../utils/notify";
import { user_password_change } from "../../services/auth.services";
import { ToastContainer } from "react-toastify";
import { decrypt } from "../../utils/encrypt";

const UserDashboard = () => {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await get_applications_by_applicant();
        setApplications(data.applications);
      } catch (error) {
        console.error("Error while fetching applications:", error);
      }
    };
    fetchApplications();
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [action, setAction] = useState("");

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implement password change logic here
    if (newPassword !== confirmPassword) {
      notifyWarning("Passwords do not match!");
    } else {
      user_password_change(oldPassword, newPassword)
        .then(() => {
          notifySuccess("Password changed successfully!");
          setModalOpen(false);
        })
        .catch((error) => {
          notifyError("Error while changing password!");
          console.error("Error while changing password:", error);
        });
    }
  };

  const navigate = useNavigate();

  const handleAddApplication = async () => {
    if ((await get_applications_count()) >= 5) {
      notifyError("You already have some pending applications try again.");
      return;
    }
    navigate("/user/application/add"); // Route to add application page
  };

  const logout = () => {
    localStorage.clear();
    navigate("/"); // Route to log out
  };

  const handle_logout = () => {
    setModalOpen(true);
    setAction("logout");
  };

  const handleChangePassword = () => {
    setModalOpen(true);
    setAction("change_password");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 px-8">
        <h1 className="text-2xl font-semibold text-center">
          {localStorage.getItem("org_name")}
        </h1>
        <p className="text-sm text-center">
          {localStorage.getItem("org_address")}
        </p>
      </header>

      <main className="px-8 py-12">
        {/* Welcome Message */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-semibold text-gray-800">
            Welcome, {decrypt(localStorage.getItem("user_name")!)}!
          </h2>
        </div>

        {/* Application History */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Your Application History
          </h3>
          <div className="bg-white p-6 rounded-lg shadow-md">
            {applications.length === 0 ? (
              <p>No applications found.</p>
            ) : (
              <table className="min-w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-700">Title</th>
                    <th className="px-4 py-2 text-left text-gray-700">
                      Status
                    </th>
                    <th className="px-4 py-2 text-left text-gray-700">
                      Document
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((application) => (
                    <tr key={application.application_id} className="border-b">
                      <td className="px-4 py-2">{application.title}</td>
                      <td className="px-4 py-2">{application.status}</td>
                      <td>
                        <a
                          href={application.doc_link}
                          target="blank"
                          className="text-blue-600 hover:underline cursor-pointer"
                        >
                          View Document
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Add New Application Button */}
        <div className="mb-8 text-center">
          <button
            onClick={handleAddApplication}
            className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition"
          >
            Add New Application
          </button>
        </div>

        {/* User Details Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Your Details
          </h3>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p>
              <strong>Email:</strong> {decrypt(localStorage.getItem("email")!)}
            </p>
            <p>
              <strong>Phone:</strong> {decrypt(localStorage.getItem("phone")!)}
            </p>
            <p>
              <strong>NIC:</strong> {decrypt(localStorage.getItem("nic")!)}
            </p>
          </div>
        </div>

        {/* Change Password and Log Out Buttons */}
        <div className="text-center space-x-4">
          <button
            onClick={handleChangePassword}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            Change Password
          </button>
          <button
            onClick={handle_logout}
            className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-600 transition"
          >
            Log Out
          </button>
        </div>
      </main>
      {modalOpen && (
        <div>
          {action === "change_password" && (
            <div className="w-full h-full bg-black/80 fixed top-0 left-0 flex items-center justify-center z-10 overflow-hidden">
              <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                  Change Password
                </h1>
                <form onSubmit={handlePasswordChange}>
                  <div className="mb-4">
                    <input
                      type="password"
                      placeholder="Old Password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      autoComplete="off"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="password"
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      autoComplete="off"
                    />
                  </div>
                  <div className="mb-6">
                    <input
                      type="password"
                      placeholder="Confirm New Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      autoComplete="off"
                    />
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    >
                      Change Password
                    </button>
                    <button
                      className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition ml-4"
                      onClick={() => {
                        setModalOpen(false);
                        setOldPassword("");
                        setNewPassword("");
                        setConfirmPassword("");
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          {action === "logout" && (
            <div className="w-full h-full bg-black/80 fixed top-0 left-0 flex items-center justify-center z-10 overflow-hidden">
              <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                  Log Out
                </h1>
                <p className="text-center text-gray-600">
                  Are you sure you want to log out?
                </p>
                <div className="flex justify-center mt-6">
                  <button
                    onClick={logout}
                    className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                  >
                    Log Out
                  </button>
                  <button
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ml-4"
                    onClick={() => setModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default UserDashboard;
