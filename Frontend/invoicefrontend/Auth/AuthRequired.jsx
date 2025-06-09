import React from "react";
import {useLocation,Navigate} from "react-router-dom"
export default function AuthRequired({children}) {
  const token = sessionStorage.getItem("user data");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
console.log(token)
  return children;
}
