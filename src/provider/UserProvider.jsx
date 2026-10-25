import { useReducer, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { UserReducer, UserInitialState } from "../reducer/userReducer";
import { onAuthStateChanged, auth } from "../firebase/config";

export default function MyProvider({ children }) {
  const [userState, dispatchUser] = useReducer(UserReducer, UserInitialState);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      dispatchUser({ type: "AUTH_IS_READY", payload: user });
      unsub();
    });
  }, []);

  const value = { userState, dispatchUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
