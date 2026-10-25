import { createContext } from "react";
const UserContext = createContext(null);

export { UserContext };

import { useContext } from "react";

export default function UseMyUserContext() {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useUserContext must be used within a UserProvider");
  return context;
}
