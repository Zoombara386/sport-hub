import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const API_URL = "https://v3.football.api-sports.io";

export default function MatchDetails() {
  const { id } = useParams();

  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadMatch = async () => {
    try {
      setError("");

      const apiKey = import.meta.env.VITE_API_FOOTBALL_KEY;

      if (!apiKey) {
        throw new Error(
          "VITE_API_FOOTBALL_KEY is missing from .env"
        );
      }

      if (!id) {
        throw new Error("Match ID is missing");
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
      console.error("Match details error:", err);
      setError(
        err.message || "Failed to fetch match"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMatch();

    const timer = setInterval(
      loadMatch,
      30000
    );

    return () => clearInterval(timer);
  }, [id]);

  /* =========================================
     LOADING
  ========================================= */

  if (loading) {
    return (
      <div className="container">
        <Link
          to="/livescores"
          className="back-link"
        >
          ← Back to Live Football
        </Link>

        <div className="card loading">
          <h1>📋 Match Details</h1>
          <h2>Loading match...</h2>
        </div>
      </div>
    );
  }

  /* =========================================
     ERROR
  ========================================= */

  if (error || !match) {
    return (
      <div className="container">
        <Link
          to="/livescores"
          className="back-link"
        >
          ← Back to Live Football
        </Link>

        <div className="card error-card">
          <h1>❌ Match Details Error</h1>

          <p>
            <strong>Match ID:</strong>{" "}
            {id}
          </p>

          <p>
            {error || "Match not found"}
          </p>

          <button onClick={loadMatch}>
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  }

  /* =========================================
     DATA
  ========================================= */

  const fixture = match.fixture || {};

  const home = match.teams?.home;
  const away = match.teams?.away;

  const goals = match.goals || {};
  const score = match.score || {};

  const events = match.events || [];
  const statistics = match.statistics || [];
  const lineups = match.lineups || [];

  const status = fixture.status || {};

  const isLive = [
    "1H",
    "2H",
    "ET",
    "P",
    "LIVE",
  ].includes(status.short);

  /* =========================================
     HELPERS
  ========================================= */

  const formatDate = (date) => {
    if (!date) {
      return "Unavailable";
    }

    return new Date(date).toLocaleString(
      "en-GB",
      {
        dateStyle: "medium",
        timeStyle: "short",
      }
    );
  };

  const eventIcon = (event) => {
    if (event.type === "Goal") {
      return "⚽";
    }

    if (event.type === "Card") {
      if (
        event.detail
          ?.toLowerCase()
          .includes("red")
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
  };

  const getStatisticValue = (
    teamStats,
    type
  ) => {
    const item =
      teamStats?.statistics?.find(
        (stat) =>
          stat.type === type
      );

    return item?.value ?? "-";
  };

  const homeStats = statistics[0];
  const awayStats = statistics[1];

  const statisticTypes = [
    "Ball Possession",
    "Total Shots",
    "Shots on Goal",
    "Shots off Goal",
    "Blocked Shots",
    "Corner Kicks",
    "Fouls",
    "Offsides",
    "Yellow Cards",
    "Red Cards",
    "Goalkeeper Saves",
    "Total passes",
    "Passes accurate",
    "Passes %",
  ];

  /* =========================================
     FORMATION PLAYER POSITION
  ========================================= */

  const getPlayerPosition = (
    player,
    index,
    total
  ) => {
    /*
      API-Football can return grid values
      such as:

      1:1
      2:3
      3:2

      If grid is unavailable, use a
      fallback position.
    */

    if (player?.grid) {
      const parts =
        player.grid.split(":");

      const row =
        Number(parts[0]) || 1;

      const column =
        Number(parts[1]) || 1;

      const top = Math.min(
        92,
        Math.max(
          8,
          7 + (row - 1) * 15
        )
      );

      const left = Math.min(
        92,
        Math.max(
          8,
          8 + (column - 1) * 21
        )
      );

      return {
        top: `${top}%`,
        left: `${left}%`,
      };
    }

    const fallbackLeft =
      total > 1
        ? 10 +
          (index %
            Math.min(total, 5)) *
            20
        : 50;

    const fallbackTop =
      15 +
      Math.floor(index / 5) *
        16;

    return {
      top: `${Math.min(
        fallbackTop,
        88
      )}%`,
      left: `${Math.min(
        fallbackLeft,
        90
      )}%`,
    };
  };

  return (
    <div className="container">

      {/* =====================================
          BACK
      ===================================== */}

      <Link
        to="/livescores"
        className="back-link"
      >
        ← Back to Live Football
      </Link>

      <h1>📋 Match Details</h1>


      {/* =====================================
          MATCH HEADER
      ===================================== */}

      <div className="card match-header">

        <h2>
          🏆{" "}
          {match.league?.name ||
            "Football"}
        </h2>

        <p>
          {match.league?.round ||
            ""}
        </p>

        <div className="match-teams">

          {/* HOME */}

          <div className="match-team">

            {home?.logo && (
              <img
                src={home.logo}
                alt={home.name}
              />
            )}

            <h2>
              {home?.name ||
                "Home"}
            </h2>

          </div>


          {/* SCORE */}

          <div className="match-score">

            <h1>
              {goals.home ?? 0}
              {" - "}
              {goals.away ?? 0}
            </h1>

            <h3>
              {status.long ||
                "Unknown"}
            </h3>

            {isLive &&
              status.elapsed !=
                null && (
                <h2
                  style={{
                    color:
                      "#e53935",
                  }}
                >
                  🔴{" "}
                  {status.elapsed}'
                </h2>
              )}

          </div>


          {/* AWAY */}

          <div className="match-team">

            {away?.logo && (
              <img
                src={away.logo}
                alt={away.name}
              />
            )}

            <h2>
              {away?.name ||
                "Away"}
            </h2>

          </div>

        </div>
      </div>


      {/* =====================================
          MATCH INFORMATION
      ===================================== */}

      <div className="card match-information">

        <h2>
          📋 Match Information
        </h2>

        <p>
          📅 <strong>Date:</strong>{" "}
          {formatDate(
            fixture.date
          )}
        </p>

        <p>
          🏟️{" "}
          <strong>Stadium:</strong>{" "}
          {fixture.venue?.name ||
            "Unavailable"}
        </p>

        <p>
          📍 <strong>City:</strong>{" "}
          {fixture.venue?.city ||
            "Unavailable"}
        </p>

        <p>
          👨‍⚖️{" "}
          <strong>Referee:</strong>{" "}
          {fixture.referee ||
            "Unavailable"}
        </p>

        <p>
          🆔{" "}
          <strong>Match ID:</strong>{" "}
          {fixture.id}
        </p>

        <p>
          🏆{" "}
          <strong>League:</strong>{" "}
          {match.league?.name ||
            "Unavailable"}
        </p>

        <p>
          🌍{" "}
          <strong>Country:</strong>{" "}
          {match.league?.country ||
            "Unavailable"}
        </p>

      </div>


      {/* =====================================
          LIVE STATUS
      ===================================== */}

      {isLive && (
        <div className="card live-status">

          <h2>
            <span className="live-dot"></span>
            LIVE MATCH
          </h2>

          <h1>
            {status.elapsed !=
            null
              ? `${status.elapsed}'`
              : "LIVE"}
          </h1>

          <p>
            Automatically updating
            every 30 seconds.
          </p>

        </div>
      )}


      {/* =====================================
          EVENTS
      ===================================== */}

      <div className="card">

        <h2>
          ⚡ Match Events
        </h2>

        {events.length === 0 ? (

          <p>
            No match events
            available.
          </p>

        ) : (

          <div className="events-list">

            {events.map(
              (event, index) => {

                const player =
                  event.player?.name;

                const assist =
                  event.assist?.name;

                const team =
                  event.team?.name;

                return (
                  <div
                    className="event-row"
                    key={
                      `${event.time?.elapsed}-${index}`
                    }
                  >

                    <div className="event-minute">
                      {event.time
                        ?.elapsed !=
                      null
                        ? `${event.time.elapsed}'`
                        : ""}
                    </div>

                    <div className="event-icon">
                      {eventIcon(event)}
                    </div>

                    <div className="event-content">

                      <strong>
                        {event.type}
                      </strong>

                      {event.detail && (
                        <div>
                          {event.detail}
                        </div>
                      )}

                      {player && (
                        <div>
                          👤{" "}
                          {player}
                        </div>
                      )}

                      {assist && (
                        <div>
                          🎯 Assist:{" "}
                          {assist}
                        </div>
                      )}

                      {team && (
                        <small className="event-team">
                          {team}
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


      {/* =====================================
          SCORE
      ===================================== */}

      <div className="card">

        <h2>⚽ Score</h2>

        <div className="score-table">

          <div className="score-row">

            <strong>
              {home?.name}
            </strong>

            <span className="score-value">
              {goals.home ?? 0}
            </span>

          </div>

          <div className="score-row">

            <strong>
              {away?.name}
            </strong>

            <span className="score-value">
              {goals.away ?? 0}
            </span>

          </div>

        </div>

      </div>


      {/* =====================================
          STATISTICS
      ===================================== */}

      <div className="card">

        <h2>
          📊 Match Statistics
        </h2>

        {statistics.length < 2 ? (

          <p>
            Statistics are not
            available yet.
          </p>

        ) : (

          <div className="stats-table">

            {statisticTypes.map(
              (type) => {

                const homeValue =
                  getStatisticValue(
                    homeStats,
                    type
                  );

                const awayValue =
                  getStatisticValue(
                    awayStats,
                    type
                  );

                if (
                  homeValue ===
                    "-" &&
                  awayValue ===
                    "-"
                ) {
                  return null;
                }

                return (
                  <div
                    className="stat-row"
                    key={type}
                  >

                    <strong>
                      {homeValue}
                    </strong>

                    <div>
                      {type}
                    </div>

                    <strong>
                      {awayValue}
                    </strong>

                  </div>
                );
              }
            )}

          </div>

        )}

      </div>


      {/* =====================================
          FORMATION PITCH
      ===================================== */}

      <div className="card">

        <h2>
          🏟️ Formation
        </h2>

        {lineups.length === 0 ? (

          <p>
            Formation is not
            available yet.
          </p>

        ) : (

          <div
            className="formation-container"
          >

            {lineups.map(
              (lineup, lineupIndex) => {

                const team =
                  lineup.team || {};

                const players =
                  lineup.startXI ||
                  [];

                return (
                  <div
                    className="formation-team"
                    key={
                      team.id ||
                      lineupIndex
                    }
                  >

                    {/* TEAM HEADER */}

                    <div
                      className="formation-title"
                    >

                      {team.logo && (
                        <img
                          src={team.logo}
                          alt={
                            team.name
                          }
                        />
                      )}

                      <div>

                        <h3>
                          {team.name ||
                            "Team"}
                        </h3>

                        <p>
                          Formation:{" "}
                          <strong>
                            {lineup.formation ||
                              "N/A"}
                          </strong>
                        </p>

                      </div>

                    </div>


                    {/* PITCH */}

                    <div
                      className="football-pitch"
                    >

                      <div
                        className="pitch-line center-line"
                      />

                      <div
                        className="center-circle"
                      />

                      <div
                        className="penalty-box top-box"
                      />

                      <div
                        className="penalty-box bottom-box"
                      />


                      {/* PLAYERS */}

                      {players.map(
                        (
                          item,
                          index
                        ) => {

                          const player =
                            item.player ||
                            {};

                          const position =
                            getPlayerPosition(
                              player,
                              index,
                              players.length
                            );

                          return (
                            <div
                              className="pitch-player"
                              key={
                                player.id ||
                                index
                              }
                              style={
                                position
                              }
                            >

                              <div className="player-number">
                                {player.number ??
                                  "-"}
                              </div>

                              <div className="player-name">
                                {player.name ||
                                  "Player"}
                              </div>

                              <div className="player-position">
                                {player.pos ||
                                  ""}
                              </div>

                            </div>
                          );
                        }
                      )}

                    </div>

                  </div>
                );
              }
            )}

          </div>

        )}

      </div>


      {/* =====================================
          LINEUPS
      ===================================== */}

      <div className="card">

        <h2>
          👥 Team Lineups
        </h2>

        {lineups.length === 0 ? (

          <p>
            Lineups are not
            available yet.
          </p>

        ) : (

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "25px",
            }}
          >

            {lineups.map(
              (lineup, lineupIndex) => {

                const team =
                  lineup.team || {};

                const starters =
                  lineup.startXI ||
                  [];

                const substitutes =
                  lineup.substitutes ||
                  [];

                return (
                  <div
                    key={
                      team.id ||
                      lineupIndex
                    }
                  >

                    <div
                      style={{
                        textAlign:
                          "center",
                        marginBottom:
                          "20px",
                      }}
                    >

                      {team.logo && (
                        <img
                          src={team.logo}
                          width="70"
                          height="70"
                          alt={
                            team.name
                          }
                          style={{
                            objectFit:
                              "contain",
                          }}
                        />
                      )}

                      <h2>
                        {team.name ||
                          "Team"}
                      </h2>

                      <p>
                        Formation:{" "}
                        <strong>
                          {lineup.formation ||
                            "Unavailable"}
                        </strong>
                      </p>

                    </div>


                    {/* STARTING XI */}

                    <h3>
                      🟢 Starting XI
                    </h3>

                    {starters.length ===
                    0 ? (

                      <p>
                        Starting XI
                        unavailable.
                      </p>

                    ) : (

                      starters.map(
                        (
                          item,
                          index
                        ) => {

                          const player =
                            item.player ||
                            {};

                          return (
                            <div
                              key={
                                player.id ||
                                index
                              }
                              style={{
                                display:
                                  "flex",
                                alignItems:
                                  "center",
                                gap: "10px",
                                padding:
                                  "9px 5px",
                                borderBottom:
                                  "1px solid #eee",
                              }}
                            >

                              <strong
                                style={{
                                  width:
                                    "30px",
                                }}
                              >
                                {player.number ??
                                  "-"}
                              </strong>

                              <span
                                style={{
                                  width:
                                    "40px",
                                  textAlign:
                                    "center",
                                  fontWeight:
                                    "700",
                                }}
                              >
                                {player.pos ||
                                  "-"}
                              </span>

                              <span>
                                {player.name ||
                                  "Unknown Player"}
                              </span>

                            </div>
                          );
                        }
                      )

                    )}


                    {/* SUBSTITUTES */}

                    <h3
                      style={{
                        marginTop:
                          "25px",
                      }}
                    >
                      🪑 Substitutes
                    </h3>

                    {substitutes.length ===
                    0 ? (

                      <p>
                        Substitutes
                        unavailable.
                      </p>

                    ) : (

                      substitutes.map(
                        (
                          item,
                          index
                        ) => {

                          const player =
                            item.player ||
                            {};

                          return (
                            <div
                              key={
                                player.id ||
                                index
                              }
                              style={{
                                display:
                                  "flex",
                                alignItems:
                                  "center",
                                gap: "10px",
                                padding:
                                  "8px 5px",
                                borderBottom:
                                  "1px solid #eee",
                              }}
                            >

                              <strong
                                style={{
                                  width:
                                    "30px",
                                }}
                              >
                                {player.number ??
                                  "-"}
                              </strong>

                              <span>
                                {player.name ||
                                  "Unknown Player"}
                              </span>

                            </div>
                          );
                        }
                      )

                    )}


                    {/* COACH */}

                    {lineup.coach && (
                      <p
                        style={{
                          marginTop:
                            "20px",
                        }}
                      >
                        👔 Coach:{" "}
                        <strong>
                          {
                            lineup
                              .coach
                              .name
                          }
                        </strong>
                      </p>
                    )}

                  </div>
                );
              }
            )}

          </div>

        )}

      </div>


      {/* =====================================
          SCORE BREAKDOWN
      ===================================== */}

      <div className="card">

        <h2>
          ⏱️ Match Scores
        </h2>

        <div className="score-table">

          <div className="score-row">

            <strong>
              Half Time
            </strong>

            <span>
              {score.halftime?.home ??
                "-"}
              {" - "}
              {score.halftime?.away ??
                "-"}
            </span>

          </div>

          <div className="score-row">

            <strong>
              Full Time
            </strong>

            <span>
              {score.fulltime?.home ??
                goals.home ??
                "-"}
              {" - "}
              {score.fulltime?.away ??
                goals.away ??
                "-"}
            </span>

          </div>

          <div className="score-row">

            <strong>
              Extra Time
            </strong>

            <span>
              {score.extratime?.home ??
                "-"}
              {" - "}
              {score.extratime?.away ??
                "-"}
            </span>

          </div>

          <div className="score-row">

            <strong>
              Penalties
            </strong>

            <span>
              {score.penalty?.home ??
                "-"}
              {" - "}
              {score.penalty?.away ??
                "-"}
            </span>

          </div>

        </div>

      </div>


      {/* =====================================
          STATUS
      ===================================== */}

      <div className="card">

        <h2>
          📡 Match Status
        </h2>

        <p>
          <strong>
            Status:
          </strong>{" "}
          {status.long ||
            "Unknown"}
        </p>

        <p>
          <strong>
            Short Status:
          </strong>{" "}
          {status.short ||
            "-"}
        </p>

        {status.elapsed !=
          null && (
          <p>
            <strong>
              Elapsed:
            </strong>{" "}
            {status.elapsed}'
          </p>
        )}

      </div>


      {/* =====================================
          REFRESH
      ===================================== */}

      <div className="card">

        <h2>
          🔄 Live Updates
        </h2>

        <p>
          Match data automatically
          refreshes every 30 seconds.
        </p>

        <button onClick={loadMatch}>
          🔄 Refresh Now
        </button>

      </div>


      {/* =====================================
          BACK
      ===================================== */}

      <div
        style={{
          marginTop: "20px",
        }}
      >

        <Link
          to="/livescores"
          className="back-link"
        >
          ← Back to Live Football
        </Link>

      </div>

    </div>
  );
}