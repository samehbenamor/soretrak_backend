import Ligne from '../models/Ligne.js';


// Create a new ligne
const createLigne = async (req, res) => {
    try {
        const newLigne = new Ligne(req.body);
        console.log(newLigne);
        const saved =  await newLigne.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create a new ligne' });
    }
};


// Get a list of all lignes
const getAllLignes = async (req, res) => {
    try {
        const lignes = await Ligne.find();
        res.status(200).json(lignes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch lignes' });
    }
};


// Get a single ligne by ID
const getLigneById = async (req, res) => {
    try {
        const ligne = await Ligne.findById(req.params.id);
        if (!ligne) {
            return res.status(404).json({ error: 'Ligne not found' });
        }
        res.status(200).json(ligne);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch ligne' });
    }
};


// Update a ligne by ID
const updateLigne= async (req, res) => {
    try {
        const updatedLigne = await Ligne.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedLigne) {
            return res.status(404).json({ error: 'Ligne not found' });
        }
        res.status(200).json(updatedLigne);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update ligne' });
    }
};


// Delete a user by ID
const deleteLigne = async (req, res) => {
    try {
        const deletedLigne = await User.findByIdAndDelete(req.params.id);
        if (!deletedLigne) {
            return res.status(404).json({ error: 'Ligne not found' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete ligne' });
    }
};

export {
    createLigne,
    getAllLignes,
    getLigneById,
    updateLigne,
    deleteLigne,
};
