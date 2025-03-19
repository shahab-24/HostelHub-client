// /* eslint-disable react/prop-types */
// import { createContext, useEffect, useState } from 'react'
// import {
//   GoogleAuthProvider,
//   createUserWithEmailAndPassword,
//   getAuth,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   signOut,
//   updateProfile,
// } from 'firebase/auth'
// import { app } from '../firebase/firebase.config.js'
// import axios from 'axios'
// // import useAxiosSecure from '../hooks/useAxiosSecure.jsx'


// // eslint-disable-next-line react-refresh/only-export-components
// export const AuthContext = createContext(null)
// const auth = getAuth(app)
// const googleProvider = new GoogleAuthProvider()

// const AuthProvider = ({ children }) => {
//         // const axiosSecure = useAxiosSecure()
        
//   const [user, setUser] = useState(null)
//   const [loading, setLoading] = useState(true)

//   const createUser = (email, password) => {
//     setLoading(true)
//     return createUserWithEmailAndPassword(auth, email, password)
//   }

//   const signIn = (email, password) => {
//     setLoading(true)
//     return signInWithEmailAndPassword(auth, email, password)
//   }

//   const signInWithGoogle = () => {
//     setLoading(true)
//     return signInWithPopup(auth, googleProvider)
//   }

//   const logOut = async () => {
//     setLoading(true)
//     return signOut(auth)
//   }

//   const updateUserProfile = (name, photo) => {
//     return updateProfile(auth.currentUser, {
//       displayName: name,
//       photoURL: photo,
//     })
//   }

//   // onAuthStateChange
//   useEffect(() => {
//         setLoading(true)
//     const unsubscribe = onAuthStateChanged(auth, async currentUser => {
//       console.log('CurrentUser-->', currentUser?.email)

//       if (currentUser?.email) {
//         setUser(currentUser)
//         console.log('User set:', currentUser);
//         const token = await currentUser.getIdToken()
//         localStorage.setItem("accessToken", token);

//         // save user
//         // setLoading(false)
//         await axios.post(`${import.meta.env.VITE_API_URL}/api/users/${currentUser?.email}`,
//             {
//             name: currentUser?.displayName,
//             image: currentUser?.photoURL,
//             email: currentUser?.email
//         },
// )
//         setLoading(false)

//         // Get JWT token
//         await axios.post(
//           `${import.meta.env.VITE_API_URL}/api/jwt`,
//           {
//             email: currentUser?.email
//           },
//           { withCredentials: true }
//         )
        
        
//         setLoading(false)
//       } else {
//         setUser(null)
//         localStorage.removeItem("accessToken"); 
//         await axios.get(`${import.meta.env.VITE_API_URL}/api/logout`, {
//           withCredentials: true,
//         })
//         setLoading(false)
//       }
      
//     })
//     return () => {
//       return unsubscribe()
//     }
//   }, [])

//   const authInfo = {
//     user,
//     setUser,
//     loading,
//     setLoading,
//     createUser,
//     signIn,
//     signInWithGoogle,
//     logOut,
//     updateUserProfile,
//   }

//   return (
//     <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
//   )
// }

// export default AuthProvider

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
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
    await signOut(auth);
    localStorage.removeItem("accessToken"); // Ensure token is removed on logout
    await axios.get(`${import.meta.env.VITE_API_URL}/api/logout`, {
      withCredentials: true,
    });
    setUser(null);
    setLoading(false);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // Monitor authentication state
  useEffect(() => {
        setLoading(true);

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser?.email) {
        
        const token = await currentUser.getIdToken();
        localStorage.setItem("accessToken", token);
        setUser(currentUser);

        // Save user info
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/users/${currentUser.email}`,
          {
            name: currentUser.displayName,
            image: currentUser.photoURL,
            email: currentUser.email,
          }
        );

        // Get JWT token
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/jwt`,
          { email: currentUser.email },
          { withCredentials: true }
        );
      } else {
        setUser(null);
        localStorage.removeItem("accessToken");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

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
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

