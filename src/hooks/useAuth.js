// src/hooks/useAuth.js
import { useSelector } from "react-redux";

export const useAuth = (role) => {
  const currentUser = useSelector((state) => state.auth.currentUser);

  const isAuthorized = !!(
    currentUser &&
    currentUser.token &&
    currentUser.role === role
  );

  return { isAuthorized, currentUser };
};