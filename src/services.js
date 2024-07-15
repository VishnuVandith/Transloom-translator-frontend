import axios from "axios";


const requestAccess = (value) => {
    return axios.post("http://localhost:5000/api/auth/request-access", value, {
      withCredentials: true,
    });
  };
const login = (value) => {
    return axios.post("http://localhost:5000/api/auth/user-login", value, {
      withCredentials: true,
    });
  };

  export{
    requestAccess,
    login
  }