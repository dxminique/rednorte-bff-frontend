import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import PortalPacientes from './pages/PortalPacientes'
import PanelAdmin from './pages/PanelAdmin'

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: '1rem', background: '#6096dd' }}>
        <Link to="/portal" style={{ color: 'white', marginRight: '1rem' }}>
          Portal Pacientes
        </Link>
        <Link to="/admin" style={{ color: 'white' }}>
          Panel Admin
        </Link>
      </nav>
      <Routes>
        <Route path="/portal" element={<PortalPacientes />} />
        <Route path="/admin" element={<PanelAdmin />} />
        <Route path="/" element={<PanelAdmin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App