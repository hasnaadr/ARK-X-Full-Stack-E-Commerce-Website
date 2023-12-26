import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ProfileUser from '../pages/ProfileUser';

import ProfileCustomers from '../components/profileCustomers';


export const RenderProfileBasedOnRole = ({ children }) => {
  
  const { currentUser } = useSelector((state) => state.user);
  if (currentUser?.role =='User') {
    return <ProfileUser />;
  }
  else{
    return children;
  } 
};


