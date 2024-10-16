import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://fiveer-backend.vercel.app/api/",
  withCredentials: true,
});

export default newRequest;
