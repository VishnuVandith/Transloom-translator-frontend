import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import ThankYouModal from "./ThankYouModal";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export default function RequstAccess({
  reqAccessOpen,
  setReqAccessOpen,
  setLoginOpen,
}) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleOpen = () => setReqAccessOpen((cur) => !cur);

  useEffect(() => {
    if (!reqAccessOpen) {
      setEmail("");
      setName("");
      setError("");
    }
  }, [reqAccessOpen]);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async () => {
    try {
      if (email.trim() === "" || name.trim() === "") {
        setError("Both fields are required.");
        return;
      }
      if (!validateEmail(email)) {
        setError("Please enter a valid email.");
        return;
      }
      const response = await axios.post(
        `http://3.82.219.176:4000/api/auth/request-access`,
        {
          email: email.trim(),
          name: name.trim(),
        }
      );

      if (response.status === 200) {
        setIsSuccess(true);
        toast("Requested successfully");
        setError("");
      } else {
        setError("Failed to send request. Please try again.");
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        toast("You already have access");
        setError("You already have access.");
      } else {
        console.error("Error:", err);
        setError(
          err.response?.data?.error ||
            err.message ||
            "Failed to request access."
        );
      }
    }
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        style={{ fontFamily: "Poppins" }}
        className="mr-7 hover:bg-white hover:text-black hover:border hover:rounded-sm hover:border-black transition-colors duration-300 rounded-sm bg-[#086373]"
      >
        Request Access
      </Button>
      <Dialog
        size="md"
        open={reqAccessOpen}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[28rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Request access to Transloom
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              To start using Transloom, please request access. If you already
              have access,{" "}
              <button
                onClick={() => {
                  setReqAccessOpen(false);
                  setLoginOpen(true);
                }}
                className="cursor-pointer underline text-blue-800"
              >
                login here
              </button>
              .
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Name
            </Typography>
            <Input
              label="Name"
              size="lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setError("")}
            />
            <Typography className="-mb-2" variant="h6">
              Email
            </Typography>
            <Input
              label="Email"
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setError("")}
            />

            {error && (
              <Typography color="red" variant="small" className="mb-2">
                {error}
              </Typography>
            )}
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              className="bg-[#086373]"
              variant="gradient"
              onClick={handleSubmit}
              fullWidth
            >
              Request Access
            </Button>
            <Typography variant="small" className="mt-4 flex justify-center">
              Already have access?
              <Typography
                onClick={() => {
                  setReqAccessOpen(false);
                  setLoginOpen(true);
                }}
                as="a"
                href="#signup"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
              >
                Login here
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </Dialog>
      <ThankYouModal isSuccess={isSuccess} setIsSuccess={setIsSuccess} />
    </>
  );
}
