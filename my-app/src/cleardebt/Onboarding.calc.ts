import type { OnboardingAnswers, StrategyResult } from './onboarding.types'

const DEBT_MIDPOINTS: Record<OnboardingAnswers['debtRange'], number> = {
  'under10k': 7_500,
  '10k-30k': 20_000,
  '30k-60k': 45_000,
  '60k-100k': 80_000,
  'over100k': 120_000,
}

const BASE_RATES: Record<OnboardingAnswers['loanType'], number> = {
  federal: 0.055,
  private: 0.075,
  both: 0.065,
  unsure: 0.06,
}

const PAYMENT_MULT: Record<OnboardingAnswers['paymentStatus'], number> = {
  monthly: 1.0,
  sometimes: 0.85,
  deferred: 0.0,
  behind: 0.5,
}

function amortize(principal: number, annualRate: number, monthlyPayment: number) {
  if (monthlyPayment <= 0) return { months: 360, interest: Math.round(principal * 0.9) }
  const r = annualRate / 12
  let balance = principal
  let interest = 0
  let months = 0
  while (balance > 0 && months < 600) {
    const i = balance * r
    interest += i
    balance = balance + i - monthlyPayment
    months++
  }
  return { months, interest: Math.round(interest) }
}

export function calculateStrategy(a: OnboardingAnswers): StrategyResult {
  const principal = DEBT_MIDPOINTS[a.debtRange]
  const rate = BASE_RATES[a.loanType]
  const mult = PAYMENT_MULT[a.paymentStatus]

  // Current: minimum payment
  const minPayment = Math.max(principal * 0.015 * mult, 50)
  const current = amortize(principal, rate, minPayment)

  // Optimized: target 5-year payoff
  const r = rate / 12
  const n = 60
  const optPayment = Math.ceil((principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1))
  const optimized = amortize(principal, rate, optPayment)

  return {
    currentYears: Math.round(current.months / 12),
    currentInterest: current.interest,
    optimizedMonthly: optPayment,
    optimizedYears: Math.round(optimized.months / 12),
    optimizedInterest: optimized.interest,
    interestSaved: Math.max(0, current.interest - optimized.interest),
    yearsSaved: Math.max(0, Math.round((current.months - optimized.months) / 12)),
  }
}