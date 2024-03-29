import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import stringifySafe from 'json-stringify-safe';

dotenv.config();

export function authenticateJWT(req, res, next) {
  const token = req.header('Authorization');
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY, {
      //Thinking of changing this to a month or so
      expiresIn: '1h',
    });

    // Stringify the object with circular references
    req.user = JSON.parse(stringifySafe(decoded));

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired.' });
    }

    // Other errors
    res.status(403).json({ message: 'Invalid token.' });
  }
}
