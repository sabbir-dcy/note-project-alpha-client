import axios from "axios";

export const axiosPrivate = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "https://desolate-dusk-25224.herokuapp.com",
});

axiosPrivate.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    if (!config.headers.authorization) {
      config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosPrivate.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // if (error.response.status === 403 || error.response.status === 401) {
    //   signOut(auth)
    // }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
