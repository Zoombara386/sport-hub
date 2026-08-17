import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const API_URL = "https://v3.football.api-sports.io";

export default function MatchDetails() {
  const { id } = useParams();

  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadMatch() {
    try {
      setError("");

      const apiKey =
        import.meta.env.VITE_API_FOOTBALL_KEY;

      if (!apiKey) {
        throw new Error(
          "VITE_API_FOOTBALL_KEY is missing from .env"
        );
      }

      const response = await fetch(
        `${API_URL}/fixtures?id=${encodeURIComponent(id)}`,
        {
          headers: {
            "x-apisports-key": apiKey,
          },
        }
      );

      const data = await response.json();

      console.log("MATCH DETAILS:", data);

      if (!response.ok) {
        throw new Error(
          data?.message ||
            `API error: ${response.status}`
        );
      }

      if (!data?.response?.length) {
        throw new Error("Match not found");
      }

      setMatch(data.response[0]);
    } catch (err) {
      console.error(err);
      setError(
        err.message || "Failed to fetch match"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMatch();

    // Refresh live match information
    const timer = setInterval(() => {
      loadMatch();
    }, 30000);

    return () => clearInterval(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="container">
        <h1>📋 Match Details</h1>

        <div className="card">
          <h2>Loading match...</h2>
        </div>
      </div>
    );
  }

  if (error || !match) {
    return (
      <div className="container">
        <Link to="/livescores">
          ← Back to Live Football
        </Link>

        <div className="card">
          <h1>❌ Match Details Error</h1>

          <p>
            <strong>Match ID:</strong> {id}
          </p>

          <p>{error}</p>

          <button onClick={loadMatch}>
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  }

  const fixture = match.fixture;
  const home = match.teams?.home;
  const away = match.teams?.away;
  const goals = match.goals || {};
  const events = match.events || [];

  const status = fixture?.status;
  const isLive =
    status?.short === "1H" ||
    status?.short === "2H" ||
    status?.short === "ET" ||
    status?.short === "P";

  function eventIcon(event) {
    if (event.type === "Goal") {
      return "⚽";
    }

    if (event.type === "Card") {
      if (
        event.detail?.toLowerCase().includes("red")
      ) {
        return "🟥";
      }

      return "🟨";
    }

    if (event.type === "subst") {
      return "🔄";
    }

    if (event.type === "Var") {
      return "📺";
    }

    return "•";
  }

  return (
    <div className="container">

      <Link to="/livescores">
        ← Back to Live Football
      </Link>

      <h1>📋 Match Details</h1>

      {/* MATCH HEADER */}
      <div className="card">

        <h2>
          🏆 {match.league?.name || "Football"}
        </h2>

        <p>
          {match.league?.round || ""}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "45px",
            textAlign: "center",
            flexWrap: "wrap",
          }}
        >

          {/* HOME */}
          <div>

            {home?.logo && (
              <img
                src={home.logo}
                width="110"
                height="110"
                alt={home.name}
                style={{
                  objectFit: "contain",
                }}
              />
            )}

            <h2>
              {home?.name}
            </h2>

          </div>


          {/* SCORE */}
          <div>

            <h1>
              {goals.home ?? 0}
              {" - "}
              {goals.away ?? 0}
            </h1>

            <h3>
              {status?.long || "Unknown"}
            </h3>

            {isLive &&
              status?.elapsed && (
                <h2>
                  🔴 {status.elapsed}'
                </h2>
              )}

          </div>


          {/* AWAY */}
          <div>

            {away?.logo && (
              <img
                src={away.logo}
                width="110"
                height="110"
                alt={away.name}
                style={{
                  objectFit: "contain",
                }}
              />
            )}

            <h2>
              {away?.name}
            </h2>

          </div>

        </div>

      </div>


      {/* MATCH INFORMATION */}
      <div className="card">

        <h2>📋 Match Information</h2>

        <p>
          📅{" "}
          {fixture?.date
            ? new Date(
                fixture.date
              ).toLocaleString()
            : "Unavailable"}
        </p>

        <p>
          🏟️{" "}
          {fixture?.venue?.name ||
            "Venue unavailable"}
        </p>

        <p>
          📍{" "}
          {fixture?.venue?.city ||
            ""}
        </p>

        <p>
          👨‍⚖️ Referee:{" "}
          {fixture?.referee ||
            "Unavailable"}
        </p>

        <p>
          🆔 Match ID: {fixture?.id}
        </p>

      </div>


      {/* LIVE EVENTS */}
      <div className="card">

        <h2>
          ⚡ Match Events
        </h2>

        {events.length === 0 ? (
          <p>
            No events available yet.
          </p>
        ) : (

          <div>

            {events.map(
              (event, index) => {

                const teamName =
                  event.team?.name ||
                  "";

                const playerName =
                  event.player?.name ||
                  "";

                const assistName =
                  event.assist?.name ||
                  "";

                return (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems:
                        "center",
                      gap: "15px",
                      padding: "12px",
                      borderBottom:
                        "1px solid #ddd",
                    }}
                  >

                    <strong>
                      {event.time?.elapsed
                        ? `${event.time.elapsed}'`
                        : ""}
                    </strong>

                    <span
                      style={{
                        fontSize: "24px",
                      }}
                    >
                      {eventIcon(event)}
                    </span>

                    <div>

                      <strong>
                        {event.type}
                      </strong>

                      {event.detail && (
                        <div>
                          {event.detail}
                        </div>
                      )}

                      {playerName && (
                        <div>
                          👤 {playerName}
                        </div>
                      )}

                      {assistName && (
                        <div>
                          🎯 Assist:{" "}
                          {assistName}
                        </div>
                      )}

                      {teamName && (
                        <small>
                          {teamName}
                        </small>
                      )}

                    </div>

                  </div>
                );
              }
            )}

          </div>
        )}

      </div>


      {/* SCORE */}
      <div className="card">

        <h2>⚽ Score</h2>

        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            maxWidth: "500px",
          }}
        >

          <strong>
            {home?.name}
          </strong>

          <strong>
            {goals.home ?? 0}
          </strong>

        </div>

        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            maxWidth: "500px",
          }}
        >

          <strong>
            {away?.name}
          </strong>

          <strong>
            {goals.away ?? 0}
          </strong>

        </div>

      </div>


      {/* LIVE STATUS */}
      {isLive && (
        <div className="card">

          <h2>
            🔴 LIVE
          </h2>

          <p>
            Match is currently in progress.
          </p>

          {status?.elapsed && (
            <h2>
              ⏱️ {status.elapsed}'
            </h2>
          )}

          <p>
            Automatically updating every
            30 seconds.
          </p>

        </div>
      )}


      {/* BACK */}
      <div
        style={{
          marginTop: "20px",
        }}
      >

        <Link to="/livescores">
          ← Back to Live Football
        </Link>

      </div>

    </div>
  );
}