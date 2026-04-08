import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <style>{`
        :root {
          --bg: #071024;
          --bg-soft: #101d3d;
          --card: #12214a;
          --text: #e6ebff;
          --muted: #b8c1e8;
          --accent: #60a5fa;
          --accent-2: #34d399;
          --border: rgba(184, 193, 232, 0.24);
        }

        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto;
          background: radial-gradient(circle at top right, #1b3271 0%, var(--bg) 48%);
          color: var(--text);
        }

        .container {
          width: min(1120px, 92%);
          margin: 0 auto;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.2rem 0;
        }

        .logo {
          font-weight: 700;
        }

        .logo span {
          color: var(--accent-2);
        }

        .nav-cta {
          border: 1px solid var(--border);
          padding: 0.5rem 1rem;
          border-radius: 999px;
          color: white;
          background: transparent;
          cursor: pointer;
        }

        .hero {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 2rem;
          padding: 3rem 0;
        }

        h1 {
          font-size: 2.5rem;
        }

        .actions {
          margin-top: 1.5rem;
          display: flex;
          gap: 1rem;
        }

        .btn {
          padding: 0.8rem 1.2rem;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 600;
          display: inline-block;
        }

        .btn-primary {
          background: linear-gradient(120deg, var(--accent), #4f7bff);
          color: white;
        }

        .btn-secondary {
          border: 1px solid var(--border);
          color: white;
          background: transparent;
          cursor: pointer;
        }

        .hero-card {
          background: var(--card);
          padding: 1rem;
          border-radius: 16px;
        }

        .section {
          padding: 3rem 0;
        }

        .features {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .feature {
          background: var(--bg-soft);
          padding: 1rem;
          border-radius: 12px;
        }

        .cta {
          margin: 2rem 0;
          padding: 1.5rem;
          border-radius: 16px;
          background: var(--bg-soft);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      `}</style>

      <header className="container header">
        <div className="logo">
          Freedom<span>Path</span>
        </div>

        {/* scroll instead of anchor */}
        <button
          className="nav-cta"
          onClick={() =>
            document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Start Planning
        </button>
      </header>

      <main className="container">
        <section className="hero">
          <div>
            <h1>
              Plan your loan payoff and reach financial freedom faster.
            </h1>

            <p style={{ color: "#b8c1e8" }}>
              FreedomPath helps students turn complex debt into a clear roadmap.
            </p>

            <div className="actions">
              <Link to="/signin" className="btn btn-primary">
                Create Free Account
              </Link>

              <button
                className="btn btn-secondary"
                onClick={() =>
                  document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                See Features
              </button>
            </div>
          </div>

          <aside className="hero-card">
            <h3>Forecast Snapshot</h3>
            <p><strong>$18,420</strong> saved</p>
            <p><strong>3 years</strong> faster</p>
          </aside>
        </section>

        <section id="features" className="section">
          <h2>Everything you need</h2>

          <div className="features">
            <div className="feature">
              <h3>Track loans</h3>
              <p>Import balances, rates, and income projections.</p>
            </div>

            <div className="feature">
              <h3>Simulate plans</h3>
              <p>Compare different repayment strategies.</p>
            </div>

            <div className="feature">
              <h3>Compare options</h3>
              <p>Refinance vs invest vs payoff.</p>
            </div>

            <div className="feature">
              <h3>Best plan</h3>
              <p>Get optimized recommendation.</p>
            </div>
          </div>
        </section>

        <section className="cta">
          <div>
            <h2>Start today</h2>
            <p>Build your path to financial freedom.</p>
          </div>

          <Link to="/signin" className="btn btn-primary">
            Create Free Account
          </Link>
        </section>
      </main>
    </>
  );
}

export default Home;