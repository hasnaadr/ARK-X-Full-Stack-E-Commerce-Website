import { Link } from 'react-router-dom';
import { MdLocationOn, MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Snackbar from './Snackbar'; // Update the path based on your project structure
import './ListingItem.css'
import { FaStar } from 'react-icons/fa';

  export default function ListingItem({ listing ,items, onRemoveItem  }) {
    const [isFavorited, setIsFavorited] = useState(false);
    const { currentUser } = useSelector((state) => state.user);
    const [favoritesListing, setFavoritesListingData] = useState([]);
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarBgColor, setSnackbarBgColor] = useState('bg-green-500');
    const [snackbarMessage, setSnackbarMessage] = useState('');
    

  const handleShowSnackbar = (bgColor,message) => {
    setSnackbarVisible(true);
    setSnackbarBgColor(bgColor);
    setSnackbarMessage(message);
  };

  const handleCloseSnackbar = () => {
    setSnackbarVisible(false);
  };
    
    const toggleFavorite = () => {
      if(isFavorited){
      // Toggle the favoriting status
      removeFavorite();
      handleShowSnackbar('bg-red-500','Favorite deleted successfully.');
      onRemoveItem?.(listing._id);
      }
      else{
      addFavorite();
      handleShowSnackbar('bg-green-500','Favorite added successfully.');
    }
    setIsFavorited(!isFavorited);

    };

   
    const fetchFavoritesListingData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/favoris/user/${currentUser._id}`);
        console.log(response.data);
        const Listings = response.data.map(obj => obj.listingId);
       // const isObjectIncluded = Listings.includes(listing);
        const isObjectIncluded = Listings.some(obj => (
        obj._id === listing._id 
        ));
        //setFavoritesListingData(Listings);
        setIsFavorited(isObjectIncluded);
      } catch (error) {
        console.error('Error fetching listing data:', error);
      }
    }

    fetchFavoritesListingData();

    const removeFavorite = async () => {
      try {
        const response = await axios.delete(`http://localhost:3000/api/favoris/${currentUser._id}/${listing._id}`);
        // Fetch data again to update the table
        console.log(response.data);
        
      } catch (error) {
        console.error("Error removing favorite", error);
      }
    };
  
    const addFavorite = async () => {
      try {
      
        const favorite = {
          "customerId" : "65590be42c45ed208e1eaceb",
          "listingId" :  listing._id ,
          "userId" : currentUser._id
      }
      console.log(favorite);
        const response = await axios.post(`http://localhost:3000/api/favoris`,favorite);
        // Fetch data again to update the table
        console.log(response.data);
        
      } catch (error) {
        console.error("Error adding new favorite", error);
      }
    };

  return (
    
    <div className='select-none max-w-[300px] border bg-[#282c34] shadow-[0_7px_20px_5px_#00000088] backdrop-blur-[7px] overflow-hidden transition-[0.5s] duration-[all] mx-auto my-20 rounded-[0.7rem] border-solid border-[#ffffff22];
    background: linear-gradient(
      0deg,
      rgba(40, 44, 52, 1) 0%,
      rgba(17, 0, 32, 0.5) 100%
    );
    -webkit-backdrop-filter: blur(7px);'>
      
      <div>
      <Snackbar message={snackbarMessage} bgColor={snackbarBgColor} show={snackbarVisible} onClose={handleCloseSnackbar} />
    </div>
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing.imageUrls[0] ||
            'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
          }
          alt='listing cover'
          className='h-[320px] sm:h-[220px] w-auto aspect-video object-cover hover:scale-105 transition-scale duration-300'
        />
          </Link>
        <div className='p-3 flex flex-col gap-2 w-full'>
          <p className='truncate text-lg font-semibold text-[#f2f2f3] mx-0 my-2'>
          <Link to={`/listing/${listing._id}`}>{listing.name}</Link>
          </p>


         <div className=''>
       
        <div >
          {/* ... rest of the favorite icons */}
          {isFavorited ? <MdFavorite size="1.5em" color="red" onClick={toggleFavorite}/> : <MdFavoriteBorder size="1.5em" color="red" onClick={toggleFavorite}/>}
          
          </div>
      </div> 
          <div className='flex items-center gap-1'>
            <MdLocationOn className='h-4 w-4 text-green-700' />
            <p className='text-sm  text-[#e9e7ed] mx-0 my-2truncate w-full'>
              {listing.address}
            </p>
          </div>
          <p className='text-sm text-[#ededee] mx-0 my-2 line-clamp-2'>
            {listing.description}
          </p>
          <div className='flex items-center gap-1 text-yellow-400'>
          {[...Array(5)].map((_, index) => (
            <FaStar key={index} size="1em" />
          ))}
        </div>
          {/* <div className='text-slate-700 flex gap-4'>
            <div className='font-bold text-xs'>
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds `
                : `${listing.bedrooms} bed `}
            </div> */}
            {/* <div className='font-bold text-xs'> */}
              {/* {listing.bathrooms > 1
                ? `${listing.bathrooms} baths `
                : `${listing.bathrooms} bath `} */}
            {/* </div> */}
          {/* </div> */}


        </div>
    </div>
  );
}



