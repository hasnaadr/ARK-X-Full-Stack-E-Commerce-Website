import React, { useState } from 'react';
import SignUp from '../pages/SignUp';

const RegisterChoice = () => {
  const [registrationType, setRegistrationType] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleRegistrationTypeChange = (event) => {
    setRegistrationType(event.target.value);
  };

  const handleRegistrationSubmit = () => {
    setSubmitted(true);
  };

  const handleGoBack = () => {
    setRegistrationType('');
    setSubmitted(false);
  };

  return (
    <div>
      {!submitted ? (
        <div>
          <h2>Choose Registration Type</h2>
          <div>
            <input
              type="radio"
              id="user"
              name="registrationType"
              value="user"
              checked={registrationType === 'user'}
              onChange={handleRegistrationTypeChange}
            />
            <label htmlFor="user">User</label>
          </div>
          <div>
            <input
              type="radio"
              id="customer"
              name="registrationType"
              value="customer"
              checked={registrationType === 'customer'}
              onChange={handleRegistrationTypeChange}
            />
            <label htmlFor="customer">Customer</label>
          </div>

          <button onClick={handleRegistrationSubmit}>Register</button>
        </div>
      ) : (
        <SignUp registrationType={registrationType} />
      )}

      {submitted && (
        <button onClick={handleGoBack}>Go Back and Change Registration Type</button>
      )}
    </div>
  );
};

export default RegisterChoice;

// import React, { useState } from 'react';
// import SignUp from '../pages/SignUp';

// const RegistrationComponent = () => {
//   const [registrationType, setRegistrationType] = useState('');

//   const handleRegistrationTypeChange = (event) => {
//     setRegistrationType(event.target.value);
//   };

//   const handleRegistrationSubmit = () => {
   
//     setRegistrationType('');
//   };

//   return (
//     <div>
//       <h2>Choose Registration Type</h2>
//       <div>
//         <input
//           type="radio"
//           id="user"
//           name="registrationType"
//           value="user"
//           checked={registrationType === 'user'}
//           onChange={handleRegistrationTypeChange}
//         />
//         <label htmlFor="user">User</label>
//       </div>
//       <div>
//         <input
//           type="radio"
//           id="customer"
//           name="registrationType"
//           value="customer"
//           checked={registrationType === 'customer'}
//           onChange={handleRegistrationTypeChange}
//         />
//         <label htmlFor="customer">Customer</label>
//       </div>
//       <button onClick={handleRegistrationSubmit}>Register</button>
//     </div>
//   );
// };

// export default RegistrationComponent;

// import React, { useState } from 'react';
// import SignUp from '../pages/SignUp';

// const RegistrationComponent = () => {
//   const [registrationType, setRegistrationType] = useState('');
//   const [showSignUp, setShowSignUp] = useState(false);

//   const handleRegistrationTypeChange = (event) => {
//     setRegistrationType(event.target.value);
//   };

//   const handleRegistrationSubmit = () => {
//     // You can perform any additional logic here based on the selected registrationType
//     // For now, let's just set showSignUp to true to render the SignUp component
//     setShowSignUp(true);
//   };

//   const handleGoBack = () => {
//     // Reset the registrationType and hide the SignUp component
//     setRegistrationType('');
//     setShowSignUp(false);
//   };

//   return (
//     <div>
//       {registrationType === '' && (
//         <div>
//           <h2>Choose Registration Type</h2>
//           <div>
//             <input
//               type="radio"
//               id="user"
//               name="registrationType"
//               value="user"
//               checked={registrationType === 'user'}
//               onChange={handleRegistrationTypeChange}
//             />
//             <label htmlFor="user">User</label>
//           </div>
//           <div>
//             <input
//               type="radio"
//               id="customer"
//               name="registrationType"
//               value="customer"
//               checked={registrationType === 'customer'}
//               onChange={handleRegistrationTypeChange}
//             />
//             <label htmlFor="customer">Customer</label>
//           </div>
//           <button onClick={handleRegistrationSubmit}>Register</button>
//         </div>
//       )}

//       {showSignUp && <SignUp registrationType={registrationType} />}

//       {showSignUp && (
//         <button onClick={handleGoBack}>Go Back and Change Registration Type</button>
//       )}
//     </div>
//   );
// };

// export default RegistrationComponent;

// import React, { useState } from 'react';
// import SignUp from '../pages/SignUp';

// const RegistrationComponent = () => {
//   const [registrationType, setRegistrationType] = useState('');
//   const [submitted, setSubmitted] = useState(false);

//   const handleRegistrationTypeChange = (event) => {
//     setRegistrationType(event.target.value);
//   };

//   const handleRegistrationSubmit = () => {
//     // You can perform any additional logic here based on the selected registrationType
//     // For now, let's just set submitted to true
//     setSubmitted(true);
//   };

//   const handleGoBack = () => {
//     // Reset the registrationType and set submitted to false
//     setRegistrationType('');
//     setSubmitted(false);
//   };

//   return (
//     <div>
//       {!submitted ? (
//         <div>
//           <h2>Choose Registration Type</h2>
//           <div>
//             <input
//               type="radio"
//               id="user"
//               name="registrationType"
//               value="user"
//               checked={registrationType === 'user'}
//               onChange={handleRegistrationTypeChange}
//             />
//             <label htmlFor="user">User</label>
//           </div>
//           <div>
//             <input
//               type="radio"
//               id="customer"
//               name="registrationType"
//               value="customer"
//               checked={registrationType === 'customer'}
//               onChange={handleRegistrationTypeChange}
//             />
//             <label htmlFor="customer">Customer</label>
//           </div>
//           <button onClick={handleRegistrationSubmit}>Register</button>
//         </div>
//       ) : (
//         <SignUp registrationType={registrationType} />
//       )}

//       {submitted && (
//         <button onClick={handleGoBack}>Go Back and Change Registration Type</button>
//       )}
//     </div>
//   );
// };

// export default RegistrationComponent;











