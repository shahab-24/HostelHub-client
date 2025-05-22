/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase/firebase.config.js";
import axios from "axios";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [tokenReady, setTokenReady] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //     setLoading(true);

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("CurrentUser-->", currentUser?.email);
      try {
        if (currentUser?.email) {
          await axios.post(
            `${import.meta.env.VITE_API_URL}/api/users`,
            {
              name: currentUser?.displayName,
              image: currentUser?.photoURL,
              email: currentUser?.email,
            }
            // { withCredentials: true }
            //                         {headers: {
            //     "Content-Type": "application/json",
            //   }}
          );

          const { data } = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/jwt`,

            { email: currentUser?.email }
          );

          const backendToken = data?.token;
        //   console.log(backendToken);

          if (backendToken) {
            localStorage.setItem("accessToken", backendToken);

            setUser({ ...currentUser, role: data.role });
          } else {
            console.warn("no token received from backend");
            setUser(null);
            localStorage.removeItem("accessToken");
            return;
          }

          //     store user info
          // setUser({...currentUser, role: data.role})
        } else {
          setUser(null);
          localStorage.removeItem("accessToken");
        }
      } catch (error) {
        console.error("JWT fetch failed", error);
        setUser(null);
        localStorage.removeItem("accessToken");
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = async () => {
    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/logout`,
        {},
        { withCredentials: true }
      );
      await signOut(auth);
      localStorage.removeItem("accessToken");
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile,
    //     tokenReady
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
