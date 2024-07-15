import { useState } from "react";

const WebsiteDetails = ({ onNext, onPrevious }) => {
  const [domainUrl, setDomainUrl] = useState("");

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Add your website details</h1>

      <div className="mb-6">
        <label htmlFor="domainUrl" className="block mb-2 font-semibold">
          Domain URL
        </label>
        <p className="text-sm text-gray-600 mb-2">
          Enter your websites domain name
        </p>
        <input
          type="text"
          id="domainUrl"
          className="w-full p-2 border rounded"
          placeholder="example.com"
          value={domainUrl}
          onChange={(e) => setDomainUrl(e.target.value)}
        />
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 mb-6">
        <p className="flex items-center">
          <svg
            className="w-6 h-6 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          No public domain yet? Dont worry! You can still{" "}
          <a href="#" className="underline">
            connect Weglot to your website without it
          </a>
          .
        </p>
      </div>

      <div className="flex justify-between">
        <button
          className="bg-[#086373] text-white px-4 py-2 rounded hover:bg-[#086373]"
          onClick={onPrevious}
        >
          Previous
        </button>
        <button
          className="bg-[#086373] text-white px-4 py-2 rounded hover:bg-[#086373]"
          onClick={onNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default WebsiteDetails;
