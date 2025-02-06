/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Application, Staff, StaffDetail, User } from "../../types/types";
import {
  assign_application,
  get_application,
} from "../../services/application.services";
import { get_user_details_by_id } from "../../services/user.servies";
import { notifyError, notifySuccess } from "../../utils/notify";
import { ToastContainer } from "react-toastify";
import {
  get_all_staff_by_branch,
  get_staff_details_by_id,
  validate_security_key,
} from "../../services/staff.services";
import { formatTimestamp } from "../../utils/format";

const ViewApplication = () => {
  const navigate = useNavigate();
  const { application_id } = useParams();
  const [application, setApplication] = useState<Application>(Application);
  const [applicant, setApplicant] = useState<User>(User);
  const [reviewer, setReviewer] = useState<Staff>(Staff);
  const [modalOpen, setModalOpen] = useState(false);
  const [action, setAction] = useState("");
  const [securityKey, setSecurityKey] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(true);

  const [staffs, setStaffs] = useState<StaffDetail[]>([]);
  const handleValidation = async () => {
    try {
      const data = await validate_security_key(securityKey);
      if (data.message === "Invalid security key") {
        notifyError("Invalid security key");
      }
      if (data.message === "Valid security key") {
        notifySuccess("Security key validated successfully");
        setIsAuthorized(true);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const fetchStaffs = async () => {
      if (action === "assign" && application.branch_id) {
        try {
          const data = await get_all_staff_by_branch(application.branch_id);
          setStaffs(data.staff);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchStaffs();
  }, [action, application]);
  useEffect(() => {
    const getApplication = async () => {
      try {
        if (application_id) {
          const data = await get_application(application_id!);
          setApplication(data.application);
        } else {
          notifyError("Application ID not found");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getApplication();
  }, [application_id]);

  useEffect(() => {
    const fetchuser = async (user_id: string) => {
      try {
        const data = await get_user_details_by_id(user_id);
        setApplicant(data.user);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchReviewer = async (reviewer_id: string) => {
      try {
        const data = await get_staff_details_by_id(reviewer_id);
        setReviewer(data.staff);
      } catch (error) {
        console.error(error);
      }
    };
    if (application.applicant_id) {
      fetchuser(application.applicant_id);
    }
    if (application.reviewed_by) {
      fetchReviewer(application.reviewed_by);
    }
  }, [application]);

  const handleAction = (action: string) => {
    setModalOpen(true);
    setAction(action);
  };

  const handle_assign_staff = async () => {
    try {
      assign_application(application.application_id, application.assigned_to)
        .then(() => {
          notifySuccess("Successfully assigned");
          navigate("/staff");
        })
        .catch((error) => {
          console.error(error);
          notifyError("Error assigning");
        });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col">
      {/* Header */}
      <header className="py-6 px-8 bg-blue-600 text-white">
        <h1 className="text-3xl font-semibold text-center">
          {application.title}
        </h1>
        <div className="mt-4 text-center">
          <p className="text-lg md:text-xl font-semibold">
            Submitted By: {applicant.first_name} {applicant.last_name}
          </p>
          <p className="text-sm md:text-base">NIC: {applicant.nic}</p>
          <p className="text-sm md:text-base">
            Mobile:{" "}
            <a
              href={`tel:${applicant.phone}`}
              className="text-yellow-300 underline"
            >
              {applicant.phone}
            </a>
          </p>
          <p className="text-sm md:text-base">
            Email:{" "}
            <a
              href={`mailto:${applicant.email}`}
              className="text-yellow-300 underline"
            >
              {applicant.email}
            </a>
          </p>
        </div>
      </header>

      {/* Application Details */}
      <main className="flex-grow px-6 md:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Description & Submitted Date */}
          <div className="mb-6 bg-gray-100 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">
              Application Description
            </h2>
            <p className="text-gray-700">{application.description}</p>
            <p className="text-gray-500 text-sm mt-3">
              Submitted on: {formatTimestamp(application.submitted_date)}
            </p>
          </div>

          {/* View Document */}
          <div className="text-center mb-6">
            <a
              href={application.doc_link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
            >
              View Attached Document
            </a>
          </div>

          {/* Remarks Text Area */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Remarks</h2>
            <textarea
              value={application.remarks}
              onChange={(e) =>
                setApplication({ ...application, remarks: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Add remarks here..."
            ></textarea>
          </div>

          {application.reviewed_by &&
            application.reviewed_by !== "" &&
            reviewer && (
              <div className="bg-gray-100 p-4 rounded-lg shadow-md text-gray-900 mb-4">
                <h3 className="text-lg font-semibold text-blue-600">
                  Reviewed By
                </h3>
                <p className="text-xl font-medium">
                  {reviewer.first_name} {reviewer.last_name}
                </p>
                <p className="text-gray-700">
                  {reviewer.job_title}{" "}
                  <span className="font-semibold">({reviewer.role})</span>
                </p>
              </div>
            )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition w-full sm:w-auto"
              onClick={() => handleAction("approve")}
            >
              Approve
            </button>
            <button
              className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-600 transition w-full sm:w-auto"
              onClick={() => handleAction("reject")}
            >
              Reject
            </button>
            <button
              className="bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-yellow-600 transition w-full sm:w-auto"
              onClick={() => handleAction("assign")}
            >
              Assign to Another Staff
            </button>
          </div>
        </div>
      </main>
      {modalOpen && (
        <div className="w-full h-full bg-black/80 fixed top-0 left-0 flex items-center justify-center z-10 overflow-hidden">
          {!isAuthorized ? (
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 text-center mb-4">
                Enter Security Key
              </h2>
              <p className="text-gray-700 text-center mb-4">
                Please enter the security key to proceed.
              </p>

              <input
                type="password"
                value={securityKey}
                onChange={(e) => setSecurityKey(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                autoComplete="off"
              />

              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
                <button
                  onClick={() => handleValidation()}
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition w-full sm:w-auto"
                >
                  Submit
                </button>
                <button
                  onClick={() => setModalOpen(false)}
                  className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-600 transition w-full sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
              {action === "approve" && (
                <>
                  <h2 className="text-lg md:text-xl font-semibold text-gray-900 text-center mb-4">
                    Approve Application
                  </h2>
                  <p className="text-gray-700 text-center mb-4">
                    Are you sure you want to approve{" "}
                    <span className="font-semibold">{application.title}</span>{" "}
                    submitted by{" "}
                    <span className="font-semibold">
                      {applicant.first_name} {applicant.last_name}
                    </span>
                    ?
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
                    <button className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition w-full sm:w-auto">
                      Approve
                    </button>
                    <button
                      onClick={() => setModalOpen(false)}
                      className="bg-gray-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-600 transition w-full sm:w-auto"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}

              {action === "reject" && (
                <>
                  <h2 className="text-lg md:text-xl font-semibold text-gray-900 text-center mb-4">
                    Reject Application
                  </h2>
                  <p className="text-gray-700 text-center mb-4">
                    Are you sure you want to reject{" "}
                    <span className="font-semibold">{application.title}</span>{" "}
                    submitted by{" "}
                    <span className="font-semibold">
                      {applicant.first_name} {applicant.last_name}
                    </span>
                    ?
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
                    <button className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-600 transition w-full sm:w-auto">
                      Reject
                    </button>
                    <button
                      onClick={() => setModalOpen(false)}
                      className="bg-gray-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-600 transition w-full sm:w-auto"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}

              {action === "assign" && (
                <>
                  <h2 className="text-lg md:text-xl font-semibold text-gray-900 text-center mb-4">
                    Assign Application
                  </h2>
                  <p className="text-gray-700 text-center mb-4">
                    Select a staff member to assign this application.
                  </p>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Staff to Assign
                    </label>
                    <select
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      onChange={(e) =>
                        setApplication({
                          ...application,
                          assigned_to: e.target.value,
                        })
                      }
                    >
                      <option value="" disabled selected>
                        Select Staff
                      </option>
                      {staffs.map((staff) => (
                        <option key={staff.staff_id} value={staff.staff_id}>
                          {staff.first_name} {staff.last_name} -{" "}
                          {staff.job_title} ({staff.role})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
                    <button
                      onClick={() => {
                        handle_assign_staff();
                      }}
                      className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition w-full sm:w-auto"
                    >
                      Assign
                    </button>
                    <button
                      onClick={() => setModalOpen(false)}
                      className="bg-gray-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-600 transition w-full sm:w-auto"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ViewApplication;
