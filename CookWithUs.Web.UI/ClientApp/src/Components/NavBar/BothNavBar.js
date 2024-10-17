import React, { useState,useEffect,useContext } from "react";
import RestaurantSideBar from "../RestaurantUi/SideBar/RestaurantSideBar";
import RestaurantTopBar from "../RestaurantUi/TopBar/RestaurantTopBar";
import RiderTopBar from "../RiderUi/RiderTopBar";
import NavBar from "./NavBar";
import RiderSideBar from "../RiderUi/RiderSideBar";
import PhoneNavBar from "./PhoneNavBar";
import RestaurantPhoneNavBar from "../RestaurantUi/RestaurantPhoneNavBar";
import AuthContext from "../../Pages/AuthProvider";


const BothNavBar = ({ riderSideBar, setRiderSideBar, isPhone, role, setRole, setActiveTab, activeTab, setIsActive, isActive, setRiderIsActive, riderIsActive }) => {
    const { auth, setAuth } = useContext(AuthContext);
    useEffect(() => {
        // Check if a JWT token exists in localStorage
        const storedToken = localStorage.getItem("jwtToken");
        if (storedToken) {
            setAuth({
                storedToken,
                isAuthenticated: true,
            });
        }
    }, []);

   
    if (role === 'User') {
        return (
            <>
                {isPhone ? (
                    <>
                        <PhoneNavBar />
                    </>
                ) : (
                    <>
                        <NavBar setRole={setRole} />
                    </>
                )}
            </>
        );
    } else if (role === 'Restaurant') {
        return (
            <>

                {isPhone ? (
                    <>
                        <RestaurantPhoneNavBar isActive={isActive} setIsActive={setIsActive} activeTab={activeTab} setActiveTab={setActiveTab} />
                    </>
                ) : (
                    <>
                        <RestaurantSideBar activeTab={activeTab} setActiveTab={setActiveTab} />
                        <RestaurantTopBar isActive={isActive} setIsActive={setIsActive} />
                    </>
                )}
                      
            </>
        );
    } else if (role === 'Rider') {
        
        return (
            <>
                {riderSideBar && <RiderSideBar setRiderIsActive={setRiderIsActive} riderIsActive={riderIsActive} setRiderSideBar={setRiderSideBar } />}
                <RiderTopBar  setRiderSideBar={setRiderSideBar} />
            </>
        ); 
    }
    else {
        return null; 
    }
}

export default BothNavBar;
