import express from 'express';
const router = express.Router();
import Order from '../models/Order.js';
import { v4 as uuidv4 } from 'uuid';


// Helper function to generate unique identifier
const generateUniqueIdentifier = () => {
  return uuidv4();
};

// Middleware to handle common logic for finding an order by ID
const findOrderById = async (req, res, next) => {
  const id = req.params.id;

  try {
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    req.order = order;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

router.get('/orders/:id', findOrderById, (req, res) => {
  const { order } = req;
  res.json({ order });
});

router.post('/ordersInit/:id', async (req, res) => {
  try {
    const customerId = req.params.id;
    
    const newOrder = new Order({
      orderId: new mongoose.Types.ObjectId(),
      userId,
      costumerId: customerId,
      initOrderId: {        
        status: true,
      },
    });

    await newOrder.save();

    res.send('Order initiated successfully');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/ConfirmedOrder/:id', findOrderById, async (req, res) => {
  const { order } = req;
  const uniqueIdentifier = generateUniqueIdentifier();

  order.ConfirmedOrderId = {
    id: uniqueIdentifier,
    status: true,
  };

  await order.save();
  res.send('OK');
});

router.post('/ordersFinished/:id', findOrderById, async (req, res) => {
  const { order } = req;
  const uniqueIdentifier = generateUniqueIdentifier();

  order.finishedOrderId = {
    id: uniqueIdentifier,
    status: true,
  };

  await order.save();
  res.send('OK');
});

router.post('/ordersDelivered/:id', findOrderById, async (req, res) => {
  const { order } = req;
  const uniqueIdentifier = generateUniqueIdentifier();

  order.deliveredOrderId = {
    id: uniqueIdentifier,
    status: true,
  };

  await order.save();
  res.send('OK');
});

// Deleting orders
router.delete('/ordersInit/:id', findOrderById, async (req, res) => {
  const { order } = req;
  const uniqueIdentifier = generateUniqueIdentifier();

  order.initOrderId = {
    id: uniqueIdentifier,
    status: false,
  };

  await order.save();
  res.send('OK');
});

router.delete('/ConfirmedOrder/:id', findOrderById, async (req, res) => {
  const { order } = req;
  const uniqueIdentifier = generateUniqueIdentifier();

  order.ConfirmedOrderId = {
    id: uniqueIdentifier,
    status: false,
  };

  await order.save();
  res.send('OK');
});

router.delete('/ordersFinished/:id', findOrderById, async (req, res) => {
  const { order } = req;
  const uniqueIdentifier = generateUniqueIdentifier();

  order.finishedOrderId = {
    id: uniqueIdentifier,
    status: false,
  };

  await order.save();
  res.send('OK');
});

router.delete('/ordersDelivered/:id', findOrderById, async (req, res) => {
  const { order } = req;
  const uniqueIdentifier = generateUniqueIdentifier();

  order.deliveredOrderId = {
    id: uniqueIdentifier,
    status: false,
  };

  await order.save();
  res.send('OK');
});

router.put('/confirmOrder/:id', findOrderById, async (req, res) => {
  const { order } = req;

  // User confirms the order
  order.ConfirmedOrderId.status = true;

  // Check if both initOrderId and ConfirmedOrderId are true
  if (order.initOrderId.status && order.ConfirmedOrderId.status) {
    // Update the status of the order to "pending"
    order.status = 'pending';
  }

  // Save the changes to the database
  await order.save();

  res.send('Order confirmed successfully');
});

router.put('/finishOrder/:id', findOrderById, async (req, res) => {
  const { order } = req;

  // User finishes the order
  order.finishedOrderId.status = true;

  // Save the changes to the database
  await order.save();

  res.send('Order finished successfully');
});

router.put('/confirmDelivery/:id', findOrderById, async (req, res) => {
  const { order } = req;

  // Customer confirms the delivery
  order.DeliveredOrderId.status = true;

  if (order.finishedOrderId.status && order.DeliveredOrderId.status) {
    // Update the status of the order to "finished"
    order.status = 'finished';
  }

  // Save the changes to the database
  await order.save();

  res.send('Delivery confirmed successfully');
});

export default router;



