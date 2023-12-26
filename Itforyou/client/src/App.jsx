import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom";
// import { BrowserRouter as Router } from 'react-router-dom';
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import Footer from "./components/footer";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/UpdateListing";
import Listing from "./pages/Listing";
import Search from "./pages/Search";
import Login_test from "./pages/Login_test";
import Register_Test from "./pages/Register_Test";
import ProfileCustomers from "./components/profileCustomers";
import Settings from "./pages/Settings";
import Favoris from "./pages/Favoris";
import RegisterChoice from "./pages/RegisterChoice";
import SignInChoice from "./pages/SignInChoice";
import { RenderProfileBasedOnRole } from "./pages/RenderProfileBasedOnRole";
import CostumerData from "./pages/CostumerData";

// import Category from './components/category';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignInChoice />} />
        <Route path="/sign-up" element={<RegisterChoice />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="/listing/:listingId" element={<Listing />} />
        <Route path="/Login_test" element={<Login_test />} />
        <Route path="/Register_Test" element={<Register_Test />} />
        {/* <Route path='/category' element={<Category />} /> */}

        <Route element={<RenderProfileBasedOnRole />}>
          <Route
            path="/profile"
            element={
              // <RenderProfileBasedOnRole>
                <ProfileCustomers />
              // </RenderProfileBasedOnRole>
            }
          />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/Settings" element={<Settings />} />
          <Route path="/favoris" element={<Favoris />} />
          <Route path="/costumerData" element={<CostumerData />} />

          <Route
            path="/update-listing/:listingId"
            element={<UpdateListing />}
          />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
