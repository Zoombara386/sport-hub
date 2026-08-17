import { useEffect } from "react";
import liveApi from "../api/liveApi";


export default function TestApi(){


useEffect(()=>{


liveApi
.get("/fixtures?league=39&season=2025&next=10")

.then(res=>{

console.log(res.data);

})

.catch(err=>{

console.log(err);

});


},[]);



return (

<h1>
API TEST
</h1>

);

}