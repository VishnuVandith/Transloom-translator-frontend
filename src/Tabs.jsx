import { useState } from "react";
import FileTranslator from "./components/FileTranslator";
import TranslatorMain from "./components/TranslatorMain";
import AudioTranslator from "./components/Projects/AudioTranslator";
import ImageTranslation from "./components/ImageTranslation";

const TabComponent = ({ setReqAccessOpen, JWT }) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      name: "Text Translate",
      component: TranslatorMain,
      props: { setReqAccessOpen, JWT },
    },
    {
      name: "Document Translate",
      component: FileTranslator,
      props: { setReqAccessOpen, JWT },
    },
    {
      name: "Image Translator",
      component: ImageTranslation,
      props: { setReqAccessOpen, JWT },
    },
    {
      name: "Speech Translation",
      component: AudioTranslator,
      props: { setReqAccessOpen, JWT },
    },
  ];

  const ActiveComponent = tabs[activeTab].component;
  const activeProps = tabs[activeTab].props;

  return (
    <div className="font-sans max-w-7xl mx-auto my-2 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`
              px-4 py-2 m-1 sm:m-0
              border border-gray-200 
              text-sm sm:text-base font-bold
              rounded transition duration-300 ease-in-out
              ${
                activeTab === index
                  ? "bg-[#096373] text-white"
                  : "bg-white text-[#096373] hover:bg-gray-100"
              }
            `}
            onClick={() => setActiveTab(index)}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <ActiveComponent {...activeProps} />
      </div>
    </div>
  );
};

export default TabComponent;
