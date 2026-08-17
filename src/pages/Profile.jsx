import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Profile(){

const navigate = useNavigate();

const [user,setUser] = useState("");



useEffect(()=>{


const username = localStorage.getItem("user");


if(!username){

navigate("/login");

}

else{

setUser(username);

}


},[navigate]);





function logout(){


localStorage.removeItem("user");


window.dispatchEvent(
new Event("userChanged")
);


alert("Logout Successful");


navigate("/login");


}





return (

<div className="container">


<h1>👤 User Profile</h1>


<div className="card">


<h2>
Welcome {user}
</h2>



<p>
📧 Email:

{

JSON.parse(localStorage.getItem("account"))?.email

|| "Not available"

}

</p>



<p>
⭐ Favorite Player:

{

localStorage.getItem("favoritePlayer")

|| "None"

}

</p>



<p>
⚽ Favorite Team:

{

localStorage.getItem("favoriteTeam")

|| "None"

}

</p>



<br/>


<button onClick={logout}>

Logout

</button>


</div>


</div>

);

}