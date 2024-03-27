import Reservation from '../models/Reservation.js';

// Create a new reservation
const createReservation = async (req, res) => {
    try {
        const newReservation = new Reservation(req.body);
        const saved = await newReservation.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create a new reservation' });
    }
};

// Get a list of all reservations
const getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch reservations' });
    }
};

// Get a single reservation by ID
const getReservationById = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }
        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch reservation' });
    }
};

// Update a reservation by ID
const updateReservation = async (req, res) => {
    try {
        const updatedReservation = await Reservation.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedReservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }
        res.status(200).json(updatedReservation);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update reservation' });
    }
};

// Delete a reservation by ID
const deleteReservation = async (req, res) => {
    try {
        const deletedReservation = await Reservation.findByIdAndDelete(req.params.id);
        if (!deletedReservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete reservation' });
    }
};

export {
    createReservation,
    getAllReservations,
    getReservationById,
    updateReservation,
    deleteReservation,
};
