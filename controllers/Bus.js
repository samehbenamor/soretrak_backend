import Bus from '../models/Bus.js';
import Ligne from '../models/Ligne.js';

process.env.TZ = 'Africa/Tunis';

const generateBusesForFutureDates = async (endDate) => {
    try {
        // Fetch all Lignes from the database
        const lignes = await Ligne.find({});

        // Get the current date
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); // Set to midnight
        currentDate.setHours(currentDate.getHours() + 1);
        // Get the end date + 1 day
        /*const endPlusOneDay = new Date(endDate);
        endPlusOneDay.setDate(endPlusOneDay.getDate() + 2);
        endPlusOneDay.setHours(0, 0, 0, 0); // Set to midnight*/
        const endDay = parseInt(endDate.split('/')[0]);
        const endMonth = parseInt(endDate.split('/')[1]) - 1; // Subtract 1 for 0-based months
        const endYear = parseInt(endDate.split('/')[2]);
        const endPlusOneDay = new Date(endYear, endMonth, endDay + 1);

        // Loop through each Ligne
        for (const ligne of lignes) {
            const ligneId = ligne._id;
            const departureTime = ligne.heure_départ;

            // Loop through each date between currentDate and endDate
            let currentDateCopy = new Date(currentDate);
            while (currentDateCopy <= endPlusOneDay) {
                // Check if buses already exist for the current date
                const existingBus = await Bus.findOne({ ligneId, date: currentDateCopy });
                if (!existingBus) {
                    // Generate a new bus for the current date
                    const formattedDate = currentDateCopy.toISOString().split('T')[0];
                    const newBus = new Bus({
                        ligneId,
                        departureTime,
                        date: formattedDate,
                        nombrePlaces: 55 // Set default value for nombrePlaces
                    });

                    // Save the new bus to the database
                    await newBus.save();
                }

                // Move to the next day
                currentDateCopy.setDate(currentDateCopy.getDate() + 1);
            }
        }
    } catch (error) {
        console.error('Error generating buses for future dates:', error);
        throw error;
    }
};

const findBusByLigneIdAndDate = async (req, res) => {
    try {
        const { ligneId } = req.params; // Extract ligneId from request parameters
        const { date } = req.body; // Extract date from request body
        /*const currentDate = new Date(date);
        currentDate.setHours(currentDate.getHours() + 1);*/
        const endDay = parseInt(date.split('/')[0]);
        const endMonth = parseInt(date.split('/')[1]) - 1; // Subtract 1 for 0-based months
        const endYear = parseInt(date.split('/')[2]);
        const endPlusOneDay = new Date(endYear, endMonth, endDay);
        endPlusOneDay.setHours(0, 0, 0, 0); // Set to midnight
        endPlusOneDay.setHours(endPlusOneDay.getHours() + 1);
        console.log("The date you're looking with: ", endPlusOneDay);
        // Find the bus that matches the ligneId and date
        let bus = await Bus.findOne({ ligneId, date: endPlusOneDay });

        if (!bus) {
            // If bus is not found, generate buses for future dates
            await generateBusesForFutureDates(date);
            
            // Attempt to find the bus again
            bus = await Bus.findOne({ ligneId, date: endPlusOneDay });
        }

        res.status(200).json(bus); // Return the found bus or null if not found
    } catch (error) {
        console.error('Error finding bus by ligneId and date:', error);
        res.status(500).json({ error: 'Failed to find bus by ligneId and date' });
    }
};


const subtractFromNombrePlaces = async (req, res) => {
    const { busId, numberOfSeats } = req.params;
    try {
        // Find the bus by its ID
        const bus = await Bus.findById(busId);
        
        if (!bus) {
            return res.status(404).json({ error: 'Bus not found' });
        }

        // Subtract the specified number from the nombrePlaces
        const updatedNombrePlaces = bus.nombrePlaces - numberOfSeats;

        // Update the bus with the new nombrePlaces value
        await Bus.findByIdAndUpdate(busId, { nombrePlaces: updatedNombrePlaces });

        console.log(`Successfully subtracted ${numberOfSeats} seats from bus ${busId}`);
        res.status(200).json({ message: 'Seats subtracted successfully' });
    } catch (error) {
        console.error('Error subtracting seats from bus:', error);
        res.status(500).json({ error: 'Failed to subtract seats from bus' });
    }
};

const getNombrePlacesOfBus = async (req, res) => {
    try {
        const { busId } = req.params; // Extract busId from request parameters

        // Find the bus by its ID
        const bus = await Bus.findById(busId);
        
        if (!bus) {
            return res.status(404).json({ error: 'Bus not found' });
        }

        // Return the nombrePlaces of the bus
        res.status(200).json({ nombrePlaces: bus.nombrePlaces });
    } catch (error) {
        console.error('Error getting nombrePlaces of bus:', error);
        res.status(500).json({ error: 'Failed to get nombrePlaces of bus' });
    }
};

export { generateBusesForFutureDates, findBusByLigneIdAndDate, subtractFromNombrePlaces, getNombrePlacesOfBus };
