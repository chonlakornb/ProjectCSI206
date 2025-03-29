import Notification from '../models/Notification.js';

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user_id: req.user.id });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addNotification = async (req, res) => {
  const { user_id, message, status } = req.body;

  try {
    const newNotification = new Notification({
      user_id,
      message,
      status,
    });

    await newNotification.save();
    res.status(201).json({ message: 'Notification added successfully', notification: newNotification });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    await notification.deleteOne();
    res.json({ message: 'Notification deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
