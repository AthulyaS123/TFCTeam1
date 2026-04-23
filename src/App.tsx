import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ClearDebtBootstrap from './cleardebt/ClearDebtBootstrap.tsx'
import Home from './Home.tsx'
import SignIn from './SignIn.tsx'

<<<<<<< HEAD
const ClearDebtLogin = lazy(() => import('../../ClearDebt/client/src/pages/Login.tsx'))
const ClearDebtLayout = lazy(() => import('../../ClearDebt/client/src/components/Layout.tsx'))
const ClearDebtDashboard = lazy(() => import('../../ClearDebt/client/src/pages/Dashboard.tsx'))
const ClearDebtAddLoan = lazy(() => import('../../ClearDebt/client/src/pages/AddLoan.tsx'))
const ClearDebtLoanProgress = lazy(() => import('../../ClearDebt/client/src/pages/LoanProgress.tsx'))
const ClearDebtOnboarding = lazy(() => import('../../ClearDebt/client/src/pages/Onboarding.tsx'))
const ClearDebtInterest = lazy(() => import('../../ClearDebt/client/src/pages/InterestSimulator.tsx'))
const ClearDebtMonthly = lazy(() => import('../../ClearDebt/client/src/pages/MonthlySimulator.tsx'))

=======
>>>>>>> 27aa948095b21caabe0224f9441b44dbca6f6d29
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
<<<<<<< HEAD
        <Route path="/dashboard" element={<ClearDebtBootstrap />}>
          <Route path="login" element={<ClearDebtLogin />} />
          <Route element={<ClearDebtLayout />}>
            <Route index element={<ClearDebtDashboard />} />
            <Route path="add-loan" element={<ClearDebtAddLoan />} />
            <Route path="loan/:loanId" element={<ClearDebtLoanProgress />} />
            <Route path="onboarding" element={<ClearDebtOnboarding />} />
            <Route path="simulator/interest" element={<ClearDebtInterest />} />
            <Route path="simulator/monthly" element={<ClearDebtMonthly />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Route>
=======
        <Route path="/dashboard" element={<ClearDebtBootstrap />} />
>>>>>>> 27aa948095b21caabe0224f9441b44dbca6f6d29
      </Routes>
    </BrowserRouter>
  )
}
