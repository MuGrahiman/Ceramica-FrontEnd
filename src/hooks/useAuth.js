// src/hooks/useAuth.js
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useToast from "./useToast";
import { useEffect, useState } from "react";

export const useAuth = ( role ) => {
  const currentUser = useSelector( ( state ) => state.auth.currentUser );
  const currentUserName = currentUser
    ? `${ currentUser.firstName } ${ currentUser.lastName }`
    : 'Guest';

  const navigate = useNavigate();
  const showToast = useToast();

  // State to hold authorization status
  const [ isAuthorized, setIsAuthorized ] = useState( !!(
    currentUser &&
    currentUser.token &&
    currentUser.roles === role
  ) );

  useEffect( () => {

    setIsAuthorized( !!(
      currentUser &&
      currentUser.token &&
      currentUser.roles === role
    ) );
  }, [ currentUser, role ] );

  /**
   * Validate user authentication.
   * @throws {Error} If the user is not authorized.
   */
  const validateAuthentication = ( message = "Please login", location = "/login" ) => {
    if ( !isAuthorized ) {
      navigate( location );
      showToast( message, 'error' );
      // throw new Error( "Please login" );
      return isAuthorized
    }
    return isAuthorized
  };

  return { isAuthorized, currentUser, currentUserName, validateAuthentication };
};
