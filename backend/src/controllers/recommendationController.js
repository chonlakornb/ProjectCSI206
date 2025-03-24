import Recommendation from '../models/Recommendation.js';

export const getRecommendations = async (req, res) => {
  try {
    const recommendations = await Recommendation.find({ user_id: req.user.id }).populate('book_id');
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addRecommendation = async (req, res) => {
  const { book_id, reason } = req.body;

  try {
    const newRecommendation = new Recommendation({
      user_id: req.user.id,
      book_id,
      reason,
    });

    await newRecommendation.save();
    res.status(201).json({ message: 'Recommendation added successfully', recommendation: newRecommendation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteRecommendationById = async (req, res) => {
  try {
    const recommendation = await Recommendation.findById(req.params.id);
    if (!recommendation) {
      return res.status(404).json({ message: 'Recommendation not found' });
    }

    await recommendation.deleteOne();
    res.json({ message: 'Recommendation deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
