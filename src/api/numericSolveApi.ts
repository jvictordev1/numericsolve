import axios from "axios";

const numericSolveApi = axios.create({
  baseURL: "https://api-calculonumerico.onrender.com/",
});
export default numericSolveApi;
