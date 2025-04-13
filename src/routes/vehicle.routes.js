const express = require('express');
const { check } = require('express-validator');
const { createVehicle, getVehicles, updateVehicle, deleteVehicle } = require('../controllers/vehicleController');
const { auth, isDriver } = require('../middleware/auth');
const validate = require('../middleware/validation');

const router = express.Router();

// Validação de veículo
const vehicleValidation = [
  check('brand').notEmpty().withMessage('Marca é obrigatória'),
  check('model').notEmpty().withMessage('Modelo é obrigatório'),
  check('year')
    .isInt({ min: 1900, max: new Date().getFullYear() })
    .withMessage('Ano inválido'),
  check('color').notEmpty().withMessage('Cor é obrigatória'),
  check('licensePlate')
    .matches(/^[A-Z]{3}[0-9]{4}$/)
    .withMessage('Placa inválida (formato: ABC1234)'),
  check('capacity')
    .isInt({ min: 1 })
    .withMessage('Capacidade deve ser maior que 0')
];

// Rotas protegidas
router.post('/', auth, isDriver, vehicleValidation, validate, createVehicle);
router.get('/', auth, isDriver, getVehicles);
router.put('/:vehicleId', auth, isDriver, vehicleValidation, validate, updateVehicle);
router.delete('/:vehicleId', auth, isDriver, deleteVehicle);

module.exports = router; 