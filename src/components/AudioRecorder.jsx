import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { MicrophoneIcon, PauseCircleIcon } from "@heroicons/react/24/outline";

const AudioRecorder = ({ setRecordedUrl }) => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaStream = useRef(null);
  const mediaRecorder = useRef(null);
  const chunks = useRef([]);
  const startRecording = async () => {
    setIsRecording(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStream.current = stream;
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.current.push(e.data);
        }
      };
      mediaRecorder.current.onstop = () => {
        const recordedBlob = new Blob(chunks.current, { type: "audio/webm" });
        // const url = URL.createObjectURL(recordedBlob);
        // setRecordedUrl(url);
        // chunks.current = [];
        const reader = new FileReader();
        reader.readAsDataURL(recordedBlob);
        reader.onloadend = () => {
          const base64String = reader.result.split(",")[1]; // Remove the data:audio/webm;base64, prefix
          setRecordedUrl(base64String); // Pass the base64 string to the parent component
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
  return (
    <div className="my-4 border rounded-lg">
      {!isRecording ? (
        <button className="ms-5  me-5  py-2 " onClick={startRecording}>
          <MicrophoneIcon className="h-5 w-5" />
        </button>
      ) : (
        <button className="ms-5  me-5  py-2 " onClick={stopRecording}>
          <PauseCircleIcon className="h-6 w-6 text-red-700 animate-pulse" />
        </button>
      )}
    </div>
  );
};
AudioRecorder.propTypes = {
  setRecordedUrl: PropTypes.func.isRequired,
};
export default AudioRecorder;
