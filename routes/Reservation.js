import express from 'express';
import {
    createReservation,
    getAllReservations,
    getReservationById,
    updateReservation,
    deleteReservation,
} from '../controllers/Reservation.js';

const router = express.Router();

// Create a new reservation
router.post('/', createReservation);

// Get a list of all reservations
router.get('/', getAllReservations);

// Get a single reservation by ID
router.get('/:id', getReservationById);

// Update a reservation by ID
router.put('/:id', updateReservation);

// Delete a reservation by ID
router.delete('/:id', deleteReservation);

export default router;
