import { Link } from "react-router-dom";

export default function FootballHome() {

  return (

    <div className="container">

      <h1>⚽ Football</h1>

      <p>
        Football center
      </p>


      <div className="cards">


        <Link to="/livescores" className="card">

          <h2>🔴 Live Scores</h2>

          <p>
            Live matches and results
          </p>

        </Link>



        <Link to="/fixtures" className="card">

          <h2>📅 Fixtures</h2>

          <p>
            Upcoming football matches
          </p>

        </Link>



        <Link to="/standings" className="card">

          <h2>🏆 Standings</h2>

          <p>
            League tables
          </p>

        </Link>



        <Link to="/teams" className="card">

          <h2>⚽ Teams</h2>

          <p>
            Football clubs
          </p>

        </Link>



        <Link to="/players" className="card">

          <h2>👤 Players</h2>

          <p>
            Player profiles
          </p>

        </Link>


      </div>


    </div>

  );

}