import axios from "axios";

const numericSolveApi = axios.create({
  baseURL: "https://api-calculonumerico.onrender.com/",
  withCredentials: true,
});
export default numericSolveApi;
