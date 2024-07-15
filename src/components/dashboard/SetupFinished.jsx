const SetupFinished = ({ onGoToDashboard }) => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md text-center">
      <div className="mb-8">
        <svg
          className="mx-auto h-20 w-20 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      </div>

      <h1 className="text-2xl font-bold mb-4">
        Thank You! Your Setup is Complete
      </h1>

      <p className="text-lg text-gray-600 mb-6">
        Congratulations on successfully setting up your multilingual website
        with Weglot!
      </p>

      <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 mb-8 text-left">
        <h2 className="font-bold mb-2">Whats Next?</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Visit your website and test the language switcher</li>
          <li>Fine-tune your translations in the Weglot dashboard</li>
          <li>Customize the appearance of your language switcher</li>
          <li>
            Explore advanced features like URL translation and custom exclusions
          </li>
        </ul>
      </div>

      <p className="text-gray-600 mb-8">
        Remember, our support team is always here to help if you have any
        questions or need assistance.
      </p>

      <button
        onClick={onGoToDashboard}
        className="bg-[#086373] text-white text-xl font-semibold px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 shadow-lg"
      >
        Go to Dashboard
      </button>

      <p className="mt-8 text-sm text-gray-500">
        Need help?{" "}
        <a href="#" className="text-indigo-600 hover:underline">
          Contact our support team
        </a>
      </p>
    </div>
  );
};

export default SetupFinished;
