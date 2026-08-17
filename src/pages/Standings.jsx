import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import liveApi from "../api/liveApi";


export default function Standings(){


  const { leagueId } = useParams();


  const [table,setTable] = useState([]);

  const [loading,setLoading] = useState(true);



  useEffect(()=>{


    async function getStandings(){


      const league = leagueId || 39;


      try{


        const res = await liveApi.get(

          `/standings?league=${league}&season=2025`

        );



        const data =

          res.data.response?.[0]
          ?.league?.standings?.[0] || [];



        setTable(data);



      }catch(error){


        console.log(

          "STANDINGS ERROR:",
          error.response?.data || error.message

        );


      }



      setLoading(false);


    }



    getStandings();


  },[leagueId]);






  if(loading){


    return (

      <div className="container">

        <h1>
          Loading Standings...
        </h1>

      </div>

    );

  }







  return (

    <div className="container">


      <h1>
        🏆 League Standings
      </h1>




      <table>


        <thead>

          <tr>

            <th>
              POS
            </th>

            <th>
              TEAM
            </th>

            <th>
              P
            </th>

            <th>
              W
            </th>

            <th>
              D
            </th>

            <th>
              L
            </th>

          </tr>

        </thead>



        <tbody>


        {

        table.map(team=>(


          <tr key={team.team.id}>


            <td>
              {team.rank}
            </td>


            <td>


              <img

                src={team.team.logo}

                width="30"

                alt={team.team.name}

              />


              {" "}

              {team.team.name}


            </td>



            <td>
              {team.all.played}
            </td>



            <td>
              {team.all.win}
            </td>



            <td>
              {team.all.draw}
            </td>



            <td>
              {team.all.lose}
            </td>



          </tr>


        ))

        }



        </tbody>


      </table>



    </div>

  );


}