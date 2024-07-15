import { useRef, useState, useMemo } from "react";
import {
  MicrophoneIcon,
  PauseCircleIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";

const AudioTranslator = ({ setReqAccessOpen, JWT }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("es");
  const [audioURL, setAudioURL] = useState(null);
  const [translatedFileURL, setTranslatedFileURL] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const mediaStream = useRef(null);
  const mediaRecorder = useRef(null);
  const chunks = useRef([]);

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

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsRecording(true);
      mediaStream.current = stream;
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.current.push(e.data);
        }
      };
      mediaRecorder.current.onstop = async () => {
        const recordedBlob = new Blob(chunks.current, { type: "audio/webm" });
        const reader = new FileReader();
        reader.readAsDataURL(recordedBlob);
        reader.onloadend = () => {
          const base64String = reader.result.split(",")[1];
          setAudioURL(base64String);
          chunks.current = [];
        };
      };
      mediaRecorder.current.start();
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.stop();
    }
    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach((track) => {
        track.stop();
      });
    }
  };

  const handleTranslate = async () => {
    if (!JWT) {
      setReqAccessOpen(true);
      return;
    }
    if (!audioURL) {
      alert("Please record audio first!");
      return;
    }

    if (sourceLanguage === targetLanguage) {
      alert("Source and target languages must be different!");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("b64Data", audioURL);
    // console.log(audioURL)

    try {
      const response = await axios.post(
        `http://18.212.127.111/b64ToTranslation/audio_translation/${sourceLanguage}/${targetLanguage}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response) {
        console.log(response);
        console.log(response.data.url);
        setTranslatedFileURL(response.data.url);
      } else {
        alert("Failed to translate audio.");
      }
    } catch (error) {
      console.error("Error translating audio:", error);
      alert("An error occurred while translating the audio.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl md:max-w-[1000px] mx-auto bg-white rounded-lg border overflow-hidden md:max-w-2xl m-4">
      <div className="p-8">
        <h2 className="block text-lg font-medium text-gray-700 mb-6">
          Audio Translator
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
        <div className="my-6">
          {!isRecording ? (
            <button
              onClick={startRecording}
              className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#096373] hover:bg-[#074e5a]"
            >
              <MicrophoneIcon className="h-5 w-5 mr-2" />
              Start Recording
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700"
            >
              <PauseCircleIcon className="h-5 w-5 mr-2" />
              Stop Recording
            </button>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={handleTranslate}
            disabled={isLoading || !audioURL}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#096373] hover:bg-[#074e5a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#096373] ${
              isLoading || !audioURL ? "opacity-50 cursor-not-allowed" : ""
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
      {translatedFileURL ? (
        <div className="flex items-center justify-center p-4">
          <audio
            controls
            src={translatedFileURL}
            className="w-full max-w-md rounded-lg "
          />
        </div>
      ) : null}
    </div>
  );
};

export default AudioTranslator;
