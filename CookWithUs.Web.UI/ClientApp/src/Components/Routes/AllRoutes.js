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
import RegisterAsRider from "../../Pages/RegisterwithUs/RegisterAsRider/RegisterAsRider";
import AdminDashboard from "../../Pages/AdminDashboard/AdminDashboard";
import ChefDashboard from "../../Pages/ChefDashboard/ChefDashboard";
import Login from "../../Pages/Login/Login";
import Signup from "../../Pages/Signup/Signup";
import RestaurantDetails from "../../Pages/Products/RestaurantDetails";
import Orders from "../../Pages/Orders/Orders";
import MyOrders from "../../Pages/User/MyAccount/MyOrders";
import ManageAddress from "../../Pages/User/ManageAddress/ManageAddress";
import RiderDashboard from "../../Pages/RiderDashboard/Dashboard";
import Shipping from "../../Pages/Checkout/Shipping";
import Dashboard from "../../Pages/RiderDashboard/Dashboard";
import RestaurantDashboard from "../../Pages/RestaurantUi/Dashboard/RestaurantDashboard";
import RestaurantMenu from "../../Pages/RestaurantUi/Menu/RestaurantMenu";

const AllRoutes = ({ isActive, setActiveTab ,activeTab  }) => {
  return (
    <Routes>
      <Route path="/uesr" element={<Home />}></Route>
      <Route path="/meals" element={<Products />}></Route>
      <Route path="/my-account" element={<MyOrders />}></Route>
      <Route path="/my-account/orders" element={<MyOrders />}></Route>
      <Route path="/my-account/manage_addresses" element={<ManageAddress />}></Route>
      <Route path="/myorders" element={<Orders />}></Route>
      <Route path="/cart" element={<Cart />}></Route>
      <Route path="/checkout" element={<Checkout />}></Route>
      <Route path="/success" element={<Confirmation />} />
      <Route path="/payment" element={<PaymentCard />} />
      <Route path="/livelocationmap/:orderId" element={<LiveLocationTracker />} />
      <Route path="/RiderDashboard" element={<RiderDashboard />} />
      <Route path="/trackorder" element={<OrderDirection />} />
      <Route path="/trackorder/:id" element={<OrderDirection />} />
      <Route path="/registeraschef" element={<RegistrationForm />} />
      <Route path="/registerasrider" element={<RegisterAsRider />} />
      <Route path="/admindashboard" element={<AdminDashboard />} />
      <Route path="/chefdashboard" element={<ChefDashboard />} />
      <Route path="/restaurant/:id" element={<RestaurantDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/Shipping" element={<Shipping />} />
      <Route path="/" element={<RestaurantDashboard isActive={isActive} />} />
          <Route path="/Restaurant/Menu" element={<RestaurantMenu setActiveTab={setActiveTab} activeTab={activeTab} />} />
      <Route path="/Restaurant/Order" element={<RestaurantDashboard isActive={isActive} />} />

    </Routes>
  );
};

export default AllRoutes;
