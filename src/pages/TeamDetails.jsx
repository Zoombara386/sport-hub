import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import liveApi from "../api/liveApi";


export default function TeamDetails(){


  const { id } = useParams();


  const [team, setTeam] = useState(null);
  const [players, setPlayers] = useState([]);
  const [matches, setMatches] = useState([]);




  useEffect(()=>{


    async function getTeamData(){


      try{


        // Team information

        const teamRes = await liveApi.get(
          `/teams?id=${id}`
        );


        setTeam(
          teamRes.data.response?.[0]?.team
        );




        // Squad players

        const squadRes = await liveApi.get(

          `/players/squads?team=${id}`

        );


        setPlayers(

          squadRes.data.response?.[0]?.players || []

        );





        // Recent matches

        const fixtureRes = await liveApi.get(

          `/fixtures?team=${id}&last=5`

        );


        setMatches(

          fixtureRes.data.response || []

        );




      }catch(error){


        console.log(

          "TEAM DETAILS ERROR:",
          error.response?.data || error.message

        );


      }



    }



    getTeamData();



  },[id]);






  if(!team){


    return (

      <div className="container">

        <h1>
          Loading team...
        </h1>

      </div>

    );

  }






  return (


    <div className="container">





      <div className="card">


        <img

          src={team.logo}

          width="120"

          alt={team.name}

        />



        <h1>

          ⚽ {team.name}

        </h1>



        <p>

          🌍 {team.country}

        </p>



        <p>

          🏟️ {team.venue?.name || "Stadium"}

        </p>


      </div>








      <div className="card">


        <h2>
          👥 Squad
        </h2>



        <div className="cards">


        {

        players.map(player=>(


          <div

            className="card"

            key={player.id}

          >


            <img

              src={player.photo}

              width="70"

              alt={player.name}

            />



            <h3>

              {player.name}

            </h3>


            <p>

              {player.position}

            </p>


          </div>


        ))

        }


        </div>


      </div>









      <div className="card">


        <h2>
          📅 Recent Matches
        </h2>



        {

        matches.map(match=>(


          <p

            key={match.fixture.id}

          >

            ⚽ {match.teams.home.name}

            {" "}

            {match.goals.home}

            -

            {match.goals.away}

            {" "}

            {match.teams.away.name}


          </p>


        ))

        }



      </div>




    </div>


  );


}