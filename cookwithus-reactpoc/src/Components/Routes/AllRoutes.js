import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../../Pages/Home/Home";
import Products from "../../Pages/Products/Products";
import Cart from "../../Pages/Cart/Cart";
import Checkout from "../../Pages/Checkout/Checkout";
import Confirmation from "../../Pages/Checkout/Confirmation";
import PaymentCard from "../../Pages/Checkout/PaymentCard";
import LiveLocationTracker from "../LocationSelector/LiveLocationTracker ";
import OrderDirection from "../LocationSelector/OrderDirection";
import RegistrationForm from "../../Pages/RegisterwithUs/RegisterAsChef/RegistrationForm";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/meals" element={<Products />}></Route>
      <Route path="/cart" element={<Cart />}></Route>
      <Route path="/checkout" element={<Checkout />}></Route>
      <Route path="/success" element={<Confirmation />} />
      <Route path="/payment" element={<PaymentCard />} />
      <Route path="/livelocationmap" element={<LiveLocationTracker />} />
      <Route path="/trackorder" element={<OrderDirection />} />
      <Route path="/registeraschef" element={<RegistrationForm />} />
    </Routes>
  );
};

export default AllRoutes;
