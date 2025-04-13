const express = require('express');
const { check } = require('express-validator');
const { register, login } = require('../controllers/authController');
const validate = require('../middleware/validation');

const router = express.Router();

// Validação de registro
const registerValidation = [
  check('name').notEmpty().withMessage('Nome é obrigatório'),
  check('email').isEmail().withMessage('Email inválido'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Senha deve ter no mínimo 6 caracteres'),
  check('phone').notEmpty().withMessage('Telefone é obrigatório'),
  check('role').isIn(['passenger', 'driver']).withMessage('Papel inválido')
];

// Validação de login
const loginValidation = [
  check('email').isEmail().withMessage('Email inválido'),
  check('password').notEmpty().withMessage('Senha é obrigatória')
];

// Rotas
router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);

module.exports = router; 