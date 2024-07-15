const AddTransloom = ({ onNext, onPrevious }) => {
  const snippetCode = `<script type="text/javascript" src="https://cdn.transloom.com/transloom.min.js"></script>
<script>
  Transloom.initialize({
    api_key: 'tlm_ead9bbc71486025519a4c2e470d0f1554'
  });
</script>`;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Add Transloom snippet</h1>

      <p className="mb-4">
        Copy the following code into your Shopify theme. There is{" "}
        <strong>two</strong> different ways to do it:
      </p>

      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>
          By using the Shopify app: Download the{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Transloom app
          </a>
          . Then log in to your Transloom account through the app and connect it
          to the project Medworld Trade. You can view the full guide{" "}
          <a href="#" className="text-blue-600 hover:underline">
            here
          </a>
        </li>
        <li>
          By direct copy paste: Go in Shopify Admin &gt; Online Store &gt;
          Themes &gt; ... &gt; Edit Code and paste this code in{" "}
          <code className="bg-gray-200 px-1 py-0.5 rounded">theme.liquid</code>{" "}
          file, just before the{" "}
          <code className="bg-gray-200 px-1 py-0.5 rounded">&lt;/head&gt;</code>{" "}
          tag
        </li>
      </ul>

      <div className="bg-gray-100 p-4 rounded-md mb-6">
        <pre className="whitespace-pre-wrap text-sm">
          <code>{snippetCode}</code>
        </pre>
      </div>

      <p className="mb-4">
        Reload your webpage and you will see the language button bottom right.
      </p>

      <p className="mb-6">
        Try to switch the language and verify that you see automatic
        translations on your website!
      </p>

      <p className="mb-4">
        Once you see the translations on your website you can start editing
        manually what you want!
      </p>

      <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 mb-6 flex items-center">
        <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Waiting for translations from your website... Please try changing the
        language on your website to make the translations appear.
      </div>

      <div className="flex justify-between">
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

export default AddTransloom;
