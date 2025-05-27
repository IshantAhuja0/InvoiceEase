import React,{createContext,useState,useMemo} from "react";
const AuthContext=createContext();
 const AuthProvider=({children})=>{
let [user,setUser]=useState(null)
const login=(data)=>setUser(data)
const logout=()=>setUser(null)

  //  useMemo here to prevent unnecessary recalculations
  const value = useMemo(() => ({
    user,
    login,
    logout
  }), [user]);

return(
  <AuthContext.Provider value={(value)}>
    {children}
  </AuthContext.Provider>
)
}
export {AuthContext,AuthProvider}