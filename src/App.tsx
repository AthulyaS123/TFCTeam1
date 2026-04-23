import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ClearDebtBootstrap from './cleardebt/ClearDebtBootstrap.tsx'
import Home from './Home.tsx'
import SignIn from './SignIn.tsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<ClearDebtBootstrap />} />
      </Routes>
    </BrowserRouter>
  )
}
