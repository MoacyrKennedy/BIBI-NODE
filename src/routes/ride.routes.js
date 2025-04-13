const express = require('express');
const { check } = require('express-validator');
const { createRide, searchRides, requestRide, updateRideStatus } = require('../controllers/rideController');
const { auth, isDriver } = require('../middleware/auth');
const validate = require('../middleware/validation');

const router = express.Router();

// Validação de carona
const rideValidation = [
  check('vehicle').isMongoId().withMessage('Veículo inválido'),
  check('origin.coordinates')
    .isArray({ min: 2, max: 2 })
    .withMessage('Coordenadas de origem inválidas'),
  check('origin.address').notEmpty().withMessage('Endereço de origem é obrigatório'),
  check('destination.coordinates')
    .isArray({ min: 2, max: 2 })
    .withMessage('Coordenadas de destino inválidas'),
  check('destination.address').notEmpty().withMessage('Endereço de destino é obrigatório'),
  check('departureTime').isISO8601().withMessage('Data de partida inválida'),
  check('availableSeats')
    .isInt({ min: 1 })
    .withMessage('Número de vagas deve ser maior que 0'),
  check('price')
    .isFloat({ min: 0 })
    .withMessage('Preço deve ser maior ou igual a 0')
];

// Validação de status
const statusValidation = [
  check('status')
    .isIn(['scheduled', 'in_progress', 'completed', 'cancelled'])
    .withMessage('Status inválido')
];

// Rotas protegidas
router.post('/', auth, isDriver, rideValidation, validate, createRide);
router.get('/search', auth, searchRides);
router.post('/:rideId/request', auth, requestRide);
router.put('/:rideId/status', auth, isDriver, statusValidation, validate, updateRideStatus);

module.exports = router; 