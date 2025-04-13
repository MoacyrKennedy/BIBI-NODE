const express = require('express');
const { check } = require('express-validator');
const { getProfile, updateProfile, updateRating } = require('../controllers/userController');
const { auth } = require('../middleware/auth');
const validate = require('../middleware/validation');

const router = express.Router();

// Validação de atualização de perfil
const updateProfileValidation = [
  check('name').optional().notEmpty().withMessage('Nome não pode estar vazio'),
  check('phone').optional().notEmpty().withMessage('Telefone não pode estar vazio')
];

// Validação de avaliação
const ratingValidation = [
  check('rating')
    .isFloat({ min: 0, max: 5 })
    .withMessage('Avaliação deve ser entre 0 e 5')
];

// Rotas protegidas
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfileValidation, validate, updateProfile);
router.put('/:userId/rating', auth, ratingValidation, validate, updateRating);

module.exports = router; 