import { useState } from "react";
import { Select, Option } from "@material-tailwind/react";
import { userAxiosInstence } from "../utils/axios-utils";
import { Spinner } from "@material-tailwind/react";
import DialogDefault from "./DialogDefault";
// import AudioRecorder from "./AudioRecorder";
import {
  availableCombinations,
  languageNames,
  supportedCombinations,
} from "../utils/functions";
// import FileTranslator from "./FileTranslator";

function TranslatorMain({ setReqAccessOpen, JWT }) {
  const [inputLanguage, setInputLanguage] = useState("en");
  const [outputLanguage, setOutputLanguage] = useState("ar");
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  //   const [recordedUrl, setRecordedUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isTranslating, setIsTranslationg] = useState(false);
  const [textError, setTextError] = useState(false);
  //   const [pdfUrl, setPdfUrl] = useState(null);
  const translateText = async () => {
    if (!JWT) {
      setReqAccessOpen(true);
      return;
    }
    const combination = `${inputLanguage}-${outputLanguage}`;
    if (supportedCombinations.includes(combination)) {
      if (inputText.length == 0) {
        setTextError("please enter some text");
        return;
      }
      setIsTranslationg(true);
      try {
        console.log("api called");
        const response = await userAxiosInstence.get(
          `https://api.transloom.com/translation/translate/${inputLanguage}/${outputLanguage}?text=${inputText}`
        );
        if (response) {
          console.log(response);
          console.log("backend response : ", response.data);
          setTranslatedText(response.data[0]);
          setIsTranslationg(false);
        }
      } catch (error) {
        console.error("Translation error:", error);
        setIsTranslationg(false);
      }
    } else {
      setMessage("please select a target language");
      setOpen(true);
    }
  };
  const handleChangeInputLan = (selectedValue) => {
    console.log(selectedValue);
    setInputLanguage(selectedValue);
  };

  const handleChangeOutputLan = (selectedValue) => {
    console.log(selectedValue);
    setOutputLanguage(selectedValue);
  };

  const getAvailableOutputLanguages = (inputLanguage) => {
    return availableCombinations
      .filter((combination) => combination.inputLanguage === inputLanguage)
      .map((combination) => combination.outputLanguage);
  };
  //   console.log(inputLanguage, "input");
  //   console.log(outputLanguage, "output");
  //   console.log(recordedUrl, "audio");
  return (
    <>
      <div className="border border-gray-300 lg:mx-16 mx-2 md:mt-10 mt-3 rounded-md">
        <div className=" ">
          <div className="grid md:grid-cols-2 mt-10 mx-5 grid:col gap-4">
            <div className="col-span-1">
              <Select
                variant="static"
                label="Input Language"
                value={inputLanguage}
                onChange={handleChangeInputLan}
              >
                {Object.entries(languageNames).map(([code, name]) => (
                  <Option key={code} value={code}>
                    {name}
                  </Option>
                ))}
              </Select>
            </div>

            <div className="col-span-1">
              <Select
                variant="static"
                label="Output language"
                value={outputLanguage}
                onChange={handleChangeOutputLan}
              >
                {getAvailableOutputLanguages(inputLanguage).map((code) => (
                  <Option key={code} value={code}>
                    {languageNames[code]}
                  </Option>
                ))}
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 grid:col  mt-4">
            <div className="border">
              <textarea
                onFocus={() => setTextError(false)}
                className="p-5 ps-10 border-0 outline-none  border-gray-300 w-full resize-none active min-h-64 "
                placeholder="Type to translate"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              {/* <AudioRecorder setRecordedUrl={setRecordedUrl} /> */}
            </div>
            <div className="border">
              <textarea
                className="p-5  border-0 outline-none  border-gray-300 w-full resize-none min-h-72"
                placeholder="Translation"
                value={translatedText}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
      <div className="lg:mx-16 mx-2">
        {textError ? (
          <p className="animate-slideInFromLeft text-red-700 text-sm">
            please enter something to translate
          </p>
        ) : (
          <p className=" text-white">.</p>
        )}
      </div>

      <div className="text-center my-6">
        <button
          disabled={isTranslating}
          style={{ fontFamily: "Poppins" }}
          className="bg-[#086373] text-white font-bold py-2 px-4 rounded"
          onClick={translateText}
        >
          {isTranslating ? (
            <Spinner className="w-16 text-white" />
          ) : (
            "Translate"
          )}
        </button>
      </div>
      <DialogDefault open={open} setOpen={setOpen} message={message} />
    </>
  );
}

export default TranslatorMain;
