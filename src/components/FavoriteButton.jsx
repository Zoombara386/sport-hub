import { useState } from "react";


export default function FavoriteButton({team}){


const [favorite,setFavorite] = useState(()=>{

const saved =
localStorage.getItem("favorites");

const list =
saved ? JSON.parse(saved) : [];


return list.some(
(item)=>item.name === team.name
);

});



const toggleFavorite = ()=>{


const saved =
localStorage.getItem("favorites");


let favorites =
saved ? JSON.parse(saved) : [];



if(favorite){


favorites =
favorites.filter(
(item)=>item.name !== team.name
);


setFavorite(false);


}

else{


favorites.push(team);

setFavorite(true);


}



localStorage.setItem(

"favorites",

JSON.stringify(favorites)

);


};



return (

<button onClick={toggleFavorite}>


{

favorite
?

"⭐ Remove Favourite"

:

"☆ Add Favourite"

}


</button>

);

}