function DocumentSummerize({ setReqAccessOpen, JWT }) {
  const handleIframeClick = (e) => {
    if (!JWT) {
      e.preventDefault();
      setReqAccessOpen(true);
    }
  };

  return (
    <div className="relative w-full border rounded-lg h-screen pb-56">
      {JWT ? (
        <iframe
          src="http://18.212.127.111:8501/"
          className="absolute top-0 left-0 w-full h-screen border-0"
        />
      ) : (
        <div
          className="absolute top-0 left-0 w-full h-screen"
          onClick={handleIframeClick}
        >
          <iframe
            src="http://18.212.127.111:8501/"
            className="w-full h-full border-0 pointer-events-none"
          />
        </div>
      )}
    </div>
  );
}

export default DocumentSummerize;
