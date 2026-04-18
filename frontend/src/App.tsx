import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import PortalPacientes from './pages/PortalPacientes'
import PanelAdmin from './pages/PanelAdmin'
import GestionPacientes from './pages/GestionPacientes'

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: '1rem', background: '#0B1F3A' }}>
        <Link to="/portal" style={{ color: 'white', marginRight: '1rem' }}>
          Portal Pacientes
        </Link>
        <Link to="/admin" style={{ color: 'white', marginRight: '1rem' }}>
          Panel Admin
        </Link>
        <Link to="/pacientes" style={{ color: 'white' }}>
          Gestión Pacientes
        </Link>
      </nav>
      <Routes>
        <Route path="/portal" element={<PortalPacientes />} />
        <Route path="/admin" element={<PanelAdmin />} />
        <Route path="/pacientes" element={<GestionPacientes />} />
        <Route path="/" element={<PanelAdmin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App