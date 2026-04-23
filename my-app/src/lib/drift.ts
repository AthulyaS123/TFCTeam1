import type { OnboardingAnswers, StrategyResult } from '../lib/types'
import { calculateStrategy } from '../lib/planCalculator'

// Stub: replace with real fetch() calls when backend is ready
export async function fetchStrategy(answers: OnboardingAnswers): Promise<StrategyResult> {
  // Simulate network latency
  await new Promise((r) => setTimeout(r, 800))
  return calculateStrategy(answers)
}

export async function signIn(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  await new Promise((r) => setTimeout(r, 600))
  if (!email.includes('@')) return { success: false, error: 'Invalid email address.' }
  if (password.length < 6) return { success: false, error: 'Password must be at least 6 characters.' }
  return { success: true }
}

export async function signUp(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  await new Promise((r) => setTimeout(r, 600))
  if (!email.includes('@')) return { success: false, error: 'Invalid email address.' }
  if (password.length < 6) return { success: false, error: 'Password must be at least 6 characters.' }
  return { success: true }
}
