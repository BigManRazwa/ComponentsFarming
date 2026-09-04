import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { ButtonExample } from './pages/examples/ButtonExample'
import { CardExample } from './pages/examples/CardExample'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/components/button" element={<ButtonExample />} />
      <Route path="/components/card" element={<CardExample />} />
    </Routes>
  )
}
