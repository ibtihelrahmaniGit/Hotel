import mongoose from 'mongoose';

const GuestsSchema = new mongoose.Schema({
  guestName: { type: String, required: true },
  birthDate: { type: Date, required: true },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  idCardNumber: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  roomNumber: { type: String, required: true },
  photo: { type: String, default: "" } 
}, { timestamps: true });

const Guests = mongoose.model('Guests', GuestsSchema);
export default Guests;
