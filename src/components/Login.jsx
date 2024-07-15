import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
export default function Login({
  OpenLogin,
  setLoginOpen,
  setReqAccessOpen,
  setJWT,
}) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!OpenLogin) {
      setEmail("");
      setPassword("");
      setError("");
    }
  }, [OpenLogin]);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleOpen = () => setLoginOpen((cur) => !cur);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async () => {
    try {
      if (email.trim() === "" || password.trim() == "") {
        setError("All field required.");
        return;
      }
      if (!validateEmail(email)) {
        setError("Please enter a valid email.");
        return;
      }
      const response = await axios.post(
        `http://18.209.45.194:4000/api/auth/user-login`,
        {
          email: email,
          password: password,
        }
      );
      if (response.status === 200) {
        toast.success("Login Successfully", {
          autoClose: 800,
        });
        const token = response.data.token; // Assuming the token is returned in the response data
        localStorage.setItem("userJWT", token);
        setJWT(token);
        setError("");
        setLoginOpen(false); // Close the login dialog
        navigate("/"); // Navigate to the home page
      } else {
        setError("Failed to send request. Please try again.");
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        toast.error("Unauthorized access", {
          autoClose: 1000,
        });
        setError("You don't have access.");
      } else {
        toast.error("Internal Server Error", {
          autoClose: 1000,
        });
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
      <div
        onClick={handleOpen}
        href="#"
        style={{ fontFamily: "Poppins" }}
        className="text-sm font-semibold leading-6 text-gray-900 mt-2"
      >
        Log in <span aria-hidden="true">&rarr;</span>
      </div>
      <Dialog
        size="md"
        open={OpenLogin}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[28rem]">
          <form onSubmit={handleSubmit}>
            <CardBody className="flex flex-col gap-2">
              <Typography
                variant="h4"
                color="blue-gray"
                className="text-center"
              >
                Login To Transloom
              </Typography>
              <Typography
                className="mb-3 font-normal"
                variant="paragraph"
                color="gray"
              >
                To start using Transloom, please Login with your email. If you
                dont have access{" "}
                <button
                  type="button"
                  onClick={() => {
                    setLoginOpen(false);
                    setReqAccessOpen(true);
                  }}
                  className="cursor-pointer underline text-blue-800"
                >
                  Request access
                </button>
                .
              </Typography>
              <Typography className="" variant="h6">
                Email
              </Typography>
              <Input
                label="Email"
                size="lg"
                value={email}
                className=""
                onChange={(e) => setEmail(e.target.value)}
              />
              <Typography className="-mb-2" variant="h6">
                Password
              </Typography>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  size="lg"
                  value={password}
                  onChange={handlePasswordChange}
                  className="pr-10" // Add padding to the right to accommodate the icon
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={handleTogglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {error && (
                <Typography color="red" variant="small" className="m-0">
                  {error}
                </Typography>
              )}
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                className="bg-[#086373]"
                variant="gradient"
                fullWidth
                onClick={handleSubmit}
              >
                Login
              </Button>
            </CardFooter>
          </form>
        </Card>
      </Dialog>
    </>
  );
}
