import { useState } from "react";


export default function Favorites() {


  const [favorites, setFavorites] = useState(

    JSON.parse(localStorage.getItem("favorites")) || []

  );



  function removeFavorite(id){


    const updated = favorites.filter(

      item => item.id !== id

    );


    setFavorites(updated);


    localStorage.setItem(

      "favorites",

      JSON.stringify(updated)

    );


  }





  return (

    <div className="container">


      <h1>
        ⭐ My Favorites
      </h1>



      {

      favorites.length === 0 &&

      <div className="card">

        <h2>
          No favorites yet
        </h2>

        <p>
          Add teams and players to see them here.
        </p>

      </div>

      }






      <div className="cards">


      {

      favorites.map(item => (


        <div

          className="card"

          key={item.id}

        >



          <img

            src={item.image}

            width="80"

            alt={item.name}

          />




          <h2>

            {item.name}

          </h2>




          <p>

            ⭐ {item.type}

          </p>





          <button

            onClick={() =>
              removeFavorite(item.id)
            }

          >

            ❌ Remove

          </button>




        </div>


      ))

      }



      </div>



    </div>

  );

}