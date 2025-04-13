const Vehicle = require('../models/Vehicle');

const createVehicle = async (req, res) => {
  try {
    const { brand, model, year, color, licensePlate, capacity } = req.body;

    const vehicle = new Vehicle({
      owner: req.user._id,
      brand,
      model,
      year,
      color,
      licensePlate,
      capacity
    });

    await vehicle.save();
    res.status(201).json({ message: 'Veículo cadastrado com sucesso.', vehicle });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar veículo.', error: error.message });
  }
};

const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ owner: req.user._id });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar veículos.', error: error.message });
  }
};

const updateVehicle = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const updates = req.body;

    const vehicle = await Vehicle.findOne({ _id: vehicleId, owner: req.user._id });
    if (!vehicle) {
      return res.status(404).json({ message: 'Veículo não encontrado.' });
    }

    Object.keys(updates).forEach(update => {
      vehicle[update] = updates[update];
    });

    await vehicle.save();
    res.json({ message: 'Veículo atualizado com sucesso.', vehicle });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar veículo.', error: error.message });
  }
};

const deleteVehicle = async (req, res) => {
  try {
    const { vehicleId } = req.params;

    const vehicle = await Vehicle.findOneAndDelete({ _id: vehicleId, owner: req.user._id });
    if (!vehicle) {
      return res.status(404).json({ message: 'Veículo não encontrado.' });
    }

    res.json({ message: 'Veículo removido com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao remover veículo.', error: error.message });
  }
};

module.exports = { createVehicle, getVehicles, updateVehicle, deleteVehicle }; 