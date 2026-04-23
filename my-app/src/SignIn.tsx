// import { Link } from "react-router-dom";

// function SignIn() {
//   return (
//     <div style={{ padding: "2rem", color: "white", background: "#0b1220", minHeight: "100vh" }}>
//       <h1>Sign In</h1>

//       <input
//         placeholder="Email"
//         style={{ display: "block", margin: "10px 0", padding: "8px" }}
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         style={{ display: "block", margin: "10px 0", padding: "8px" }}
//       />

//       <button style={{ marginTop: "10px", padding: "10px 16px" }}>
//         Sign In
//       </button>

//       <br /><br />

//       <Link to="/">⬅ Back to Home</Link>
//     </div>
//   );
// }

// export default SignIn;
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function SignIn() {
//   const [identifier, setIdentifier] = useState(""); // email or phone
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       // determine if identifier is email or phone
//       const isEmail = /@/.test(identifier);
//       const payload = { password };

//       if (isEmail) payload.email = identifier;
//       else payload.phone = identifier;

//       const res = await fetch("http://localhost:8080/api/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.error || "Login failed");
//       }

//       // optional: store user locally
//       localStorage.setItem("user", JSON.stringify(data.user));

//       // redirect after login
//       navigate("/");
//     } catch (err) {
//       setError(err.message || "Network error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: "#0b1220",
//         color: "white",
//         padding: "2rem",
//       }}
//     >
//       <button
//         onClick={() => navigate("/")}
//         style={{
//           marginBottom: "1rem",
//           background: "none",
//           border: "none",
//           color: "#9ca3af",
//           cursor: "pointer",
//         }}
//       >
//         ← Back
//       </button>

//       <h2 style={{ marginBottom: "1.5rem" }}>Sign In</h2>

//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Phone number or email"
//           value={identifier}
//           onChange={(e) => setIdentifier(e.target.value)}
//           required
//           style={{
//             display: "block",
//             width: "100%",
//             marginBottom: "1rem",
//             padding: "10px",
//             borderRadius: "6px",
//             border: "1px solid #374151",
//             background: "#111827",
//             color: "white",
//           }}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           style={{
//             display: "block",
//             width: "100%",
//             marginBottom: "1rem",
//             padding: "10px",
//             borderRadius: "6px",
//             border: "1px solid #374151",
//             background: "#111827",
//             color: "white",
//           }}
//         />

//         {error && (
//           <div style={{ color: "#f87171", marginBottom: "1rem" }}>
//             {error}
//           </div>
//         )}

//         <button
//           type="submit"
//           disabled={loading}
//           style={{
//             padding: "10px 16px",
//             background: "#2563eb",
//             border: "none",
//             borderRadius: "6px",
//             color: "white",
//             cursor: "pointer",
//             width: "100%",
//           }}
//         >
//           {loading ? "Signing in..." : "Sign In"}
//         </button>
//       </form>
//     </div>
//   );
// }
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

export default function SignIn() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const isEmail = /@/.test(identifier);
      const payload = { password };

      if (isEmail) payload.email = identifier;
      else payload.phone = identifier;

      const res = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    } catch (err) {
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = (credentialResponse) => {
    console.log("Google login success:", credentialResponse);

    // OPTIONAL: send credentialResponse.credential to backend

    localStorage.setItem("user", JSON.stringify(credentialResponse));
    navigate("/");
  };

  const handleGoogleError = () => {
    setError("Google Sign-In failed");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0b1220",
        color: "white",
        padding: "2rem",
      }}
    >
      <button
        onClick={() => navigate("/")}
        style={{
          marginBottom: "1rem",
          background: "none",
          border: "none",
          color: "#9ca3af",
          cursor: "pointer",
        }}
      >
        ← Back
      </button>

      <h2 style={{ marginBottom: "1.5rem" }}>Sign In</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Phone number or email"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
          style={{
            display: "block",
            width: "100%",
            marginBottom: "1rem",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #374151",
            background: "#111827",
            color: "white",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            display: "block",
            width: "100%",
            marginBottom: "1rem",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #374151",
            background: "#111827",
            color: "white",
          }}
        />

        {error && (
          <div style={{ color: "#f87171", marginBottom: "1rem" }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 16px",
            background: "#2563eb",
            border: "none",
            borderRadius: "6px",
            color: "white",
            cursor: "pointer",
            width: "100%",
          }}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      {/* 🔥 Google Sign-In Button */}
      <div style={{ marginTop: "2rem" }}>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
        />
      </div>
    </div>
  );
}