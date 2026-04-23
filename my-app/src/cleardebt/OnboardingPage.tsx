import { useState } from 'react'
import { Link } from 'react-router-dom'
import { QUESTIONS } from './Onboarding.questions'
import { calculateStrategy } from './Onboarding.calc'
import type { OnboardingAnswers, StrategyResult } from './onboarding.types'
import './style.css'

type Screen = 'welcome' | 'questions' | 'result'

// ─── helpers ───────────────────────────────────────────
function fmt(n: number) {
  return '$' + n.toLocaleString('en-US')
}

// ─── Welcome ───────────────────────────────────────────
function Welcome({ onStart }: { onStart: () => void }) {
  return (
    <div className="ob-screen ob-welcome">
      <Link to="/" className="ob-back">← FreedomPath</Link>

      <div className="ob-welcome-body">
        <div className="ob-logo-sq"><span>D</span></div>
        <p className="ob-eyebrow">Leave your debt in the dust</p>
        <h1 className="ob-headline">One plan.<br /><em>Built around you.</em></h1>
        <p className="ob-desc">
          Answer 6 quick questions. We'll build your personalized debt-free strategy in seconds.
        </p>
      </div>

      <div className="ob-dark-card">
        <p className="ob-card-sub">Our users save an average of</p>
        <p className="ob-card-stat">$11,200 <span>in interest.</span></p>
        <button className="ob-btn-primary" onClick={onStart}>Get Started →</button>
        <p className="ob-footnote">Free. No card required.</p>
      </div>
    </div>
  )
}

// ─── Question ──────────────────────────────────────────
function QuestionCard({
  questionIndex,
  total,
  onAnswer,
  onBack,
}: {
  questionIndex: number
  total: number
  onAnswer: (value: string) => void
  onBack: () => void
}) {
  const [selected, setSelected] = useState<string | null>(null)
  const q = QUESTIONS[questionIndex]

  const pick = (value: string) => {
    setSelected(value)
    setTimeout(() => { onAnswer(value); setSelected(null) }, 280)
  }

  return (
    <div className="ob-screen ob-question">
      {/* dark top bar */}
      <div className="ob-topbar">
        <button className="ob-back-btn" onClick={onBack}>←</button>
        <span className="ob-topbar-logo">FreedomPath</span>
      </div>

      <div className="ob-q-header">
        <p className="ob-q-label">Question {questionIndex + 1} of {total}</p>
        <h2 className="ob-q-text">{q.text}</h2>
      </div>

      <div className="ob-q-body">
        <div className="ob-options">
          {q.options.map((opt) => (
            <button
              key={opt.value}
              className={`ob-option${selected === opt.value ? ' ob-option--selected' : ''}`}
              onClick={() => pick(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="ob-dots">
          {Array.from({ length: total }).map((_, i) => (
            <span key={i} className={`ob-dot${i === questionIndex ? ' ob-dot--active' : ''}`} />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Result ────────────────────────────────────────────
function ResultScreen({ result, onRestart }: { result: StrategyResult; onRestart: () => void }) {
  return (
    <div className="ob-screen ob-result">
      <div className="ob-topbar">
        <span className="ob-topbar-logo ob-topbar-logo--yellow">FreedomPath</span>
      </div>

      <h1 className="ob-result-title">Your Personalized<br />Strategy Preview</h1>

      {/* Current plan */}
      <div className="ob-plan-card">
        <p className="ob-plan-label">Your current plan</p>
        <div className="ob-plan-row">
          <span className="ob-plan-icon">⏰</span>
          <div>
            <p className="ob-plan-val">{result.currentYears} years</p>
            <p className="ob-plan-sub">To be debt free</p>
          </div>
        </div>
        <div className="ob-plan-row">
          <span className="ob-plan-icon">💸</span>
          <div>
            <p className="ob-plan-val ob-plan-val--muted">{fmt(result.currentInterest)} in interest</p>
            <p className="ob-plan-sub">At your current pace</p>
          </div>
        </div>
      </div>

      {/* Optimized plan */}
      <div className="ob-plan-card ob-plan-card--rec">
        <span className="ob-rec-badge">Recommended</span>
        <p className="ob-plan-label ob-plan-label--green">FreedomPath optimized plan</p>
        <div className="ob-plan-row">
          <span className="ob-plan-icon ob-plan-icon--green">💰</span>
          <div>
            <p className="ob-plan-val ob-plan-val--green">{fmt(result.optimizedMonthly)} / mo</p>
            <p className="ob-plan-sub">Monthly payment</p>
          </div>
        </div>
        <div className="ob-plan-row">
          <span className="ob-plan-icon ob-plan-icon--green">⚡</span>
          <div>
            <p className="ob-plan-val ob-plan-val--green">{result.optimizedYears} years</p>
            <p className="ob-plan-sub">To be debt free</p>
          </div>
        </div>
      </div>

      {/* Savings callout */}
      <div className="ob-savings">
        <p>FreedomPath cuts that down to {result.optimizedYears} years and</p>
        <strong>saves you {fmt(result.interestSaved)} in interest</strong>
      </div>

      <div className="ob-result-actions">
        <Link to="/signin" className="btn btn-primary ob-see-plan">
          See My Full Plan →
        </Link>
        <button className="ob-ghost" onClick={onRestart}>Start over</button>
      </div>
    </div>
  )
}

// ─── Page orchestrator ─────────────────────────────────
export function OnboardingPage() {
  const [screen, setScreen] = useState<Screen>('welcome')
  const [qIndex, setQIndex] = useState(0)
  const [answers, setAnswers] = useState<Partial<OnboardingAnswers>>({})
  const [result, setResult] = useState<StrategyResult | null>(null)

  const handleAnswer = (value: string) => {
    const key = QUESTIONS[qIndex].id
    const updated = { ...answers, [key]: value } as Partial<OnboardingAnswers>
    setAnswers(updated)

    if (qIndex < QUESTIONS.length - 1) {
      setQIndex(qIndex + 1)
    } else {
      setResult(calculateStrategy(updated as OnboardingAnswers))
      setScreen('result')
    }
  }

  const handleBack = () => {
    if (qIndex === 0) setScreen('welcome')
    else setQIndex(qIndex - 1)
  }

  const restart = () => {
    setScreen('welcome')
    setQIndex(0)
    setAnswers({})
    setResult(null)
  }

  return (
    <div className="ob-shell">
      {screen === 'welcome' && <Welcome onStart={() => setScreen('questions')} />}
      {screen === 'questions' && (
        <QuestionCard
          key={qIndex}
          questionIndex={qIndex}
          total={QUESTIONS.length}
          onAnswer={handleAnswer}
          onBack={handleBack}
        />
      )}
      {screen === 'result' && result && (
        <ResultScreen result={result} onRestart={restart} />
      )}
    </div>
  )
}
export default OnboardingPage