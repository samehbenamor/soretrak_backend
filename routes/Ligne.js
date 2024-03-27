import express from 'express';
import {
  createLigne,
  getAllLignes,
  getLigneById,
  updateLigne,
  deleteLigne,
  getLignesByNum,
  NumLignesParam,
  getLignesByLigneName,
} from '../controllers/Ligne.js';

const router = express.Router();
// Get lignes by num for clearance
router.get('/numligne', getLignesByNum);

//Get lignes by num
router.get('/:num', NumLignesParam);

//Get lignes by ligne name
router.post('/name', getLignesByLigneName);

// Create a new ligne
router.post('/', createLigne);

// Get a list of all lignes
router.get('/', getAllLignes);

// Get a single ligne by ID
router.get('/:id', getLigneById);

// Update a ligne by ID
router.put('/:id', updateLigne);

// Delete a medical document by ID
router.delete('/:id', deleteLigne);


export default router;
