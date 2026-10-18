// import mongoose, { Schema } from 'mongoose';

// const AppointmentSchema = new Schema({
//   userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//   serviceName: { type: String, required: true },
//   date: { type: Date, required: true },
//   slot: { type: String, required: true },
//   status: { type: String, enum: ['pending', 'confirmed'], default: 'pending' },
//   payment: {
//     method: { type: String, enum: ['bKash', 'Nagad'], required: true },
//     transactionId: { type: String, required: true, unique: true },
//     isVerified: { type: Boolean, default: false }
//   }
// }, { timestamps: true });

// // Prevent double-booking
// AppointmentSchema.index({ date: 1, slot: 1 }, { unique: true });

// export const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', AppointmentSchema);



// import mongoose, { Schema } from 'mongoose';

// const AppointmentSchema = new Schema({
//   userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//   serviceName: { type: String, required: true },
//   date: { type: Date, required: true },
//   slot: { type: String, required: true },
//   status: { type: String, enum: ['pending', 'confirmed', 'completed'], default: 'pending' },
//   // New fields for barber notes & treatment history
//   barberNotes: { type: String, default: "" },
//   haircutStyle: { type: String, default: "" },
//   payment: {
//     method: { type: String, enum: ['bKash', 'Nagad'], required: true },
//     transactionId: { type: String, required: true, unique: true },
//     isVerified: { type: Boolean, default: false }
//   }
// }, { timestamps: true });

// AppointmentSchema.index({ date: 1, slot: 1 }, { unique: true });

// export const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', AppointmentSchema);



import mongoose, { Schema } from 'mongoose';

const AppointmentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  serviceName: { type: String, required: true },
  date: { type: Date, required: true },
  slot: { type: String, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'completed'], default: 'pending' },
  // New fields for barber notes & treatment history
  barberNotes: { type: String, default: "" },
  haircutStyle: { type: String, default: "" },
  payment: {
    method: { type: String, enum: ['bKash', 'Nagad'], required: true },
    transactionId: { type: String, required: true, unique: true },
    isVerified: { type: Boolean, default: false }
  }
}, { timestamps: true });

// Existing unique index for slot availability checking
AppointmentSchema.index({ date: 1, slot: 1 }, { unique: true });

// NEW: Compound index for fast user appointment lookups & sorting on dashboard
AppointmentSchema.index({ userId: 1, date: 1 });

export const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', AppointmentSchema);