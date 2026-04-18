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
  const [pacientesDisponibles, setPacientesDisponibles] = useState<Paciente[]>([])

  const [form, setForm] = useState({
    pacienteId: '',
    tipoAtencion: 'CONSULTA',
    especialidad: ''
  })

  const cargarLista = () => {
    axios.get(`${BFF_URL}/admin/lista`)
      .then(res => {
        setPacientes(res.data.pacientes)
        setTotalEnEspera(res.data.totalEnEspera)
        setPacientesDisponibles(res.data.pacientes)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }

  useEffect(() => {
    cargarLista()
  }, [])

  const registrar = () => {
    if (!form.pacienteId || !form.especialidad) {
      alert('Completa todos los campos')
      return
    }
    axios.post(`${BFF_URL}/admin/registrar`, {
      pacienteId: parseInt(form.pacienteId),
      tipoAtencion: form.tipoAtencion,
      especialidad: form.especialidad
    })
      .then(() => {
        alert('Paciente registrado exitosamente')
        setForm({ pacienteId: '', tipoAtencion: 'CONSULTA', especialidad: '' })
        cargarLista()
      })
      .catch((error) => {
        if (error.response?.status === 500) {
          alert('El paciente con ese ID no existe en el sistema')
        } else {
          alert('Error al registrar paciente')
        }
      })
  }

  const cancelar = (id: number) => {
    if (!confirm(`¿Cancelar cita del paciente ${id}?`)) return
    axios.patch(`${BFF_URL}/admin/cancelar/${id}`)
      .then(() => {
        alert('Cita cancelada')
        cargarLista()
      })
      .catch(() => alert('Error al cancelar'))
  }

  if (loading) return <p>Cargando...</p>

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Panel Administrativo — RedNorte</h1>
      <p><strong>Total en espera:</strong> {totalEnEspera}</p>

      <h2>Registrar nuevo paciente</h2>
      <div style={{ marginBottom: '1rem' }}>

        <select
          title="Seleccionar paciente"
          value={form.pacienteId}
          onChange={e => setForm({ ...form, pacienteId: e.target.value })}
          style={{ padding: '0.5rem', marginRight: '0.5rem' }}
        >
          <option value="">Seleccionar paciente</option>
          {pacientesDisponibles.map(p => (
            <option key={p.id} value={p.id}>
              {p.id} - {p.pacienteNombre}
            </option>
          ))}
        </select>

        <select
          title="Tipo de atención"
          value={form.tipoAtencion}
          onChange={e => setForm({ ...form, tipoAtencion: e.target.value })}
          style={{ padding: '0.5rem', marginRight: '0.5rem' }}
        >
          <option value="CONSULTA">Consulta</option>
          <option value="CIRUGIA">Cirugía</option>
          <option value="URGENCIA_DIFERIDA">Urgencia diferida</option>
        </select>

        <input
          type="text"
          placeholder="Especialidad"
          value={form.especialidad}
          onChange={e => setForm({ ...form, especialidad: e.target.value })}
          style={{ padding: '0.5rem', marginRight: '0.5rem', width: '150px' }}
        />

        <button
          onClick={registrar}
          style={{ padding: '0.5rem 1rem', background: '#0D9488', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          Registrar
        </button>
      </div>

      <p style={{ fontSize: '0.85rem', color: '#888' }}>
        * Solo puedes registrar pacientes que ya existen en el sistema
      </p>

      <h2>Lista de espera</h2>
      <table border={1} cellPadding={8} style={{ width: '100%' }}>
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
            <th>Acción</th>
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
              <td>
                <button
                  onClick={() => cancelar(p.id)}
                  style={{ padding: '0.3rem 0.6rem', background: '#E24B4A', color: 'white', border: 'none', cursor: 'pointer' }}
                >
                  Cancelar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}