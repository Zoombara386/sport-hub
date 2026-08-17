import { Link } from "react-router-dom";


export default function Football() {


  const leagues = [

    {
      id:39,
      name:"Premier League",
      country:"England",
      icon:"🏴"
    },

    {
      id:140,
      name:"LaLiga",
      country:"Spain",
      icon:"🇪🇸"
    },

    {
      id:78,
      name:"Bundesliga",
      country:"Germany",
      icon:"🇩🇪"
    },

    {
      id:135,
      name:"Serie A",
      country:"Italy",
      icon:"🇮🇹"
    },

    {
      id:61,
      name:"Ligue 1",
      country:"France",
      icon:"🇫🇷"
    }

  ];





  const teams = [

    {
      id:42,
      name:"Arsenal",
      logo:"https://media.api-sports.io/football/teams/42.png"
    },

    {
      id:50,
      name:"Manchester City",
      logo:"https://media.api-sports.io/football/teams/50.png"
    },

    {
      id:541,
      name:"Real Madrid",
      logo:"https://media.api-sports.io/football/teams/541.png"
    },

    {
      id:529,
      name:"Barcelona",
      logo:"https://media.api-sports.io/football/teams/529.png"
    },

    {
      id:33,
      name:"Manchester United",
      logo:"https://media.api-sports.io/football/teams/33.png"
    },

    {
      id:40,
      name:"Liverpool",
      logo:"https://media.api-sports.io/football/teams/40.png"
    }

  ];





  return (

    <div className="container">


      <h1>
        ⚽ Football Dashboard
      </h1>


      <p>
        Football matches, teams, players and news
      </p>






      {/* Quick Actions */}

      <div className="cards">


        <div className="card">

          <h2>
            🔴 Live Scores
          </h2>

          <p>
            Watch live matches and goals
          </p>


          <Link to="/livescores">

            <button>
              View Live
            </button>

          </Link>

        </div>





        <div className="card">

          <h2>
            📅 Fixtures
          </h2>

          <p>
            Upcoming matches
          </p>


          <Link to="/fixtures">

            <button>
              Fixtures
            </button>

          </Link>

        </div>





        <div className="card">

          <h2>
            🏆 Standings
          </h2>


          <p>
            League tables
          </p>


          <Link to="/standings">

            <button>
              View Table
            </button>

          </Link>


        </div>


      </div>








      {/* Leagues */}


      <h2>
        🏆 Popular Leagues
      </h2>



      <div className="cards">


      {

      leagues.map(league=>(


        <div

          className="card"

          key={league.id}

        >


          <h3>

            {league.icon}

            {" "}

            {league.name}

          </h3>


          <p>

            🌍 {league.country}

          </p>




          <Link

            to={`/standings/${league.id}`}

          >

            <button>

              View Table

            </button>


          </Link>


        </div>


      ))

      }


      </div>









      {/* Teams */}


      <h2>
        ⭐ Popular Teams
      </h2>



      <div className="cards">


      {

      teams.map(team=>(


        <div

          className="card"

          key={team.id}

        >


          <img

            src={team.logo}

            width="90"

            alt={team.name}

          />



          <h3>

            {team.name}

          </h3>



          <Link

            to={`/team/${team.id}`}

          >

            <button>

              📋 Team Details

            </button>


          </Link>


        </div>


      ))

      }


      </div>









      {/* Search Sections */}


      <div className="cards">



        <div className="card">


          <h2>
            ⚽ Teams
          </h2>


          <p>
            Search all football clubs
          </p>


          <Link to="/teams">

            <button>

              🔎 Search Teams

            </button>

          </Link>


        </div>






        <div className="card">


          <h2>
            👤 Players
          </h2>


          <p>
            Search football players
          </p>


          <Link to="/players">

            <button>

              🔎 Search Players

            </button>

          </Link>


        </div>






        <div className="card">


          <h2>
            📰 News
          </h2>


          <p>
            Latest football news
          </p>


          <Link to="/news">

            <button>

              Read News

            </button>


          </Link>


        </div>



      </div>




    </div>

  );

}