import FormFields from "./screens/FormFields";
import UserCases from "./screens/UserCases";
import UseProductsContext from "./context/ProductContext";
import { ToastContainer } from "react-toastify";
import { Route, Routes, Link } from "react-router-dom";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import EditUser from "./screens/EditUser";
import UseMyUserContext from "./context/UserContext";
import ProductsCases from "./screens/ProductsCases";
import NotFound from "./screens/NotFound";
import CreateProduct from "./screens/CreateProduct";
import HamburgerMenu from "./components/Basicos/HamburgerMenu";
import { useState } from "react";
import RandomImg from "./components/RandomImg";

function App() {
  const { userState } = UseMyUserContext();
  const { ProductsState } = UseProductsContext();

  const [show, setShow] = useState(true);
  const isPending = ProductsState.isPending;

  return (
    <>
      {!isPending && show ? (
        <RandomImg setShow={setShow} />
      ) : (
        <div className="flex flex-col items-center m-8 space-y-2">
          <div className="w-full bg-teal-100 h-14">
            <HamburgerMenu />
          </div>
          <Routes>
            <Route path="/" exact={true} element={<FormFields />} />
            <Route path="/provider" element={<UserCases />} />
            <Route path="/products" element={<ProductsCases />} />
            <Route path="/createProduct" element={<CreateProduct />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/edituser"
              element={userState.user ? <EditUser /> : <FormFields />}
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
          <ToastContainer />
        </div>
      )}
    </>
  );
}

export default App;
