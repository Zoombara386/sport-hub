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

      const apiKey =
        import.meta.env.VITE_API_FOOTBALL_KEY;

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
          data?.message ||
            `API error: ${response.status}`
        );
      }

      setGames(data.response || []);
    } catch (err) {
      console.error("Live games error:", err);
      setError(err.message);
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

  if (loading) {
    return (
      <div className="container">
        <h1>🔴 Live Football</h1>

        <div className="card">
          <h2>Loading live games...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <h1>🔴 Live Football</h1>

        <div className="card">
          <h2>❌ Unable to load live games</h2>
          <p>{error}</p>

          <button onClick={loadLiveGames}>
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>🔴 Live Football</h1>

      {games.length === 0 ? (
        <div className="card">
          <h2>No live games right now</h2>
        </div>
      ) : (
        <div className="fixtures-grid">
          {games.map((game) => {
            // THIS IS THE REAL API-FOOTBALL MATCH ID
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

            const minute =
              game.fixture?.status?.elapsed;

            return (
              <div
                className="card"
                key={matchId}
              >
                <h3>
                  🔴 LIVE
                  {minute
                    ? ` ${minute}'`
                    : ""}
                </h3>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "30px",
                    textAlign: "center",
                  }}
                >
                  <div>
                    {home?.logo && (
                      <img
                        src={home.logo}
                        width="70"
                        height="70"
                        alt={home.name}
                      />
                    )}

                    <h3>
                      {home?.name}
                    </h3>
                  </div>

                  <div>
                    <h1>
                      {homeScore} - {awayScore}
                    </h1>

                    <p>{status}</p>
                  </div>

                  <div>
                    {away?.logo && (
                      <img
                        src={away.logo}
                        width="70"
                        height="70"
                        alt={away.name}
                      />
                    )}

                    <h3>
                      {away?.name}
                    </h3>
                  </div>
                </div>

                <p>
                  🏆{" "}
                  {game.league?.name ||
                    "Football"}
                </p>

                <p>
                  🆔 Match ID: {matchId}
                </p>

                {/* IMPORTANT */}
                <Link
                  to={`/match/${matchId}`}
                  className="details-button"
                >
                  📋 Match Details
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}