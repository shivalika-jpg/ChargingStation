const Charger = require('../models/Charger');

exports.createCharger = async (req, res) => {
  try {
    const charger = new Charger(req.body);
    await charger.save();
    res.status(201).json(charger);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create charger', error: err.message });
  }
};

exports.getAllChargers = async (req, res) => {
  try {
    const chargers = await Charger.find();
    res.json(chargers);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch chargers', error: err.message });
  }
};

exports.updateCharger = async (req, res) => {
  try {
    const charger = await Charger.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!charger) return res.status(404).json({ message: 'Charger not found' });
    res.json(charger);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update charger', error: err.message });
  }
};

exports.deleteCharger = async (req, res) => {
  try {
    const charger = await Charger.findByIdAndDelete(req.params.id);
    if (!charger) return res.status(404).json({ message: 'Charger not found' });
    res.json({ message: 'Charger deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete charger', error: err.message });
  }
};
