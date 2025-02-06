import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Application, Staff, User } from "../../types/types";
import { get_application } from "../../services/application.services";
import { get_user_details_by_id } from "../../services/user.servies";
import { notifyError } from "../../utils/notify";
import { ToastContainer } from "react-toastify";
import { get_staff_details_by_id } from "../../services/staff.services";
import { formatTimestamp } from "../../utils/format";

const ViewApplication = () => {
  const { application_id } = useParams();
  const [application, setApplication] = useState<Application>(Application);
  const [applicant, setApplicant] = useState<User>(User);
  const [reviewer, setReviewer] = useState<Staff>(Staff);

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
    alert(`Application ${action}!`);
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
              onClick={() => handleAction("Approved")}
            >
              Approve
            </button>
            <button
              className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-600 transition w-full sm:w-auto"
              onClick={() => handleAction("Rejected")}
            >
              Reject
            </button>
            <button
              className="bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-yellow-600 transition w-full sm:w-auto"
              onClick={() => handleAction("Assigned to another staff")}
            >
              Assign to Another Staff
            </button>
          </div>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
};

export default ViewApplication;
