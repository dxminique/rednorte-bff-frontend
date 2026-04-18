import { useState } from 'react'
import axios from 'axios'

const BFF_URL = 'http://localhost:3001'

interface Ficha {
  id: number
  pacienteNombre: string
  pacienteRut: string
  tipoAtencion: string
  especialidad: string
  prioridad: number
  estado: string
  fechaIngreso: string
}

export default function PortalPacientes() {
  const [ficha, setFicha] = useState<Ficha | null>(null)
  const [totalEnEspera, setTotalEnEspera] = useState<number>(0)
  const [loading, setLoading] = useState(false)
  const [busquedaId, setBusquedaId] = useState('')

const [buscado, setBuscado] = useState(false)

    const buscarPaciente = () => {
    if (!busquedaId) return
    setLoading(true)
    setBuscado(false)
    axios.get(`${BFF_URL}/portal/estado/${busquedaId}`)
        .then(res => {
        setFicha(res.data.ficha)
        setTotalEnEspera(res.data.totalEnEspera)
        setLoading(false)
        setBuscado(true)
        })
        .catch(() => {
        setFicha(null)
        setLoading(false)
        setBuscado(true)
        })
    }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Portal Pacientes — RedNorte</h1>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="number"
          placeholder="Ingresa tu ID de paciente"
          value={busquedaId}
          onChange={e => setBusquedaId(e.target.value)}
          style={{ padding: '0.5rem', marginRight: '0.5rem', width: '250px' }}
        />
        <button onClick={buscarPaciente} style={{ padding: '0.5rem 1rem' }}>
          Buscar
        </button>
      </div>

      {loading && <p>Cargando...</p>}

      {ficha && (
        <div>
          <h2>Mi estado en lista de espera</h2>
          <p><strong>Nombre:</strong> {ficha.pacienteNombre}</p>
          <p><strong>RUT:</strong> {ficha.pacienteRut}</p>
          <p><strong>Especialidad:</strong> {ficha.especialidad}</p>
          <p><strong>Tipo atención:</strong> {ficha.tipoAtencion}</p>
          <p><strong>Prioridad:</strong> {ficha.prioridad}</p>
          <p><strong>Estado:</strong> {ficha.estado}</p>
          <p><strong>Fecha ingreso:</strong> {ficha.fechaIngreso}</p>
          <hr />
          <p><strong>Total pacientes en espera:</strong> {totalEnEspera}</p>
        </div>
      )}
{!loading && !ficha && buscado && (
  <p>No se encontró información para ese ID</p>
)}
    </div>
  )
}
