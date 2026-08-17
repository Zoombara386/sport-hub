import { useState } from "react";
import { Link } from "react-router-dom";
import liveApi from "../api/liveApi";


export default function Teams() {


  const [search, setSearch] = useState("");

  const [teams, setTeams] = useState([]);

  const [loading, setLoading] = useState(false);


  const [favorites, setFavorites] = useState(

    JSON.parse(localStorage.getItem("favorites")) || []

  );



  const defaultLogo =
    "https://cdn-icons-png.flaticon.com/512/1161/1161388.png";





  async function searchTeams(){


    if(!search) return;


    setLoading(true);



    try {


      const res = await liveApi.get(

        `/teams?search=${search}`

      );


      setTeams(

        res.data.response || []

      );



    } catch(error){


      console.log(

        "TEAM SEARCH ERROR:",

        error.response?.data || error.message

      );


    }


    setLoading(false);


  }





  function addFavorite(team){


    const exists = favorites.find(

      item => item.id === team.team.id

    );



    if(!exists){


      const updated = [

        ...favorites,


        {

          id: team.team.id,

          name: team.team.name,

          image: team.team.logo,

          type: "Team"

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
        ⚽ Search Football Teams
      </h1>




      <div>


        <input

          value={search}

          onChange={(e)=>
            setSearch(e.target.value)
          }

          placeholder="Search team..."

        />



        <button

          onClick={searchTeams}

        >

          🔎 Search

        </button>



      </div>






      {

      loading &&

      <h2>
        Loading teams...
      </h2>

      }







      <div className="cards">



      {


      teams.map(team => (


        <div

          className="card"

          key={team.team.id}

        >



          <img

            src={

              team.team.logo ||

              defaultLogo

            }

            width="90"

            alt={team.team.name}

          />




          <h2>

            {team.team.name}

          </h2>





          <p>

            🌍 {team.team.country}

          </p>






          <button

            onClick={() =>
              addFavorite(team)
            }

          >

            ⭐ Add Favorite

          </button>






          <Link

            to={`/team/${team.team.id}`}

          >

            <button>

              📋 View Details

            </button>


          </Link>





        </div>


      ))

      }



      </div>



    </div>

  );

}