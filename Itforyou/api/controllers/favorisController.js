import express from'express';
const router = express.Router();
import Favoris from '../models/favoris.js';
// get all Favoris
router.get('/user/:userId', async (req, res) => {
  try {
    const  userId = req.params.userId;
    const favorites = await Favoris.find({ userId: userId }).populate('listingId').populate('userId').populate('customerId')
    /*.exec((err, posts) => {
      if (err) {
        console.error(err);
      } else {
        console.log(posts);
      };
    })*/;
  
    res.json(favorites);
  } catch (error) {
    console.error('Error fetching favorites 700 :', error);
    res.status(500).json({ error: 'An error occurred while fetching favorites.' });
  }
});
// router.post('/', async (req, res) => {
//   const { customerId, listingId } = req.body;

//   try {
//     // Check if the customer's favorites include the listing ID
//     const customerFavorites = await Favoris.findOne({ customerId });

//     if (customerFavorites && customerFavorites.listings.includes(listingId)) {
//       // Listing is already a favorite, so remove it
//       await Favoris.updateOne({ customerId }, { $pull: { listings: listingId } });
//       res.json({ favorite: false }); // Send a flag indicating not a favorite
//     } else {
//       // Listing is not a favorite, so add it
//       await Favoris.updateOne({ customerId }, { $push: { listings: listingId } }, { upsert: true });
//       res.json({ favorite: true }); // Send a flag indicating a favorite
//     }
//   } catch (error) {
//     console.error('Error updating favorites:', error);
//     res.status(500).json({ error: 'An error occurred while updating favorites.' });
//   }
// });
//  
// Endpoint to add a listing to favorites
router.post('/', (req, res, next) => {
  try {
    const favorite =  Favoris.create(req.body);
    return res.status(201).json(favorite);
  } catch (error) {
    next(error);
  }
});



router.delete('/:userId/:listingId', async (req, res) => {
  const userId = req.params.userId;
  const listingId = req.params.listingId;

  try {
    const result = await Favoris.deleteOne({
      userId: userId,
      listingId: listingId
    }).exec();

    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'Favoris deleted successfully.' });
    } else {
      res.status(404).json({ message: 'No matching Favoris found for deletion.' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




// router.post('/:id6/:id2', (req, res) => {
//   const  customerId = req.params.id6;
//   const listingId  = req.params.id2;


//   // Check if the user has favorites; if not, create an array for them
//   if (!customerFavorites[customerId]) {
//     customerFavorites[customerId] = [];
//   }
//   // Add the listing to the user's favorites
//   customerFavorites[customerId].push(listingId);
//   res.status(200).json({ message: 'Listing added to favorites successfully' });
// });

// // Endpoint to remove a listing from favorites
// router.delete('/:id6/:id2', (req, res) => {
//   const { customerId, listingId } = req.params.id;
//   // Check if the user has favorites
//   if (userFavorites[customerId]) {
//     // Remove the listing from the user's favorites
//     customerFavorites[customerId] = customerFavorites[customerId].filter(id => id !== listingId);
//   }
//   res.status(200).json({ message: 'Listing removed from favorites successfully' });
// });

export default router;