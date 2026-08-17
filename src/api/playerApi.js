import axios from "axios";


const playerApi = axios.create({

baseURL:
"https://api-football-v1.p.rapidapi.com/v3",


headers:{

"x-rapidapi-key":
import.meta.env.VITE_RAPID_API_KEY,


"x-rapidapi-host":
"api-football-v1.p.rapidapi.com"

}

});


export default playerApi;