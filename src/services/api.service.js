import axios from "axios";

const createUserApi = (fullName, email, password, phone) => {
  const URL_BACKEND = "http://localhost:8080/api/v1/user";
  const data = {
    fullName: fullName,
    email: email,
    password: password,
    phone: phone,
  };
  return axios.post(URL_BACKEND, data);
};

export { createUserApi };
