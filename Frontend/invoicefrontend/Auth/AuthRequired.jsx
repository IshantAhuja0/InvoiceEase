import React from "react";
import { useContext } from "react";
import {useLocation,Navigate} from "react-router-dom"
import { AuthContext } from "../Context/AuthContext";
export default function AuthRequired({children}) {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  console.log("in authrequire file",user)
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
