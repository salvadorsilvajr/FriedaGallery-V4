import { createContext } from "react";
const ProductContext = createContext(null);

export { ProductContext };

import { useContext } from "react";

export default function UseProductsContext() {
  const context = useContext(ProductContext);
  if (!context)
    throw new Error("useUserContext must be used within a UserProvider");
  return context;
}
