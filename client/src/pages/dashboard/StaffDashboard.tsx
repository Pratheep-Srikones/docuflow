import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { decrypt } from "../../utils/encrypt";
import { Application } from "../../types/types";
import { get_pending_applications } from "../../services/staff.services";
import { notifyError, notifySuccess, notifyWarning } from "../../utils/notify";
import { staff_password_change } from "../../services/auth.services";
import { ToastContainer } from "react-toastify";

const StaffDashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [action, setAction] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleViewApplicationDetails = (applicationId: string) => {
    navigate(`/staff/application/${applicationId}`); // Route to application details page
  };

  const logout = () => {
    localStorage.clear(); // Clear local storage
    navigate("/"); // Route to log out
  };

  const handle_logout = () => {
    setModalOpen(true);
    setAction("logout");
  };

  const [assignedApplications, setAssignedApplications] = useState<
    Application[]
  >([]);

  useEffect(() => {
    const getPendingApplications = async () => {
      try {
        const data = await get_pending_applications();
        setAssignedApplications(data.applications); // Call get_pending_applications function
      } catch (error) {
        console.log(error);
      }
    };
    getPendingApplications();
  }, []);

  const handle_password_change = () => {
    setModalOpen(true);
    setAction("change_password");
  };

  const change_password = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implement password change logic here
    if (newPassword !== confirmPassword) {
      notifyWarning("Passwords do not match!");
    } else {
      staff_password_change(oldPassword, newPassword)
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
            Welcome, {decrypt(localStorage.getItem("staff_name")!)}! (
            {decrypt(localStorage.getItem("staff_job_title")!)})
          </h2>
        </div>

        {/* Assigned Applications */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Applications Assigned to You
          </h3>
          <div className="bg-white p-6 rounded-lg shadow-md">
            {assignedApplications.length === 0 ? (
              <p className="text-green-800 font-bold text-xl">
                No applications assigned yet.
              </p>
            ) : (
              <table className="min-w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-700">Title</th>
                    <th className="px-4 py-2 text-left text-gray-700">
                      Status
                    </th>
                    <th className="px-4 py-2 text-left text-gray-700">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {assignedApplications.map((application) => (
                    <tr key={application.application_id} className="border-b">
                      <td className="px-4 py-2">{application.title}</td>
                      <td className="px-4 py-2">{application.status}</td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() =>
                            handleViewApplicationDetails(
                              application.application_id
                            )
                          }
                          className="text-blue-500 hover:text-blue-700"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Profile Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Your Profile
          </h3>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p>
              <strong>Email:</strong>{" "}
              {decrypt(localStorage.getItem("staff_email")!)}
            </p>
            <p>
              <strong>Phone:</strong>{" "}
              {decrypt(localStorage.getItem("staff_phone")!)}
            </p>
            <p>
              <strong>NIC:</strong>{" "}
              {decrypt(localStorage.getItem("staff_nic")!)}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="text-center space-x-4">
          <button
            onClick={handle_password_change}
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
        <>
          {action === "change_password" && (
            <div>
              <div className="w-full h-full bg-black/80 fixed top-0 left-0 flex items-center justify-center z-10 overflow-hidden">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                  <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                    Change Password
                  </h1>
                  <form onSubmit={change_password}>
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
            </div>
          )}
          {action === "logout" && (
            <div>
              <div className="w-full h-full bg-black/80 fixed top-0 left-0 flex items-center justify-center z-10 overflow-hidden">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                  <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                    Are you sure you want to log out?
                  </h1>
                  <div className="flex justify-center">
                    <button
                      onClick={logout}
                      className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                    >
                      Log Out
                    </button>
                    <button
                      className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ml-4"
                      onClick={() => {
                        setModalOpen(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default StaffDashboard;
