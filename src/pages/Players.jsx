import { useState } from "react";
import { Link } from "react-router-dom";
import liveApi from "../api/liveApi";


export default function Players() {

  const [search, setSearch] = useState("");

  const [players, setPlayers] = useState([]);

  const [loading, setLoading] = useState(false);


  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );



  const defaultPhoto =
    "https://cdn-icons-png.flaticon.com/512/149/149071.png";



  async function searchPlayers() {


    if (!search) return;


    setLoading(true);


    try {


      const res = await liveApi.get(
        `/players/profiles?search=${search}`
      );


      setPlayers(
        res.data.response || []
      );


    } catch(error) {


      console.log(
        "PLAYER SEARCH ERROR:",
        error.response?.data || error.message
      );


    }


    setLoading(false);


  }





  function addFavorite(player) {


    const exists = favorites.find(
      item => item.id === player.player.id
    );


    if (!exists) {


      const updated = [

        ...favorites,

        {
          id: player.player.id,
          name: player.player.name,
          image: player.player.photo,
          type: "Player"
        }

      ];


      setFavorites(updated);


      localStorage.setItem(
        "favorites",
        JSON.stringify(updated)
      );


    }


  }







  return (

    <div className="container">


      <h1>
        👤 Football Players
      </h1>



      <input

        value={search}

        onChange={(e)=>
          setSearch(e.target.value)
        }

        placeholder="Search player..."

      />



      <button onClick={searchPlayers}>

        🔎 Search

      </button>





      {

      loading &&

      <h2>
        Loading players...
      </h2>

      }






      <div className="cards">


      {

      players.map(player => (


        <div

          className="card"

          key={player.player.id}

        >



          <img

            src={
              player.player.photo ||
              defaultPhoto
            }

            width="100"

            alt={player.player.name}

          />



          <h2>

            {player.player.name}

          </h2>



          <p>

            🌍 {player.player.nationality}

          </p>





          <button

            onClick={() =>
              addFavorite(player)
            }

          >

            ⭐ Add Favorite

          </button>





          <Link

            to={`/player/${player.player.id}`}

            state={{player: player}}

          >

            <button>

              📋 View Profile

            </button>


          </Link>




        </div>


      ))

      }



      </div>



    </div>

  );

}