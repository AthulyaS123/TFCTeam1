import { Link } from 'react-router-dom'

export default function Home() {
  const scrollToFeatures = () =>
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <>
      <header className="container header">
        <div className="logo">
          Freedom<span>Path</span>
        </div>
        <div className="header-actions">
          <Link to="/dashboard" className="nav-cta nav-cta--link">
            ClearDebt
          </Link>
          <button type="button" className="nav-cta" onClick={scrollToFeatures}>
            Start Planning
          </button>
        </div>
      </header>

      <main className="container">
        <section className="hero">
          <div>
            <div className="eyebrow">Student-first finance planning</div>
            <h1>Plan your loan payoff and reach financial freedom faster.</h1>
            <p>
              FreedomPath helps students and recent graduates turn complex debt decisions into a
              clear, personalized roadmap. Model your future, compare options, and pick the strategy
              that saves the most money.
            </p>
            <div className="actions">
              <Link to="/signin" className="btn btn-primary">
                Get Your Plan
              </Link>
              <button type="button" className="btn btn-secondary" onClick={scrollToFeatures}>
                See Features
              </button>
              <Link to="/dashboard" className="btn btn-secondary">
                Open ClearDebt
              </Link>
            </div>
          </div>

          <aside className="hero-card" aria-label="Forecast preview">
            <h3>Forecast Snapshot</h3>
            <div className="stat">
              <small>Estimated Interest Saved</small>
              <strong>$18,420</strong>
            </div>
            <div className="stat">
              <small>Time Reduced</small>
              <strong>3 years 4 months</strong>
            </div>
            <div className="stat">
              <small>Most Cost-Effective Strategy</small>
              <strong>Hybrid Refi + Targeted Paydown</strong>
            </div>
          </aside>
        </section>

        <section id="features" className="section">
          <h2>Everything you need to make smarter repayment decisions</h2>
          <p className="section-intro">
            The platform brings your debt, income, and growth options into one view so you can act
            with confidence.
          </p>
          <div className="features">
            <article className="feature">
              <h3>Ingests loan balances, rates, and income projections</h3>
              <p>
                Import all loans in minutes, including balances, APRs, and terms, then layer in your
                projected income path.
              </p>
            </article>
            <article className="feature">
              <h3>Simulates different repayment strategies</h3>
              <p>
                Test avalanche, snowball, fixed-payment, and custom strategies with realistic
                month-by-month outcomes.
              </p>
            </article>
            <article className="feature">
              <h3>Compares repayment, refinancing, and investment scenarios</h3>
              <p>
                See side-by-side tradeoffs for paying down debt aggressively, refinancing, or
                investing while making minimum payments.
              </p>
            </article>
            <article className="feature">
              <h3>Recommends the most cost-effective plan</h3>
              <p>
                Get a clear recommendation based on total interest, payoff timeline, risk tolerance,
                and long-term net worth impact.
              </p>
            </article>
          </div>
        </section>

        <section id="get-started" className="cta">
          <div>
            <h2>Start building your path to financial freedom today.</h2>
            <p>
              Join students using data-driven plans to reduce interest and become debt-free sooner.
            </p>
          </div>
          <div className="cta-actions">
            <Link to="/signin" className="btn btn-primary">
              Create Free Account
            </Link>
            <Link to="/dashboard" className="btn btn-secondary">
              Launch ClearDebt
            </Link>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">© 2026 FreedomPath. Built for student success.</div>
      </footer>
    </>
  )
}
