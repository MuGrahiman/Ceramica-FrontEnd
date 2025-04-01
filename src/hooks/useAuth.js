// src/hooks/useAuth.js
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useToast from "./useToast";

export const useAuth = ( role ) => {
  const currentUser = useSelector( ( state ) => state.auth.currentUser );
  const navigate = useNavigate();
  const showToast = useToast()
  const isAuthorized = !!(
    currentUser &&
    currentUser.token &&
    currentUser.role === role
  );
  /**
   * Validate user authentication.
   * @throws {Error} If the user is not authorized.
   */
  const validateAuthentication = ( message = '' ) => {
    if ( !isAuthorized ) {
      navigate( "/login" );
      showToast( message || "Please login " )
      throw new Error( "Please login " );
    }
  };
  return { isAuthorized, currentUser, validateAuthentication };
};