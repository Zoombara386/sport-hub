import axios from "axios";


const newsApi = axios.create({

baseURL:"https://newsapi.org/v2"

});


export default newsApi;