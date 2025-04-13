const Ride = require('../models/Ride');
const User = require('../models/User');

const createRide = async (req, res) => {
  try {
    const {
      vehicle,
      origin,
      destination,
      departureTime,
      availableSeats,
      price
    } = req.body;

    const ride = new Ride({
      driver: req.user._id,
      vehicle,
      origin,
      destination,
      departureTime,
      availableSeats,
      price
    });

    await ride.save();
    res.status(201).json({ message: 'Carona criada com sucesso.', ride });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar carona.', error: error.message });
  }
};

const searchRides = async (req, res) => {
  try {
    const { origin, destination, date } = req.query;

    const rides = await Ride.find({
      'origin.coordinates': {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: origin.split(',').map(Number)
          },
          $maxDistance: 5000 // 5km
        }
      },
      'destination.coordinates': {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: destination.split(',').map(Number)
          },
          $maxDistance: 5000 // 5km
        }
      },
      departureTime: {
        $gte: new Date(date)
      },
      status: 'scheduled'
    }).populate('driver', 'name rating').populate('vehicle');

    res.json(rides);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar caronas.', error: error.message });
  }
};

const requestRide = async (req, res) => {
  try {
    const { rideId } = req.params;

    const ride = await Ride.findById(rideId);
    if (!ride) {
      return res.status(404).json({ message: 'Carona não encontrada.' });
    }

    if (ride.passengers.length >= ride.availableSeats) {
      return res.status(400).json({ message: 'Não há vagas disponíveis.' });
    }

    ride.passengers.push({
      user: req.user._id,
      status: 'pending'
    });

    await ride.save();
    res.json({ message: 'Solicitação de carona enviada com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao solicitar carona.', error: error.message });
  }
};

const updateRideStatus = async (req, res) => {
  try {
    const { rideId } = req.params;
    const { status } = req.body;

    const ride = await Ride.findOne({ _id: rideId, driver: req.user._id });
    if (!ride) {
      return res.status(404).json({ message: 'Carona não encontrada.' });
    }

    ride.status = status;
    await ride.save();

    res.json({ message: 'Status da carona atualizado com sucesso.', ride });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar status da carona.', error: error.message });
  }
};

module.exports = { createRide, searchRides, requestRide, updateRideStatus }; 