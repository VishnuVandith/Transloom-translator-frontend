import { useState } from "react";

const languages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Russian",
  "Chinese",
  "Japanese",
  "Korean",
  // Add more languages as needed
];

const MyLanguageConfig = ({ onNext, onPrevious }) => {
  const [originalLanguage, setOriginalLanguage] = useState("");
  const [translatedLanguages, setTranslatedLanguages] = useState([]);
  const [isTranslatedDropdownOpen, setIsTranslatedDropdownOpen] =
    useState(false);

  const handleTranslatedLanguageToggle = (lang) => {
    setTranslatedLanguages((prevLangs) =>
      prevLangs.includes(lang)
        ? prevLangs.filter((l) => l !== lang)
        : [...prevLangs, lang]
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Configure your languages</h1>
      <p className="mb-6 text-gray-600">
        Indicate the original language of your website and the language(s) you
        want to translate into.
      </p>

      <div className="mb-6">
        <label className="block mb-2 font-semibold">Original Language</label>
        <p className="mb-2 text-gray-600">
          What is the original (current) language of your website?
        </p>
        <select
          className="w-full p-2 border rounded"
          value={originalLanguage}
          onChange={(e) => setOriginalLanguage(e.target.value)}
        >
          <option value="">Select a language</option>
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-semibold">Translated languages</label>
        <p className="mb-2 text-gray-600">
          Select languages you want to translate into. See our{" "}
          <a href="#" className="text-blue-600 hover:underline">
            supported languages
          </a>
          .
        </p>
        <div className="relative">
          <button
            className="w-full p-2 border rounded text-left flex justify-between items-center"
            onClick={() =>
              setIsTranslatedDropdownOpen(!isTranslatedDropdownOpen)
            }
          >
            {translatedLanguages.length > 0
              ? translatedLanguages.join(", ")
              : "Select languages"}
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
          {isTranslatedDropdownOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg max-h-60 overflow-y-auto">
              {languages.map((lang) => (
                <div
                  key={lang}
                  className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                  onClick={() => handleTranslatedLanguageToggle(lang)}
                >
                  <input
                    type="checkbox"
                    checked={translatedLanguages.includes(lang)}
                    onChange={() => {}}
                    className="mr-2"
                  />
                  {lang}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
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

export default MyLanguageConfig;
