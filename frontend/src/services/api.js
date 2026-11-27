
import axios from "axios";

const API = axios.create({
  baseURL: "https://college-event-backend-d6y0.onrender.com/api",
});

export default API;