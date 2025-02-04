const HomePage = () => {
  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col">
      <header className="py-6 px-8 bg-blue-600 text-white">
        <h1 className="text-3xl font-semibold text-center md:text-4xl">
          Document Submission and Approval
        </h1>
        <p className="mt-2 text-lg text-center md:text-xl">
          Easily submit and manage documents for approval in a secure and
          organized way.
        </p>
        <div className="mt-6 text-center">
          <p className="text-lg font-medium md:text-xl text-yellow-200">
            Organization Name
          </p>
          <p className="text-sm md:text-base text-gray-300">
            1234 Main St, Anytown, USA
          </p>
        </div>
      </header>

      <main className="flex-grow px-6 md:px-8 py-12">
        <div className="max-w-lg mx-auto text-center">
          <p className="text-xl mb-8 md:text-2xl">
            Welcome to the Document Sign-in platform! Please select your role to
            continue.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button
              onClick={() => (window.location.href = "/user-auth")}
              className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition w-full sm:w-auto"
            >
              Public
            </button>
            <button
              onClick={() => (window.location.href = "/staff-auth")}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition w-full sm:w-auto"
            >
              Staff
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-gray-200 py-4 text-center">
        <p className="text-sm text-gray-700">
          &copy; 2025 Pratheep. All rights reserved.
        </p>
        <div className="mt-2">
          <a
            href="https://facebook.com"
            className="text-blue-600 mx-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <a
            href="https://linkedin.com"
            className="text-blue-600 mx-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com"
            className="text-blue-600 mx-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
