import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, []);

  return (
    <header className='bg-gray-400	 text-white shadow-md'>
      <div className='container mx-auto flex justify-between items-center p-4'>
        <Link to='/' className='text-xl font-bold text-white'>
          IT-Maroc
        </Link>
        <form
          onSubmit={handleSubmit}
          className='flex items-center space-x-4'
        >
          <input
            type='text'
            placeholder='Search...'
            className='bg-white text-gray-800 rounded-full py-2 px-4 focus:outline-none'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type='submit'
            className='bg-white text-white py-2 px-4 rounded-full hover:bg-red-600 transition'
          >
            <FaSearch />
          </button>
        </form>
        <ul className='flex gap-4'>
          <Link to='/' className='group  flex  items-center h-10 w-15 bg-indigo-900  shadow-xl gap-5 px-6 py-5 rounded-lg ring-2 ring-offset-2 ring-offset-blue-800 ring-cyan-700  cursor-pointer hover:bg-blue-900 hover:bg-opacity-100 transition'>
            Home
          </Link>
          <Link to='/about' className='group  flex  items-center h-10 w-15 bg-indigo-900  shadow-xl gap-5 px-6 py-5 rounded-lg ring-2 ring-offset-2 ring-offset-blue-800 ring-cyan-700  cursor-pointer hover:bg-blue-900 hover:bg-opacity-100 transition'>
            About
          </Link>
          <Link to='/profile'>
            {currentUser ? (
              <img
                className='rounded-full h-7 w-7 object-cover'
                src={currentUser.avatar}
                alt='profile'
              />
            ) : (
              <span className='text-white hover:underline'>Sign in</span>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
