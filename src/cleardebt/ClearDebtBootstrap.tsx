import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

export default function ClearDebtBootstrap() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center text-slate-400">
          Loading ClearDebt…
        </div>
      }
    >
      <Outlet />
    </Suspense>
  )
}
