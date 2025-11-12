// src/hooks/useAuth.js
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import { USER_ROLES } from "../constants/app";
import { toast } from "react-toastify";

/**
 * Custom authentication hook that handles role-based authorization.
 * 
 * @param {string} role - Required role for authorization
 * @returns {Object} - Authentication utilities
 * @property {boolean} isAuthorized - Authorization status
 * @property {Object|null} currentUser - User data from Redux store
 * @property {string} currentUserName - Formatted user name or 'Guest'
 * @property {function} validateAuthentication - Validates and enforces auth
 */
export const useAuth = ( role = USER_ROLES.CLIENT ) => {
  const navigate = useNavigate();
  const {
    error: errorToast,
  } = toast;
  const currentUser = useSelector( ( state ) => state.auth.currentUser );
  const currentUserName = useMemo( () =>
    currentUser ? `${ currentUser.firstName } ${ currentUser.lastName }` : 'Guest',
    [ currentUser ]
  );

  /**
   * Checks if user has specific role
   * @param {string} requiredRole - Role to check
   * @returns {boolean} True if user has the required role
   */
  const hasRole = useCallback( ( requiredRole ) =>
    currentUser?.roles === requiredRole
    , [ currentUser?.roles ] );


  // State to hold authorization status
  const [ isAuthorized, setIsAuthorized ] = useState( !!(
    currentUser &&
    currentUser.token &&
    currentUser?.roles === role
  ) );

  useEffect( () => {
    setIsAuthorized( !!(
      currentUser &&
      currentUser.token &&
      currentUser?.roles === role
    ) );
  }, [ currentUser, role ] );

  /**
   * Validates and enforces user authentication.
   * Redirects to login page with toast notification if unauthorized.
   * 
   * @param {string} [message="Please login"] - Toast message
   * @param {string} [location="/login"] - Redirect path
   * @returns {boolean} - Current authorization status
   */
  const validateAuthentication = (
    message = "Please login",
    location = role === USER_ROLES.ADMIN ? '/admin' : "/login"
  ) => {
    if ( !isAuthorized ) {
      navigate( location );
      errorToast( message );
      return isAuthorized;
    }
    return isAuthorized;
  };


  return {
    isAuthorized,
    currentUser,
    currentUserName,
    validateAuthentication,
    hasRole,
    userId: currentUser?._id,
    userEmail: currentUser?.email
  };
};
