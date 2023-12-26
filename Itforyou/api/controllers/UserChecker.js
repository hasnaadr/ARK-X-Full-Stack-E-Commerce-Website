import jwt from 'jsonwebtoken';
import User from '../models/user.model.js'; // Replace with your user model
import Costumer from '../models/Costumer.js';
 // Replace with your user model

 export const authenticateUser = async (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let user = await User.findById(decoded.id);

    if (!user) {
        user = await Costumer.findById(decoded.id);
        if (!user){return res.status(401).json({ message: 'User not found' });}
      
    }

    req.currentUser = user; // Attach the user object to the request
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// export default authenticateUser;
