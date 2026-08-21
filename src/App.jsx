import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

import Navbar from "./components/Navbar";


// Pages
import Home from "./pages/Home";


// Football
import Football from "./pages/Football";
import LiveScores from "./pages/LiveScores";
import MatchDetails from "./pages/MatchDetails";
import Fixtures from "./pages/Fixtures";
import Standings from "./pages/Standings";


// Teams
import Teams from "./pages/Teams";
import TeamDetails from "./pages/TeamDetails";


// Players
import Players from "./pages/Players";
import PlayerDetails from "./pages/PlayerDetails";


// Other
import Favorites from "./pages/Favorites";
import News from "./pages/News";


// Sports
import Basketball from "./pages/Basketball";
import Cricket from "./pages/Cricket";
import Tennis from "./pages/Tennis";



export default function App() {


  return (

    <BrowserRouter>


      <Navbar />


      <Routes>



        {/* HOME */}

        <Route

          path="/"

          element={<Home />}

        />





        {/* FOOTBALL */}

        <Route

          path="/football"

          element={<Football />}

        />





        {/* LIVE SCORES */}

        <Route

          path="/livescores"

          element={<LiveScores />}

        />



        <Route

          path="/match/:id"

          element={<MatchDetails />}

        />







        {/* FIXTURES */}

        <Route

          path="/fixtures"

          element={<Fixtures />}

        />







        {/* STANDINGS */}

        <Route

          path="/standings"

          element={<Standings />}

        />



        <Route

          path="/standings/:leagueId"

          element={<Standings />}

        />







        {/* TEAMS */}

        <Route

          path="/teams"

          element={<Teams />}

        />



        <Route

          path="/team/:id"

          element={<TeamDetails />}

        />








        {/* PLAYERS */}

        <Route

          path="/players"

          element={<Players />}

        />



        <Route

          path="/player/:id"

          element={<PlayerDetails />}

        />








        {/* FAVORITES */}

        <Route

          path="/favorites"

          element={<Favorites />}

        />








        {/* NEWS */}

        <Route

          path="/news"

          element={<News />}

        />








        {/* OTHER SPORTS */}

        <Route

          path="/basketball"

          element={<Basketball />}

        />



        <Route

          path="/cricket"

          element={<Cricket />}

        />



        <Route

          path="/tennis"

          element={<Tennis />}

        />







        {/* DEFAULT */}

        <Route

          path="*"

          element={<Home />}

        />



      </Routes>

      <Analytics />

    </BrowserRouter>

  );

}