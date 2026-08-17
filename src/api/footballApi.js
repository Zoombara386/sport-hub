import axios from "axios";

const footballApi = axios.create({
  baseURL: import.meta.env.VITE_SPORTSDB_URL
});

export default footballApi;