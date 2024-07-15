// import { Footer } from "../components/Footer";
import { useEffect, useState } from "react";
import MyNavBar from "../components/MyNavBar";
import TabComponent from "../Tabs";
// import PDFViewer from "../components/PDFViewer";

export default function Home() {
  const [reqAccessOpen, setReqAccessOpen] = useState(false);
  const [JWT, setJWT] = useState("");
  // const [pdfUrl, setPdfUrl] = useState(null);

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
      {/* <Translator setReqAccessOpen={setReqAccessOpen} JWT={JWT} /> */}
      <TabComponent setReqAccessOpen={setReqAccessOpen} JWT={JWT} />
      {/* {pdfUrl && <PDFViewer fileUrl={pdfUrl} />} */}
      {/* <Footer /> */}
    </>
  );
}
