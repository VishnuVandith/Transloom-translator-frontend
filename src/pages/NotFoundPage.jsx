const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">404</h1>
        <p className="text-xl mt-4">Oops! Page not found.</p>
        <p className="text-lg text-gray-600 mt-2">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <a href="/" className="text-blue-500 mt-4 block">
          Go back to the homepage
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
