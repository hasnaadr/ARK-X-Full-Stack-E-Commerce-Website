import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListingItem from '../components/ListingItem';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Favoris = () => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [listingData, setListingData] = useState([]);
  const [userListings, setUserListings] = useState([]);
  const [showListingsError, setShowListingsError] = useState(false);
  const { currentUser, loading, error } = useSelector((state) => state.user);

  const handleRemoveItem = (itemId) => {
    // Update the state to trigger a re-render
    setListingData(listingData => listingData.filter(item => item._id !== itemId));
  };

  useEffect(() => {
    // Fetch listing data and favoriting status when the component mounts
    const fetchListingData = async () => {
      try {
        console.log("current:",currentUser)
        const response = await axios.get(`http://localhost:3000/api/favoris/user/${currentUser?._id}`);
        console.log(response.data);
        const Listings = response.data.map(obj => obj.listingId);
        setListingData(Listings);
        //setIsFavorited(response.data.isFavorited);
      } catch (error) {
        console.error('Error fetching listing data:', error);
      }
    }

      const fetchUserListingData = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/user/listings/${currentUser._id}`,{user:currentUser});
          console.log(response.data);
          setUserListings(response.data);
          setIsFavorited(response.data.isFavorited);
        } catch (error) {
          console.error('Error fetching listing data:', error);
        }
    };
    // if(currentUser)
    //fetchUserListingData();
    fetchListingData();


  }, [currentUser]);

  const handleFavorite = async () => {
    try {
      // Toggle the favorite status
      setIsFavorited(!isFavorited);
  
      // Assuming listingId is available in your component state or props
      const listingId = []
  
      // Make an API request to update the favorite status on the backend
      await axios.post(`http://localhost:3000/${listingData.id}/${listingId}`, {
        // Additional data you might want to send to the backend when favoriting/unfavoriting
        // For example, you might want to send the user ID or any other relevant data.
      });
  
      // Update the local listing data with the new favoriting status
      setListingData((prevData) => ({
        ...prevData,
        isFavorited: !isFavorited,
      }));
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };
  
 

  return (
    
     <div className='max-w-6xl mx-auto p-3 bg-indigo-950 min-h-screen overflow-auto flex flex-col gap-8 my-10'>

        {listingData && listingData.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-white'>List of Favorites</h2>
              </div>
            <div className='flex flex-wrap gap-4'>
              {listingData.map((listing) => (
                <ListingItem listing={listing} key={listing._id} onRemoveItem={handleRemoveItem}/>
              ))}
            </div>
          </div>
        )}

      </div>
            
  );
}

export default Favoris;
