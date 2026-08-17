import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5000";

export default function Fixtures() {
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadFixtures() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/api/fixtures`
      );

      const data = await response.json();

      console.log("Fixtures API:", data);

      if (!response.ok) {
        throw new Error(
          data?.error ||
          data?.message ||
          "Unable to load fixtures"
        );
      }

      setFixtures(data?.response || []);
    } catch (err) {
      console.error("Fixtures error:", err);
      setError(
        err.message || "Failed to fetch fixtures"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadFixtures();
  }, []);

  function formatDate(date) {
    if (!date) return "Date unavailable";

    return new Date(date).toLocaleString(
      "en-GB",
      {
        dateStyle: "medium",
        timeStyle: "short",
      }
    );
  }

  if (loading) {
    return (
      <div className="container">
        <h1>📅 Premier League Fixtures 2026/27</h1>

        <div className="card">
          <h2>Loading fixtures...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <h1>📅 Premier League Fixtures 2026/27</h1>

        <div className="card">
          <h2>❌ Unable to load fixtures</h2>

          <p>{error}</p>

          <button onClick={loadFixtures}>
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">

      <h1>
        📅 Premier League Fixtures 2026/27
      </h1>

      <p>
        Total Fixtures: {fixtures.length}
      </p>

      {fixtures.length === 0 ? (
        <div className="card">
          <h2>No fixtures available</h2>
        </div>
      ) : (
        <div className="fixtures-grid">

          {fixtures.map((fixture) => {

            const home =
              fixture?.teams?.home;

            const away =
              fixture?.teams?.away;

            return (
              <div
                className="card fixture-card"
                key={fixture.fixture?.id}
              >

                <h3>
                  🏆 Premier League
                </h3>

                <div
                  className="teams"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "35px",
                  }}
                >

                  {/* HOME */}
                  <div
                    className="team"
                    style={{
                      textAlign: "center",
                    }}
                  >

                    {home?.logo && (
                      <img
                        src={home.logo}
                        width="80"
                        height="80"
                        alt={home.name}
                        style={{
                          objectFit: "contain",
                        }}
                      />
                    )}

                    <h3>
                      {home?.name ||
                        "Home"}
                    </h3>

                  </div>

                  <h2>VS</h2>

                  {/* AWAY */}
                  <div
                    className="team"
                    style={{
                      textAlign: "center",
                    }}
                  >

                    {away?.logo && (
                      <img
                        src={away.logo}
                        width="80"
                        height="80"
                        alt={away.name}
                        style={{
                          objectFit: "contain",
                        }}
                      />
                    )}

                    <h3>
                      {away?.name ||
                        "Away"}
                    </h3>

                  </div>

                </div>

                <p>
                  ⏰{" "}
                  {formatDate(
                    fixture?.fixture?.date
                  )}
                </p>

                <p>
                  🏟️{" "}
                  {fixture?.fixture?.venue
                    ?.name ||
                    "Stadium unavailable"}
                </p>

                <p>
                  🆔 Match ID:{" "}
                  {fixture?.fixture?.id}
                </p>

                {/* MATCH DETAILS */}
                <Link
                  to={`/match/${fixture?.fixture?.id}`}
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