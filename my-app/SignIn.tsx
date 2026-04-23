import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // TODO: wire up Amplify Auth here
    await new Promise((r) => setTimeout(r, 600))
    setLoading(false)
    navigate('/onboarding')
  }

  return (
    <div className="signin-page">
      <div className="signin-card">
        <Link to="/" className="signin-back">← Back</Link>

        <div className="signin-logo">
          Freedom<span>Path</span>
        </div>

        <h1 className="signin-title">Welcome back</h1>
        <p className="signin-sub">Sign in to continue to your plan.</p>

        <form className="signin-form" onSubmit={handleSubmit}>
          <div className="signin-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="signin-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary signin-btn" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In →'}
          </button>
        </form>

        <p className="signin-footer">
          Don't have an account?{' '}
          <Link to="/onboarding">Get started free</Link>
        </p>
      </div>
    </div>
  )
}