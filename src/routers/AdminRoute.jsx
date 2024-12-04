import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = ({children}) => {
const APP = "STORE-APP-USER"
  const token = localStorage.getItem(APP);
  if(!token) {
    return <Navigate to="/admin"/>
  }
  return children ?  children : <Outlet/>;
}

export default AdminRoute