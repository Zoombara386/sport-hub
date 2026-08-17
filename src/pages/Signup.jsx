import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function signup() {

    if (!username || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    const account = {
      username,
      email,
      password,
    };

    // Save account
    localStorage.setItem("account", JSON.stringify(account));

    alert("Account created successfully!");

    // Go to Login page
    navigate("/login");
  }

  return (
    <div className="container">

      <div className="card" style={{ maxWidth: "400px", margin: "30px auto" }}>

        <h1>📝 Signup</h1>

        <br />

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: "100%", padding: "10px" }}
        />

        <br /><br />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "10px" }}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "10px" }}
        />

        <br /><br />

        <button
          onClick={signup}
          style={{ width: "100%" }}
        >
          Create Account
        </button>

        <br /><br />

        <p>
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>

      </div>

    </div>
  );
}