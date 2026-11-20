import FormFields from "./screens/FormFields";
import UserCases from "./screens/UserCases";
import UseProductsContext from "./context/ProductContext";
import { ToastContainer } from "react-toastify";
import { Route, Routes, Link } from "react-router-dom";
import Login from "./screens/Login";
import Home from "./screens/Home/Home";
import SignUp from "./screens/SignUp";
import EditUser from "./screens/EditUser";
import UseMyUserContext from "./context/UserContext";
import ProductsCases from "./screens/ProductsCases";
import NotFound from "./screens/NotFound";
import CreateProduct from "./screens/CreateProduct";
import HamburgerMenu from "./components/Basicos/HamburgerMenu";
import { useState } from "react";
import RandomImg from "./components/RandomImg";
import { Categories } from "./data/dropdownOptios";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import Header from "./components/Header";
import UserPage from "./screens/UserPage/UserPage";
import Gallery from "./screens/Gallery";
import ContactUs from "./screens/ContactUs";
import DisplayDetails from "./screens/DisplayDetails";
import Appoinment from "./screens/Appoinment";

function App() {
  const { userState } = UseMyUserContext();
  const { ProductsState } = UseProductsContext();
  const [show, setShow] = useState(true);
  const user = userState.dataUser;
  const isPending = ProductsState.isPending;

  return (
    <>
      {!isPending && show ? (
        <RandomImg setShow={setShow} />
      ) : (
        <div className="w-full min-h-screen flex flex-col items-center">
          <Header />
          <Routes>
            <Route path="/" exact={true} element={<Home />} />
            {/* <Route path="/" exact={true} element={<Appoinment />} /> */}
            <Route path="/contactUs" exact={true} element={<ContactUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/displayDetails/:id" element={<DisplayDetails />} />

            <Route path="/userpage" element={!user ? <Home /> : <UserPage />}>
              <Route index element={!user ? <Home /> : <EditUser />} />
              <Route path="createPiece" element={<CreateProduct />} />
              <Route path="gallery" element={<Gallery />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
          <ToastContainer />
        </div>
      )}
    </>
  );
}

export default App;
