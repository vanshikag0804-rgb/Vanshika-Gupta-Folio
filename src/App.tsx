import { Navigate, Route, Routes } from 'react-router-dom'
import { LenisProvider } from './lib/lenis'
import { useRouteScroll } from './lib/navigation'
import CaseStudy from './pages/CaseStudy'
import Contact from './pages/Contact'
import Home from './pages/Home'

function AppRoutes() {
  useRouteScroll()
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/work/:id" element={<CaseStudy />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <LenisProvider>
      <AppRoutes />
    </LenisProvider>
  )
}
