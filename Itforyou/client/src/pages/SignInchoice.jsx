import React, { useState } from 'react';
import SignIn from '../pages/SignIn'; // Import your SignIn component

const SignInChoice = () => {
  const [signInType, setSignInType] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSignInTypeChange = (event) => {
    setSignInType(event.target.value);
  };

  const handleSignInSubmit = () => {
    setSubmitted(true);
  };

  const handleGoBack = () => {
    setSignInType('');
    setSubmitted(false);
  };

  return (
    <div>
      {!submitted ? (
        <div>
          <h2>Choose Sign-In Type</h2>
          <div>
            <input
              type="radio"
              id="user"
              name="signInType"
              value="user"
              checked={signInType === 'user'}
              onChange={handleSignInTypeChange}
            />
            <label htmlFor="user">User</label>
          </div>
          <div>
            <input
              type="radio"
              id="customer"
              name="signInType"
              value="customer"
              checked={signInType === 'customer'}
              onChange={handleSignInTypeChange}
            />
            <label htmlFor="customer">Customer</label>
          </div>

          <button onClick={handleSignInSubmit}>Sign In</button>
        </div>
      ) : (
        <SignIn signInType={signInType} />
      )}

      {submitted && (
        <button onClick={handleGoBack}>Go Back and Change Sign-In Type</button>
      )}
    </div>
  );
};

export default SignInChoice;
