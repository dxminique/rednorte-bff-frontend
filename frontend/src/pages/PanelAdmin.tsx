import { useEffect, useState } from 'react'
import axios from 'axios'

const BFF_URL = 'http://localhost:3001'

interface Paciente {
  id: number
  pacienteNombre: string
  pacienteRut: string
  tipoAtencion: string
  especialidad: string
  prioridad: number
  estado: string
  fechaIngreso: string
}

export default function PanelAdmin() {
  const [pacientes, setPacientes] = useState<Paciente[]>([])
  const [totalEnEspera, setTotalEnEspera] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`${BFF_URL}/admin/lista`)
      .then(res => {
        setPacientes(res.data.pacientes)
        setTotalEnEspera(res.data.totalEnEspera)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <p>Cargando...</p>

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Panel Administrativo — RedNorte</h1>
      <p><strong>Total en espera:</strong> {totalEnEspera}</p>
      <table border={1} cellPadding={8} style={{ width: '100%', marginTop: '1rem' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>RUT</th>
            <th>Tipo</th>
            <th>Especialidad</th>
            <th>Prioridad</th>
            <th>Estado</th>
            <th>Fecha ingreso</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.pacienteNombre}</td>
              <td>{p.pacienteRut}</td>
              <td>{p.tipoAtencion}</td>
              <td>{p.especialidad}</td>
              <td>{p.prioridad}</td>
              <td>{p.estado}</td>
              <td>{p.fechaIngreso}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}