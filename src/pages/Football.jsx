import { Link } from "react-router-dom";

export default function Football() {
  const leagues = [
    {
      id: 39,
      name: "Premier League",
      country: "England",
      icon: "🏴",
    },
    {
      id: 140,
      name: "LaLiga",
      country: "Spain",
      icon: "🇪🇸",
    },
    {
      id: 78,
      name: "Bundesliga",
      country: "Germany",
      icon: "🇩🇪",
    },
    {
      id: 135,
      name: "Serie A",
      country: "Italy",
      icon: "🇮🇹",
    },
    {
      id: 61,
      name: "Ligue 1",
      country: "France",
      icon: "🇫🇷",
    },
  ];

  const teams = [
    {
      id: 42,
      name: "Arsenal",
      logo: "https://media.api-sports.io/football/teams/42.png",
    },
    {
      id: 50,
      name: "Manchester City",
      logo: "https://media.api-sports.io/football/teams/50.png",
    },
    {
      id: 541,
      name: "Real Madrid",
      logo: "https://media.api-sports.io/football/teams/541.png",
    },
    {
      id: 529,
      name: "Barcelona",
      logo: "https://media.api-sports.io/football/teams/529.png",
    },
    {
      id: 33,
      name: "Manchester United",
      logo: "https://media.api-sports.io/football/teams/33.png",
    },
    {
      id: 40,
      name: "Liverpool",
      logo: "https://media.api-sports.io/football/teams/40.png",
    },
  ];

  return (
    <main className="container football-page">

      {/* =================================================
          FOOTBALL HERO
      ================================================= */}

      <section className="football-hero">
        <div>
          <span className="football-kicker">
            SPORT HUB
          </span>

          <h1>
            ⚽ Football
          </h1>
        </div>

        <div className="football-hero-status">
          <span className="live-dot"></span>
          Live football
        </div>
      </section>


      {/* =================================================
          QUICK ACTIONS
      ================================================= */}

      <section className="cards football-action-grid">

        <div className="card">
          <div>
            <h2>🔴 Live Scores</h2>

            <p>
              Watch live matches, scores and goals.
            </p>
          </div>

          <Link to="/livescores">
            <button>
              View Live
            </button>
          </Link>
        </div>


        <div className="card">
          <div>
            <h2>📅 Fixtures</h2>

            <p>
              Check upcoming football matches.
            </p>
          </div>

          <Link to="/fixtures">
            <button>
              View Fixtures
            </button>
          </Link>
        </div>


        <div className="card">
          <div>
            <h2>🏆 Standings</h2>

            <p>
              Follow league tables and positions.
            </p>
          </div>

          <Link to="/standings">
            <button>
              View Tables
            </button>
          </Link>
        </div>

      </section>


      {/* =================================================
          POPULAR LEAGUES
      ================================================= */}

      <section className="football-section">

        <h2>
          🏆 Popular Leagues
        </h2>

        <div className="cards football-league-grid">

          {leagues.map((league) => (
            <div
              className="card"
              key={league.id}
            >

              <div>
                <h3>
                  <span>
                    {league.icon}
                  </span>{" "}
                  {league.name}
                </h3>

                <p>
                  🌍 {league.country}
                </p>
              </div>

              <Link
                to={`/standings/${league.id}`}
              >
                <button>
                  View Table
                </button>
              </Link>

            </div>
          ))}

        </div>

      </section>


      {/* =================================================
          POPULAR TEAMS
      ================================================= */}

      <section className="football-section">

        <h2>
          ⭐ Popular Teams
        </h2>

        <div className="cards football-team-grid">

          {teams.map((team) => (
            <div
              className="card football-team-card"
              key={team.id}
            >

              <div className="football-team-logo">

                <img
                  src={team.logo}
                  alt={`${team.name} logo`}
                  loading="lazy"
                />

              </div>


              <div className="football-team-information">

                <h3>
                  {team.name}
                </h3>

                <p>
                  Football club
                </p>

              </div>


              <Link
                className="football-team-details"
                to={`/team/${team.id}`}
              >
                Team Details
              </Link>

            </div>
          ))}

        </div>

      </section>


      {/* =================================================
          FOOTBALL TOOLS
      ================================================= */}

      <section className="football-section">

        <h2>
          Explore Football
        </h2>

        <div className="cards football-tools-grid">


          {/* Teams */}

          <div className="card football-tool-card">

            <div>
              <div className="football-tool-icon">
                ⚽
              </div>

              <h3>
                Teams
              </h3>

              <p>
                Search football clubs and team information.
              </p>
            </div>

            <Link to="/teams">
              <button>
                🔎 Search Teams
              </button>
            </Link>

          </div>


          {/* Players */}

          <div className="card football-tool-card">

            <div>
              <div className="football-tool-icon">
                👤
              </div>

              <h3>
                Players
              </h3>

              <p>
                Find players, profiles and statistics.
              </p>
            </div>

            <Link to="/players">
              <button>
                🔎 Search Players
              </button>
            </Link>

          </div>


          {/* News */}

          <div className="card football-tool-card">

            <div>
              <div className="football-tool-icon">
                📰
              </div>

              <h3>
                Football News
              </h3>

              <p>
                Read the latest football news and updates.
              </p>
            </div>

            <Link to="/news">
              <button>
                Read News
              </button>
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}