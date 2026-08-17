import { Link } from "react-router-dom";

export default function Home() {

  return (

    <div className="container">


      <h1>
        ⚽ SPORTS HUB
      </h1>


      <h3>
        Your Ultimate Sports Platform
      </h3>


      <p>
        Football, Basketball, Cricket, Tennis and more
      </p>



      <div className="cards">


        <Link
          to="/livescores"
          className="card"
        >

          <h2>
            🔥 Live Scores
          </h2>

          <p>
            Watch live matches and results
          </p>

        </Link>





        <Link
          to="/football"
          className="card"
        >

          <h2>
            ⚽ Football
          </h2>

          <p>
            Latest football matches, teams and news
          </p>

          <button>
            Explore
          </button>

        </Link>





        <Link
          to="/basketball"
          className="card"
        >

          <h2>
            🏀 Basketball
          </h2>

          <p>
            NBA updates, scores and teams
          </p>

          <button>
            Explore
          </button>

        </Link>





        <Link
          to="/cricket"
          className="card"
        >

          <h2>
            🏏 Cricket
          </h2>

          <p>
            Cricket matches and rankings
          </p>

          <button>
            Explore
          </button>

        </Link>





        <Link
          to="/tennis"
          className="card"
        >

          <h2>
            🎾 Tennis
          </h2>

          <p>
            Tournaments and player updates
          </p>

          <button>
            Explore
          </button>

        </Link>



      </div>





      <h2>
        ⭐ Quick Access
      </h2>



      <div className="cards">


        <Link
          to="/teams"
          className="card"
        >

          <h3>
            🏆 Teams
          </h3>

          <p>
            Explore clubs and team information
          </p>

        </Link>




        <Link
          to="/players"
          className="card"
        >

          <h3>
            ⭐ Players
          </h3>

          <p>
            View football stars and profiles
          </p>

        </Link>




        <Link
          to="/news"
          className="card"
        >

          <h3>
            📰 News
          </h3>

          <p>
            Latest sports updates
          </p>

        </Link>


      </div>


    </div>

  );

}