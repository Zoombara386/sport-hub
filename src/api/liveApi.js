import axios from "axios";


const liveApi = axios.create({

baseURL:
"https://v3.football.api-sports.io",

headers:{

"x-apisports-key":
"a68b14b7c3620d6e2bd316f3beec971a"

}

});


export default liveApi;