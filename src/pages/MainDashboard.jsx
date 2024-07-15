import { useEffect, useState } from "react";
import MyNavBar from "../components/MyNavBar";
import MainSideBar from "../components/Projects/MainSideBar";

export function MainDashboard() {
  const [reqAccessOpen, setReqAccessOpen] = useState(false);
  const [JWT, setJWT] = useState("");

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
      <MainSideBar />
    </>
  );
}

export default MainDashboard;
