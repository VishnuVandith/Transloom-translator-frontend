import { useState, useMemo } from "react";
import { PhotoIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import axios from "axios";

const ImageTranslation = ({ setReqAccessOpen, JWT }) => {
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("es");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [translatedImageURL, setTranslatedImageURL] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "de", name: "German" },
    { code: "zh", name: "Chinese" },
    { code: "ar", name: "Arabic" },
  ];

  const targetLanguages = useMemo(
    () => languages.filter((lang) => lang.code !== sourceLanguage),
    [sourceLanguage, languages]
  );

  const handleSourceLanguageChange = (e) => {
    const newSourceLang = e.target.value;
    setSourceLanguage(newSourceLang);
    if (newSourceLang === targetLanguage) {
      const newTargetLang =
        targetLanguages.find((lang) => lang.code !== newSourceLang)?.code || "";
      setTargetLanguage(newTargetLang);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (
      selectedFile &&
      (selectedFile.type === "image/jpeg" || selectedFile.type === "image/png")
    ) {
      setFile(selectedFile);
    } else {
      alert("Please select a JPG or PNG image file.");
      event.target.value = null;
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (
        droppedFile.type === "image/jpeg" ||
        droppedFile.type === "image/png"
      ) {
        setFile(droppedFile);
      } else {
        alert("Please select a JPG or PNG image file.");
      }
    }
  };

  const handleTranslate = async () => {
    if (!JWT) {
      setReqAccessOpen(true);
      return;
    }
    if (!file) {
      alert("Please select an image file first!");
      return;
    }

    if (sourceLanguage === targetLanguage) {
      alert("Source and target languages must be different!");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("image", file, file.name);

    try {
      const response = await axios.post(
        // http://18.212.127.111/ocrTranslation/translate_image/en/es
        `http://18.212.127.111/ocrTranslation/translate_image/${sourceLanguage}/${targetLanguage}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response) {
        // console.log(response.data.filename)
        setTranslatedImageURL(response.data.filename);
      } else {
        alert("Failed to translate image.");
      }
    } catch (error) {
      console.error("Error translating image:", error);
      alert("An error occurred while translating the image.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl md:max-w-[1000px] mx-auto bg-white rounded-lg border overflow-hidden md:max-w-2xl m-4">
      <div className="p-8">
        <h2 className="block text-lg font-medium text-gray-700 mb-6">
          Image Translator
        </h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Source Language
            </label>
            <select
              value={sourceLanguage}
              onChange={handleSourceLanguageChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#096373] focus:ring focus:ring-[#096373] focus:ring-opacity-50"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Target Language
            </label>
            <select
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#096373] focus:ring focus:ring-[#096373] focus:ring-opacity-50"
            >
              {targetLanguages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Choose Image
          </label>
          <div
            className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${
              isDragging
                ? "border-[#096373] bg-[#096373]/10"
                : "border-gray-300"
            } border-dashed rounded-md`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="space-y-1 text-center">
              <PhotoIcon className="mx-auto h-12 w-12 text-[#096373]" />
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-[#096373] hover:text-[#074e5a] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#096373]"
                >
                  <span>Upload an image</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    accept="image/jpeg,image/png"
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">
                {isDragging
                  ? "Drop your image here"
                  : "JPEG, JPG or PNG up to 10MB"}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {file ? `Selected: ${file.name}` : "No image selected"}
          </span>
          <button
            onClick={handleTranslate}
            disabled={isLoading || !file}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#096373] hover:bg-[#074e5a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#096373] ${
              isLoading || !file ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <>
                <ArrowPathIcon className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                Translating...
              </>
            ) : (
              "Translate"
            )}
          </button>
        </div>
      </div>
      {translatedImageURL && (
        <div className="w-full p-4 sm:p-6 md:p-8 lg:p-10">
          <img
            src={translatedImageURL}
            alt="Translated Image"
            className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default ImageTranslation;
