/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
// 
const AuthContext = createContext();

import useAxios from "../Hooks/DataFeachting/useAxios";

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {

  const Axios = useAxios();
  const [loading, setloading] = useState(true);
  const [currentUser, setcurrentUser] = useState({  
   _id: '657078a6c7308d9908c2ec4d',
   uid:"ByyUWQSD03Rk3Exw20U4Mw7OJ2H3",
   displayName:"Md Nahid Hasan",
   email:'ku43060537@gmail.com',
   photoURL:"https://i.ibb.co/hcJy9Xc/img-for-resume.png",
   role:"user"
 });


  const value = { currentUser,  loading, };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
