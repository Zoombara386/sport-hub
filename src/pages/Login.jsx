import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function login() {

    const account = JSON.parse(localStorage.getItem("account"));

    if (!account) {
      alert("No account found. Please sign up first.");
      return;
    }

    if (
      account.email === email &&
      account.password === password
    ) {

      // Save logged-in user
      localStorage.setItem("user", account.username);

      // Tell Navbar to refresh
      window.dispatchEvent(new Event("userChanged"));

      alert("Login Successful!");

      // Go to Home page
      navigate("/");

    } else {

      alert("Invalid email or password.");

    }

  }

  return (
    <div className="container">

      <div
        className="card"
        style={{
          maxWidth: "400px",
          margin: "30px auto",
        }}
      >

        <h1>🔐 Login</h1>

        <br />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
          }}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
          }}
        />

        <br /><br />

        <button
          onClick={login}
          style={{ width: "100%" }}
        >
          Login
        </button>

        <br /><br />

        <p>
          Don't have an account?{" "}
          <Link to="/signup">
            Signup
          </Link>
        </p>

      </div>

    </div>
  );
}