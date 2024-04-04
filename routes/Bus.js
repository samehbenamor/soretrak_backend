import express from 'express';
import {
    generateBusesForFutureDates,
    findBusByLigneIdAndDate,
    subtractFromNombrePlaces,
    getNombrePlacesOfBus
} from '../controllers/Bus.js';

const router = express.Router();

// Generate buses for future dates
router.post('/generate-buses/:endDate', generateBusesForFutureDates);

// Find bus by ligneId and date
router.post('/find-bus/:ligneId', findBusByLigneIdAndDate);

// Subtract from nombrePlaces for a specific bus
router.put('/subtract-seats/:busId/:numberOfSeats', subtractFromNombrePlaces);

// Route to get nombrePlaces of a bus by its ID
router.get('/nombre-places/:busId', getNombrePlacesOfBus);

export default router;
