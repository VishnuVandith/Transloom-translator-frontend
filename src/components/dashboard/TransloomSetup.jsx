import { useState, useEffect } from "react";
import mainImage from "../../assets/transloom.png";
import { userAxiosInstence } from "../../utils/axios-utils";
import { toast } from "react-toastify";
const TransloomSetup = () => {
  const [apiKey, setApiKey] = useState("");
  const [JWT, setJWT] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("userJWT");
    console.log("MyJWTTOKENs", token);
    if (token) {
      setJWT(token);
      generateApiKey();
    }
  }, []);

  console.log("Variable Tokens", JWT);

  const generateApiKey = async () => {
    try {
      const userToken = localStorage.getItem("userJWT");
      const response = await userAxiosInstence.post(
        `/api/auth/generate-api-key`,
        {}, // empty object as second parameter for request body if not needed
        {
          headers: {
            Authorization: `Bearer ${userToken}`, // Add the JWT token to the Authorization header with Bearer
          },
        }
      );
      console.log(response.data);
      setApiKey(response.data.apiKey);
    } catch (error) {
      console.error("Error generating API key:", error);
    }
  };

  const copyApiKey = () => {
    toast.success("Copied", {
      autoClose: 800,
      position: "top-center",
    });
    navigator.clipboard.writeText(apiKey);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans bg-white rounded-lg">
      <h1 className="text-2xl font-bold text-indigo-900 mb-4">
        Add Transloom snippet
      </h1>
      <p className="mb-2">
        Setup Transloom for your Shopify website in 3 simple steps!
      </p>
      <p className="mb-6">
        Check out the{" "}
        <a href="#" className="text-blue-600 hover:underline">
          setup guide
        </a>{" "}
        or the{" "}
        <a href="#" className="text-blue-600 hover:underline">
          video
        </a>{" "}
        if you need help on the setup.
      </p>

      <div className="mb-6">
        <h2 className="font-semibold mb-2">Your API key:</h2>
        <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-between">
          <span className="font-mono text-gray-700">{apiKey}</span>
          <button
            onClick={copyApiKey}
            className="bg-[#086373] text-white px-3 py-1 rounded border border-gray-300 hover:bg-gray-50 hover:text-black"
          >
            Copy
          </button>
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-indigo-600 mb-2">1</h2>
        <p className="mb-4">
          Make sure Transloom Translate plugin is installed in your WordPress
          admin. You should see it in your left menu bar.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg">
          <img
            src={mainImage}
            alt="WordPress admin menu showing Transloom plugin"
            className="max-w-full h-auto"
          />
        </div>
      </div>

      {/* Rest of the component remains the same */}
    </div>
  );
};

export default TransloomSetup;
