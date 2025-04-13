const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado.' });
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido.' });
  }
};

const isDriver = async (req, res, next) => {
  try {
    if (req.user.role !== 'driver') {
      return res.status(403).json({ message: 'Acesso negado. Apenas motoristas podem acessar esta rota.' });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: 'Erro ao verificar permissão.' });
  }
};

module.exports = { auth, isDriver }; 