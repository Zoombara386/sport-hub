import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.SPORT_API_KEY;

app.use(cors());
app.use(express.json());

const API_URL = "https://v3.football.api-sports.io";

async function apiFootball(endpoint) {
  if (!API_KEY) {
    throw new Error("SPORT_API_KEY is missing from .env");
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "x-apisports-key": API_KEY,
    },
  });

  const data = await response.json();

  console.log("API-Football status:", response.status);

  if (!response.ok) {
    throw new Error(
      data?.message ||
      `API-Football error ${response.status}`
    );
  }

  return data;
}

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    sportApi: Boolean(API_KEY),
  });
});

// Premier League fixtures
app.get("/api/fixtures", async (req, res) => {
  try {
    const data = await apiFootball(
      "/fixtures?league=39&season=2026"
    );

    res.json(data);
  } catch (error) {
    console.error("Fixtures error:", error);

    res.status(500).json({
      error: "Unable to load fixtures",
      message: error.message,
    });
  }
});

// Match details
app.get("/api/fixtures/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const data = await apiFootball(
      `/fixtures?id=${encodeURIComponent(id)}`
    );

    if (!data?.response?.length) {
      return res.status(404).json({
        error: "Match not found",
        id,
      });
    }

    res.json(data);
  } catch (error) {
    console.error("Match details error:", error);

    res.status(500).json({
      error: "Failed to fetch match",
      message: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(
    `🚀 API server running at http://localhost:${PORT}`
  );
});