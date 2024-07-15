import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";

// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";

// Your render function
<Viewer fileUrl="/path/to/document.pdf" />;

const PDFViewer = (props) => {
  console.log(props);
  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <div
        style={{
          border: "1px solid rgba(0, 0, 0, 0.3)",
          height: "750px",
          margin: "20px",
        }}
      >
        <Viewer fileUrl={props.fileUrl} initialPage={0} />
      </div>
    </Worker>
  );
};

export default PDFViewer;
