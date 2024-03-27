import express from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
 
} from '../controllers/user.js';

const router = express.Router();

// Create a new user
router.post('/', createUser);
// Get a list of all users
router.get('/', getAllUsers);
// Get a single user by ID
router.get('/:id', getUserById);
// Update a user by ID
router.put('/:id', updateUser);
// Delete a medical document by ID
router.delete('/:id', deleteUser);


export default router;
