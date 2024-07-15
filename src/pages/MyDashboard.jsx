import { useEffect, useState } from "react";
import MySidebar from "../components/dashboard/MySidebar";
import MyNavBar from "../components/MyNavBar";
import CreateProject from "../components/dashboard/CreateProject";
import MyLanguageConfig from "../components/dashboard/MyLanguageConfig";
import WebsiteDetails from "../components/dashboard/WebsiteDetails";
import AddTransloom from "../components/dashboard/AddTransloom";
import TransloomSetup from "../components/dashboard/TransloomSetup";

const MyDashboard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [reqAccessOpen, setReqAccessOpen] = useState(false);
  const [JWT, setJWT] = useState("");

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  const onPrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  useEffect(() => {
    const token = localStorage.getItem("userJWT");
    console.log("Jwt", token);
    if (token) {
      setJWT(token);
    }
  }, []);

  return (
    <>
      <MyNavBar
        JWT={JWT}
        setJWT={setJWT}
        reqAccessOpen={reqAccessOpen}
        setReqAccessOpen={setReqAccessOpen}
      />
      <div className="flex h-screen bg-gray-100">
        <MySidebar currentStep={currentStep} />
        <div className="flex-1 p-10">
          {currentStep === 1 && (
            <CreateProject onNext={nextStep} onPrevious={onPrevious} />
          )}
          {currentStep === 2 && (
            <MyLanguageConfig onNext={nextStep} onPrevious={onPrevious} />
          )}
          {currentStep === 3 && (
            <WebsiteDetails onNext={nextStep} onPrevious={onPrevious} />
          )}
          {currentStep === 4 && (
            <AddTransloom onNext={nextStep} onPrevious={onPrevious} />
          )}
          {currentStep === 5 && (
            // <SetupFinished onNext={nextStep} onPrevious={onPrevious} />
            <TransloomSetup />
          )}
        </div>
      </div>
    </>
  );
};

export default MyDashboard;
