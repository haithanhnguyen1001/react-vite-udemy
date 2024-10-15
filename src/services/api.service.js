import axios from "./axios.customize";

const createUserApi = (fullName, email, password, phone) => {
  const URL_BACKEND = "/api/v1/user";
  const data = {
    fullName: fullName,
    email: email,
    password: password,
    phone: phone,
  };
  return axios.post(URL_BACKEND, data);
};

const fetchAllUserAPI = (current, pageSize) => {
  const URL_BACKEND = `/api/v1/user?current=${current}&pageSize=${pageSize}`;
  return axios.get(URL_BACKEND);
};

const updateUserApi = (_id, fullName, phone) => {
  const URL_BACKEND = "/api/v1/user";
  const data = {
    _id,
    fullName,
    phone,
  };
  return axios.put(URL_BACKEND, data);
};

const deleteUserApi = (id) => {
  const URL_BACKEND = `/api/v1/user/${id}`;
  return axios.delete(URL_BACKEND);
};

const handleUploadFile = (file, folder) => {
  const URL_BACKEND = `/api/v1/file/upload`;
  let config = {
    headers: {
      "upload-type": folder,
      "Content-Type": "multipart/form-data",
    },
  };
  const bodyFormData = new FormData();
  bodyFormData.append("fileImg", file);
  return axios.post(URL_BACKEND, bodyFormData, config);
};

const updateUserWithAvatarApi = (avatar, _id, fullName, phone) => {
  const URL_BACKEND = "/api/v1/user";
  const data = {
    avatar,
    _id,
    fullName,
    phone,
  };
  return axios.put(URL_BACKEND, data);
};

const registerUserApi = (fullName, email, password, phone) => {
  const URL_BACKEND = "/api/v1/user/register";
  const data = {
    fullName: fullName,
    email: email,
    password: password,
    phone: phone,
  };
  return axios.post(URL_BACKEND, data);
};

const loginApi = (email, password) => {
  const URL_BACKEND = "/api/v1/auth/login";
  const data = {
    username: email,
    password,
    delay: 3000,
  };
  return axios.post(URL_BACKEND, data);
};

const getAccountAPI = () => {
  const URL_BACKEND = "/api/v1/auth/account";
  return axios.get(URL_BACKEND);
};
const logoutAPI = () => {
  const URL_BACKEND = "/api/v1/auth/logout";
  return axios.post(URL_BACKEND);
};
const fetchBookWithPaginate = (current, pageSize) => {
  const URL_BACKEND = `/api/v1/book?current=${current}&pageSize=${pageSize}`;
  return axios.get(URL_BACKEND);
};

const createBookApi = (
  thumbnail,
  mainText,
  author,
  price,
  quantity,
  category
) => {
  const URL_BACKEND = `/api/v1/book`;
  const data = {
    thumbnail,
    mainText,
    author,
    price,
    quantity,
    category,
  };
  return axios.post(URL_BACKEND, data);
};
const updateBookApi = (
  _id,
  thumbnail,
  mainText,
  author,
  price,
  quantity,
  category
) => {
  const URL_BACKEND = "/api/v1/book";
  const data = {
    _id,
    thumbnail,
    mainText,
    author,
    price,
    quantity,
    category,
  };
  return axios.put(URL_BACKEND, data);
};
const deleteBookApi = (id) => {
  const URL_BACKEND = `/api/v1/book/${id}`;
  return axios.delete(URL_BACKEND);
};
export {
  createUserApi,
  fetchAllUserAPI,
  updateUserApi,
  deleteUserApi,
  handleUploadFile,
  updateUserWithAvatarApi,
  registerUserApi,
  loginApi,
  getAccountAPI,
  logoutAPI,
  fetchBookWithPaginate,
  createBookApi,
  updateBookApi,
  deleteBookApi,
};
