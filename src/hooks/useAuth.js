// src/hooks/useAuth.js
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useToast from "./useToast";
import { useEffect, useState } from "react";
import { USER_ROLES } from "../constants/app";

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
   * Validates and enforces user authentication.
   * Redirects to login page with toast notification if unauthorized.
   * 
   * @param {string} [message="Please login"] - Toast message
   * @param {string} [location="/login"] - Redirect path
   * @returns {boolean} - Current authorization status
   */
  const validateAuthentication = ( message = "Please login", location = "/login" ) => {
    if ( !isAuthorized ) {
      navigate( location );
      showToast( message, 'error' );
      return isAuthorized;
    }
    return isAuthorized;
  };

  // Suggested: Add role checking utility
  const hasRole = ( requiredRole ) => {
    return currentUser?.roles === requiredRole;
  };

  return {
    isAuthorized,
    currentUser,
    currentUserName,
    validateAuthentication,
    hasRole
  };
};
