import axios from "axios";
import { BASEURL } from "../constants/constants";
const createAxiosClient = (baseURL) => {
  const client = axios.create({
    baseURL,
    timeout: 10000,
    timeoutErrorMessage: "Request timeout Please Try Again!!!",
  });
  return client;
};

const userAxiosInstence = createAxiosClient(BASEURL);

export { userAxiosInstence };
