import Listing from '../models/Listing.js';
import { errorHandler } from '../utils/error.js';

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only delete your own listings!'));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json('Listing has been deleted!');
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only update your own listings!'));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, 'Listing not found!'));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;

    if (offer === undefined || offer === 'false') {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;

    if (furnished === undefined || furnished === 'false') {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;

    if (parking === undefined || parking === 'false') {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;

    if (type === undefined || type === 'all') {
      type = { $in: ['sale', 'rent'] };
    }

    const searchTerm = req.query.searchTerm || '';

    const sort = req.query.sort || 'createdAt';

    const order = req.query.order || 'desc';

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: 'i' },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};



// export const addRating = async (req, res, next) => {
//   const { listingId, customerId, rating } = req.body;

//   try {
//     const listing = await Listing.findById(listingId);

//     if (!listing) {
//       return next(errorHandler(404, 'Listing not found!'));
//     }

//     // Check if the customer has already rated this listing
//     const existingRating = listing.ratings.find((r) => r.customerId.equals(customerId));

//     if (existingRating) {
//       return res.status(400).json({ error: 'Customer has already rated this listing' });
//     }

//     // Add the new rating
//     listing.ratings.push({ customerId, rating });

//     // Calculate and update the average rating
//     const totalRating = listing.ratings.reduce((sum, r) => sum + r.rating, 0);
//     listing.averageRating = totalRating / listing.ratings.length;

//     await listing.save();

//     res.status(201).json({ message: 'Rating added successfully', averageRating: listing.averageRating });
//   } catch (error) {
//     next(error);
//   }
  // exports.getAverageRating = async (req, res) => {
  //   const { listingId } = req.params;
  
  //   try {
  //     const listing = await Listing.findById(listingId);
  
  //     if (!listing) {
  //       return res.status(404).json({ error: 'Listing not found' });
  //     }
  
  //     res.status(200).json({ averageRating: listing.averageRating });
  //   } catch (error) {
  //     console.error('Error fetching average rating:', error);
  //     res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // };
// };

