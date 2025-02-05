import React, { useState } from "react";

const AddApplication = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      alert("Only PDF files are allowed.");
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
    } else {
      alert("Only PDF files are allowed.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the form submission logic here (e.g., send data to the backend)
    if (!file) {
      alert("Please upload a PDF file.");
    } else {
      alert("Application submitted successfully!");
    }
  };

  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col">
      <header className="py-6 px-8 bg-blue-600 text-white">
        <h1 className="text-3xl font-semibold text-center">
          Add New Application
        </h1>
        <p className="mt-2 text-lg text-center">Welcome, John Doe</p>{" "}
        {/* Replace with dynamic user name */}
      </header>

      <main className="flex-grow px-6 md:px-8 py-12">
        <div className="max-w-lg mx-auto">
          <form onSubmit={handleSubmit}>
            {/* Title Input */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoComplete="off"
              />
            </div>

            {/* Description Text Area */}
            <div className="mb-4">
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={5}
                autoComplete="off"
              />
            </div>

            {/* File Upload (Drag and Drop or File Selection) */}
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
                type="submit"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddApplication;
