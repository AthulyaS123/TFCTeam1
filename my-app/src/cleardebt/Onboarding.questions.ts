import type { Question } from './onboarding.types'

export const QUESTIONS: Question[] = [
  {
    id: 'enrollmentStatus',
    text: 'Are you currently pursuing your degree?',
    options: [
      { label: "Yes, I'm a student.", value: 'student' },
      { label: 'No, I graduated.', value: 'graduated' },
    ],
  },
  {
    id: 'loanType',
    text: 'Do you have student loans?',
    options: [
      { label: 'Yes, federal loans', value: 'federal' },
      { label: 'Yes, private loans', value: 'private' },
      { label: 'Both federal & private', value: 'both' },
      { label: 'Not sure', value: 'unsure' },
    ],
  },
  {
    id: 'paymentStatus',
    text: 'Are you actively making payments?',
    options: [
      { label: 'Yes, every month', value: 'monthly' },
      { label: 'Sometimes — it varies', value: 'sometimes' },
      { label: 'No, in deferment or grace period', value: 'deferred' },
      { label: "No, I'm behind", value: 'behind' },
    ],
  },
  {
    id: 'debtRange',
    text: 'How much do you owe?',
    options: [
      { label: 'Under $10,000', value: 'under10k' },
      { label: '$10,000 – $30,000', value: '10k-30k' },
      { label: '$30,000 – $60,000', value: '30k-60k' },
      { label: '$60,000 – $100,000', value: '60k-100k' },
      { label: 'Over $100,000', value: 'over100k' },
    ],
  },
  {
    id: 'knowsRates',
    text: 'Do you know your interest rates?',
    options: [
      { label: 'Yes — I track them closely', value: 'yes' },
      { label: 'Roughly — somewhere around 5–8%', value: 'roughly' },
      { label: 'Honestly, no idea', value: 'no' },
    ],
  },
  {
    id: 'handlingStyle',
    text: 'How are you currently handling your loans?',
    options: [
      { label: 'Paying the minimum only', value: 'minimum' },
      { label: 'Paying extra when I can', value: 'extra' },
      { label: 'On an income-driven plan', value: 'income-driven' },
      { label: 'Enrolled in refinancing', value: 'refinancing' },
    ],
  },
]