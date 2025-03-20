import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  status: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
