import { useState } from "react";
import { useNavigate } from "react-router-dom";

const StaffDashboard = () => {
  const [assignedApplications] = useState([
    { id: 1, title: "Document 1", status: "Pending" },
    { id: 2, title: "Document 2", status: "Under Review" },
  ]);

  const [staffDetails] = useState({
    firstName: "Jane",
    lastName: "Smith",
    jobTitle: "Review Officer",
    email: "janesmith@example.com",
    phone: "987-654-3210",
  });

  const navigate = useNavigate();

  const handleViewApplicationDetails = (applicationId: number) => {
    navigate(`/staff/application/${applicationId}`); // Route to application details page
  };

  const handleLogOut = () => {
    navigate("/"); // Route to log out
  };

  const handleChangePassword = () => {
    navigate("/staff/change-password"); // Route to change password page
  };

  const handleEditProfile = () => {
    navigate("/staff/edit-profile"); // Route to edit profile page
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 px-8">
        <h1 className="text-2xl font-semibold text-center">
          Organization Name
        </h1>
        <p className="text-sm text-center">1234 Main St, Anytown, USA</p>
      </header>

      <main className="px-8 py-12">
        {/* Welcome Message */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-semibold text-gray-800">
            Welcome, {staffDetails.firstName} {staffDetails.lastName} (
            {staffDetails.jobTitle})
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
                    <tr key={application.id} className="border-b">
                      <td className="px-4 py-2">{application.title}</td>
                      <td className="px-4 py-2">{application.status}</td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() =>
                            handleViewApplicationDetails(application.id)
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
              <strong>Email:</strong> {staffDetails.email}
            </p>
            <p>
              <strong>Phone:</strong> {staffDetails.phone}
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="font-semibold text-gray-800">
              Pending Applications
            </h4>
            <p className="text-lg text-gray-600">5</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="font-semibold text-gray-800">
              Approved Applications
            </h4>
            <p className="text-lg text-gray-600">12</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="font-semibold text-gray-800">Under Review</h4>
            <p className="text-lg text-gray-600">3</p>
          </div>
        </div>

        {/* Actions */}
        <div className="text-center space-x-4">
          <button
            onClick={handleEditProfile}
            className="bg-purple-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-600 transition"
          >
            Edit Profile
          </button>
          <button
            onClick={handleChangePassword}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            Change Password
          </button>
          <button
            onClick={handleLogOut}
            className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-600 transition"
          >
            Log Out
          </button>
        </div>
      </main>
    </div>
  );
};

export default StaffDashboard;
