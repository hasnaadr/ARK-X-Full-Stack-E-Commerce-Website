import express from 'express';
import { google, signOut, signup_costu, signin_cos, signin, signup, google_cost } from '../controllers/auth.controller.js';
import { authenticateUser } from '../controllers/UserChecker.js';

const router = express.Router();



router.post("/signup", signup);
router.post("/signup_costu", signup_costu);

router.post("/signin", signin);
router.post("/signin_cos", signin_cos);


router.post('/google', google);
router.post('/google_cost', google_cost);

router.get('/signout', signOut)
router.get('/me', authenticateUser)

export default router;