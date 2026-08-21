import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "https://v3.football.api-sports.io";

export default function LiveScores() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadLiveGames() {
    try {
      setLoading(true);
      setError("");

      const apiKey = import.meta.env.VITE_API_FOOTBALL_KEY;

      if (!apiKey) {
        throw new Error(
          "VITE_API_FOOTBALL_KEY is missing from .env"
        );
      }

      const response = await fetch(
        `${API_URL}/fixtures?live=all`,
        {
          headers: {
            "x-apisports-key": apiKey,
          },
        }
      );

      const data = await response.json();

      console.log("LIVE API:", data);

      if (!response.ok) {
        throw new Error(
          data?.message || `API error: ${response.status}`
        );
      }

      setGames(data.response || []);
    } catch (err) {
      console.error("Live games error:", err);

      setError(
        err?.message || "Unable to load live games"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLiveGames();

    const timer = setInterval(() => {
      loadLiveGames();
    }, 30000);

    return () => clearInterval(timer);
  }, []);

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <main className="container live-page">

        <section className="live-page-header">
          <div>
            <span className="live-page-kicker">
              FOOTBALL
            </span>

            <h1>
              🔴 Live Scores
            </h1>

            <p>
              Live matches and real-time scores
            </p>
          </div>

          <div className="live-status-pill">
            <span className="live-dot"></span>
            Updating
          </div>
        </section>

        <section className="live-loading-card">
          <div className="live-loading-spinner"></div>

          <h2>
            Loading live matches
          </h2>

          <p>
            Fetching the latest football scores...
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
      <main className="container live-page">

        <section className="live-page-header">
          <div>
            <span className="live-page-kicker">
              FOOTBALL
            </span>

            <h1>
              🔴 Live Scores
            </h1>

            <p>
              Live matches and real-time scores
            </p>
          </div>
        </section>


        <section className="live-error-card">

          <div className="live-error-icon">
            !
          </div>

          <div>
            <h2>
              Unable to load live games
            </h2>

            <p>
              {error}
            </p>

            <button
              className="live-retry-button"
              onClick={loadLiveGames}
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
    <main className="container live-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <section className="live-page-header">

        <div>

          <span className="live-page-kicker">
            FOOTBALL
          </span>

          <h1>
            🔴 Live Scores
          </h1>

          <p>
            Follow matches happening right now
          </p>

        </div>


        <div className="live-header-right">

          <div className="live-status-pill">
            <span className="live-dot"></span>
            LIVE NOW
          </div>

          <button
            className="live-refresh-button"
            onClick={loadLiveGames}
            title="Refresh live matches"
          >
            ↻
          </button>

        </div>

      </section>


      {/* =================================================
          MATCH COUNT
      ================================================= */}

      {games.length > 0 && (
        <div className="live-match-summary">

          <span>
            <strong>
              {games.length}
            </strong>{" "}
            live {games.length === 1 ? "match" : "matches"}
          </span>

          <span className="live-updating">
            ● Updating every 30 seconds
          </span>

        </div>
      )}


      {/* =================================================
          NO LIVE MATCHES
      ================================================= */}

      {games.length === 0 ? (
        <section className="live-empty-card">

          <div className="live-empty-icon">
            ⚽
          </div>

          <h2>
            No live games right now
          </h2>

          <p>
            There are currently no football matches in progress.
          </p>

          <button
            className="live-retry-button"
            onClick={loadLiveGames}
          >
            ↻ Check Again
          </button>

        </section>
      ) : (

        /* =================================================
           MATCH GRID
        ================================================= */

        <section className="live-matches-grid">

          {games.map((game) => {

            const matchId = game.fixture?.id;

            const home = game.teams?.home;
            const away = game.teams?.away;

            const homeScore =
              game.goals?.home ?? 0;

            const awayScore =
              game.goals?.away ?? 0;

            const status =
              game.fixture?.status?.short ||
              "LIVE";

            const elapsed =
              game.fixture?.status?.elapsed;

            const extra =
              game.fixture?.status?.extra;

            const leagueName =
              game.league?.name ||
              "Football";

            const country =
              game.league?.country ||
              "";

            return (
              <article
                className="live-match-card"
                key={matchId}
              >

                {/* =========================================
                    MATCH TOP
                ========================================= */}

                <div className="live-match-top">

                  <div className="live-competition">

                    <span className="live-competition-icon">
                      🏆
                    </span>

                    <div>
                      <strong>
                        {leagueName}
                      </strong>

                      {country && (
                        <small>
                          {country}
                        </small>
                      )}
                    </div>

                  </div>


                  <div className="live-match-badge">

                    <span className="live-dot"></span>

                    LIVE

                  </div>

                </div>


                {/* =========================================
                    MATCH STATUS
                ========================================= */}

                <div className="live-match-status">

                  <span>
                    {status}
                  </span>

                  {elapsed && (
                    <strong>
                      {elapsed}'
                      {extra
                        ? ` +${extra}`
                        : ""}
                    </strong>
                  )}

                </div>


                {/* =========================================
                    TEAMS + SCORE
                ========================================= */}

                <div className="live-teams">

                  {/* HOME */}

                  <div className="live-team home-team">

                    <div className="live-team-logo">

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

                    <span className="live-home-label">
                      HOME
                    </span>

                  </div>


                  {/* SCORE */}

                  <div className="live-score">

                    <div className="live-score-numbers">
                      <span>
                        {homeScore}
                      </span>

                      <b>
                        :
                      </b>

                      <span>
                        {awayScore}
                      </span>
                    </div>

                    <small>
                      {elapsed
                        ? `${elapsed}'`
                        : "LIVE"}
                    </small>

                  </div>


                  {/* AWAY */}

                  <div className="live-team away-team">

                    <div className="live-team-logo">

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

                    <span className="live-away-label">
                      AWAY
                    </span>

                  </div>

                </div>


                {/* =========================================
                    MATCH FOOTER
                ========================================= */}

                <div className="live-match-footer">

                  <span className="live-match-id">
                    Match #{matchId}
                  </span>


                  <Link
                    to={`/match/${matchId}`}
                    className="live-details-button"
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