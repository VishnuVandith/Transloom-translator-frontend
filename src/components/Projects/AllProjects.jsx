import { useState } from "react";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const AllProjects = () => {
  const navigate = useNavigate();

  const handleCreateProjects = () => {
    navigate("/create-projects");
  };
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Marvix",
      url: "https://5c1bac-4e.myshopify.com",
      totalWords: 1917,
      languages: 1,
      members: "N",
      manualTranslations: "7 / 1,917",
      percentage: "0%",
    },
    {
      id: 2,
      name: "Project Alpha",
      url: "https://alpha-project.com",
      totalWords: 2500,
      languages: 2,
      members: "A",
      manualTranslations: "15 / 2,500",
      percentage: "10%",
    },
    {
      id: 3,
      name: "Beta Initiative",
      url: "https://beta-initiative.org",
      totalWords: 3200,
      languages: 3,
      members: "B",
      manualTranslations: "100 / 3,200",
      percentage: "25%",
    },
  ]);

  console.log(setProjects);

  return (
    <div
      className="container mx-auto p-4 sm:p-6"
      style={{ fontFamily: "Poppins" }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold" style={{ fontFamily: "Poppins" }}>
          Projects
        </h1>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search a project"
              className="pl-10 pr-4 py-2 border rounded-lg w-full"
            />
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          <button
            className="bg-[#086373] text-white px-4 py-2 rounded-sm flex items-center w-full sm:w-auto justify-center sm:justify-start"
            style={{ fontFamily: "Poppins", fontSize: "14px" }}
            onClick={handleCreateProjects}
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Create project
          </button>
        </div>
      </div>

      <p className="mb-4 text-gray-600">{projects.length} result(s)</p>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="bg-gray-100" style={{ fontFamily: "Poppins" }}>
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Total Words</th>
              <th className="text-left p-2">Languages</th>
              <th className="text-left p-2">Members</th>
              <th className="text-left p-2">Translation words</th>
              <th className="text-left p-2">Percentage</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-b">
                <td className="p-2">
                  <div>{project.name}</div>
                  <div className="text-sm text-gray-500">{project.url}</div>
                </td>
                <td className="p-2">{project.totalWords}</td>
                <td className="p-2">{project.languages}</td>
                <td className="p-2">
                  <span className="bg-[#086373] text-white rounded-full w-8 h-8 flex items-center justify-center">
                    {project.members}
                  </span>
                </td>
                <td className="p-2">{project.manualTranslations}</td>
                <td className="p-2">{project.percentage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProjects;
