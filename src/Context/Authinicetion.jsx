/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
const AuthContext = createContext();
import Authloader from "../assets/AuthLoading.json";
import useAxios from "../Hooks/DataFeachting/useAxios";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import app from "../Firebase";
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // eslint-disable-next-line no-undef
  const Axios = useAxios();
  const [loading, setloading] = useState(true);
  const [currentUser, setcurrentUser] = useState();
  const auth = getAuth(app);

  async function Logout() {
    await Axios.delete(`${import.meta.env.VITE_API_URL_V1}/logout`);

    return signOut(auth);
  }
  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          if (user.displayName) {
            const res = await Axios.post(
              `${import.meta.env.VITE_API_URL_V1}/user`,
              {
                uid: user.uid,
                displayName: user.displayName || "",
                email: user.email,
                photoURL: user.photoURL || "",
              }
            );
            setcurrentUser(user);
            setloading(false);
          }
        } else {
          setcurrentUser();
          await Axios.delete(`${import.meta.env.VITE_API_URL_V1}/logout`);
          setloading(false);
        }
      } catch (err) {
        toast.error("There is server side problem occured. so try again");
        setcurrentUser();
        Logout();
      }
    });

    return () => unsubcribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function signup(username, email, password) {
    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, {
      displayName: username,
      photoURL: " ",
    });
    const user = auth.currentUser;
    setcurrentUser({
      ...user,
    });
  }

  function Login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const UpdateProfile = async (username, photoURL) => {
    const dataforfirbase = {
      displayName: username,
    };
    if (photoURL) {
      dataforfirbase.photoURL = photoURL;
    }
    try {
      await updateProfile(auth.currentUser, dataforfirbase);

      const res2 = await Axios.post(`${import.meta.env.VITE_API_URL_V1}/user`, {
        uid: auth.currentUser.uid,
        email: auth.currentUser.email,
        ...dataforfirbase,
      });
      toast.success("Profile Updated succefully");
      setcurrentUser(res2.data);

      return true;
    } catch (err) {
      toast.success("Failed To update Profile");
      console.log(err);
      return false;
    }
  };

  const value = { currentUser, signup, Login, Logout, loading, UpdateProfile };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
      {loading && (
        <div className="min-h-screen  w-full flex justify-center items-center">
          <Lottie className="h-52" animationData={Authloader}></Lottie>
        </div>
      )}
    </AuthContext.Provider>
  );
}
