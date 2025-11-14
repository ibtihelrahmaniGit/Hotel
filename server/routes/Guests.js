import express from 'express';
import { addGuests, getGuests, getGuestByRoom, uploadGuestPhoto, deleteGuest, upload } from '../controllers/GuestsController.js';

const router = express.Router();

// Routes
router.post('/add', upload.single("photo"), addGuests); // Handle photo upload during guest registration
router.get('/', getGuests);
router.get('/:roomNumber', getGuestByRoom);
router.post('/:roomNumber/upload', upload.single("photo"), uploadGuestPhoto); // Route for updating guest photo
router.delete('/:roomNumber', deleteGuest); // Route for deleting a guest

export default router;
