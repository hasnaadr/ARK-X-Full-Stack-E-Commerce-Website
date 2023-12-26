import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [favoritesListing, setFavoritesListingData] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  
  SwiperCore.use([Navigation]);
  console.log(offerListings);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        console.log({'offre listing said : ':data});
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchFavoritesListingData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/favoris/user/${currentUser._id}`);
        console.log(response.data);
        const Listings = response.data.map(obj => obj.listingId);
        setFavoritesListingData(Listings);
        //setIsFavorited(response.data.isFavorited);
      } catch (error) {
        console.error('Error fetching listing data:', error);
      }
    }

    if(currentUser)
    fetchFavoritesListingData();
    fetchOfferListings();
  }, [currentUser]);
  return (
    <div className='bg-gray-700	min-h-screen overflow-auto'>
      {/* top */}
      <div className='flex flex-col gap-5 p-15 px-3 max-w-6xl mx-auto'>
      <div className='flex items-center'>
  <h1 className='mt-32 text-white text-6xl font-bold'>
    Discover Your <br /> Perfect Freelance <br /> Partner at IT Maroc Estate
  </h1>
  <img
    src="https://cdn.pixabay.com/photo/2018/05/08/08/44/artificial-intelligence-3382507_640.jpg"
    alt=""
    className='w-64 h-64  ml-2 rounded-[200px]'
  />
</div>

        <div className='text-gray-400 text-xs sm:text-sm'>
          Your Ideal Source for a Diverse Array of Skilled Developers! .
          
        </div>
        <Link
          to={'/search'}
          className='group  flex  items-center h-16 w-17 bg-indigo-900  shadow-xl gap-5 px-6 py-5 rounded-lg ring-2 ring-offset-2 ring-offset-blue-800 ring-cyan-700  cursor-pointer hover:bg-blue-900 hover:bg-opacity-100 transition'
        >
          lets get started...
        </Link>
      </div>

      {/* swiper */}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px]'
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>


      {/* listing results for offer, sale and rent */}

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {offerListings && offerListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
              <Link className='text-sm text-white hover:underline' to={'/search?offer=true'}>Show more offers</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-500'>Find your Freelancer for your project</h2>
              <Link className='text-sm text-blue-500 hover:underline' to={'/search?type=rent'}>Show more Offers</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
