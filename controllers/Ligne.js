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

const NumLignesParam = async (req, res) => {
    try {
        const { num } = req.params;
        const lignes = await Ligne.find({ num: parseInt(num) });
        if (!lignes || lignes.length === 0) {
            return res.status(404).json({ error: 'No lignes found with the provided num' });
        }
        res.status(200).json(lignes);
    } catch (error) {
        console.error('Error fetching lignes by num:', error);
        res.status(500).json({ error: 'Failed to fetch lignes by num' });
    }
};

const getLignesByLigneName = async (req, res) => {
    try {
        const { ligneName } = req.body;
        const lignes = await Ligne.find({ ligne: ligneName });
        res.status(200).json(lignes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch lignes by ligne name' });
    }
};

const getLignesByNum = async (req, res) => {
    try {
        const lignes = await Ligne.aggregate([
            // Group lignes by their num field
            {
                $group: {
                    _id: '$num',
                    // Include the first ligne encountered in each group
                    ligne: { $first: '$ligne' },
                    /*heure_départ: { $first: '$heure_départ' },
                    heure_retour: { $first: '$heure_retour' },
                    durée: { $first: '$durée' },
                    tarif: { $first: '$tarif' },*/
                },
            },
            // Project to rename _id to num
            {
                $project: {
                    _id: 0,
                    num: '$_id',
                    ligne: 1,
                    /*heure_départ: 1,
                    heure_retour: 1,
                    durée: 1,
                    tarif: 1,*/
                },
            },
        ]);
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
    getLignesByNum,
    NumLignesParam,
    getLignesByLigneName,
};
