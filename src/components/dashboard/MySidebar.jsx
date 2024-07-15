const steps = [
  "Create your project",
  "Configure your languages",
  "Add your website details",
  "Add Weglot to your website",
  "Setup finished!",
];

const MySidebar = ({ currentStep }) => {
  return (
    <div className="w-64 bg-white shadow-md p-6">
      <h2 className="text-xl font-bold mb-6">Transloom</h2>
      {steps.map((step, index) => (
        <div
          key={index}
          className={`mb-4 ${
            index + 1 === currentStep
              ? "text-blue-600 font-bold"
              : "text-gray-600"
          }`}
        >
          {step}
        </div>
      ))}
    </div>
  );
};

export default MySidebar;
