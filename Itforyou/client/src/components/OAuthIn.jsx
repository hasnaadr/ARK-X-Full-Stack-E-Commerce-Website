import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { registrationType } from '../pages/RegisterChoice';

export default function OAuthIn({ signInType }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: "select_account"
      })
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      let googleEndpoint;
      console.log(signInType);
      if (signInType === 'user') {        
        googleEndpoint = '/api/auth/google';
      } else if (signInType === 'customer') {        
        googleEndpoint = '/api/auth/google_cost';
      }
      console.log(googleEndpoint);
      const res = await fetch(googleEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      console.log(data);
      dispatch(signInSuccess(data));
      console.log("we got here")
      navigate('/');
    } catch (error) {
      console.error('Could not sign in with Google:', error);
    }
  };
  
  return (
    <button
      onClick={handleGoogleClick}
      type='button'
      className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
    >
      Continue with google
    </button>
  );
}
