import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import liveApi from "../api/liveApi";


export default function PlayerDetails() {


  const { id } = useParams();


  const location = useLocation();


  const [player, setPlayer] = useState(

    location.state?.player || null

  );


  const [loading, setLoading] = useState(false);






  useEffect(() => {


    async function getPlayer() {


      if (player) return;


      setLoading(true);



      try {


        const res = await liveApi.get(

          `/players?id=${id}&season=2025`

        );


        const data =

          res.data.response?.[0];



        if (data) {


          setPlayer(data);


        }



      } catch(error) {


        console.log(

          "PLAYER DETAILS ERROR:",

          error.response?.data || error.message

        );


      }



      setLoading(false);


    }



    getPlayer();



  }, [id, player]);








  if (loading) {


    return (

      <div className="container">

        <h1>
          Loading Player...
        </h1>

      </div>

    );

  }







  if (!player) {


    return (

      <div className="container">

        <h1>
          ❌ Player not found
        </h1>

      </div>

    );

  }






  const info = player.player || player;



  const stats =

    player.statistics?.[0];







  return (

    <div className="container">


      <h1>
        👤 Player Profile
      </h1>





      <div className="card">


        <img

          src={info.photo}

          width="120"

          alt={info.name}

        />



        <h2>

          {info.name}

        </h2>



        <p>

          🌍 {info.nationality}

        </p>



        <p>

          🎂 Age: {info.age}

        </p>


      </div>






      <div className="card">


        <h2>
          📊 Statistics
        </h2>



        <p>

          ⚽ Goals:

          {" "}

          {stats?.goals?.total || 0}

        </p>




        <p>

          🎯 Assists:

          {" "}

          {stats?.goals?.assists || 0}

        </p>




        <p>

          🏟 Appearances:

          {" "}

          {stats?.games?.appearences || 0}

        </p>



      </div>



    </div>

  );

}