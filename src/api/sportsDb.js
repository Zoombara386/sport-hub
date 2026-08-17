import axios from "axios";


const sportsDb = axios.create({

    baseURL:
    "https://www.thesportsdb.com/api/v1/json/3"

});


export default sportsDb;