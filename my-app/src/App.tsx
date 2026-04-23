import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import SignIn from './SignIn'
import ClearDebtBootstrap from './cleardebt/ClearDebtBootstrap'
import OnboardingPage from './cleardebt/OnboardingPage' // assuming default export

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.VITE_APP_BASE_PATH ?? '/'}>
      <Routes>
        {/* Core pages */}
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />

        {/* ClearDebt feature module */}
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/dashboard/*" element={<ClearDebtBootstrap />} />
      </Routes>
    </BrowserRouter>
  )
}