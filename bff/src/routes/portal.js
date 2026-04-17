const router = require('express').Router()
const service = require('../services/listaEsperaService')

// Paciente consulta su estado
router.get('/estado/:id', async (req, res) => {
  try {
    const ficha = await service.obtenerPorId(req.params.id)
    const count = await service.contarEnEspera()
    res.json({
      ficha: ficha.data,
      totalEnEspera: count.data.enEspera
    })
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener estado' })
  }
})

// Listar por especialidad
router.get('/especialidad/:especialidad', async (req, res) => {
  try {
    const lista = await service.listarTodos()
    const filtrada = lista.data.filter(
      p => p.especialidad.toLowerCase() === req.params.especialidad.toLowerCase()
    )
    res.json(filtrada)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener lista' })
  }
})

module.exports = router