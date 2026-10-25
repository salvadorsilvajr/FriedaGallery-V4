import { useState, useEffect } from "react";
import {
  auth,
  signInWithEmailAndPassword,
  collection,
  signInWithPopup,
  updateDoc,
  setDoc,
  getDoc,
  getDocs,
  facebookprovider,
  doc,
  db,
  googleprovider,
  createUserWithEmailAndPassword,
  updateProfile,
} from "../firebase/config";
import UseMyUserContext from "../context/UserContext";
import { toast } from "react-toastify";

export const useUsers = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatchUser } = UseMyUserContext();

  const findUser = async (user, collName) => {
    const { uid } = user;

    let data = {};
    const querySnapshot = await getDocs(collection(db, collName));
    querySnapshot.forEach((doc) => {
      if (doc.id === uid) {
        data = doc.data();
      }
    });

    dispatchUser({ type: "LOGIN", payload: { user, data } });
  };

  // ********************* login function **********************

  const login = async (email, password, collName) => {
    setError(null);
    setIsPending(true);

    try {
      // login
      const res = await signInWithEmailAndPassword(auth, email, password);

      if (!res) {
        throw new Error("Could not complete the Sign In");
      }

      // update online status
      await updateDoc(doc(db, collName, res.user.uid), {
        online: true,
      });

      findUser(res.user, collName);

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      toast.error(`"Error .."+${err.message} `);
      console.log(error);
      if (!isCancelled) {
        setError(err);
        setIsPending(false);
      }
    }
  };

  // ********************* Face sign in function **********************
  const signinwithfacebook = async (collName) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await signInWithPopup(auth, facebookprovider);
      res.user.providerData.forEach((profile) => {
        if (profile.providerId === "facebook.com") {
        }
      });

      if (!res) {
        throw new Error("Could not complete the Sign In wiht Facebook");
      }

      auth.onAuthStateChanged((user) => {
        if (user) {
          const docRef = doc(db, collName, user.uid);

          getDoc(docRef)
            .then((docSnap) => {
              if (docSnap.exists()) {
                // Do something with the data
                updateDoc(doc(db, collName, user.uid), {
                  online: true,
                });
              } else {
                setDoc(doc(db, collName, res.user.uid), {
                  online: true,
                  displayName: res.user.displayName,
                  isAdmin: "0",
                  id: res.user.uid,
                  photoURL: res.user.photoURL,
                  company: "",
                  title: "",
                  photoRef: "",
                });
              }
            })
            .catch((err) => {
              toast.error(`"Error .."+${err.message} `);
              console.log("Error getting document:", err);
            });

          findUser(res.user, collName);
        }

        if (!isCancelled) {
          setIsPending(false);
          setError(null);
        }
      });
    } catch (err) {
      toast.error(`"Error .."+${err.message} `);
      if (!isCancelled) {
        setError(err);
        setIsPending(false);
      }
    }
  };

  // ********************* Google sign in function **********************
  const signinwithgoogle = async (collName) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await signInWithPopup(auth, googleprovider);

      if (!res) {
        throw new Error("Could not complete the Sign In wiht Google");
      }

      auth.onAuthStateChanged((user) => {
        const docRef = doc(db, collName, user.uid);

        getDoc(docRef)
          .then((docSnap) => {
            if (docSnap.exists()) {
              // Do something with the data
              updateDoc(doc(db, collName, user.uid), {
                online: true,
              });
            } else {
              setDoc(doc(db, collName, res.user.uid), {
                online: true,
                displayName: res.user.displayName,
                isAdmin: "0",
                id: res.user.uid,
                photoURL: res.user.photoURL,
                company: "",
                title: "",
                photoRef: "",
              });
            }
          })

          .catch((err) => {
            toast.error(`"Error .."+${err.message} `);
            // console.log("Error getting document:", error);
          });

        findUser(res.user, collName);

        if (!isCancelled) {
          setIsPending(false);
          setError(null);
        }
      });
    } catch (err) {
      toast.error(`"Error .."+${err.message} `);
      if (!isCancelled) {
        setError(err);
        setIsPending(false);
      }
    }
  };

  // *********************  sign Up function **********************
  const signup = async (email, password, displayName, collName) => {
    setError(null);
    setIsPending(true);

    try {
      // signup
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res);

      if (!res) {
        throw new Error("Could not complete signup");
      }

      // add display name to user
      await updateProfile(auth.currentUser, { displayName });

      //create a user document
      await setDoc(doc(db, collName, res.user.uid), {
        online: true,
        displayName,
        isAdmin: "0",
        id: res.user.uid,
        company: "",
        title: "",
        photoURL: "",
        photoRef: "",
      });

      findUser(res.user, collName);

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      toast.error(`"Error .."+${err.message} `);
      if (!isCancelled) {
        setError(err.message);
        console.log(err);
        setIsPending(false);
      }
    }
  };

  // *********************  Log Out function **********************
  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      // sign the user out
      await auth.signOut();

      // dispatch logout action
      dispatch({ type: "LOGOUT" });

      // update state
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      toast.error(`"Error .."+${err.message} `);
      if (!isCancelled) {
        setError(err);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    setIsCancelled(false);
    return () => setIsCancelled(true);
  }, []);

  return {
    signup,
    login,
    signinwithfacebook,
    signinwithgoogle,
    logout,
    isPending,
  };
};
