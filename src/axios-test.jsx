import axios from "axios";

const firstAxiosInstance = axios.create({
  baseURL: "https://100014.pythonanywhere.com/api/userinfo/",
});

const secondAxiosInstance = axios.create({
  baseURL: "https://100093.pythonanywhere.com/api/userinfo/",
});

export { firstAxiosInstance, secondAxiosInstance };


