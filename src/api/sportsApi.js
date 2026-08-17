import axios from "axios";

const sportsApi = axios.create({

  baseURL:
  "https://www.thesportsdb.com/api/v1/json/123"

});

export default sportsApi;