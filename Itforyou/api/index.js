import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
//dd
import categoryRouter from './routes/category.router.js'
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';

import path from 'path';
import userController from'./controllers/user.controller.js';
import costumerController from'./controllers/customerController.js';
import cors from 'cors';
// import listEndpoints from 'express-list-endpoints';
// import listEndpoints from 'express-list-endpoints';
import favorisController from'./controllers/favorisController.js';
dotenv.config();
const app = express();

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });

  const __dirname = path.resolve();
  const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

// app.get('/list-endpoints', (req, res) => {
//   const endpoints = listEndpoints(app);
//   res.json(endpoints);
// });


app.use('/api/favoris', favorisController);
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/users', userController);
app.use('/costumer', costumerController);
app.use('/api/listing', listingRouter);
app.use("/api/categories", categoryRouter);


app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})



app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});