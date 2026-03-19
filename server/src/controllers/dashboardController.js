const State=require('../models/states')

const getDashboardStats = async (req, res) => {
  try {
    const state = await State.findOne(); // fetch the single document
    if (!state) {
      return res.status(404).json({ message: "State not initialized" });
    }
    return res.status(200).json({ data: state });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboardStats };