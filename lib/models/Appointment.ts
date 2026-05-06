import mongoose, { Schema } from 'mongoose';

const AppointmentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  serviceName: { type: String, required: true },
  date: { type: Date, required: true },
  slot: { type: String, required: true },
  status: { type: String, enum: ['pending', 'confirmed'], default: 'pending' },
  payment: {
    method: { type: String, enum: ['bKash', 'Nagad'], required: true },
    transactionId: { type: String, required: true, unique: true },
    isVerified: { type: Boolean, default: false }
  }
}, { timestamps: true });

// Prevent double-booking
AppointmentSchema.index({ date: 1, slot: 1 }, { unique: true });

export const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', AppointmentSchema);