<<<<<<< HEAD
import { useAuthContext } from "./hooks/useAuthContext";
import { Route, Routes } from "react-router-dom";
import { useKindUser } from "./hooks/useKindUser.jsx";
import { useCollection } from "./hooks/useCollection";

import Header from "./components/Header.jsx";
// import Form from "./components/Form.jsx";
import Home from "./screens/Home.jsx";
import Login from "./screens/Login.jsx";
import Signup from "./screens/Signup.jsx";
import Profile from "./screens/Profile";
import Contact from "./screens/Contact.jsx";
import Create from "./screens/Create.jsx";
import NotFound from "./Screens/NotFound.jsx";
import GalleryDetails from "./screens/GalleryDetails.jsx";

import AlertMsg from "./styles/AlertMsg.jsx";
import { ToastContainer } from "react-toastify";

function App() {
  const { documents } = useCollection("infoRequest");
  const { authIsReady, user } = useAuthContext();
  const { admin } = useKindUser(user);
  const myinfoRequest = documents.filter((r) => r.status === 1);
  return (
    <div className="App">
      {authIsReady && (
        <>
          <Header />
          {admin && <AlertMsg infoRequest={myinfoRequest} />}
          <Routes>
            {/* <Route path='/form' exact={true} element={<Form />} /> */}
            <Route path="/" exact={true} element={<Home />} />
            <Route path="/gallery/:id" element={<GalleryDetails />} />
            <Route path="/login" element={!user ? <Login /> : <Home />} />
            <Route path="/signup" element={!user ? <Signup /> : <Home />} />
            <Route path="/profile" element={user ? <Profile /> : <Home />} />
            <Route path="/create" element={user ? <Create /> : <Home />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      )}
      <ToastContainer />
    </div>
  );
=======
import { Route, Routes } from "react-router-dom";
import Home from "./screens/Home.jsx";
import NotFound from "./Screens/NotFound.jsx";
import { ToastContainer } from "react-toastify";
import Main from "./components/Main.jsx";

function App() {
	return (
		<div>
			<Routes>
				<Route path='/' exact={true} element={<Main />} />

				<Route path='*' element={<NotFound />} />
			</Routes>

			<ToastContainer />
		</div>
	);
>>>>>>> 34f1a434b99a1ec25e9eeeb09af0c4aa6da57e2d
}

export default App;
