import { useState } from "react";

const technologies = [
  "WordPress",
  "Shopify",
  "BigCommerce",
  "Jimdo",
  "Squarespace",
  "Wix",
  // Add more technologies as needed
];

const CreateProject = ({ onNext }) => {
  const [projectName, setProjectName] = useState("");
  const [selectedTechnology, setSelectedTechnology] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTechnologies = technologies.filter((tech) =>
    tech.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Create your project</h1>
      <p className="mb-6 text-gray-600">
        Give a name to your project (you can change it later) and select your
        website technology. The website technology is the specific CMS you used
        to build your website, or select other if you didnt use one or if its
        not in the list.
      </p>

      <div className="mb-6">
        <label htmlFor="projectName" className="block mb-2 font-semibold">
          PROJECT NAME
        </label>
        <input
          type="text"
          id="projectName"
          className="w-full p-2 border rounded"
          placeholder="Enter your project name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
      </div>

      <div className="mb-6">
        <label htmlFor="technology" className="block mb-2 font-semibold">
          WEBSITE TECHNOLOGY
        </label>
        <div className="relative">
          <button
            className="w-full p-2 border rounded text-left flex justify-between items-center"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {selectedTechnology || "Select your website technology"}
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
          {isDropdownOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
              <input
                type="text"
                className="w-full p-2 border-b"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <ul className="max-h-60 overflow-y-auto">
                {filteredTechnologies.map((tech) => (
                  <li
                    key={tech}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSelectedTechnology(tech);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <button
        className="bg-[#086373] text-white px-4 py-2 rounded hover:bg-[#086373]"
        onClick={onNext}
      >
        Next
      </button>
    </div>
  );
};

export default CreateProject;
