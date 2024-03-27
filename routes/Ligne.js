import express from 'express';
import {
  createLigne,
  getAllLignes,
  getLigneById,
  updateLigne,
  deleteLigne,
  
 
} from '../controllers/Ligne.js';

const router = express.Router();

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
