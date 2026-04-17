const router = require('express').Router()
const service = require('../services/listaEsperaService')

// Admin ve toda la lista por prioridad
router.get('/lista', async (req, res) => {
  try {
    const lista = await service.listarPorPrioridad()
    const count = await service.contarEnEspera()
    res.json({
      pacientes: lista.data,
      totalEnEspera: count.data.enEspera
    })
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener lista' })
  }
})

// Admin registra paciente nuevo
router.post('/registrar', async (req, res) => {
  try {
    const resultado = await service.registrar(req.body)
    res.status(201).json(resultado.data)
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar paciente' })
  }
})

// Admin cancela cita
router.patch('/cancelar/:id', async (req, res) => {
  try {
    await service.cancelar(req.params.id)
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: 'Error al cancelar' })
  }
})

module.exports = router