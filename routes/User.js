import express from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  login,
  decrementUserCredit,
} from '../controllers/User.js';
import { authenticateJWT } from '../middlewares/authMiddleware.js';
import jwt from 'jsonwebtoken';
import User from '../models/user.js'

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

//Decrement user credit after affecting a reservation
router.put('/:userId/decrement-credit', decrementUserCredit);

router.route('/login').post(login,(req, res) => {

  const _id = req.user._id;
  const email = req.user.email;
  const nom = req.user.nom;
  const prenom = req.user.prenom;
  const num_telephone = req.user.num_telephone;
  const code_paiement = req.user.code_paiement;
  const credit = req.user.credit;
  const role = req.user.role;
  const token = jwt.sign({ _id, email, nom, prenom, num_telephone, code_paiement, credit, role }, process.env.SECRET_KEY, { expiresIn: '1h' });

  return res.status(200).json({ token });
})

router.get('/profile/jwt', authenticateJWT, async (req, res) => {
  try {
    const userId = req.user._id;
    console.log(userId); // This should print the userId of the logged in user  

    // Fetch user data using userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: `Cannot find any user with ID ${userId}` });
    }

    const { nom, prenom, email, num_telephone, code_paiement, credit, role } = user;

    res.status(200).json({
      message: 'Protected route accessed',
      userId,
      nom,
      prenom,
      email,
      num_telephone,
      code_paiement,
      credit,
      role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}); 

export default router;
