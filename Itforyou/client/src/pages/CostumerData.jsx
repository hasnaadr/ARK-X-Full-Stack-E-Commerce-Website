import axios from 'axios';
import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// const ProfileCustomers = () => {
    export default function CostumerData() {
  const [customers, setCustomers] = useState([]);
//   const [loading, setLoading] = useState(true);
  const [showData, setShowData] = useState(false);
//   const { currentUser } = useSelector((state) => state.user);
    const fileRef = useRef(null);
    const { currentUser, loading, error } = useSelector((state) => state.user);
    const [file, setFile] = useState(undefined);
    const [filePerc, setFilePerc] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false);
    const [formData, setFormData] = useState({});
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [showListingsError, setShowListingsError] = useState(false);
    const [userListings, setUserListings] = useState([]);
    const dispatch = useDispatch();


    useEffect(() => {
        if (file) {
          handleFileUpload(file);
        }
      }, [file]);
    
      const handleFileUpload = (file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
    
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setFilePerc(Math.round(progress));
          },
          (error) => {
            setFileUploadError(true);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
              setFormData({ ...formData, avatar: downloadURL })
            );
          }
        );
      };
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          dispatch(updateUserStart());
          const res = await fetch(`/api/user/update/${currentUser._id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
          const data = await res.json();
          if (data.success === false) {
            dispatch(updateUserFailure(data.message));
            return;
          }
    
          dispatch(updateUserSuccess(data));
          setUpdateSuccess(true);
        } catch (error) {
          dispatch(updateUserFailure(error.message));
        }
      };
    
      const handleDeleteUser = async () => {
        try {
          dispatch(deleteUserStart());
          const res = await fetch(`/api/user/delete/${currentUser._id}`, {
            method: 'DELETE',
          });
          const data = await res.json();
          if (data.success === false) {
            dispatch(deleteUserFailure(data.message));
            return;
          }
          dispatch(deleteUserSuccess(data));
        } catch (error) {
          dispatch(deleteUserFailure(error.message));
        }
      };
    
      const handleSignOut = async () => {
        try {
          dispatch(signOutUserStart());
          const res = await fetch('/api/auth/signout');
          const data = await res.json();
          if (data.success === false) {
            dispatch(deleteUserFailure(data.message));
            return;
          }
          dispatch(deleteUserSuccess(data));
        } catch (error) {
          dispatch(deleteUserFailure(error.message));
        }
      };
    
      const handleShowListings = async () => {
        try {
          setShowListingsError(false);
          const res = await fetch(`/api/user/listings/${currentUser._id}`);
          const data = await res.json();
          if (data.success === false) {
            setShowListingsError(true);
            return;
          }
    
          setUserListings(data);
        } catch (error) {
          setShowListingsError(true);
        }
      };
    
      const handleListingDelete = async (listingId) => {
        try {
          const res = await fetch(`/api/listing/delete/${listingId}`, {
            method: 'DELETE',
          });
          const data = await res.json();
          if (data.success === false) {
            console.log(data.message);
            return;
          }
    
          setUserListings((prev) =>
            prev.filter((listing) => listing._id !== listingId)
          );
        } catch (error) {
        //   console.log(error.message);
        }
      };


  return (

    <div className=''>
        
     <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
     <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
  <input
    onChange={(e) => setFile(e.target.files[0])}
    type='file'
    ref={fileRef}
    hidden
    accept='image/*'
  />
  <img
    onClick={() => fileRef.current.click()}
    src={formData.avatar || currentUser.avatar}
    alt='profile'
    className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
  />
  <p className='text-sm self-center'>
    {fileUploadError ? (
      <span className='text-red-700'>
        Error Image upload (image must be less than 2 mb)
      </span>
    ) : filePerc > 0 && filePerc < 100 ? (
      <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
    ) : filePerc === 100 ? (
      <span className='text-green-700'>Image successfully uploaded!</span>
    ) : (
      ''
    )}
  </p>
  <div className='bg-white p-3 shadow-sm rounded-sm'>
  <div className="text-2xl flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                     <span className="text-green-500">
                          <svg className="h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                          </svg>
                       </span>
                     <span class="tracking-wide py-4">Personal Information :</span>
                 </div>
                 <div className="text-gray-700">
  <div className="grid md:grid-cols-2 text-sm">
    <div className="grid grid-cols-2">
      <div className="px-4 py-2 font-semibold">userName</div>
      <div className="px-4 py-2">
        <input
          type="text"
          placeholder="Username"
          defaultValue={currentUser.username}
          id="username"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
      </div>
    </div>

    <div className="grid grid-cols-2">
      <div className="px-4 py-2 font-semibold">Email</div>
      <div className="px-4 py-2">
        <input
          type="email"
          placeholder="Email"
          id="email"
          defaultValue={currentUser.email}
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
      </div>
    </div>

    <div className="grid grid-cols-2">
      <div className="px-4 py-2 font-semibold">FirstName</div>
      <div className="px-4 py-2">
        <input
          type="text"
          placeholder="firstName"
          id="firstName"
          defaultValue={currentUser.firstName}
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
      </div>
    </div>

    <div className="grid grid-cols-2">
      <div className="px-4 py-2 font-semibold">LastName</div>
      <div className="px-4 py-2">
        <input
          type="text"
          placeholder="lastName"
          id="lastName"
          defaultValue={currentUser.lastName}
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
      </div>
    </div>

    <div className="grid grid-cols-2">
      <div className="px-4 py-2 font-semibold">Password</div>
      <div className="px-4 py-2">
        <input
          type="password"
          placeholder="Password"
          onChange={handleChange}
          id="password"
          className="border p-3 rounded-lg"
        />
      </div>
    </div>

    <div className="grid grid-cols-2">
      <div className="px-4 py-2 font-semibold">Age</div>
      <div className="px-4 py-2">
        <input
          type="text"
          placeholder="Age"
          onChange={handleChange}
          id="age"
          className="border p-3 rounded-lg"
        />
      </div>
    </div>

    <div className="grid grid-cols-2">
      <div className="px-4 py-2 font-semibold">City</div>
      <div className="px-4 py-2">
        <input
          type="text"
          placeholder="City"
          onChange={handleChange}
          id="city"
          className="border p-3 rounded-lg"
        />
      </div>
    </div>
  </div>
</div>
</div>

  <div className='flex gap-4 items-center'>
    <label htmlFor='gender' className='text-gray-600'>
      Gender:
    </label>
    <select
      id='gender'
      name='gender'
      className='border p-2 rounded-lg'
      onChange={handleChange}
    >
      <option value='male'>Male</option>
      <option value='female'>Female</option>
      <option value='other'>Other</option>
    </select>
  </div>
  <button
    disabled={loading}
    className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
  >
    {loading ? 'Loading...' : 'Update'}
  </button>
  {/* <Link
    className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95'
    to={'/create-listing'}
  >
    Create Listing
  </Link> */}
</form>

      {/* <div className='flex justify-between mt-5'>
        <span
          onClick={handleDeleteUser}
          className='text-red-700 cursor-pointer'
        >
          Delete account
        </span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>
          Sign out
        </span>
      </div> */}

      {/* <p className='text-red-700 mt-5'>{error ? error : ''}</p>
      <p className='text-green-700 mt-5'>
        {updateSuccess ? 'User is updated successfully!' : ''}
      </p>
      <button onClick={handleShowListings} className='text-green-700 w-full'>
        Show Listings
      </button>
      <p className='text-red-700 mt-5'>
        {showListingsError ? 'Error showing listings' : ''}
      </p> */}

      {userListings && userListings.length > 0 && (
        <div className='flex flex-col gap-4'>
          {/* <h1 className='text-center mt-7 text-2xl font-semibold'>
            Your Listings
          </h1> */}
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className='border rounded-lg p-3 flex justify-between items-center gap-4'
            >
              {/* <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt='listing cover'
                  className='h-16 w-16 object-contain'
                />
              </Link> */}
              {/* <Link
                className='text-slate-700 font-semibold  hover:underline truncate flex-1'
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link> */}
{/* 
              <div className='flex flex-col item-center'>
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  class="flex justify-center items-center py-8"
                >
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className='text-green-700 uppercase'>Edit</button>
                </Link>
              </div> */}
            </div>
          ))}

          </div>
       
      )}
    
    {/* Check if data is loading */  }
    {loading && <p>Loading...</p>}

    
  </div>
  );
};
