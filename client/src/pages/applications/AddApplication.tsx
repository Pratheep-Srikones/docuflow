import React, { useEffect, useState } from "react";
import { uploadFile } from "../../services/upload.services";
import { Application, Branch } from "../../types/types";
import { submit_application } from "../../services/application.services";
import { useNavigate } from "react-router-dom";
import { getBranches } from "../../services/branch.services";
import { notifyError, notifySuccess, notifyWarning } from "../../utils/notify";
import { ToastContainer } from "react-toastify";
import { decrypt } from "../../utils/encrypt";

const AddApplication = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [currApplication, setCurrApplication] = useState(Application());
  const [showTooltip, setShowTooltip] = useState(false);

  const [branches, setBranches] = useState<Branch[]>([]);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await getBranches();
        setBranches(response.branches);
      } catch (error) {
        console.error("Error while fetching branches:", error);
      }
    };
    fetchBranches();
  }, []);

  const navigate = useNavigate();

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      notifyWarning("Please upload a PDF file.");
    } else {
      uploadFile(file)
        .then((response) => {
          notifySuccess("File uploaded successfully!");
          setFileUploaded(true);
          setCurrApplication({
            ...currApplication,
            doc_link: response.file_url,
          });
        })
        .catch((error) => {
          console.log("error of upload: ", error);
          notifyError("Error uploading file. Please try again.");
        });
    }
  };

  const handleSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileUploaded) {
      notifyWarning("Please upload a PDF file.");
    } else if (!currApplication.title || !currApplication.description) {
      notifyWarning("Please fill in all the fields.");
    } else {
      setCurrApplication({
        ...currApplication,
        submitted_date: new Date().toISOString(),
        applicant_id: decrypt(localStorage.getItem("user_id")!),
        status: "pending",
      });

      if (currApplication.applicant_id) {
        submit_application(currApplication)
          .then(() => {
            notifySuccess("Application submitted successfully!");
            navigate("/user");
          })
          .catch((error) => {
            console.log("error of submission: ", error);
            notifySuccess("Error submitting application. Please try again.");
          });
      }
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      notifyWarning("Only PDF files are allowed.");
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
    } else {
      notifyWarning("Only PDF files are allowed.");
    }
  };

  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col">
      <header className="py-6 px-8 bg-blue-600 text-white">
        <h1 className="text-3xl font-semibold text-center">
          Add New Application
        </h1>
        <p className="mt-2 text-lg text-center">
          Welcome, {decrypt(localStorage.getItem("user_name")!)}
          {"!"}
        </p>{" "}
        {/* Replace with dynamic user name */}
      </header>

      <main className="flex-grow px-6 md:px-8 py-12">
        <div className="max-w-lg mx-auto">
          <form>
            {/* Title Input */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Title"
                value={currApplication.title}
                onChange={(e) =>
                  setCurrApplication({
                    ...currApplication,
                    title: e.target.value,
                  })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoComplete="off"
              />
            </div>

            {/* Description Text Area */}
            <div className="mb-4">
              <textarea
                placeholder="Description"
                value={currApplication.description}
                onChange={(e) =>
                  setCurrApplication({
                    ...currApplication,
                    description: e.target.value,
                  })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={5}
                autoComplete="off"
              />
            </div>
            <div>
              <div className="mb-4">
                <select
                  value={currApplication.branch_id}
                  onChange={(e) => {
                    setCurrApplication({
                      ...currApplication,
                      branch_id: e.target.value,
                    });
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>
                    Select Branch
                  </option>
                  {branches.map((branch) => (
                    <option key={branch.branch_id} value={branch.branch_id}>
                      {branch.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* File Upload (Drag and Drop or File Selection) */}
            <div className="flex gap-2 mb-2">
              <label>Upload Supporting Documents</label>
              <div
                className="relative cursor-pointer"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <span className="text-blue-500 text-lg font-bold">
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
                      d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                    />
                  </svg>
                </span>
                {showTooltip && (
                  <div className="absolute top-6 left-[-10px] bg-gray-700 text-white text-sm px-3 py-2 rounded-md w-48 shadow-lg">
                    Only one file is supported. If you have more documents to
                    upload, please combine them into a single PDF file.
                  </div>
                )}
              </div>
            </div>
            <div
              className="mb-6 p-4 border-2 border-dashed border-gray-300 rounded-lg flex justify-center items-center"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              {file ? (
                <div className="flex items-center gap-4">
                  <p className="text-center text-gray-600">{file.name}</p>
                  <button
                    className=" hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                    onClick={() => setFile(null)}
                  >
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
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                  <button
                    className="hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                    onClick={handleUpload}
                  >
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
                        d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <div>
                  <p className="text-center text-gray-600 ">
                    Drag and drop a PDF file here, or click to select
                  </p>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="fileInput"
                  />
                  <label
                    htmlFor="fileInput"
                    className="text-blue-500 cursor-pointer mt-2"
                  >
                    Choose a file
                  </label>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                onClick={handleSubmission}
                type="submit"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
};

export default AddApplication;
