import { Link } from "react-router-dom";

function SignIn() {
  return (
    <div style={{ padding: "2rem", color: "white", background: "#0b1220", minHeight: "100vh" }}>
      <h1>Sign In</h1>

      <input
        placeholder="Email"
        style={{ display: "block", margin: "10px 0", padding: "8px" }}
      />

      <input
        type="password"
        placeholder="Password"
        style={{ display: "block", margin: "10px 0", padding: "8px" }}
      />

      <button style={{ marginTop: "10px", padding: "10px 16px" }}>
        Sign In
      </button>

      <br /><br />

      <Link to="/">⬅ Back to Home</Link>
    </div>
  );
}

export default SignIn;