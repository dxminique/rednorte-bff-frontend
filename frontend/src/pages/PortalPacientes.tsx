import { useEffect, useState } from 'react'
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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`${BFF_URL}/portal/estado/1`)
      .then(res => {
        setFicha(res.data.ficha)
        setTotalEnEspera(res.data.totalEnEspera)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <p>Cargando...</p>
  if (!ficha) return <p>No se encontró información</p>

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Portal Pacientes — RedNorte</h1>
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
  )
}