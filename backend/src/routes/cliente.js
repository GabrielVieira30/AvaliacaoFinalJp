// c:\Users\gabriel.alves9\Documents\AvaliacaoFinalJp\backend\src\routes\cliente.js
const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.get('/', clienteController.getClientes);
router.post('/', clienteController.createCliente);
router.put('/:id', clienteController.updateCliente);
router.delete('/:id', clienteController.deleteCliente);
router.post('/login', clienteController.login);

module.exports = router;