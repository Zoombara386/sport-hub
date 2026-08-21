import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "https://v3.football.api-sports.io";

export default function Fixtures() {
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadFixtures() {
    try {
      setLoading(true);
      setError("");

      const apiKey = import.meta.env.VITE_API_FOOTBALL_KEY;

      if (!apiKey) {
        throw new Error(
          "VITE_API_FOOTBALL_KEY is missing from .env"
        );
      }

      /*
        Premier League
        League ID: 39
        Season: 2026
      */

      const response = await fetch(
        `${API_URL}/fixtures?league=39&season=2026`,
        {
          headers: {
            "x-apisports-key": apiKey,
          },
        }
      );

      const data = await response.json();

      console.log("Fixtures API:", data);

      if (!response.ok) {
        throw new Error(
          data?.message ||
            `API error: ${response.status}`
        );
      }

      if (data?.errors && Object.keys(data.errors).length > 0) {
        throw new Error(
          Object.values(data.errors).join(", ")
        );
      }

      setFixtures(data?.response || []);
    } catch (err) {
      console.error("Fixtures error:", err);

      setError(
        err?.message ||
          "Failed to fetch fixtures"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadFixtures();
  }, []);

  function formatDate(date) {
    if (!date) {
      return "Date unavailable";
    }

    return new Date(date).toLocaleString(
      "en-GB",
      {
        dateStyle: "medium",
        timeStyle: "short",
      }
    );
  }

  function formatDay(date) {
    if (!date) {
      return "Upcoming";
    }

    return new Date(date).toLocaleDateString(
      "en-GB",
      {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
  }

  function formatTime(date) {
    if (!date) {
      return "--:--";
    }

    return new Date(date).toLocaleTimeString(
      "en-GB",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  }

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <main className="container fixtures-page">

        <section className="fixtures-page-header">

          <div>
            <span className="fixtures-kicker">
              PREMIER LEAGUE
            </span>

            <h1>
              📅 Fixtures
            </h1>

            <p>
              Upcoming Premier League matches
            </p>
          </div>

          <div className="fixtures-header-icon">
            📅
          </div>

        </section>


        <section className="fixtures-loading-card">

          <div className="fixtures-spinner"></div>

          <h2>
            Loading fixtures
          </h2>

          <p>
            Fetching the latest Premier League schedule...
          </p>

        </section>

      </main>
    );
  }


  /* =====================================================
     ERROR
  ===================================================== */

  if (error) {
    return (
      <main className="container fixtures-page">

        <section className="fixtures-page-header">

          <div>
            <span className="fixtures-kicker">
              PREMIER LEAGUE
            </span>

            <h1>
              📅 Fixtures
            </h1>

            <p>
              Upcoming Premier League matches
            </p>
          </div>

        </section>


        <section className="fixtures-error-card">

          <div className="fixtures-error-icon">
            !
          </div>

          <div>

            <h2>
              Unable to load fixtures
            </h2>

            <p>
              {error}
            </p>

            <button
              className="fixtures-retry-button"
              onClick={loadFixtures}
            >
              🔄 Try Again
            </button>

          </div>

        </section>

      </main>
    );
  }


  /* =====================================================
     MAIN PAGE
  ===================================================== */

  return (
    <main className="container fixtures-page">

      {/* HEADER */}

      <section className="fixtures-page-header">

        <div>

          <span className="fixtures-kicker">
            PREMIER LEAGUE
          </span>

          <h1>
            📅 Fixtures
          </h1>

          <p>
            Upcoming Premier League matches
          </p>

        </div>


        <div className="fixtures-header-right">

          <div className="fixtures-count">

            <strong>
              {fixtures.length}
            </strong>

            <span>
              fixtures
            </span>

          </div>


          <button
            className="fixtures-refresh-button"
            onClick={loadFixtures}
            title="Refresh fixtures"
          >
            ↻
          </button>

        </div>

      </section>


      {/* EMPTY */}

      {fixtures.length === 0 ? (

        <section className="fixtures-empty-card">

          <div className="fixtures-empty-icon">
            📅
          </div>

          <h2>
            No fixtures available
          </h2>

          <p>
            There are currently no fixtures available.
          </p>

          <button
            className="fixtures-retry-button"
            onClick={loadFixtures}
          >
            ↻ Check Again
          </button>

        </section>

      ) : (

        <section className="fixtures-list">

          {fixtures.map((fixture) => {

            const matchId =
              fixture?.fixture?.id;

            const home =
              fixture?.teams?.home;

            const away =
              fixture?.teams?.away;

            const date =
              fixture?.fixture?.date;

            const venue =
              fixture?.fixture?.venue?.name;

            const league =
              fixture?.league?.name ||
              "Premier League";

            return (
              <article
                className="fixture-match-card"
                key={matchId}
              >

                {/* TOP */}

                <div className="fixture-match-top">

                  <div className="fixture-competition">

                    <span className="fixture-competition-icon">
                      🏆
                    </span>

                    <div>

                      <strong>
                        {league}
                      </strong>

                      <small>
                        Match #{matchId}
                      </small>

                    </div>

                  </div>


                  <span className="fixture-upcoming-badge">
                    UPCOMING
                  </span>

                </div>


                {/* DATE */}

                <div className="fixture-date">

                  <strong>
                    {formatDay(date)}
                  </strong>

                  <span>
                    {formatDate(date)}
                  </span>

                </div>


                {/* TEAMS */}

                <div className="fixture-teams">


                  {/* HOME */}

                  <div className="fixture-team fixture-home">

                    <div className="fixture-team-logo">

                      {home?.logo ? (
                        <img
                          src={home.logo}
                          alt={`${home.name} logo`}
                          loading="lazy"
                        />
                      ) : (
                        <span>
                          ⚽
                        </span>
                      )}

                    </div>

                    <h3>
                      {home?.name || "Home Team"}
                    </h3>

                    <span>
                      HOME
                    </span>

                  </div>


                  {/* CENTER */}

                  <div className="fixture-center">

                    <div className="fixture-time">
                      {formatTime(date)}
                    </div>

                    <div className="fixture-vs">
                      VS
                    </div>

                  </div>


                  {/* AWAY */}

                  <div className="fixture-team fixture-away">

                    <div className="fixture-team-logo">

                      {away?.logo ? (
                        <img
                          src={away.logo}
                          alt={`${away.name} logo`}
                          loading="lazy"
                        />
                      ) : (
                        <span>
                          ⚽
                        </span>
                      )}

                    </div>

                    <h3>
                      {away?.name || "Away Team"}
                    </h3>

                    <span>
                      AWAY
                    </span>

                  </div>

                </div>


                {/* VENUE */}

                <div className="fixture-venue">

                  <span>
                    🏟️
                  </span>

                  <span>
                    {venue ||
                      "Stadium unavailable"}
                  </span>

                </div>


                {/* FOOTER */}

                <div className="fixture-match-footer">

                  <span className="fixture-match-id">
                    Premier League
                  </span>


                  <Link
                    to={`/match/${matchId}`}
                    className="fixture-details-button"
                  >
                    Match Details
                    <span>
                      →
                    </span>
                  </Link>

                </div>

              </article>
            );
          })}

        </section>

      )}

    </main>
  );
}