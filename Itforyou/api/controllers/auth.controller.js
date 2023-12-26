import User from '../models/user.model.js';
import Costumer from '../models/Costumer.js';
import bcrypt from 'bcrypt';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

//llogin

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  // Check if the username already exists in the User schema
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ error: 'Username already exists' });
  }

  // Check if the email already exists in the User schema
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    return res.status(400).json({ error: 'Email already exists' });
  }

  // Check if the username already exists in the Customer schema
  const existingCustomerUsername = await Costumer.findOne({ username });
  if (existingCustomerUsername) {
    return res.status(400).json({ error: 'Username already exists in Customer schema' });
  }

  // Check if the email already exists in the Customer schema
  const existingCustomerEmail = await Costumer.findOne({ email });
  if (existingCustomerEmail) {
    return res.status(400).json({ error: 'Email already exists in Customer schema' });
  }

  // If no existing user or email found, proceed to create a new user
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json('User created successfully!');
  } catch (error) {
    next(error);
  }
};
export const signup_costu = async (req, res, next) => {
  const { username, email, password } = req.body;

  // Check if the username already exists in the Customer schema
  const existingCustomerUsername = await Costumer.findOne({ username });
  if (existingCustomerUsername) {
    return res.status(400).json({ error: 'Username already exists in Customer schema' });
  }

  // Check if the email already exists in the Customer schema
  const existingCustomerEmail = await Costumer.findOne({ email });
  if (existingCustomerEmail) {
    return res.status(400).json({ error: 'Email already exists in Customer schema' });
  }

  // Check if the username already exists in the User schema
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ error: 'Username already exists in User schema' });
  }

  // Check if the email already exists in the User schema
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    return res.status(400).json({ error: 'Email already exists in User schema' });
  }

  // If no existing username or email found, proceed to create a new customer
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newCustomer = new Costumer({ username, email, password: hashedPassword });

  try {
    await newCustomer.save();
    res.status(201).json('Customer created successfully!');
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => { 
  const { email, password } = req.body

  try {
    
    

    
      let validLogger = await User.findOne({ email });
      

      if (!validLogger) {
        return next(errorHandler(404, 'Credentials are not found!'));
        
      }
      console.log("Costumer found");
    
      const validPassword = await bcrypt.compare(password, validLogger.password);
    
    

    if (!validPassword) {
      return next(errorHandler(401, 'Wrong credentials!'));
    }else {
    const token = jwt.sign({ id: validLogger._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validLogger._doc;

    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);
  }
    } catch (error) {

    console.error(error); // Log the error for further investigation
    next(error);
  }
};
export const signin_cos = async (req, res, next) => { 
  const { email, password } = req.body

  try {
    
    

    
      let validLogger = await Costumer.findOne({ email }).select('+password')
      console.log(validLogger)

      if (!validLogger) {
        return next(errorHandler(404, 'Credentials are not found!'));
        
      }
      console.log("Costumer found");
    
      const validPassword = await bcrypt.compare(password, validLogger.password);
    
    console.log(validPassword)

    if (!validPassword) {
      return next(errorHandler(401, 'Wrong credentials!'));
    }
    const token = jwt.sign({ id: validLogger._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validLogger._doc;

    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);
  
    } catch (error) {

    console.error(error); // Log the error for further investigation
    next(error);
  }
};


//jd//

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
export const google_cost = async (req, res, next) => {
  try {
    const existingCostumer = await Costumer.findOne({ email: req.body.email });

    if (existingCostumer) {
      const token = jwt.sign({ id: existingCostumer._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = existingCostumer._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

      const newCostumer = new Costumer({
        username: req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });

      await newCostumer.save();

      const token = jwt.sign({ id: newCostumer._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newCostumer._doc;

      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json('User has been logged out!');
  } catch (error) {
    next(error);
  }
};
