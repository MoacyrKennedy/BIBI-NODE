const User = require('../models/User');

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar perfil.', error: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, phone } = req.body;
    const user = await User.findById(req.user._id);

    if (name) user.name = name;
    if (phone) user.phone = phone;

    await user.save();
    res.json({ message: 'Perfil atualizado com sucesso.', user });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar perfil.', error: error.message });
  }
};

const updateRating = async (req, res) => {
  try {
    const { userId } = req.params;
    const { rating } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // Atualizar rating (implementar lógica de média)
    user.rating = rating;
    await user.save();

    res.json({ message: 'Avaliação atualizada com sucesso.', user });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar avaliação.', error: error.message });
  }
};

module.exports = { getProfile, updateProfile, updateRating }; 