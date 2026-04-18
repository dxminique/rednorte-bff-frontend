import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import PortalPacientes from './pages/PortalPacientes'
import PanelAdmin from './pages/PanelAdmin'
import GestionPacientes from './pages/GestionPacientes'
import Dashboard from './pages/Dashboard'

function NavBar({ rol, setRol }: { rol: string, setRol: (r: string) => void }) {
  const navigate = useNavigate()

  const cambiarRol = (nuevoRol: string) => {
    setRol(nuevoRol)
    if (nuevoRol === 'admin') navigate('/admin')
    if (nuevoRol === 'paciente') navigate('/portal')
    if (nuevoRol === 'medico') navigate('/dashboard')
  }

  return (
    <nav>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ color: '#0D9488', fontWeight: 700, fontSize: '16px' }}>
          RedNorte
        </span>

        <select
          title="Seleccionar rol"
          value={rol}
          onChange={e => cambiarRol(e.target.value)}
          style={{
            padding: '0.3rem 0.6rem',
            borderRadius: '6px',
            border: 'none',
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          <option value="admin">Administrativo</option>
          <option value="paciente">Paciente</option>
          <option value="medico">Médico</option>
        </select>

        {rol === 'paciente' && (
          <Link to="/portal">Portal Pacientes</Link>
        )}

        {rol === 'admin' && (
          <>
            <Link to="/admin">Panel Admin</Link>
            <Link to="/pacientes">Gestión Pacientes</Link>
          </>
        )}

        {rol === 'medico' && (
          <Link to="/dashboard">Dashboard</Link>
        )}
      </div>
    </nav>
  )
}

function App() {
  const [rol, setRol] = useState('admin')

  return (
    <BrowserRouter>
      <NavBar rol={rol} setRol={setRol} />
<Routes>
  <Route path="/portal" element={<PortalPacientes />} />
  <Route path="/admin" element={<PanelAdmin />} />
  <Route path="/pacientes" element={<GestionPacientes />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/" element={<Navigate to="/admin" />} />
</Routes>
    </BrowserRouter>
  )
}

export default App