import { Link } from "react-router-dom";
import "./Navbar.css";


export default function Navbar() {

  return (

    <nav className="navbar">


      <div className="logo">
        🏟️ SPORTS HUB
      </div>



      <div className="nav-links">


        <Link to="/">
          🏠 Home
        </Link>


        <Link to="/football">
          ⚽ Football
        </Link>


        <Link to="/basketball">
          🏀 Basketball
        </Link>


        <Link to="/cricket">
          🏏 Cricket
        </Link>


        <Link to="/tennis">
          🎾 Tennis
        </Link>


        <Link to="/livescores">
          🔴 Live
        </Link>


        <Link to="/news">
          📰 News
        </Link>


        <Link to="/favorites">
          ⭐ Favorites
        </Link>


      </div>


    </nav>

  );

}